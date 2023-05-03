import React, { useEffect, useState } from "react";
import { LoginHeaderView } from "./loginHeader.view";
import { useNavigate } from "react-router-dom";
import { RootStore, useAppDispatch } from "@redux/store";
import {clearAuthState, logout} from "@redux/actions/sso-actions";
import { useSelector } from "react-redux";

export const LoginHeader = () => {
  const [fixed, setFixed] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { completed } = useSelector((state: RootStore) => state.logout);

  const { data } = useSelector((state: RootStore) => state.currentUser);

  const onLogoutClick = () => {
    dispatch(logout());
    dispatch(clearAuthState());

    setTimeout(() => {
      navigate("/");
    }, 2000)
  };

  return (
    <LoginHeaderView
      logout={onLogoutClick}
      user={data}
      fixed={fixed}
      lastScroll={lastScroll}
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      setFixed={setFixed}
      setLastScroll={setLastScroll}
    />
  );
};
