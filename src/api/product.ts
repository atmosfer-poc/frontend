import {Endpoints} from "@api/endpoints";
import {IAccount} from "@common/interfaces/account";

export namespace ProductClient {
  export const searchProduct = async (page) => {
    let url = Endpoints.PRODUCTS + Endpoints.PAGEABLE + "?page=" + page;
    const response = await fetch(url);
    return await response.json();
  };

  export const addProduct = async (file, body) => {
    const data = new FormData();
    data.append("image", file);
    data.append("name", body.name);
    data.append("description", body.description);
    data.append("price", body.price);
    return await fetch(Endpoints.PRODUCTS, {
      method: 'POST',
      body: data
    });
  }
}

