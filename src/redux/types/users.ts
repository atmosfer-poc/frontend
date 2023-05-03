import {ThunkDispatch} from "redux-thunk";
import {IUser} from "@common/interfaces/user";

export const USER_CREATE_START = "USER_CREATE_START";
export const USER_UPDATE_START = "USER_UPDATE_START";
export const USERS_START = "USERS_START";
export const USERS_EXCEL_START = "USERS_EXCEL_START";
export const USERS_UPLOAD_PP_START = "USERS_UPLOAD_PP_START";

export const USER_CREATE_SUCCESS = "USER_CREATE_SUCCESS";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USERS_SUCCESS = "USERS_SUCCESS";
export const USERS_EXCEL_SUCCESS = "USERS_EXCEL_SUCCESS";
export const USERS_NAME_OPTIONS_SUCCESS = "USERS_NAME_OPTIONS_SUCCESS";
export const USERS_SURNAME_OPTIONS_SUCCESS = "USERS_SURNAME_OPTIONS_SUCCESS";
export const USERS_MOBILE_OPTIONS_SUCCESS = "USERS_MOBILE_OPTIONS_SUCCESS";
export const USERS_EMAIL_OPTIONS_SUCCESS = "USERS_EMAIL_OPTIONS_SUCCESS";
export const USERS_UPLOAD_PP_SUCCESS = "USERS_UPLOAD_PP_SUCCESS";
export const ASYNC_PROCESS_INFO_SUCCESS = "ASYNC_PROCESS_INFO_SUCCESS";
export const NEW_EXCEL_IMPORTED = "NEW_EXCEL_IMPORTED";
export const USER_ACTIVITIES_SUCCESS = "USER_ACTIVITIES_SUCCESS";

export const USER_CREATE_ERROR = "USER_CREATE_ERROR";
export const USER_UPDATE_ERROR = "USER_UPDATE_ERROR";
export const USERS_ERROR = "USERS_ERROR";
export const USERS_EXCEL_ERROR = "USERS_EXCEL_ERROR";
export const USERS_UPLOAD_PP_ERROR = "USERS_UPLOAD_PP_ERROR";

export interface IUsersState {
  data: IUser.UserResource;
  loading: boolean;
  error: boolean;
  errorCode: any;
  errorMessage: string;
  created: number;
  ppUpload: number;
  ppLoading: boolean;
  nameOptions: IUser.OptionResource[];
  surnameOptions: IUser.OptionResource[];
  mobileOptions: IUser.OptionResource[];
  emailOptions: IUser.OptionResource[];
  asyncProcesses: IUser.AsyncProcessInfo[];
  activities: any;
}

interface UserCreateStart {
  type: typeof USER_CREATE_START;
}

interface UserUpdateStart {
  type: typeof USER_UPDATE_START;
}

interface UsersStart {
  type: typeof USERS_START;
}

interface UserCreateSuccess {
  type: typeof USER_CREATE_SUCCESS;
}

interface UserUpdateSuccess {
  type: typeof USER_UPDATE_SUCCESS
}

interface UsersNameOptionsSuccess {
  type: typeof USERS_NAME_OPTIONS_SUCCESS,
  payload: IUser.OptionResource[];
}

interface UserActivitiesSuccess {
  type: typeof USER_ACTIVITIES_SUCCESS,
  payload: IUser.Activity[];
}

interface UsersSurnameOptionsSuccess {
  type: typeof USERS_SURNAME_OPTIONS_SUCCESS,
  payload: IUser.OptionResource[]
}

interface UsersMobileOptionsSuccess {
  type: typeof USERS_MOBILE_OPTIONS_SUCCESS,
  payload: IUser.OptionResource[]
}

interface UsersEmailOptionsSuccess {
  type: typeof USERS_EMAIL_OPTIONS_SUCCESS
  payload: IUser.OptionResource[]
}

interface UsersSuccess {
  type: typeof USERS_SUCCESS;
  payload: IUser.UserResource;
}

interface UserCreateError {
  type: typeof USER_CREATE_ERROR;
  errorCode: any;
  errorMessage: any;
}

interface UserUpdateError {
  type: typeof USER_UPDATE_ERROR;
  errorCode: any;
  errorMessage: any;
}

interface UsersError {
  type: typeof USERS_ERROR;
}

interface UserUploadPPStart {
  type: typeof USERS_UPLOAD_PP_START;
}

interface UserUploadPPSuccess {
  type: typeof USERS_UPLOAD_PP_SUCCESS;
}

interface UserUploadPPError {
  type: typeof USERS_UPLOAD_PP_ERROR;
}

interface AsyncProcessInfoSuccess {
  type: typeof ASYNC_PROCESS_INFO_SUCCESS;
  payload: IUser.AsyncProcessInfo[];
}

interface NewExcelImported {
  type: typeof NEW_EXCEL_IMPORTED;
}

export type UserAction = UserCreateStart | UsersStart | UserCreateSuccess
  | UsersSuccess | UserCreateError | UsersError | UserUpdateStart | UserUpdateSuccess
  | UserUpdateError | UsersNameOptionsSuccess | UsersSurnameOptionsSuccess
  | UsersEmailOptionsSuccess | UserUploadPPStart | UserUploadPPSuccess | UserUploadPPError
  | AsyncProcessInfoSuccess | NewExcelImported | UsersMobileOptionsSuccess | UserActivitiesSuccess;
export type UserDispatch = ThunkDispatch<IUsersState, void, UserAction>