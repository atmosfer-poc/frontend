import { IAccount } from "@common/interfaces/account";

export namespace ISso {
  export const ACCESS_TOKEN = "access_token";
  export const REFRESH_TOKEN = "refresh_token";
  export const TOKEN_TYPE = "token_type";

  export interface TokenModel {
    accessToken?: string;
    refreshToken?: string;
    scope?: string[];
    type?: string;
    mustEula?: boolean;
  }

  export interface CurrentUserModel {
    userId: number;
    userName: string;
    title: string;
    userSurname: string;
    shortName: string;
    userFullname: string;
    mail: string;
    msisdn: string;
    accountId: number;
    companyName: string;
    profilePhotoBase64: string;
    role: UserRole;
    mustEula?: boolean;
    accountChannels: IAccount.ChannelType[];
    userChannels: IAccount.ChannelType[];
    platformStates: PlatformState[];
  }

  export interface PlatformState {
    state: string;
    action: string;
    platform: string;
  }

  export enum UserRole {
    HR = "HR",
    ADMIN = "ADMIN",
    TECHNICAL = "TECHNICAL",
    FINANCE = "FINANCE",
    UNASSIGNED = "UNASSIGNED"
  }
}
