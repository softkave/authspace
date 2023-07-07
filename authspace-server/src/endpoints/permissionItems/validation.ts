import Joi = require('joi');
import {validationSchemas} from '../../utils/validationUtils';
import {permissionItemConstants} from './constants';
import {PermissionItemInput} from './types';

const itemInput = Joi.object<PermissionItemInput>().keys({
  entity: validationSchemas.unknown.required(),
  target: validationSchemas.unknown.required(),
  action: validationSchemas.unknown.required(),
  grantAccess: Joi.boolean().required(),
});
const itemInputList = Joi.array()
  .items(itemInput)
  .max(permissionItemConstants.maxPermissionItemsPerRequest);

const permissionItemValidationSchemas = {
  itemInput,
  itemInputList,
};

export default permissionItemValidationSchemas;
