import { App } from "./app";
import React  from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "@redux/store";
import {ISso} from "@common/interfaces/sso";
import { Notifications} from "./services/notifications";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById("app")!);

const {fetch: origFetch} = window;

// @ts-ignore
window.fetch = async (input, init) => {
  if (input.toString().includes("/v1/") && !input.toString().includes("/ws/")) {
    if (localStorage.getItem(ISso.ACCESS_TOKEN) && localStorage.getItem(ISso.TOKEN_TYPE)) {
      const token = localStorage.getItem(ISso.TOKEN_TYPE) + " " + localStorage.getItem(ISso.ACCESS_TOKEN);
      if (init) {
        if (init.headers) {
          (init.headers as Headers).set('Authorization', token);
        } else {
          init.headers = new Headers({
            'Authorization': token,
          });
        }
      } else {
        init = {
          headers: new Headers({
            'Authorization': token,
          }),
        }
      }
    }
    const response = await origFetch((process.env.apiUrl || "http://localhost:8080/api") + input, init);

    if (response.status === 401 &&
      (window.location.pathname.includes('admin')
        || window.location.pathname.includes('documents')
        || window.location.pathname.includes('profile')
        || window.location.pathname.includes('welcome'))) {
      window.open('/?reason=session_expire', '_self');
      localStorage.removeItem(ISso.ACCESS_TOKEN);
      localStorage.removeItem(ISso.REFRESH_TOKEN);
      localStorage.removeItem(ISso.TOKEN_TYPE);
    } else if (response.status === 404) {
      Notifications.notFound();
    }

    return response;
  }

  return origFetch(input, init);
};


root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
