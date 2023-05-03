import {Endpoints} from "@api/endpoints";

export namespace TokenService {
  export const login = async (username, password) => {
    const response = await fetch(Endpoints.TOKEN, {
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    return await response.json();
  };
}

