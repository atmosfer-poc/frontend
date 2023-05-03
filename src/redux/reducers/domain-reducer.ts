import {
  DOMAIN_CREATE_ERROR,
  DOMAIN_CREATE_START,
  DOMAIN_CREATE_SUCCESS,
  DOMAIN_DNS_CHECK_ERROR,
  DOMAIN_DNS_CHECK_START,
  DOMAIN_DNS_CHECK_SUCCESS,
  DomainAction,
  GET_DOMAIN_LIST_ERROR,
  GET_DOMAIN_LIST_START,
  GET_DOMAIN_LIST_SUCCESS,
  IDomainsState,
  UPDATE_DOMAIN_STATUS_START,
  UPDATE_DOMAIN_STATUS_ERROR,
  UPDATE_DOMAIN_STATUS_SUCCESS,
} from "@redux/types/domains";
import { IDomain } from "@common/interfaces/domain";

const initialState: IDomainsState = {
  createDomainResource: {} as IDomain.CreateDomainResource,
  getDomainListResource: [] as IDomain.SearchDomainResource[],
  dnsCheckResource: {} as IDomain.DnsCheckResource,
  loading: false,
  error: false,
};

const domainsReducer = (state = initialState, action: DomainAction) => {
  switch (action.type) {
    case DOMAIN_CREATE_START:
      return { ...state, loading: true, error: false };
    case DOMAIN_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        createDomainResource: action.payload,
        error: false,
      };
    case DOMAIN_CREATE_ERROR:
      return { ...state, loading: false, error: true };
    case DOMAIN_DNS_CHECK_START:
      return { ...state, loading: true, error: false };
    case DOMAIN_DNS_CHECK_SUCCESS:
      return {
        ...state,
        loading: false,
        dnsCheckResource: action.payload,
        error: false,
      };
    case DOMAIN_DNS_CHECK_ERROR:
      return { ...state, loading: false, error: true };
    case GET_DOMAIN_LIST_START:
      return { ...state, loading: true, error: false };
    case GET_DOMAIN_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        getDomainListResource: action.payload,
        error: false,
      };
    case GET_DOMAIN_LIST_ERROR:
      return { ...state, loading: false, error: true };
    case UPDATE_DOMAIN_STATUS_START:
      return { ...state, loading: true, error: false };
    case UPDATE_DOMAIN_STATUS_ERROR:
      return { ...state, loading: false, error: true };
    case UPDATE_DOMAIN_STATUS_SUCCESS:
      return { ...state, loading: false, error: false };
    default:
      return state;
  }
};

export default domainsReducer;
