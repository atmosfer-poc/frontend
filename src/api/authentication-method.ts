import { Endpoints} from "@api/endpoints";
import {IAuthenticationMethod} from "@common/interfaces/authentication-method";

export namespace AuthenticationMethodClient {
  export const getAllAuthenticationMethods = async (data: IAuthenticationMethod.AuthenticationMethodsDto) => {
    let url = Endpoints.AUTHENTICATION_METHODS + '?';

    if (data.accountId) {
      url += "accountId=" + data.accountId + "&status=1"
    }

    const response = await fetch(url);
    return await response.json();
  };

  export const createAuthenticationMethod = async (data: IAuthenticationMethod.AuthenticationMethodCreateModel) => {
    const response = await fetch(Endpoints.AUTHENTICATION_METHODS, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data)
    });
    return await response.json();
  }

  export const updateAuthenticationMethod = async (id: number, data: IAuthenticationMethod.AuthenticationMethodCreateModel) => {
    const response = await fetch(Endpoints.AUTHENTICATION_METHODS + '/' + id, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data)
    });
    return await response.json();
  }
}

