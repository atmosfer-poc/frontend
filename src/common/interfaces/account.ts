export namespace IAccount {
  export interface TenantInfo {
    crmCustomerId?: number;
    idValue?: string;
    idType?: IdType;
    ncst?: string;
    id?: number
  }

  export enum IdType {
    TCKN = "TCKN",
    VKN = "VKN"
  }

  export enum ChannelType {
    YAANIMAIL = "YAANIMAIL",
    BIPMEET = "BIPMEET",
    LIFEBOXBUSINESS = "LIFEBOXBUSINESS",
    SUITE = "SUITE"
  }

  export enum AccountType {
    INDIVIDUAL = "INDIVIDUAL",
    CORPORATE = "CORPORATE"
  }

  export enum AccountStatusType {
    ACTIVE = "ACTIVE",
    SUSPEND = "SUSPEND",
    DEACTIVE = "DEACTIVE",
    DELETED = "DELETED"
  }

  export interface AccountResource {
    tenantInfo?: IAccount.TenantInfo,
    userId?: number,
    authenticationMethodId?: number,
    authenticationFactor?: string,
    companyName?: string,
    dbsCustomerId?: number,
    platforms?: string[],
    name?: string,
    lastName?: string,
    mail?: string,
    msisdn?: string,
    freeTextAddress?: string,
    cityId?: string,
    districtId?: string,
    type?: IAccount.AccountType,
    hostName?: string,
    status?: AccountStatusType,
    passwordSecurity?: IAccount.PasswordSecurityResource
  }

  export interface PasswordSecurityResource {
    level?: number,
    period?: number,
    periodLength?: number,
    showChangePassword?: boolean,
    showResetPassword?: boolean,
    showAuthenticationFactor?: boolean
  }

  export interface AccountSearchModel {
    idType?: IAccount.IdType,
    idValue?: string,
    crmCustomerId?: number,
    ncst?: string,
    id?: number
  }

  export interface UpdateAccountModel {
    companyName?: string;
    name?: string;
    lastName?: string;
    mail?: string;
    msisdn?: string;
    authenticationFactor?: string;
    freeTextAddress?: string;
    hostName?: string;
    type?: IAccount.AccountType;
    status?: IAccount.AccountStatusType;
    ldapUserName?: string;
    tenantInfo?: IAccount.TenantInfo;
    passwordSecurity?: IAccount.PasswordSecurityResource;
  }
}