import {DataSchema} from '../../../../definitions/dataSchema';
import {SemanticDataAccessWorkspaceResourceProviderType} from '../types';

export interface SemanticDataAccessDataSchemaProvider
  extends SemanticDataAccessWorkspaceResourceProviderType<DataSchema> {}
