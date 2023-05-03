import {Endpoints} from "@api/endpoints";

export namespace LovClient {
  export const getTranslates = async () => {
    const response = await fetch(Endpoints.GET_TRANSLATIONS);
    return await response.json();
  };
}

