import React from "react";
import {BrowserRouter, Route, Routes as BaseRoutes} from "react-router-dom";
import {HomePage} from "@pages/home/home";
import {TestPage} from "@pages/test/test";
import {AuthGuard} from "@components/guard/AuthGuard";
import {Welcome} from "@pages/welcome/welcome";
import {ISso} from "@common/interfaces/sso";

export const Routes = () => {
  return (
    <BrowserRouter>
      <BaseRoutes>
        <Route path="/">
          <Route index element={<HomePage/>}/>
          <Route path="/test" element={<TestPage/>}/>

          <Route
            path="/welcome"
            element={<AuthGuard roles={[ISso.UserRole.ADMIN, ISso.UserRole.HR, ISso.UserRole.FINANCE, ISso.UserRole.TECHNICAL, ISso.UserRole.UNASSIGNED]}
                                element={<Welcome/>}/>}
          />

        </Route>
      </BaseRoutes>
    </BrowserRouter>
  );
};
