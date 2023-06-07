import {PublicDataSchema} from '../../definitions/dataSchema';
import {
  FieldArray,
  FieldObject,
  HttpEndpointDefinition,
  HttpEndpointMethod,
} from '../../mddoc/mddoc';
import {
  fReusables,
  mddocEndpointHttpHeaderItems,
  mddocEndpointHttpResponseItems,
} from '../endpoints.mddoc';
import {LongRunningJobResult} from '../jobs/types';
import {
  CountItemsEndpointResult,
  HttpEndpointRequestHeaders_AuthRequired_ContentType,
  HttpEndpointResponseHeaders_ContentType_ContentLength,
} from '../types';
import {
  AddDataSchemaEndpointParams,
  AddDataSchemaEndpointResult,
  NewDataSchemaInput,
} from './addEntity/types';
import {dataSchemaConstants} from './constants';
import {CountWorkspaceDataSchemasEndpointParams} from './countEntities/types';
import {DeleteDataSchemaEndpointParams} from './deleteEntity/types';
import {
  GetDataSchemaEndpointParams,
  GetDataSchemaEndpointResult,
} from './getEntity/types';
import {
  GetWorkspaceDataSchemasEndpointParams,
  GetWorkspaceDataSchemasEndpointResult,
} from './getEntityList/types';
import {
  UpdateDataSchemaEndpointParams,
  UpdateDataSchemaEndpointResult,
} from './updateEntity/types';

const newDataSchemaInput = FieldObject.construct<NewDataSchemaInput>()
  .setName('NewDataSchemaInput')
  .setFields({
    name: FieldObject.optionalField(fReusables.name),
    description: FieldObject.optionalField(fReusables.description),
    expires: FieldObject.optionalField(fReusables.expires),
    providedResourceId: FieldObject.optionalField(
      fReusables.providedResourceId
    ),
  });

const dataSchema = FieldObject.construct<PublicDataSchema>()
  .setName('DataSchema')
  .setFields({
    resourceId: FieldObject.requiredField(fReusables.id),
    createdBy: FieldObject.requiredField(fReusables.agent),
    createdAt: FieldObject.requiredField(fReusables.date),
    lastUpdatedBy: FieldObject.requiredField(fReusables.agent),
    lastUpdatedAt: FieldObject.requiredField(fReusables.date),
    name: FieldObject.optionalField(fReusables.name),
    description: FieldObject.optionalField(fReusables.description),
    workspaceId: FieldObject.requiredField(fReusables.workspaceId),
    schemaStr: FieldObject.requiredField(fReusables.schemaString),
    expires: FieldObject.optionalField(fReusables.expires),
    providedResourceId: FieldObject.optionalField(
      fReusables.providedResourceId
    ),
  });

const addDataSchemaParams = FieldObject.construct<AddDataSchemaEndpointParams>()
  .setName('AddDataSchemaEndpointParams')
  .setFields({
    workspaceId: FieldObject.optionalField(fReusables.workspaceId),
    schema: FieldObject.requiredField(newDataSchemaInput),
  })
  .setRequired(true)
  .setDescription('Add agent schema endpoint params.');
const addDataSchemaSuccessResponseBody =
  FieldObject.construct<AddDataSchemaEndpointResult>()
    .setName('AddDataSchemaEndpointResult')
    .setFields({schema: FieldObject.requiredField(dataSchema)})
    .setRequired(true)
    .setDescription('Add agent schema endpoint success result.');

const getWorkspaceDataSchemasParams =
  FieldObject.construct<GetWorkspaceDataSchemasEndpointParams>()
    .setName('GetWorkspaceDataSchemasEndpointParams')
    .setFields({
      workspaceId: FieldObject.optionalField(fReusables.workspaceIdInput),
      page: FieldObject.optionalField(fReusables.page),
      pageSize: FieldObject.optionalField(fReusables.pageSize),
    })
    .setRequired(true)
    .setDescription('Get workspace agent schemas endpoint params.');
const getWorkspaceDataSchemasSuccessResponseBody =
  FieldObject.construct<GetWorkspaceDataSchemasEndpointResult>()
    .setName('GetWorkspaceDataSchemasEndpointResult')
    .setFields({
      schemas: FieldObject.requiredField(
        FieldArray.construct<PublicDataSchema>().setType(dataSchema)
      ),
      page: FieldObject.requiredField(fReusables.page),
    })
    .setRequired(true)
    .setDescription('Add agent schema endpoint success result.');

