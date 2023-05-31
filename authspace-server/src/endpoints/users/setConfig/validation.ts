import * as Joi from 'joi';
import configValidationSchemas from '../validation';
import {SetConfigEndpointParams} from './types';

export const setUsersConfigJoiSchema = Joi.object<
  Pick<SetConfigEndpointParams, 'workspaceId'>
>()
  .keys({
    firstName: configValidationSchemas.name.allow(null),
    lastName: configValidationSchemas.name.allow(null),
    email: configValidationSchemas.email.allow(null),
  })
  .required();
export const setupUsersConfigJoiSchema = Joi.object<SetConfigEndpointParams>()
  .keys({
    firstName: configValidationSchemas.name.allow(null),
    lastName: configValidationSchemas.name.allow(null),
    email: configValidationSchemas.email.allow(null),
  })
  .required();
export const updateUsersConfigJoiSchema = Joi.object<SetConfigEndpointParams>()
  .keys({
    firstName: configValidationSchemas.name.allow(null),
    lastName: configValidationSchemas.name.allow(null),
    email: configValidationSchemas.email.allow(null),
  })
  .required();
