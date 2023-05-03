import {
  ASYNC_PROCESS_INFO_SUCCESS,
  IUsersState,
  NEW_EXCEL_IMPORTED,
  USER_ACTIVITIES_SUCCESS,
  USER_CREATE_ERROR,
  USER_CREATE_START,
  USER_CREATE_SUCCESS,
  USER_UPDATE_ERROR,
  USER_UPDATE_START,
  USER_UPDATE_SUCCESS,
  UserAction,
  USERS_EMAIL_OPTIONS_SUCCESS,
  USERS_ERROR,
  USERS_MOBILE_OPTIONS_SUCCESS,
  USERS_NAME_OPTIONS_SUCCESS,
  USERS_START,
  USERS_SUCCESS,
  USERS_SURNAME_OPTIONS_SUCCESS,
  USERS_UPLOAD_PP_ERROR,
  USERS_UPLOAD_PP_START,
  USERS_UPLOAD_PP_SUCCESS
} from "@redux/types/users";
import {IUser} from "@common/interfaces/user";

const initialState: IUsersState = {
  data: {} as IUser.UserResource,
  error: false,
  errorCode: null,
  errorMessage: "",
  loading: false,
  created: 0,
  ppUpload: 0,
  ppLoading: false,
  surnameOptions: [],
  mobileOptions: [],
  nameOptions: [],
  emailOptions: [],
  asyncProcesses: [],
  activities: []
};

const usersReducer = (state: IUsersState = initialState, action: UserAction) => {
  switch (action.type) {
    case USER_CREATE_START:
      return { ...state, loading: true, error: false, errorCode: null, errorMessage: null };
    case USER_CREATE_SUCCESS:
      return { ...state, loading: false, error: false, errorCode: null, errorMessage: null, created: state.created+1 };
    case USER_CREATE_ERROR:
      return { ...state, loading: false, error: true, errorCode: action.errorCode, errorMessage: action.errorMessage};
    case USERS_START:
      return { ...state, loading: true, error: false, errorCode: null, errorMessage: null };
    case USERS_SUCCESS:
      return {...state, loading: false, data: action.payload, error: false, errorCode: null, created: 0};
    case USERS_ERROR:
      return {...state, loading: false, error: true, data: {}};
    case USER_UPDATE_START:
      return {...state, loading: true, error: false, errorCode: null, errorMessage: null};
    case USER_UPDATE_SUCCESS:
      return {...state, loading: false, error: false, errorCode: null, errorMessage: null, created: state.created + 1};
    case USER_UPDATE_ERROR:
      return { ...state, loading: false, error: true, errorCode: action.errorCode, errorMessage: action.errorMessage};
    case USERS_NAME_OPTIONS_SUCCESS:
      return {...state, nameOptions: action.payload};
    case USERS_SURNAME_OPTIONS_SUCCESS:
      return {...state, surnameOptions: action.payload};
    case USERS_MOBILE_OPTIONS_SUCCESS:
      return {...state, mobileOptions: action.payload};
    case USERS_EMAIL_OPTIONS_SUCCESS:
      return {...state, emailOptions: action.payload};
    case USERS_UPLOAD_PP_START:
      return {...state, ppLoading: true};
    case USERS_UPLOAD_PP_SUCCESS:
      return {...state, ppLoading: false, ppUpload: state.ppUpload+1};
    case USERS_UPLOAD_PP_ERROR:
      return {...state, ppLoading: false, ppUpload: state.ppUpload+1};
    case ASYNC_PROCESS_INFO_SUCCESS:
      return {...state, asyncProcesses: action.payload};
    case USER_ACTIVITIES_SUCCESS:
      return {...state, activities: action.payload};
    case NEW_EXCEL_IMPORTED: {
      return {...state, loading: false, error: false, errorCode: null, errorMessage: null, created: state.created + 1};
    }
    default:
      return state;
  }
};

export default usersReducer;