const countWorkspaceDataSchemasParams =
  FieldObject.construct<CountWorkspaceDataSchemasEndpointParams>()
    .setName('CountWorkspaceDataSchemasEndpointParams')
    .setFields({
      workspaceId: FieldObject.optionalField(fReusables.workspaceIdInput),
    })
    .setRequired(true)
    .setDescription('Count workspace agent schemas endpoint params.');

const updateDataSchemaParams =
  FieldObject.construct<UpdateDataSchemaEndpointParams>()
    .setName('UpdateDataSchemaEndpointParams')
    .setFields({
      workspaceId: FieldObject.optionalField(fReusables.workspaceIdInput),
      schemaId: FieldObject.optionalField(fReusables.id),
      onReferenced: FieldObject.optionalField(fReusables.effectOnReferenced),
      schema: FieldObject.requiredField(newDataSchemaInput),
      providedResourceId: FieldObject.optionalField(
        fReusables.providedResourceId
      ),
    })
    .setRequired(true)
    .setDescription('Update agent schema endpoint params.');
const updateDataSchemaSuccessResponseBody =
  FieldObject.construct<UpdateDataSchemaEndpointResult>()
    .setName('UpdateDataSchemaEndpointResult')
    .setFields({schema: FieldObject.requiredField(dataSchema)})
    .setRequired(true)
    .setDescription('Update agent schema endpoint success result.');

const getDataSchemaParams = FieldObject.construct<GetDataSchemaEndpointParams>()
  .setName('GetDataSchemaEndpointParams')
  .setFields({
    workspaceId: FieldObject.optionalField(fReusables.workspaceIdInput),
    providedResourceId: FieldObject.optionalField(
      fReusables.providedResourceId
    ),
    schemaId: FieldObject.optionalField(fReusables.id),
    onReferenced: FieldObject.optionalField(fReusables.effectOnReferenced),
  })
  .setRequired(true)
  .setDescription('Get agent schema endpoint params.');
const getDataSchemaSuccessBody =
  FieldObject.construct<GetDataSchemaEndpointResult>()
    .setName('GetDataSchemaEndpointResult')
    .setFields({schema: FieldObject.requiredField(dataSchema)})
    .setRequired(true)
    .setDescription('Get agent schema endpoint success result.');

const deleteDataSchemaParams =
  FieldObject.construct<DeleteDataSchemaEndpointParams>()
    .setName('DeleteDataSchemaEndpointParams')
    .setFields({
      schemaId: FieldObject.optionalField(fReusables.id),
      onReferenced: FieldObject.optionalField(fReusables.effectOnReferenced),
      providedResourceId: FieldObject.optionalField(
        fReusables.providedResourceId
      ),
      workspaceId: FieldObject.optionalField(fReusables.workspaceIdInput),
    })
    .setRequired(true)
    .setDescription('Delete agent schema endpoint params.');

export const addDataSchemaEndpointDefinition =
  HttpEndpointDefinition.construct<{
    requestBody: AddDataSchemaEndpointParams;
    requestHeaders: HttpEndpointRequestHeaders_AuthRequired_ContentType;
    responseBody: AddDataSchemaEndpointResult;
    responseHeaders: HttpEndpointResponseHeaders_ContentType_ContentLength;
  }>()
    .setBasePathname(dataSchemaConstants.routes.addSchema)
    .setMethod(HttpEndpointMethod.Post)
    .setRequestBody(addDataSchemaParams)
    .setRequestHeaders(
      mddocEndpointHttpHeaderItems.requestHeaders_AuthRequired_JsonContentType
    )
    .setResponseBody(addDataSchemaSuccessResponseBody)
    .setName('AddDataSchemaEndpoint')
    .setDescription('Add agent schema endpoint.');

export const getDataSchemaEndpointDefinition =
  HttpEndpointDefinition.construct<{
    requestBody: GetDataSchemaEndpointParams;
    requestHeaders: HttpEndpointRequestHeaders_AuthRequired_ContentType;
    responseBody: GetDataSchemaEndpointResult;
    responseHeaders: HttpEndpointResponseHeaders_ContentType_ContentLength;
  }>()
    .setBasePathname(dataSchemaConstants.routes.getSchema)
    .setMethod(HttpEndpointMethod.Post)
    .setRequestBody(getDataSchemaParams)
    .setRequestHeaders(
      mddocEndpointHttpHeaderItems.requestHeaders_AuthRequired_JsonContentType
    )
    .setResponseHeaders(
      mddocEndpointHttpHeaderItems.responseHeaders_JsonContentType
    )
    .setResponseBody(getDataSchemaSuccessBody)
    .setName('GetDataSchemaEndpoint')
    .setDescription('Get agent schema endpoint.');

