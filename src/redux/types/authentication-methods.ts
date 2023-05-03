import {ThunkDispatch} from "redux-thunk";
import { IAuthenticationMethod} from "@common/interfaces/authentication-method";

export const AUTHENTICATION_METHODS_CREATE_START = "AUTHENTICATION_METHODS_CREATE_START";
export const AUTHENTICATION_METHODS_UPDATE_START = "AUTHENTICATION_METHODS_UPDATE_START";
export const AUTHENTICATION_METHODS_START = "AUTHENTICATION_METHODS_START";
export const AUTHENTICATION_METHODS_CREATE_SUCCESS = "AUTHENTICATION_METHODS_CREATE_SUCCESS";
export const AUTHENTICATION_METHODS_UPDATE_SUCCESS = "AUTHENTICATION_METHODS_UPDATE_SUCCESS";
export const AUTHENTICATION_METHODS_SUCCESS = "AUTHENTICATION_METHODS_SUCCESS";
export const AUTHENTICATION_METHODS_CREATE_ERROR = "AUTHENTICATION_METHODS_CREATE_ERROR";
export const AUTHENTICATION_METHODS_UPDATE_ERROR = "AUTHENTICATION_METHODS_UPDATE_ERROR";
export const AUTHENTICATION_METHODS_ERROR = "AUTHENTICATION_METHODS_ERROR";

export interface IAuthenticationMethodsState {
  authenticationMethods: IAuthenticationMethod.AuthenticationMethodsModel;
  loading: boolean;
  error: boolean;
  created: number;
  errorCode: any;
  errorMessage: string;
}

interface AuthenticationMethodCreateStart {
  type: typeof AUTHENTICATION_METHODS_CREATE_START;
}

interface AuthenticationMethodUpdateStart {
  type: typeof AUTHENTICATION_METHODS_UPDATE_START;
}

interface AuthenticationMethodsStart {
  type: typeof AUTHENTICATION_METHODS_START;
}

interface AuthenticationMethodCreateSuccess {
  type: typeof AUTHENTICATION_METHODS_CREATE_SUCCESS;
  payload: IAuthenticationMethod.AuthenticationMethodsModel;
}

interface AuthenticationMethodUpdateSuccess {
  type: typeof AUTHENTICATION_METHODS_UPDATE_SUCCESS;
  payload: IAuthenticationMethod.AuthenticationMethodsModel;
}

interface AuthenticationMethodsSuccess {
  type: typeof AUTHENTICATION_METHODS_SUCCESS;
  payload: IAuthenticationMethod.AuthenticationMethodsModel;
}

interface AuthenticationMethodUpdateError {
  type: typeof AUTHENTICATION_METHODS_UPDATE_ERROR;
  errorCode: any;
  errorMessage: any;
}

interface AuthenticationMethodCreateError {
  type: typeof AUTHENTICATION_METHODS_CREATE_ERROR;
}

interface AuthenticationMethodsError {
  type: typeof AUTHENTICATION_METHODS_ERROR;
}

export type AuthenticationMethodAction = AuthenticationMethodCreateStart | AuthenticationMethodCreateSuccess | AuthenticationMethodCreateError
  | AuthenticationMethodsStart | AuthenticationMethodsSuccess | AuthenticationMethodsError | AuthenticationMethodUpdateStart
  | AuthenticationMethodUpdateSuccess | AuthenticationMethodUpdateError;
export type AuthenticationMethodDispatch = ThunkDispatch<IAuthenticationMethodsState, void, AuthenticationMethodAction>