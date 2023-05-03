import {CurrentUserDispatch, LogoutDispatch, SsoDispatch} from "@redux/types/sso";
import {SsoClient} from "@api/sso";
import {ISso} from "@common/interfaces/sso";
import {TokenService} from "@api/token";

export const validateToken = (username: string, password: string) => async (dispatch: SsoDispatch) => {
  try {
    dispatch({ type: "SSO_START" });
    const data = await TokenService.login(username, password);
    localStorage.setItem(ISso.ACCESS_TOKEN, (data as ISso.TokenModel).accessToken as string);
    localStorage.setItem(ISso.REFRESH_TOKEN, (data as ISso.TokenModel).refreshToken as string);
    localStorage.setItem(ISso.TOKEN_TYPE, (data as ISso.TokenModel).type as string);
    dispatch({ type: "SSO_SUCCESS", payload: data });
  } catch {
    dispatch({ type: "SSO_ERROR" });
  }
};

export const getCurrentUser = () => async (dispatch: CurrentUserDispatch) => {
  try {
    dispatch({ type: "CURRENT_USER_START" });
    const data = await SsoClient.getCurrentUser();
    dispatch({ type: "CURRENT_USER_SUCCESS", payload: data });
  } catch (e) {
    dispatch({ type: "CURRENT_USER_ERROR" });
  }
};

export const logout = () => async (dispatch: LogoutDispatch) => {
  try {
    dispatch({ type: "LOGOUT_START" });
    await SsoClient.logout();
    setTimeout(() => {
      clearAuthInfo();
    }, 2000)
    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch {
    setTimeout(() => {
      clearAuthInfo();
    }, 500)
    dispatch({ type: "LOGOUT_SUCCESS" });
  }
}

export const eulaApproved = () => async (dispatch: SsoDispatch) => {
  dispatch({ type: "EULA_APPROVED" });
}

export const clearAuthState = () => async (dispatch: CurrentUserDispatch) => {
  clearAuthInfo();
  dispatch({type: 'CLEAR_AUTH'});
}

const clearAuthInfo = () => {
  localStorage.removeItem(ISso.ACCESS_TOKEN);
  localStorage.removeItem(ISso.REFRESH_TOKEN);
  localStorage.removeItem(ISso.TOKEN_TYPE);
}