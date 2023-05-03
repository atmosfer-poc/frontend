import {ThunkDispatch} from "redux-thunk";
import {ISso} from "@common/interfaces/sso";

export const SSO_START = "SSO_START";
export const SSO_SUCCESS = "SSO_SUCCESS";
export const SSO_ERROR = "SSO_ERROR";
export const EULA_APPROVED = "EULA_APPROVED";

export interface ISsoState {
  data: ISso.TokenModel;
  loading: boolean;
  error: boolean;
}

interface SsoStart {
  type: typeof SSO_START;
}

interface SsoSuccess {
  type: typeof SSO_SUCCESS;
  payload: ISso.TokenModel;
}

interface SsoError {
  type: typeof SSO_ERROR;
}

interface EulaApproved {
  type: typeof EULA_APPROVED;
}

export type SsoAction = SsoStart | SsoSuccess | SsoError | EulaApproved ;
export type SsoDispatch = ThunkDispatch<ISsoState, void, SsoAction>

export const CURRENT_USER_START = "CURRENT_USER_START";
export const CURRENT_USER_SUCCESS = "CURRENT_USER_SUCCESS";
export const CURRENT_USER_ERROR = "CURRENT_USER_ERROR";
export const CLEAR_AUTH = "CLEAR_AUTH";

export interface ICurrentUserState {
  data: ISso.CurrentUserModel;
  loading: boolean;
  error: boolean;
}

interface CurrentUserStart {
  type: typeof CURRENT_USER_START;
}

interface CurrentUserSuccess {
  type: typeof CURRENT_USER_SUCCESS;
  payload: ISso.CurrentUserModel;
}

interface CurrentUserError {
  type: typeof CURRENT_USER_ERROR;
}

interface ClearAuth {
  type: typeof CLEAR_AUTH;
}

export type CurrentUserAction = CurrentUserStart | CurrentUserSuccess | CurrentUserError | ClearAuth;
export type CurrentUserDispatch = ThunkDispatch<ICurrentUserState, void, CurrentUserAction>

export const LOGOUT_START = "LOGOUT_START";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export interface ILogoutState {
  loading: boolean;
  completed: boolean;
}

interface LogoutStart {
  type: typeof LOGOUT_START
}

interface LogoutCompleted {
  type: typeof LOGOUT_SUCCESS
}

export type LogoutAction = LogoutStart | LogoutCompleted;
export type LogoutDispatch = ThunkDispatch<ILogoutState, void, LogoutAction>
