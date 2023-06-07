import * as Joi from 'joi';
import {validationSchemas} from '../../../utils/validationUtils';
import {endpointValidationSchemas} from '../../validation';
import {GetDataSchemaEndpointParams} from './types';

export const getDataSchemaJoiSchema = Joi.object<GetDataSchemaEndpointParams>()
  .keys({
    ...endpointValidationSchemas.workspaceResourceParts,
    schemaId: validationSchemas.resourceId,
    onReferenced: Joi.boolean(),
  })
  .required();
