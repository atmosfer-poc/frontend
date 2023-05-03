import {
  AUTHENTICATION_METHODS_CREATE_ERROR,
  AUTHENTICATION_METHODS_CREATE_START,
  AUTHENTICATION_METHODS_CREATE_SUCCESS,
  AUTHENTICATION_METHODS_ERROR,
  AUTHENTICATION_METHODS_START,
  AUTHENTICATION_METHODS_SUCCESS,
  AUTHENTICATION_METHODS_UPDATE_ERROR,
  AUTHENTICATION_METHODS_UPDATE_START,
  AUTHENTICATION_METHODS_UPDATE_SUCCESS,
  AuthenticationMethodAction,
  IAuthenticationMethodsState
} from "@redux/types/authentication-methods";
import {IAuthenticationMethod} from "@common/interfaces/authentication-method";

const initialState: IAuthenticationMethodsState = {
  authenticationMethods: {} as IAuthenticationMethod.AuthenticationMethodsModel,
  error: false,
  errorCode: null,
  errorMessage: "",
  loading: false,
  created: 0
};

const authenticationMethodReducer = (state: IAuthenticationMethodsState = initialState, action: AuthenticationMethodAction) => {
  switch (action.type) {
    case AUTHENTICATION_METHODS_CREATE_START:
      return { ...state, loading: true, error: false, errorCode: null, errorMessage: null };
    case AUTHENTICATION_METHODS_CREATE_SUCCESS:
      return { ...state, loading: false, error: false, errorCode: null, errorMessage: null, created: state.created+1 };
    case AUTHENTICATION_METHODS_CREATE_ERROR:
      return { ...state, loading: false, error: true};
    case AUTHENTICATION_METHODS_START:
      return { ...state, loading: true, error: false, errorCode: null, errorMessage: null};
    case AUTHENTICATION_METHODS_SUCCESS:
      return { ...state, loading: false, authenticationMethods: action.payload, error: false, errorCode: null, errorMessage: null, created: 0 };
    case AUTHENTICATION_METHODS_ERROR:
      return { ...state, loading: false, error: true, errorCode: null, errorMessage: null };
    case AUTHENTICATION_METHODS_UPDATE_START:
      return { ...state, loading: false, error: false, errorCode: null, errorMessage: null};
    case AUTHENTICATION_METHODS_UPDATE_SUCCESS:
      return { ...state, loading: false, error: false, errorCode: null, errorMessage: null, created: state.created+1 };
    case AUTHENTICATION_METHODS_UPDATE_ERROR:
      return { ...state, loading: false, error: true, errorCode: action.errorCode, errorMessage: action.errorMessage };
    default:
      return state;
  }
};

export default authenticationMethodReducer;
