import {WorkspaceResource} from './system';

export type DataSchemaItemType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'map'
  | 'list';

export type DataSchemaItemSupportedSemanticGroup =
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
  semanticGroup?: DataSchemaItemSupportedSemanticGroup;
  emailVerify?: boolean;
}

export interface DataSchemaViewItem {
  field: string;
  viewField?: string;
}

export interface DataSchema extends WorkspaceResource {
  name: string;
  description?: string;
  items: Array<DataSchemaItem>;
  multikeyUnique?: string[];
}

export interface DataSchemaView extends WorkspaceResource {
  name: string;
  description?: string;
  items: Array<DataSchemaViewItem>;
}

export type PublicDataSchema = DataSchema;
export type PublicDataSchemaView = DataSchemaView;
