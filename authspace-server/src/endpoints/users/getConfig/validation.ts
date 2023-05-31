import * as Joi from 'joi';
import {validationSchemas} from '../../../utils/validationUtils';
import {endpointValidationSchemas} from '../../validation';
import {GetUsersConfigEndpointParams} from './types';

export const getUsersConfigJoiSchema =
  Joi.object<GetUsersConfigEndpointParams>()
    .keys({
      ...endpointValidationSchemas.workspaceResourceParts,
      configId: validationSchemas.resourceId,
      onReferenced: Joi.boolean(),
    })
    .required();
