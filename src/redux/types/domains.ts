import { ThunkDispatch } from "redux-thunk";
import { IDomain } from "@common/interfaces/domain";

export const DOMAIN_CREATE_START = "DOMAIN_CREATE_START";
export const DOMAIN_DNS_CHECK_START = "DOMAIN_DNS_CHECK_START";
export const GET_DOMAIN_LIST_START = "GET_DOMAIN_LIST_START";

export const DOMAIN_CREATE_SUCCESS = "DOMAIN_CREATE_SUCCESS";
export const DOMAIN_DNS_CHECK_SUCCESS = "DOMAIN_DNS_CHECK_SUCCESS";
export const GET_DOMAIN_LIST_SUCCESS = "GET_DOMAIN_LIST_SUCCESS";

export const DOMAIN_CREATE_ERROR = "DOMAIN_CREATE_ERROR";
export const DOMAIN_DNS_CHECK_ERROR = "DOMAIN_DNS_CHECK_ERROR";
export const GET_DOMAIN_LIST_ERROR = "GET_DOMAIN_LIST_ERROR";

export const UPDATE_DOMAIN_STATUS_START = "UPDATE_DOMAIN_STATUS_START";
export const UPDATE_DOMAIN_STATUS_ERROR = "UPDATE_DOMAIN_STATUS_ERROR";
export const UPDATE_DOMAIN_STATUS_SUCCESS = "UPDATE_DOMAIN_STATUS_SUCCESS";

export interface IDomainsState {
  createDomainResource: IDomain.CreateDomainResource;
  getDomainListResource: IDomain.SearchDomainResource[];
  dnsCheckResource: IDomain.DnsCheckResource;
  loading: boolean;
  error: boolean;
}

interface DomainCreateStart {
  type: typeof DOMAIN_CREATE_START;
}

interface DomainDnsCheckStart {
  type: typeof DOMAIN_DNS_CHECK_START;
}

interface GetDomainListStart {
  type: typeof GET_DOMAIN_LIST_START;
}

interface DomainCreateSuccess {
  type: typeof DOMAIN_CREATE_SUCCESS;
  payload: IDomain.CreateDomainResource;
}

interface DomainDnsCheckSuccess {
  type: typeof DOMAIN_DNS_CHECK_SUCCESS;
  payload: IDomain.DnsCheckResource;
}

interface GetDomainListSuccess {
  type: typeof GET_DOMAIN_LIST_SUCCESS;
  payload: IDomain.SearchDomainResource[];
}

interface DomainCreateError {
  type: typeof DOMAIN_CREATE_ERROR;
}

interface DomainDnsCheckError {
  type: typeof DOMAIN_DNS_CHECK_ERROR;
}

interface GetDomainListError {
  type: typeof GET_DOMAIN_LIST_ERROR;
}

interface UpdateDomainStatusStart {
  type: typeof UPDATE_DOMAIN_STATUS_START;
}

interface UPDATE_DOMAIN_STATUS_SUCCESS {
  type: typeof UPDATE_DOMAIN_STATUS_SUCCESS;
}

interface UpdateDomainStatusError {
  type: typeof UPDATE_DOMAIN_STATUS_ERROR;
}

export type DomainAction =
  | DomainCreateStart
  | DomainCreateSuccess
  | DomainCreateError
  | DomainDnsCheckStart
  | DomainDnsCheckError
  | DomainDnsCheckSuccess
  | GetDomainListStart
  | GetDomainListError
  | GetDomainListSuccess
  | UpdateDomainStatusError
  | UPDATE_DOMAIN_STATUS_SUCCESS
  | UpdateDomainStatusStart;
export type DomainDispatch = ThunkDispatch<IDomainsState, void, DomainAction>;
