import {ILdap} from "@common/interfaces/ldap";
import {Endpoints} from "@api/endpoints";

export namespace LdapClient {
  export const testConnection = async (data: ILdap.CheckLdapConnectionModel) => {
    const response = await fetch(Endpoints.LDAP_CONNECTION_TEST, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data)
    });
    return await response.json();
  }

  export const getUsersFromLdap = async (authMethodId: number) => {
    const response = await fetch(Endpoints.LDAP + authMethodId + Endpoints.LDAP_SEARCH, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
    return await response.json();
  }
}