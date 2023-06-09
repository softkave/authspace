import * as Joi from 'joi';
import {validationSchemas} from '../../../utils/validationUtils';
import permissionItemValidationSchemas from '../validation';
import {AddPermissionItemsEndpointParams} from './types';

export const addPermissionItemsJoiSchema =
  Joi.object<AddPermissionItemsEndpointParams>()
    .keys({
      workspaceId: validationSchemas.resourceId,
      items: permissionItemValidationSchemas.itemInputList.required(),
    })
    .required();
