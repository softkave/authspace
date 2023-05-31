import * as Joi from 'joi';
import {getWorkspaceDataSchemaBaseJoiSchemaParts} from '../getWorkspaceSchemas/validation';
import {CountWorkspaceDataSchemasEndpointParams} from './types';

export const countWorkspaceDataSchemaJoiSchema =
  Joi.object<CountWorkspaceDataSchemasEndpointParams>()
    .keys(getWorkspaceDataSchemaBaseJoiSchemaParts)
    .required();
