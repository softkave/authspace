import * as Joi from 'joi';
import userValidationSchemas from '../validation';

export const adduserJoiSchema = Joi.object()
  .keys({
    firstName: userValidationSchemas.name.required(),
    lastName: userValidationSchemas.name.required(),
    password: userValidationSchemas.password.required(),
    email: userValidationSchemas.email.required(),
  })
  .required();
