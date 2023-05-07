import {useDispatch} from "react-redux";
import {applyMiddleware, combineReducers, Dispatch, legacy_createStore as createStore,} from "redux";
import thunk from "redux-thunk";
import {ICurrentUserState, ILogoutState, ISsoState} from "@redux/types/sso";
import {currentUserReducer, logoutReducer, ssoReducer,} from "@redux/reducers/sso-reducer";
import {IUsersState} from "@redux/types/users";
import usersReducer from "@redux/reducers/users-reducer";

export interface IStore {
  sso: ISsoState;
  currentUser: ICurrentUserState;
  logout: ILogoutState;
  users: IUsersState;
}

const rootReducer = combineReducers<IStore>({
  sso: ssoReducer,
  currentUser: currentUserReducer,
  logout: logoutReducer,
  users: usersReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootStore = ReturnType<typeof rootReducer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAppDispatch = () => useDispatch<Dispatch<any>>();

export default store;
