import {
  ISubscriptionUserState,
  SUBSCRIPTION_USER_ERROR,
  SUBSCRIPTION_USER_START,
  SUBSCRIPTION_USER_SUCCESS,
  SubscriptionUserAction
} from "@redux/types/subscription-user-count";
import {ISubscription} from "@common/interfaces/subscription";

const initialState: ISubscriptionUserState = {
  data: {} as ISubscription.SubscriptionUserCountModel,
  error: false,
  loading: false,
};

const subscriptionUserReducer = (state: ISubscriptionUserState = initialState, action: SubscriptionUserAction) => {
  switch (action.type) {
    case SUBSCRIPTION_USER_START:
      return { ...state, loading: true, error: false };
    case SUBSCRIPTION_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: false };
    case SUBSCRIPTION_USER_ERROR:
      return { ...state, loading: false, error: true, data: {} };
    default:
      return state;
  }
};

export default subscriptionUserReducer;
