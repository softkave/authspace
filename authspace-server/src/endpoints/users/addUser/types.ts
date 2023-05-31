import {BaseContextType} from '../../contexts/types';
import {Endpoint} from '../../types';
import {LoginResult} from '../login/types';

export interface AddUserEndpointParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type AddUserEndpoint = Endpoint<
  BaseContextType,
  AddUserEndpointParams,
  LoginResult
>;
