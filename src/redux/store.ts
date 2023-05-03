import { useDispatch } from "react-redux";
import {
  applyMiddleware,
  combineReducers,
  Dispatch,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { ICurrentUserState, ILogoutState, ISsoState } from "@redux/types/sso";
import {
  currentUserReducer,
  logoutReducer,
  ssoReducer,
} from "@redux/reducers/sso-reducer";
import { ISubscriptionUserState } from "@redux/types/subscription-user-count";
import subscriptionUserReducer from "@redux/reducers/subscription-user-reducer";
import { ISubscriptionsState } from "@redux/types/subscriptions";
import subscriptionsReducer from "@redux/reducers/subscriptions-reducer";
import authenticationMethodReducer from "@redux/reducers/authentication-methods-reducer";
import { IAuthenticationMethodsState } from "@redux/types/authentication-methods";
import { IUsersState } from "@redux/types/users";
import usersReducer from "@redux/reducers/users-reducer";
import { IAccountState } from "@redux/types/account";
import accountReducer from "@redux/reducers/account-reducer";
import { IDomainsState } from "./types/domains";
import domainsReducer from "./reducers/domain-reducer";

export interface IStore {
  sso: ISsoState;
  currentUser: ICurrentUserState;
  logout: ILogoutState;
  subscriptionUserCount: ISubscriptionUserState;
  subscriptions: ISubscriptionsState;
  authenticationMethod: IAuthenticationMethodsState;
  users: IUsersState;
  account: IAccountState;
  domain: IDomainsState;
}

const rootReducer = combineReducers<IStore>({
  sso: ssoReducer,
  currentUser: currentUserReducer,
  logout: logoutReducer,
  subscriptionUserCount: subscriptionUserReducer,
  subscriptions: subscriptionsReducer,
  authenticationMethod: authenticationMethodReducer,
  users: usersReducer,
  account: accountReducer,
  domain: domainsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootStore = ReturnType<typeof rootReducer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAppDispatch = () => useDispatch<Dispatch<any>>();

export default store;
