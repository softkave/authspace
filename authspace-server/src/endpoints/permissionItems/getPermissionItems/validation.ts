import * as Joi from 'joi';
import {JoiSchemaParts} from '../../../utils/types';
import {validationSchemas} from '../../../utils/validationUtils';
import {endpointValidationSchemas} from '../../validation';
import {
  GetPermissionItemsEndpointParams,
  GetPermissionItemsEndpointParamsBase,
} from './types';

export const getPermissionItemsBaseJoiSchemaParts: JoiSchemaParts<GetPermissionItemsEndpointParamsBase> =
  {
    ...endpointValidationSchemas.optionalWorkspaceIdParts,
    entityId: validationSchemas.resourceId.required(),
  };

export const getPermissionItemsJoiSchema =
  Joi.object<GetPermissionItemsEndpointParams>()
    .keys({
      ...getPermissionItemsBaseJoiSchemaParts,
      ...endpointValidationSchemas.paginationParts,
    })
    .required();
