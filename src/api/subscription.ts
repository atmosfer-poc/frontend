import {Endpoints} from "@api/endpoints";
import {ISubscription} from "@common/interfaces/subscription";

export namespace SubscriptionClient {
  export const calculateUser = async (data: ISubscription.SubscriptionUserDto) => {
    const response = await fetch(Endpoints.SUBSCRIPTION_USER_CALCULATE, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
    return await response.json();
  };

  export const getAllSubscriptions = async (data: ISubscription.SubscriptionsDto) => {
    let url = Endpoints.SUBSCRIPTIONS;

    if (data.accountId) {
      url += "accountId=" + data.accountId + "&"
    }

    if (data.onlyActive) {
      url += "statusList=1,2&"
    }
    const response = await fetch(url);
    return await response.json();
  };
}

