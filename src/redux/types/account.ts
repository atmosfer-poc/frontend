import {ThunkDispatch} from "redux-thunk";
import {IAccount} from "@common/interfaces/account";

export const ACCOUNT_SEARCH_START = "ACCOUNT_SEARCH_START";
export const UPDATE_PASSWORD_SECURITY_START = "UPDATE_PASSWORD_SECURITY_START";
export const ACCOUNT_SEARCH_SUCCESS = "ACCOUNT_SEARCH_SUCCESS";
export const UPDATE_PASSWORD_SECURITY_SUCCESS = "UPDATE_PASSWORD_SECURITY_SUCCESS";
export const ACCOUNT_SEARCH_ERROR = "ACCOUNT_SEARCH_ERROR";
export const UPDATE_PASSWORD_SECURITY_ERROR = "UPDATE_PASSWORD_SECURITY_ERROR";
export const UPDATE_AUTH_FACTOR_START = "UPDATE_AUTH_FACTOR_START";
export const UPDATE_AUTH_FACTOR_SUCCESS = "UPDATE_AUTH_FACTOR_SUCCESS";
export const UPDATE_AUTH_FACTOR_ERROR = "UPDATE_AUTH_FACTOR_ERROR";

export interface IAccountState {
  data: IAccount.AccountResource;
  loading: boolean;
  error: boolean;
  passwordSecurityUpdateError: boolean;
}

interface AccountSearchStart {
  type: typeof ACCOUNT_SEARCH_START;
}

interface UpdatePasswordSecurityStart {
  type: typeof UPDATE_PASSWORD_SECURITY_START;
}

interface UpdateAuthFactorStart {
  type: typeof UPDATE_AUTH_FACTOR_START;
}

interface AccountSearchSuccess {
  type: typeof ACCOUNT_SEARCH_SUCCESS;
  payload: IAccount.AccountResource;
}

interface UpdatePasswordSecuritySuccess {
  type: typeof UPDATE_PASSWORD_SECURITY_SUCCESS;
  payload: IAccount.AccountResource;
}

interface UpdateAuthFactorSuccess {
  type: typeof UPDATE_AUTH_FACTOR_SUCCESS;
  payload: IAccount.AccountResource;
}

interface AccountSearchError {
  type: typeof ACCOUNT_SEARCH_ERROR;
}

interface UpdatePasswordSecurityError {
  type: typeof UPDATE_PASSWORD_SECURITY_ERROR;
}

interface UpdateAuthFactorError {
  type: typeof UPDATE_AUTH_FACTOR_ERROR;
}

export type AccountAction = AccountSearchStart | AccountSearchSuccess | AccountSearchError
  | UpdatePasswordSecurityStart | UpdatePasswordSecurityError | UpdatePasswordSecuritySuccess
  | UpdateAuthFactorStart | UpdateAuthFactorSuccess | UpdateAuthFactorError;
export type AccountDispatch = ThunkDispatch<IAccountState, void, AccountAction>