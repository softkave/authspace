import * as Joi from 'joi';
import {JoiSchemaParts} from '../../../utils/types';
import {endpointValidationSchemas} from '../../validation';
import {
  GetWorkspaceDataSchemasEndpointParams,
  GetWorkspaceDataSchemasEndpointParamsBase,
} from './types';

export const getWorkspaceDataSchemaBaseJoiSchemaParts: JoiSchemaParts<GetWorkspaceDataSchemasEndpointParamsBase> =
  endpointValidationSchemas.optionalWorkspaceIdParts;

export const getWorkspaceDataSchemaJoiSchema =
  Joi.object<GetWorkspaceDataSchemasEndpointParams>()
    .keys({
      ...getWorkspaceDataSchemaBaseJoiSchemaParts,
      ...endpointValidationSchemas.paginationParts,
    })
    .required();
