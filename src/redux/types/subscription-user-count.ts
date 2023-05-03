import {ThunkDispatch} from "redux-thunk";
import {ISubscription} from "@common/interfaces/subscription";

export const SUBSCRIPTION_USER_START = "SUBSCRIPTION_USER_START";
export const SUBSCRIPTION_USER_SUCCESS = "SUBSCRIPTION_USER_SUCCESS";
export const SUBSCRIPTION_USER_ERROR = "SUBSCRIPTION_USER_ERROR";

export interface ISubscriptionUserState {
  data: ISubscription.SubscriptionUserCountModel;
  loading: boolean;
  error: boolean;
}

interface SubscriptionUserStart {
  type: typeof SUBSCRIPTION_USER_START;
}

interface SubscriptionUserSuccess {
  type: typeof SUBSCRIPTION_USER_SUCCESS;
  payload: ISubscription.SubscriptionUserCountModel;
}

interface SubscriptionUserError {
  type: typeof SUBSCRIPTION_USER_ERROR;
}

export type SubscriptionUserAction = SubscriptionUserStart | SubscriptionUserSuccess | SubscriptionUserError;
export type SubscriptionUserDispatch = ThunkDispatch<ISubscriptionUserState, void, SubscriptionUserAction>