import {
  CLEAR_AUTH,
  CURRENT_USER_ERROR,
  CURRENT_USER_START,
  CURRENT_USER_SUCCESS,
  CurrentUserAction,
  EULA_APPROVED,
  ICurrentUserState,
  ILogoutState,
  ISsoState,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LogoutAction,
  SSO_ERROR,
  SSO_START,
  SSO_SUCCESS,
  SsoAction
} from "@redux/types/sso";
import {ISso} from "@common/interfaces/sso";

const initialSsoState: ISsoState = {
  data: {} as ISso.TokenModel,
  error: false,
  loading: false,
};

export const ssoReducer = (state: ISsoState = initialSsoState, action: SsoAction) => {
  switch (action.type) {
    case SSO_START:
      return { ...state, loading: true, error: false };
    case SSO_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: false };
    case SSO_ERROR:
      return { ...state, loading: false, error: true, data: {} };
    case EULA_APPROVED: {
      state.data.mustEula = false;
      return { ...state, data: state.data}
    }
    default:
      return state;
  }
};

const initialCurrentUserState: ICurrentUserState = {
  data: {} as ISso.CurrentUserModel,
  error: false,
  loading: true
}

export const currentUserReducer = (state: ICurrentUserState = initialCurrentUserState, action: CurrentUserAction) => {
  switch (action.type) {
    case CURRENT_USER_START:
      return { ...state, loading: true, error: false };
    case CURRENT_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: false };
    case CURRENT_USER_ERROR:
      return { ...state, loading: false, error: true, data: {} as ISso.CurrentUserModel };
    case CLEAR_AUTH:
      return { ...state, loading: false, data: {}, error: false}
    default:
      return state;
  }
};

const initialLogoutState: ILogoutState = {
  completed: false,
  loading: false
}

export const logoutReducer = (state: ILogoutState = initialLogoutState, action: LogoutAction) => {
  switch (action.type) {
    case LOGOUT_START:
      return {...state, loading: true, completed: false};
    case LOGOUT_SUCCESS:
      return {...state, loading: false, completed: true};
    default:
      return state;
  }
}