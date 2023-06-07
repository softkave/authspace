import {SemanticDataAccessProviderRunOptions} from '@endpoints/contexts/semantic/types';
import {DataSchema, PublicDataSchema} from '../../definitions/dataSchema';
import {SessionAgent} from '../../definitions/system';
import {appAssert} from '../../utils/assertion';
import {getFields, makeExtract, makeListExtract} from '../../utils/extract';
import {reuseableErrors} from '../../utils/reusableErrors';
import {checkAuthorization} from '../contexts/authorizationChecks/checkAuthorizaton';
import {BaseContextType} from '../contexts/types';
import {workspaceResourceFields} from '../utils';

const dataSchemaFields = getFields<PublicDataSchema>({
  ...workspaceResourceFields,
  name: true,
  description: true,
  items: true,
});

export const dataSchemaExtractor = makeExtract(dataSchemaFields);
export const dataSchemaListExtractor = makeListExtract(dataSchemaFields);

export async function checkDataSchemaAuthorization(
  context: BaseContextType,
  agent: SessionAgent,
  schema: DataSchema
) {
  appAssert(schema.workspaceId);
  await checkAuthorization({
    context,
    agent,
    action,
    workspaceId: schema.workspaceId,
    targets: {targetId: schema.resourceId},
  });
  return {schema};
}

export async function checkDataSchemaAuthorization02(
  context: BaseContextType,
  agent: SessionAgent,
  schemaId: string
) {
  const schema = await context.semantic.dataSchema.getOneById(schemaId);
  assertDataSchema(schema);
  return await checkDataSchemaAuthorization(context, agent, schema);
}

export function throwDataSchemaNotFound() {
  throw reuseableErrors.dataSchema.notFound();
}

export function assertDataSchema(schema?: DataSchema | null): asserts schema {
  appAssert(schema, reuseableErrors.dataSchema.notFound());
}

export async function checkDataSchemaNameUniq(
  context: BaseContextType,
  workspaceId: string,
  name: string,
  opts?: SemanticDataAccessProviderRunOptions
) {
  const itemExists = await context.semantic.dataSchema.existsByName(
    workspaceId,
    name,
    opts
  );
  if (itemExists) {
    throw reuseableErrors.dataSchema.existsWithName(name);
  }
}
