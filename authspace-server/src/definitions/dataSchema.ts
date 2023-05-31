import {WorkspaceResource} from './system';

export type DataSchemaItemType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'map'
  | 'list';

export type DataSchemaItemSemanticGroup =
  | 'email'
  | 'password'
  | 'firstName'
  | 'lastName'
  | 'phone';

export interface DataSchemaItem {
  field: string;
  type: DataSchemaItemType;
  required?: boolean;
  unique?: boolean;
  defaultValue?: unknown;
  min?: number;
  max?: number;
  uppercase?: boolean;
  lowercase?: boolean;
  trim?: boolean;
  enum?: Array<string | number>;
  immutable?: boolean;
  regexp?: {
    match: string;
    flags?: string;
  };
  public?: boolean;
  semanticGroup: DataSchemaItemSemanticGroup;
}

export interface DataSchema extends WorkspaceResource {
  name: string;
  description?: string;
  items: Array<DataSchemaItem>;
  multikeyUnique?: string[];
}

export type PublicDataSchema = DataSchema;
