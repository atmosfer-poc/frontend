import { IAccount } from "@common/interfaces/account";

export namespace IAuthenticationMethod {
  export interface AuthenticationMethodsModel {
    tenantInfo?: IAccount.TenantInfo;
    authenticationMethodList?: AuthenticationMethodItem[];
  }

  export interface AuthenticationMethodItem {
    id: number;
    url: string;
    type: string;
    userName: string;
    password: string;
    ldapSearchBase: string;
    ldapSearchQuery: string;
    ldapPasswordAttribute: string;
    ssoSearchQuery: string;
  }

  export interface AuthenticationMethodsDto {
    accountId: number;
  }

  export interface AuthenticationMethodCreateModel {
    tenantInfo: IAccount.TenantInfo;
    url: string;
    type: AuthenticationMethodType;
    userName: string;
    password?: string;
    status?: string;
    ldapSearchBase: string;
    ldapSearchQuery: string;
    ldapPasswordAttribute: string;
    ssoSearchQuery?: string;
  }

  export enum AuthenticationMethodType {
    SSO = "SSO",
    YaaniLDAP = "YaaniLDAP",
    LDAP = "LDAP",
    AZURE = "AZURE",
    AD = "AD",
    ADFS = "ADFS",
  }
}
