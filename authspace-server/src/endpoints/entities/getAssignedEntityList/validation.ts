import * as Joi from 'joi';
import {validationSchemas} from '../../../utilities/validationUtils';
import {permissionValidationSchemas} from '../validation';
import {IGetAssignedPermissionGroupListEndpointParameters} from './types';

export const getAssignedPermissionGroupListJoiSchema =
  Joi.object<IGetAssignedPermissionGroupListEndpointParameters>()
    .keys({
      organizationId: validationSchemas.resourceId.required(),
      entity: permissionValidationSchemas.permissionItemEntity.required(),
      container: permissionValidationSchemas.permissionGroupContainer,
    })
    .required();
