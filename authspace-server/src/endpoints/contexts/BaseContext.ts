import {forEach} from 'lodash';
import {Logger} from 'winston';
import {AppVariables} from '../../resources/types';
import {
  FimidaraLoggerServiceNames,
  loggerFactory,
} from '../../utils/logger/loggerUtils';
import {logRejectedPromisesAndThrow} from '../../utils/waitOnPromises';
import SessionContext, {SessionContextType} from './SessionContext';
import {SESEmailProviderContext} from './email/SESEmailProviderContext';
import {IEmailProviderContext} from './email/types';
import {MemStoreType} from './mem/types';
import {
  BaseContextDataProviders,
  BaseContextLogicProviders,
  BaseContextMemStoreProviders,
  BaseContextSemanticDataProviders,
  BaseContextType,
} from './types';

export default class BaseContext<
  Data extends BaseContextDataProviders = BaseContextDataProviders,
  Email extends IEmailProviderContext = IEmailProviderContext,
  AppVars extends AppVariables = AppVariables,
  MemStore extends BaseContextMemStoreProviders = BaseContextMemStoreProviders,
  Logic extends BaseContextLogicProviders = BaseContextLogicProviders,
  SemanticData extends BaseContextSemanticDataProviders = BaseContextSemanticDataProviders
> implements
    BaseContextType<Data, Email, AppVars, MemStore, Logic, SemanticData>
{
  data: Data;
  email: Email;
  appVariables: AppVars;
  memstore: MemStore;
  logic: Logic;
  semantic: SemanticData;
  session: SessionContextType = new SessionContext();
  clientLogger: Logger = loggerFactory({
    transports: ['mongodb'],
    meta: {service: FimidaraLoggerServiceNames.WebClient},
  });
  disposeFn?: () => Promise<void>;

  constructor(
    data: Data,
    emailProvider: Email,
    appVariables: AppVars,
    memory: MemStore,
    logic: Logic,
    semantic: SemanticData,
    disposeFn?: () => Promise<void>
  ) {
    this.data = data;
    this.email = emailProvider;
    this.appVariables = appVariables;
    this.memstore = memory;
    this.logic = logic;
    this.semantic = semantic;
    this.disposeFn = disposeFn;
  }

  init = async () => {};

  dispose = async () => {
    forEach(this.memstore, store => {
      (store as MemStoreType<any>).dispose();
    });

    const promises = [this.email.close()];
    logRejectedPromisesAndThrow(await Promise.allSettled(promises));
    this.clientLogger.close();

    if (this.disposeFn) await this.disposeFn();
  };
}

export function getEmailProvider(appVariables: AppVariables) {
  return new SESEmailProviderContext(appVariables.awsRegion);
}
