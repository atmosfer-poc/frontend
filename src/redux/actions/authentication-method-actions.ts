import {IAuthenticationMethod} from "@common/interfaces/authentication-method";
import {AuthenticationMethodDispatch} from "@redux/types/authentication-methods";
import {AuthenticationMethodClient} from "@api/authentication-method";

export const getAllAuthenticationMethods = (model: IAuthenticationMethod.AuthenticationMethodsDto) => async (dispatch: AuthenticationMethodDispatch) => {
  try {
    dispatch({ type: "AUTHENTICATION_METHODS_START" });
    const data = await AuthenticationMethodClient.getAllAuthenticationMethods(model);
    dispatch({ type: "AUTHENTICATION_METHODS_SUCCESS", payload: data });
  } catch {
    dispatch({ type: "AUTHENTICATION_METHODS_ERROR" });
  }
};

export const createAuthenticationMethods = (model: IAuthenticationMethod.AuthenticationMethodCreateModel) => async (dispatch: AuthenticationMethodDispatch) => {
  try {
    dispatch({ type: "AUTHENTICATION_METHODS_CREATE_START" });
    const data = await AuthenticationMethodClient.createAuthenticationMethod(model);
    dispatch({ type: "AUTHENTICATION_METHODS_CREATE_SUCCESS", payload: data });
  } catch {
    dispatch({ type: "AUTHENTICATION_METHODS_CREATE_ERROR" });
  }
}

export const updateAuthenticationMethods = (id: number, model: IAuthenticationMethod.AuthenticationMethodCreateModel) => async (dispatch: AuthenticationMethodDispatch) => {
  try {
    dispatch({ type: "AUTHENTICATION_METHODS_UPDATE_START" });
    const data = await AuthenticationMethodClient.updateAuthenticationMethod(id, model);

    if (data.error) {
      dispatch({ type: "AUTHENTICATION_METHODS_UPDATE_ERROR", errorCode: data.status, errorMessage: data.message});
    } else {
      dispatch({ type: "AUTHENTICATION_METHODS_UPDATE_SUCCESS", payload: data });
    }
  } catch {
    dispatch({ type: "AUTHENTICATION_METHODS_UPDATE_ERROR", errorCode: "500", errorMessage: "data.message" });
  }
}
