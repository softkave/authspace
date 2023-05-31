import {AppResourceType} from '../../../definitions/system';
import {noopAsync} from '../../../utils/fns';
import {validate} from '../../../utils/validate';
import {enqueueDeleteResourceJob} from '../../jobs/runner';
import {DeleteResourceCascadeFnsMap} from '../../types';
import {checkDataSchemaAuthorization02} from '../utils';
import {DeleteDataSchemaEndpoint} from './types';
import {deleteDataSchemaJoiSchema} from './validation';

export const DELETE_AGENT_SCHEMA_CASCADE_FNS: DeleteResourceCascadeFnsMap = {
  [AppResourceType.All]: noopAsync,
  [AppResourceType.System]: noopAsync,
  [AppResourceType.Public]: noopAsync,
  [AppResourceType.Workspace]: noopAsync,
  [AppResourceType.CollaborationRequest]: noopAsync,
  [AppResourceType.PermissionGroup]: noopAsync,
  [AppResourceType.User]: noopAsync,
  [AppResourceType.EndpointRequest]: noopAsync,
  [AppResourceType.Job]: noopAsync,
  [AppResourceType.AgentToken]: noopAsync,
  [AppResourceType.DataSchema]: (context, args, helpers) =>
    helpers.withTxn(opts =>
      context.semantic.dataSchema.deleteOneById(args.resourceId, opts)
    ),
  [AppResourceType.PermissionItem]: async (context, args, helpers) => {
    helpers.withTxn(opts =>
      Promise.all([
        context.semantic.permissionItem.deleteManyByTargetId(
          args.resourceId,
          opts
        ),
        context.semantic.permissionItem.deleteManyByEntityId(
          args.resourceId,
          opts
        ),
      ])
    );
  },
  [AppResourceType.AssignedItem]: async (context, args, helpers) =>
    helpers.withTxn(opts =>
      context.semantic.assignedItem.deleteWorkspaceResourceAssignedItems(
        args.workspaceId,
        args.resourceId,
        undefined,
        opts
      )
    ),
};

const deleteDataSchema: DeleteDataSchemaEndpoint = async (
  context,
  instData
) => {
  const data = validate(instData.data, deleteDataSchemaJoiSchema);
  const agent = await context.session.getAgent(context, instData);
  const {schema} = await checkDataSchemaAuthorization02(
    context,
    agent,
    data.schemaId
  );
  const job = await enqueueDeleteResourceJob(context, {
    type: AppResourceType.DataSchema,
    args: {workspaceId: schema.workspaceId, resourceId: schema.resourceId},
  });
  return {jobId: job.resourceId};
};

export default deleteDataSchema;
