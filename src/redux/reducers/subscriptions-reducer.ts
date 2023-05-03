import {ISubscription} from "@common/interfaces/subscription";
import {
  ISubscriptionsState,
  SUBSCRIPTIONS_ERROR,
  SUBSCRIPTIONS_START,
  SUBSCRIPTIONS_SUCCESS,
  SubscriptionsAction
} from "@redux/types/subscriptions";

const initialState: ISubscriptionsState = {
  data: {} as ISubscription.SubscriptionsModel,
  error: false,
  loading: false,
};

const subscriptionsReducer = (state: ISubscriptionsState = initialState, action: SubscriptionsAction) => {
  switch (action.type) {
    case SUBSCRIPTIONS_START:
      return { ...state, loading: true, error: false };
    case SUBSCRIPTIONS_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: false };
    case SUBSCRIPTIONS_ERROR:
      return { ...state, loading: false, error: true, data: {} };
    default:
      return state;
  }
};

export default subscriptionsReducer;
