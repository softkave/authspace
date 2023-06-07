import * as Joi from 'joi';
import {JoiSchemaParts} from '../../../utils/types';
import {validationSchemas} from '../../../utils/validationUtils';
import {endpointValidationSchemas} from '../../validation';
import {
  GetAssigneeListEndpointParams,
  GetAssigneeListEndpointParamsBase,
} from './types';

export const getAssigneeListBaseJoiSchemaParts: JoiSchemaParts<GetAssigneeListEndpointParamsBase> =
  {
    ...endpointValidationSchemas.optionalWorkspaceIdParts,
    entityId: validationSchemas.resourceId.required(),
    includeInheritedPermissionGroups: Joi.boolean(),
  };

export const getAssigneeListJoiSchema =
  Joi.object<GetAssigneeListEndpointParams>()
    .keys({
      ...getAssigneeListBaseJoiSchemaParts,
    })
    .required();
