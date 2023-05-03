import {Endpoints} from "@api/endpoints";

export namespace SsoClient {
  export const validateToken = async (token: string) => {
    const response = await fetch(Endpoints.SSO_VALIDATE_TOKEN, {
      method: 'POST',
      body: JSON.stringify({
        token: token
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
    return await response.json();
  };

  export const getCurrentUser = async () => {
    const response = await fetch(Endpoints.SSO_CURRENT_USER);
    return await response.json();
  }

  export const logout = async () => {
    const response = await fetch(Endpoints.SSO_LOGOUT);
    return await response.json();
  }
}

