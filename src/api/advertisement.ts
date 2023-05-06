import {Endpoints} from "@api/endpoints";
import {IAdvertisement} from "@common/interfaces/advertisement";

export namespace AdvertisementService {
  export const all = async () => {
    const response = await fetch(Endpoints.ALL_ADVERTISEMENT, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    return await response.json();
  };


  export const update = async (data: any) => {
    const response = await fetch(Endpoints.ADVERTISEMENT + "/" + data.id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    return await response.json();
  };

  export const save = async (model: any, file: any) => {
    const data = new FormData();
    data.append("image", file);
    data.append("title", model.title);
    data.append("content", model.content);
    data.append("status", IAdvertisement.AdvertisementStatus.OPEN);
    const response = await fetch(Endpoints.ADVERTISEMENT, {
      method: 'POST',
      body: data
    });
    return await response.json();
  };

  export const applications = async (id: number) => {
    const response = await fetch(Endpoints.ADVERTISEMENT + "/" + id + "/applications", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    return await response.json();
  };
}

