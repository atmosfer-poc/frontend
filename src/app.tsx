import {Routes} from "@routes/routes";
import React, {useEffect} from "react";
import "./common/styles/font.scss";
import {RootStore, useAppDispatch} from "@redux/store";
import {ISso} from "@common/interfaces/sso";
import {getCurrentUser, logout} from "@redux/actions/sso-actions";
import {useSelector} from "react-redux";

export const App = () => {
  const dispatch = useAppDispatch();
  const currentUserState = useSelector((state: RootStore) => state.currentUser);
  const userState = useSelector((state: RootStore) => state.users);


  useEffect(() => {
    if (userState.ppUpload > 0) {
      dispatch(getCurrentUser());
    }
  }, [userState.ppUpload]);

  useEffect(() => {
    if (localStorage.getItem(ISso.ACCESS_TOKEN)) {
      dispatch(getCurrentUser());
    }
  }, []);

  useEffect(() => {
    if (currentUserState.error) {
      dispatch(logout());
    }
  }, [currentUserState.error])

  return (
    <>
      <Routes />
    </>
  );
};
