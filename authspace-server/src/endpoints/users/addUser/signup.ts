import {makeUserSessionAgent} from '../../../utils/sessionUtils';
import {validate} from '../../../utils/validate';
import {executeWithTxn} from '../../contexts/semantic/utils';
import {
  getUserClientAssignedToken,
  getUserToken,
  toLoginResult,
} from '../login/utils';
import {INTERNAL_sendEmailVerificationCode} from '../sendEmailVerificationCode/handler';
import {AddUserEndpoint} from './types';
import {INTERNAL_adduserUser} from './utils';
import {adduserJoiSchema} from './validation';

const adduser: AddUserEndpoint = async (context, instData) => {
  const data = validate(instData.data, adduserJoiSchema);
  const user = await INTERNAL_adduserUser(context, data);
  const [userToken, clientAssignedToken] = await executeWithTxn(context, opts =>
    Promise.all([
      getUserToken(context, user.resourceId, opts),
      getUserClientAssignedToken(context, user.resourceId, opts),
    ])
  );
  instData.agent = makeUserSessionAgent(user, userToken);
  await INTERNAL_sendEmailVerificationCode(context, user);
  return toLoginResult(context, user, userToken, clientAssignedToken);
};

export default adduser;
