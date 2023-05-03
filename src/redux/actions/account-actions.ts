import {AccountDispatch} from "@redux/types/account";
import {AccountClient} from "@api/account";
import {IAccount} from "@common/interfaces/account";

export const getAccountById = (id: number) => async (dispatch: AccountDispatch) => {
  try {
    dispatch({ type: "ACCOUNT_SEARCH_START" });
    const data = await AccountClient.searchAccount({id: id});
    dispatch({ type: "ACCOUNT_SEARCH_SUCCESS", payload: data });
  } catch {
    dispatch({ type: "ACCOUNT_SEARCH_ERROR" });
  }
};

export const updatePwdSecurity = (accountId: number, data: IAccount.PasswordSecurityResource) => async (dispatch: AccountDispatch) => {
  try {
    dispatch({ type: "UPDATE_PASSWORD_SECURITY_START" });
    await AccountClient.updatePasswordSecurity(data);
    const account = await AccountClient.searchAccount({id: accountId});
    dispatch({ type: "UPDATE_PASSWORD_SECURITY_SUCCESS", payload: account });
  } catch (e) {
    dispatch({ type: "UPDATE_PASSWORD_SECURITY_ERROR" });
  }
}

export const updateAuthFactor = (accountId: number, authFactor: string) => async (dispatch: AccountDispatch) => {
  try {
    dispatch({ type: "UPDATE_AUTH_FACTOR_START" });
    await AccountClient.updateAuthFactor(authFactor);
    const account = await AccountClient.searchAccount({id: accountId});
    dispatch({ type: "UPDATE_AUTH_FACTOR_SUCCESS", payload: account });
  } catch (e) {
    dispatch({ type: "UPDATE_AUTH_FACTOR_ERROR" });
  }
}