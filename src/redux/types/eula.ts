import {ThunkDispatch} from "redux-thunk";
import {IEula} from "@common/interfaces/eula";

export const GET_ACTIVE_EULA_START = "GET_ACTIVE_EULA_START";
export const APPROVE_EULA_START = "APPROVE_EULA_START";
export const GET_ACTIVE_EULA_SUCCESS = "GET_ACTIVE_EULA_SUCCESS";
export const APPROVE_EULA_SUCCESS = "APPROVE_EULA_SUCCESS";
export const GET_ACTIVE_EULA_ERROR = "GET_ACTIVE_EULA_ERROR";
export const APPROVE_EULA_ERROR = "APPROVE_EULA_ERROR";

export interface IEulaState {
  data: IEula.ActiveEula;
  approved: number;
  loading: boolean;
  error: boolean;
}

interface GetActiveEulaStart {
  type: typeof GET_ACTIVE_EULA_START;
}

interface ApproveActiveEulaStart {
  type: typeof APPROVE_EULA_START;
}

interface GetActiveEulaSuccess {
  type: typeof GET_ACTIVE_EULA_SUCCESS;
  payload: IEula.ActiveEula;
}

interface ApproveActiveEulaSuccess {
  type: typeof APPROVE_EULA_SUCCESS;
}

interface GetActiveEulaError {
  type: typeof GET_ACTIVE_EULA_ERROR;
}

interface ApproveActiveEulaError {
  type: typeof APPROVE_EULA_ERROR;
}

export type EulaAction = GetActiveEulaStart | GetActiveEulaSuccess | GetActiveEulaError | ApproveActiveEulaSuccess | ApproveActiveEulaStart | ApproveActiveEulaError;
export type EulaDispatch = ThunkDispatch<IEulaState, void, EulaAction>