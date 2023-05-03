import {Endpoints} from "@api/endpoints";
import {IAccount} from "@common/interfaces/account";

export namespace AccountClient {
  export const searchAccount = async (data: IAccount.AccountSearchModel) => {
    let url = Endpoints.ACCOUNTS;

    if (data.id) {
      url += "?id=" + data.id
    }

    if (data.idType && data.idValue) {
      url += "?idType=" + data.idType + "&idValue=" + data.idValue;
    }

    const response = await fetch(url);
    return await response.json();
  };

  export const updateAccount = async (data: IAccount.UpdateAccountModel) => {
    const response = await fetch(Endpoints.ACCOUNTS, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data)
    });
    return await response.json();
  }

  export const updatePasswordSecurity = async (data: IAccount.PasswordSecurityResource) => {
    return  await fetch(Endpoints.UPDATE_PASSWORD_SECURITY, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data)
    });
  }

  export const updateAuthFactor = async (authFactor: string) => {
    return await fetch(Endpoints.UPDATE_AUTH_FACTOR, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        authFactor
      })
    })
  }
}

