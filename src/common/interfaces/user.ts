import {IAccount} from "@common/interfaces/account";
import {ISso} from "@common/interfaces/sso";

export namespace IUser {

  export interface UserResource {
    userList?: UserItem[];
    totalCount?: number;
  }

  export interface UserItem {
    tenantInfo?: IAccount.TenantInfo;
    userId: number;
    id?: number;
    accountName: string;
    name: string;
    lastname: string;
    mail: string;
    msisdn: string;
    role?: ISso.UserRole;
    hostName: string;
    freeTextAddress: string;
    cityId: number;
    districtId: number;
    status: UserStatus,
    domainList: string[];
    platforms: string[];
    packageId: number;
    subscriptionId: number;
    packageName: string;
    authenticationMethodId: string;
  }

  export enum UserStatus {
    ACTIVE = '1',
    DELETED = '0',
    DEACTIVE = "2"
  }

  export interface UserSearchModel {
    mailList?: string[],
    msisdnList?: string[],
    nameList?: string[],
    surnameList?: string[],
    tenantInfo: IAccount.TenantInfo,
    statusList?: [],
    pageable?: boolean,
    pageSize?: number,
    pageCount?: number,
    sort?: SortModel,
    searchKey?: string
  }

  export interface SortModel {
    field: UserSortFieldType,
    type: SortType
  }

  export enum SortType {
    ASC = "ASC",
    DESC = "DESC"
  }

  export enum UserSortFieldType {
    MSISDN = "MSISDN",
    PACKAGE_TYPE = "PACKAGE_TYPE"
  }

  export interface CreateUserModel {
    tenantInfo: IAccount.TenantInfo,
    userList: CreateUserItemModel[]
  }

  export interface CreateUserItemModel {
    name?: string,
    lastName?: string;
    mail: string;
    title?: string;
    msisdn: string;
    domain?: string;
    password?: string;
    role: ISso.UserRole;
    packageId: number;
    packageName?: string;
    authenticationFactor: '2FA' | '1FA';
    authenticationMethodId?: number;
  }

  export interface UpdateUserModel {
    userList: UpdateUserModelItem[];
  }

  export interface UpdateUserModelItem {
    tenantInfo: IAccount.TenantInfo,
    id: number,
    name: string;
    lastName: string;
    title: string;
    mail: string;
    msisdn: string;
    domain?: string;
    password?: string;
    role: ISso.UserRole;
    packageId: number;
    authenticationFactor: '2FA' | '1FA';
    authenticationMethodId: number;
  }

  export interface OptionResource {
    label: string;
    value: string;
  }

  export enum AsyncProcessType {
    USER_IMPORT_FROM_EXCEL = "USER_IMPORT_FROM_EXCEL"
  }

  export interface AsyncProcessInfo {
    type: IUser.AsyncProcessType;
    continue: boolean;
    successCount: number;
    errorCount: number;
    pendingCount: number;
    processRate: number;
    fileName: string;
  }

  export enum ActivityType {
    EXCEL_USER_IMPORT = "EXCEL_USER_IMPORT",
    LDAP_ADD = "LDAP_ADD",
    MANUAL_USER_ADD = "MANUAL_USER_ADD",
    RESET_PASSWORD = "RESET_PASSWORD"
  }

  export interface Activity {
    activity: ActivityType,
    id: number,
    date: string,
    relatedEntityId: number,
    description: string
  }
}