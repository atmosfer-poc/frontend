import {
  ACCOUNT_SEARCH_ERROR,
  ACCOUNT_SEARCH_START,
  ACCOUNT_SEARCH_SUCCESS,
  AccountAction,
  IAccountState, UPDATE_AUTH_FACTOR_SUCCESS,
  UPDATE_PASSWORD_SECURITY_ERROR,
  UPDATE_PASSWORD_SECURITY_START,
  UPDATE_PASSWORD_SECURITY_SUCCESS
} from "@redux/types/account";
import {IAccount} from "@common/interfaces/account";

const initialState: IAccountState = {
  data: {} as IAccount.AccountResource,
  error: false,
  loading: false,
  passwordSecurityUpdateError: false
};

const accountReducer = (state: IAccountState = initialState, action: AccountAction) => {
  switch (action.type) {
    case ACCOUNT_SEARCH_START:
      return { ...state, loading: true, error: false, passwordSecurityUpdateError: false };
    case UPDATE_PASSWORD_SECURITY_START:
      return { ...state, loading: true, error: false, passwordSecurityUpdateError: false };
    case ACCOUNT_SEARCH_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: false, passwordSecurityUpdateError: false };
    case UPDATE_PASSWORD_SECURITY_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: false, passwordSecurityUpdateError: false };
    case UPDATE_AUTH_FACTOR_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: false, passwordSecurityUpdateError: false };
    case ACCOUNT_SEARCH_ERROR:
      return { ...state, loading: false, error: true, data: {}, passwordSecurityUpdateError: false };
    case UPDATE_PASSWORD_SECURITY_ERROR:
      return { ...state, loading: false, error: false, passwordSecurityUpdateError: true };
    default:
      return state;
  }
};

export default accountReducer;
