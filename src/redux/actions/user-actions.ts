import {IUser} from "@common/interfaces/user";
import {UserDispatch} from "@redux/types/users";
import {UserClient} from "@api/user";
import {Notifications} from "../../services/notifications";
import {RcFile} from "antd/es/upload";

export const createUser = (model: IUser.CreateUserModel, profilePhoto?: RcFile) => async (dispatch: UserDispatch) => {
  try {
    dispatch({ type: "USER_CREATE_START" });
    const data = await UserClient.createUser(model);
    if (data.error) {
      dispatch({ type: "USER_CREATE_ERROR", errorCode: data.status, errorMessage: data.message + data.error});
    } else {
      if (profilePhoto && model.userList.length === 1) {
        await UserClient.uploadProfilePhotoForUser(profilePhoto, model.userList[0].mail);
      }
      dispatch({ type: "USER_CREATE_SUCCESS", payload: data });
    }
  } catch {
    dispatch({ type: "USER_CREATE_ERROR", errorCode: null, errorMessage: null });
  }
}

export const updateUser = (model: IUser.UpdateUserModel, profilePhoto: any, isChangeFile: boolean) => async (dispatch: UserDispatch) => {
  try {
    dispatch({type: "USER_UPDATE_START"});
    const data = await UserClient.updateUser(model);

    if (data.error) {
      dispatch({ type: "USER_UPDATE_ERROR", errorCode: data.status, errorMessage: data.message});
    } else {
      if (isChangeFile && model.userList.length === 1) {
        if (profilePhoto) {
          await UserClient.uploadProfilePhotoForUser(profilePhoto, model.userList[0].mail);
        } else {
          await UserClient.removeProfilePhotoForUser(model.userList[0].mail);
        }
      }
      dispatch({ type: "USER_UPDATE_SUCCESS", payload: data });
    }
  } catch {
  }
}

export const getNameOptions = () => async (dispatch: UserDispatch) => {
  const data = await UserClient.getNameOptions();
  dispatch({type: "USERS_NAME_OPTIONS_SUCCESS", payload: data});
}

export const getSurnameOptions = () => async (dispatch: UserDispatch) => {
  const data = await UserClient.getSurnameOptions();
  dispatch({type: "USERS_SURNAME_OPTIONS_SUCCESS", payload: data});
}

export const getMobileOptions = () => async (dispatch: UserDispatch) => {
  const data = await UserClient.getMobileOptions();
  dispatch({type: "USERS_MOBILE_OPTIONS_SUCCESS", payload: data});
}

export const getEmailOptions = () => async (dispatch: UserDispatch) => {
  const data = await UserClient.getEmailOptions();
  dispatch({type: "USERS_EMAIL_OPTIONS_SUCCESS", payload: data});
}

export const uploadProfilePhoto = (photo: any) => async (dispatch: UserDispatch) => {
  try {
    dispatch({type: "USERS_UPLOAD_PP_START"});
    const data = await UserClient.uploadProfilePhoto(photo);
    if (data.status !== 200) {
      const result = await data.json();
      debugger;
      if (result.status === "40001") {
        Notifications.error("Dosya boyutu çok yüksek.")
      } else {
        Notifications.unexpectedError();
      }
    }
    dispatch({type: "USERS_UPLOAD_PP_SUCCESS"});
  } catch (e) {
    dispatch({type: "USERS_UPLOAD_PP_ERROR"});
  }
}

export const removeProfilePhoto = () => async (dispatch: UserDispatch) => {
  try {
    dispatch({type: "USERS_UPLOAD_PP_START"});
    await UserClient.removeProfilePhoto();
    dispatch({type: "USERS_UPLOAD_PP_SUCCESS"});
  } catch (e) {
    dispatch({type: "USERS_UPLOAD_PP_ERROR"});
  }
}

export const getAsyncProcessInfo = () => async (dispatch: UserDispatch) => {
  try {
    const data = await UserClient.getAsyncProcessInfo();
    dispatch({type: "ASYNC_PROCESS_INFO_SUCCESS", payload: data});
  } catch (e) {
  }
}

export const getUserActivities = (page: number) => async (dispatch: UserDispatch) => {
  try {
    const data = await UserClient.getActivities(page);
    dispatch({type: "USER_ACTIVITIES_SUCCESS", payload: data});
  } catch (e) {
  }
}
