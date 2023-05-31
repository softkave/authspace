import * as Joi from 'joi';
import {validationSchemas} from '../../../utils/validationUtils';
import {endpointValidationSchemas} from '../../validation';
import {DeleteDataSchemaEndpointParams} from './types';

export const deleteDataSchemaJoiSchema =
  Joi.object<DeleteDataSchemaEndpointParams>()
    .keys({
      ...endpointValidationSchemas.workspaceResourceParts,
      schemaId: validationSchemas.resourceId,
    })
    .required();
