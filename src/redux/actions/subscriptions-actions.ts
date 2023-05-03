import {SubscriptionClient} from "@api/subscription";
import {ISubscription} from "@common/interfaces/subscription";
import {SubscriptionsDispatch} from "@redux/types/subscriptions";

export const getSubscriptions = (model: ISubscription.SubscriptionsDto) => async (dispatch: SubscriptionsDispatch) => {
  try {
    dispatch({ type: "SUBSCRIPTIONS_START" });
    const data = await SubscriptionClient.getAllSubscriptions(model);
    dispatch({ type: "SUBSCRIPTIONS_SUCCESS", payload: data });
  } catch {
    dispatch({ type: "SUBSCRIPTIONS_ERROR" });
  }
};
