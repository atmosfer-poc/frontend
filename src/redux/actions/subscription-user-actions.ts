import {SubscriptionUserDispatch} from "@redux/types/subscription-user-count";
import {SubscriptionClient} from "@api/subscription";
import {ISubscription} from "@common/interfaces/subscription";

export const getSubscriptionUserCount = (model: ISubscription.SubscriptionUserDto) => async (dispatch: SubscriptionUserDispatch) => {
  try {
    dispatch({ type: "SUBSCRIPTION_USER_START" });
    const data = await SubscriptionClient.calculateUser(model);
    dispatch({ type: "SUBSCRIPTION_USER_SUCCESS", payload: data });
  } catch {
    dispatch({ type: "SUBSCRIPTION_USER_ERROR" });
  }
};
