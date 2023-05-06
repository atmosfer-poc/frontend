import {Endpoints} from "@api/endpoints";
import {IApplications} from "@common/interfaces/applications";

export namespace ApplicationsService {
  export const downloadCV = async (id: number) => {
    return await fetch(Endpoints.APPLICATIONS + "/" + id + "/cv", {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    });
  };

  export const action = async (id: number, action: IApplications.ApplicationActionType, comment: string) => {
    return await fetch(Endpoints.APPLICATIONS + "/" + id + "/action/" + action, {
      method: 'POST',
      body: JSON.stringify({comment: comment}),
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    });
  };
}

