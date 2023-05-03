import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import styles from "./home.module.scss";
import {useLocation} from "react-router-dom";
import {Notifications} from "../../services/notifications";
import {RootStore, useAppDispatch} from "@redux/store";
import {clearAuthState} from "@redux/actions/sso-actions";
import {ProductList} from "@components/productlist/productList";
import {Header} from "@components/header/header.container";
import {useSelector} from "react-redux";
import {ISso} from "@common/interfaces/sso";

export const HomePage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootStore) => state.currentUser);
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const locationReason = new URLSearchParams(location.search).get("reason");

    if (locationReason && locationReason === "session_expire") {
      Notifications.sessionExpire();
    }

    dispatch(clearAuthState());
  }, []);

  useEffect(() => {
    console.log(data);
    if (data.userId && data.role === ISso.UserRole.ADMIN) {
      setUserIsAdmin(true);
    }
  }, [data])

  return (
    <div id="logo" className={styles.home}>
      <Header />
      <ProductList userIsLogin={false}/>
    </div>
  );
};
