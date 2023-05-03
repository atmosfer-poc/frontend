import {Type} from "@common/interfaces/type";
import {IAccount} from "@common/interfaces/account";

export namespace ISubscription {
  export interface SubscriptionUserCountModel {
    activeUserCount?: number;
    basicLicenceCount?: number;
    premiumLicenceCount?: number;
  }

  export interface SubscriptionUserDto {
    period: Type.PeriodType;
  }

  export interface SubscriptionsModel {
    tenantInfo?: IAccount.TenantInfo;
    subscriptionList?: SubscriptionItem[];
  }

  export interface SubscriptionItem {
    subscriptionId: number;
    sardisSubscriptionId: number;
    licenceCount: number;
    price: number;
    status: number;
    paymentMethodId: number;
    transactionId: string;
    withdrawalFee: number;
    packageId: number;
    packageName: string;
    isReseller: boolean;
    resellerName: string;
    accountName: string;
    createdDate: string;
    endDate: string;
    usedLicenceCount: number;
    suspendDate: string;
    isCommitment: boolean
  }

  export interface SubscriptionsDto {
    accountId: number;
    onlyActive: boolean;
  }
}