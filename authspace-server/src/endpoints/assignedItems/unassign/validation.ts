import * as Joi from 'joi';
import {validationSchemas} from '../../../utils/validationUtils';
import permissionItemValidationSchemas from '../../permissionItems/validation';
import {endpointValidationSchemas} from '../../validation';
import {UnassignEndpointParams} from './types';

export const unassignJoiSchema = Joi.object<UnassignEndpointParams>()
  .keys({
    ...endpointValidationSchemas.optionalWorkspaceIdParts,
    entityId: permissionItemValidationSchemas.entityParts.entityId.required(),
    permissionGroups: validationSchemas.resourceIdOrResourceIdList.required(),
  })
  .required();
