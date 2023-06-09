import cors = require('cors');
import express = require('express');
import http = require('http');
import {expressjwt} from 'express-jwt';
import {getMongoConnection} from './db/connection';
import {endpointConstants} from './endpoints/constants';
import BaseContext, {
  getEmailProvider,
  getFileProvider,
} from './endpoints/contexts/BaseContext';
import {BaseContextType} from './endpoints/contexts/types';
import {
  getDataProviders,
  getLogicProviders,
  getMemstoreDataProviders,
  getMongoModels,
  getSemanticDataProviders,
  ingestDataIntoMemStore,
} from './endpoints/contexts/utils';
import {setupFimidaraHttpEndpoints} from './endpoints/endpoints';
import {getConsoleLogger, getLogger} from './endpoints/globalUtils';
import {startJobRunner} from './endpoints/jobs/runner';
import {setupApp} from './endpoints/runtime/initAppSetup';
import handleErrors from './middlewares/handleErrors';
import httpToHttps from './middlewares/httpToHttps';
import {getAppVariables, prodEnvsSchema} from './resources/vars';

const logger = getLogger();
const consoleLogger = getConsoleLogger();
logger.info('server initialization');

const app = express();

const httpServer = http.createServer(app);

// Match all origins
const whiteListedCorsOrigins = [/[\s\S]*/];
if (process.env.NODE_ENV !== 'production') {
  whiteListedCorsOrigins.push(/localhost/);
}

const corsOption: cors.CorsOptions = {
  origin: whiteListedCorsOrigins,
  optionsSuccessStatus: endpointConstants.httpStatusCode.ok,
  credentials: true,
};

if (process.env.NODE_ENV === 'production') {
  app.use(httpToHttps);
}

app.use(cors(corsOption));
app.use(express.json() as express.RequestHandler);

function setupJWT(ctx: BaseContextType) {
  app.use(
    // TODO: do further research on JWT options, algorithms and best practices
    expressjwt({
      secret: ctx.appVariables.jwtSecret,
      credentialsRequired: false,
      algorithms: ['HS256'],
    })
  );
}

async function setup() {
  const appVariables = getAppVariables(prodEnvsSchema);
  const connection = await getMongoConnection(
    appVariables.mongoDbURI,
    appVariables.mongoDbDatabaseName
  );

  // Run scripts here
  // End of scripts

  const models = getMongoModels(connection);
  const mem = getMemstoreDataProviders(models);
  const ctx = new BaseContext(
    getDataProviders(models),
    getEmailProvider(appVariables),
    getFileProvider(appVariables),
    appVariables,
    mem,
    getLogicProviders(),
    getSemanticDataProviders(mem),
    () => connection.close()
  );
  await ingestDataIntoMemStore(ctx);

  const defaultWorkspace = await setupApp(ctx);
  logger.info(`Default workspace ID - ${defaultWorkspace.resourceId}`);

  setupJWT(ctx);
  setupFimidaraHttpEndpoints(ctx, app);

  httpServer.listen(ctx.appVariables.port, async () => {
    app.use(handleErrors);
    logger.info(ctx.appVariables.appName);
    logger.info(`server listening on port ${ctx.appVariables.port}`);

    // start job runner
    startJobRunner(ctx).catch(error => consoleLogger.error(error));
  });
}

setup();

// TODO: move these error logs to mongo
process.on('uncaughtException', (exp: any, origin: any) => {
  consoleLogger.info('uncaughtException');
  consoleLogger.error(exp);
  consoleLogger.info(origin);
});

process.on('unhandledRejection', (reason, promise) => {
  consoleLogger.info('unhandledRejection');
  consoleLogger.info(promise);
  consoleLogger.info(reason);
});
