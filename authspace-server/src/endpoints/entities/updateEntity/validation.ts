import * as Joi from 'joi';
import {validationSchemas} from '../../../utils/validationUtils';
import {endpointValidationSchemas} from '../../validation';
import {UpdateDataSchemaEndpointParams} from './types';

export const updateDataSchemaJoiSchema =
  Joi.object<UpdateDataSchemaEndpointParams>()
    .keys({
      ...endpointValidationSchemas.workspaceResourceParts,
      schemaId: validationSchemas.resourceId,
      onReferenced: Joi.boolean(),
      schema: Joi.object<UpdateDataSchemaEndpointParams['schema']>()
        .keys({
          expires: validationSchemas.time.allow(null),
          providedResourceId: validationSchemas.providedResourceId.allow(null),
          name: validationSchemas.name.allow(null),
          description: validationSchemas.description.allow(null),
        })
        .required(),
    })
    .required();
