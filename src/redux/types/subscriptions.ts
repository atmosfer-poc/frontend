import {ThunkDispatch} from "redux-thunk";
import {ISubscription} from "@common/interfaces/subscription";

export const SUBSCRIPTIONS_START = "SUBSCRIPTIONS_START";
export const SUBSCRIPTIONS_SUCCESS = "SUBSCRIPTIONS_SUCCESS";
export const SUBSCRIPTIONS_ERROR = "SUBSCRIPTIONS_ERROR";

export interface ISubscriptionsState {
  data: ISubscription.SubscriptionsModel;
  loading: boolean;
  error: boolean;
}

interface SubscriptionsStart {
  type: typeof SUBSCRIPTIONS_START;
}

interface SubscriptionsSuccess {
  type: typeof SUBSCRIPTIONS_SUCCESS;
  payload: ISubscription.SubscriptionsModel;
}

interface SubscriptionsError {
  type: typeof SUBSCRIPTIONS_ERROR;
}

export type SubscriptionsAction = SubscriptionsStart | SubscriptionsSuccess | SubscriptionsError;
export type SubscriptionsDispatch = ThunkDispatch<ISubscriptionsState, void, SubscriptionsAction>