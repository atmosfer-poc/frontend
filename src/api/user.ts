import {Endpoints} from "@api/endpoints";
import { IUser} from "@common/interfaces/user";

export namespace UserClient {
  export const getUsers = async (data: IUser.UserSearchModel) => {
    const response = await fetch(Endpoints.USERS_SEARCH, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data)
    });
    return await response.json();
  };

  export const register = async (data: any) => {
    const response = await fetch(Endpoints.USERS, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data)
    });
    return await response.json();
  };

  export const createUser = async (data: IUser.CreateUserModel) => {
    const response = await fetch(Endpoints.USERS_UPSERT, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data)
    });
    try {
      return await response.json();
    } catch {
      return response;
    }
  }

  export const updateUser = async (data: IUser.UpdateUserModel) => {
    const response = await fetch(Endpoints.USERS, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data)
    });
    return await response.json();
  }

  export const getNameOptions = async () => {
    const response = await fetch(Endpoints.USERS_NAME_OPTIONS, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
    return await response.json();
  }

  export const getSurnameOptions = async () => {
    const response = await fetch(Endpoints.USERS_SURNAME_OPTIONS, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
    return await response.json();
  }

  export const getMobileOptions = async () => {
    const response = await fetch(Endpoints.USERS_MOBILE_OPTIONS, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
    return await response.json();
  }

  export const getEmailOptions = async () => {
    const response = await fetch(Endpoints.USERS_EMAIL_OPTIONS, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
    return await response.json();
  }

  export const getUsersExcel = async (data: IUser.UserSearchModel) => {
    return await fetch(Endpoints.USERS_SEARCH_EXCEL, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data)
    });
  };

  export const getUsersExampleExcel = async () => {
    return await fetch(Endpoints.USERS_EXAMPLE_EXCEL, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    });
  };

  export const importUsersFromExcel = async (file: any) => {
    const data = new FormData();
    data.append("file", file);
    return await fetch(Endpoints.USERS_IMPORT_EXCEL, {
      method: 'POST',
      body: data
    });
  }

  export const uploadProfilePhoto = async (photo: any) => {
    const data = new FormData();
    data.append("file", photo);
    return await fetch(Endpoints.USERS_PROFILE_PHOTO, {
      method: 'PUT',
      body: data
    });
  }

  export const uploadProfilePhotoForUser = async (photo: any, mail: string) => {
    const data = new FormData();
    data.append("file", photo);
    return await fetch(Endpoints.USERS_PROFILE_PHOTO_WITH_USER + mail + "/profile-photo", {
      method: 'PUT',
      body: data
    });
  }

  export const removeProfilePhoto = async () => {
    return await fetch(Endpoints.USERS_PROFILE_PHOTO, {
      method: 'DELETE',
    });
  }

  export const removeProfilePhotoForUser = async (mail: string) => {
    return await fetch(Endpoints.USERS_PROFILE_PHOTO_WITH_USER + mail + "/profile-photo", {
      method: 'DELETE',
    });
  }

  export const getAsyncProcessInfo = async () => {
    const response = await fetch(Endpoints.ASYNC_PROCESS_INFO, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
    return await response.json();
  }

  export const getActivities = async (page: number) => {
    const response = await fetch(Endpoints.USER_ACTIVITIES + page, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
    return await response.json();
  }

  export const getActivityResult = async (activityId: number) => {
    return await fetch(Endpoints.USER_ACTIVITIES_RESULT_DOWNLOAD + activityId + "/download-result" , {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
  };
}

