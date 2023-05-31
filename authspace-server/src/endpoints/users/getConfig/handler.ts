import {validate} from '../../../utils/validate';
import {usersConfigExtractor} from '../utils';
import {GetUsersConfigEndpoint} from './types';
import {getUsersConfigJoiSchema} from './validation';

const getUsersConfig: GetUsersConfigEndpoint = async (context, instData) => {
  const data = validate(instData.data, getUsersConfigJoiSchema);
  const agent = await context.session.getAgent(context, instData);
  const config = await context.semantic.usersConfig.getOneByQuery({
    resourceId: data.configId,
  });
  return {config: config ? usersConfigExtractor(config) : null};
};

export default getUsersConfig;
