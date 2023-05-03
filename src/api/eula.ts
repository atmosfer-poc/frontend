import {Endpoints} from "@api/endpoints";

export namespace EulaClient {
  export const getActiveEula = async () => {
    const response = await fetch(Endpoints.EULA_ACTIVE);
    return await response.json();
  };

  export const approveEula = async () => {
    return  await fetch(Endpoints.EULA_APPROVE ,{
      method: 'PUT',
    });
  };
}