export const updateDataSchemaEndpointDefinition =
  HttpEndpointDefinition.construct<{
    requestBody: UpdateDataSchemaEndpointParams;
    requestHeaders: HttpEndpointRequestHeaders_AuthRequired_ContentType;
    responseBody: UpdateDataSchemaEndpointResult;
    responseHeaders: HttpEndpointResponseHeaders_ContentType_ContentLength;
  }>()
    .setBasePathname(dataSchemaConstants.routes.updateSchema)
    .setMethod(HttpEndpointMethod.Post)
    .setRequestBody(updateDataSchemaParams)
    .setRequestHeaders(
      mddocEndpointHttpHeaderItems.requestHeaders_AuthRequired_JsonContentType
    )
    .setResponseHeaders(
      mddocEndpointHttpHeaderItems.responseHeaders_JsonContentType
    )
    .setResponseBody(updateDataSchemaSuccessResponseBody)
    .setName('UpdateDataSchemaEndpoint')
    .setDescription('Update agent schema endpoint.');

export const deleteDataSchemaEndpointDefinition =
  HttpEndpointDefinition.construct<{
    requestBody: DeleteDataSchemaEndpointParams;
    requestHeaders: HttpEndpointRequestHeaders_AuthRequired_ContentType;
    responseBody: LongRunningJobResult;
    responseHeaders: HttpEndpointResponseHeaders_ContentType_ContentLength;
  }>()
    .setBasePathname(dataSchemaConstants.routes.deleteSchema)
    .setMethod(HttpEndpointMethod.Delete)
    .setRequestBody(deleteDataSchemaParams)
    .setRequestHeaders(
      mddocEndpointHttpHeaderItems.requestHeaders_AuthRequired_JsonContentType
    )
    .setResponseHeaders(
      mddocEndpointHttpHeaderItems.responseHeaders_JsonContentType
    )
    .setResponseBody(mddocEndpointHttpResponseItems.longRunningJobResponseBody)
    .setName('DeleteDataSchemaEndpoint')
    .setDescription('Delete agent schema endpoint.');

export const getWorkspaceDataSchemasEndpointDefinition =
  HttpEndpointDefinition.construct<{
    requestBody: GetWorkspaceDataSchemasEndpointParams;
    requestHeaders: HttpEndpointRequestHeaders_AuthRequired_ContentType;
    responseBody: GetWorkspaceDataSchemasEndpointResult;
    responseHeaders: HttpEndpointResponseHeaders_ContentType_ContentLength;
  }>()
    .setBasePathname(dataSchemaConstants.routes.getWorkspaceSchemas)
    .setMethod(HttpEndpointMethod.Post)
    .setRequestBody(getWorkspaceDataSchemasParams)
    .setRequestHeaders(
      mddocEndpointHttpHeaderItems.requestHeaders_AuthRequired_JsonContentType
    )
    .setResponseHeaders(
      mddocEndpointHttpHeaderItems.responseHeaders_JsonContentType
    )
    .setResponseBody(getWorkspaceDataSchemasSuccessResponseBody)
    .setName('GetWorkspaceDataSchemasEndpoint')
    .setDescription('Get workspace agent schemas endpoint.');

export const countWorkspaceDataSchemasEndpointDefinition =
  HttpEndpointDefinition.construct<{
    requestBody: CountWorkspaceDataSchemasEndpointParams;
    requestHeaders: HttpEndpointRequestHeaders_AuthRequired_ContentType;
    responseBody: CountItemsEndpointResult;
    responseHeaders: HttpEndpointResponseHeaders_ContentType_ContentLength;
  }>()
    .setBasePathname(dataSchemaConstants.routes.countWorkspaceSchemas)
    .setMethod(HttpEndpointMethod.Post)
    .setRequestBody(countWorkspaceDataSchemasParams)
    .setRequestHeaders(
      mddocEndpointHttpHeaderItems.requestHeaders_AuthRequired_JsonContentType
    )
    .setResponseHeaders(
      mddocEndpointHttpHeaderItems.responseHeaders_JsonContentType
    )
    .setResponseBody(mddocEndpointHttpResponseItems.countResponseBody)
    .setName('CountWorkspaceDataSchemasEndpoint')
    .setDescription('Count workspace agent schemas endpoint.');
