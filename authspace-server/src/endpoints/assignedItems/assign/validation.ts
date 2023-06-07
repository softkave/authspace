import * as Joi from 'joi';
import permissionItemValidationSchemas from '../../permissionItems/validation';
import {endpointValidationSchemas} from '../../validation';
import permissionGroupsValidationSchemas from '../validation';
import {AssignEndpointParams} from './types';

export const assignJoiSchema = Joi.object<AssignEndpointParams>()
  .keys({
    ...endpointValidationSchemas.optionalWorkspaceIdParts,
    entityId: permissionItemValidationSchemas.entityParts.entityId.required(),
    permissionGroups:
      permissionGroupsValidationSchemas.assignedPermissionGroupsList.required(),
  })
  .required();
