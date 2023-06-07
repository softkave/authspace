import * as Joi from 'joi';
import {JoiSchemaParts} from '../../../utils/types';
import {validationSchemas} from '../../../utils/validationUtils';
import {endpointValidationSchemas} from '../../validation';
import {
  GetAssignedListEndpointParams,
  GetAssignedListEndpointParamsBase,
} from './types';

export const getAssignedListBaseJoiSchemaParts: JoiSchemaParts<GetAssignedListEndpointParamsBase> =
  {
    ...endpointValidationSchemas.optionalWorkspaceIdParts,
    entityId: validationSchemas.resourceId.required(),
    includeInheritedPermissionGroups: Joi.boolean(),
  };

export const getAssignedListJoiSchema =
  Joi.object<GetAssignedListEndpointParams>()
    .keys({
      ...getAssignedListBaseJoiSchemaParts,
    })
    .required();
