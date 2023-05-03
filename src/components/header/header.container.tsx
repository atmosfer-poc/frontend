import React, {useEffect, useState} from "react";
import { HeaderView } from "./header.view";
import { useSelector } from "react-redux";
import {RootStore, useAppDispatch} from "@redux/store";
import {useLocation, useNavigate} from "react-router-dom";
import {RegisterModal} from "@components/registerModal/registerModal";
import {LoginModal} from "@components/loginModal/loginModal";
import {UserClient} from "@api/user";
import {Notifications} from "../../services/notifications";
import {getCurrentUser} from "@redux/actions/sso-actions";
import {TokenService} from "@api/token";
import {ISso} from "@common/interfaces/sso";

export const Header = () => {
  const [fixed, setFixed] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLanding, setIsLanding] = useState(useLocation().pathname === "/");
  const { data: userData } = useSelector(
    (state: RootStore) => state.currentUser
  );
  const navigate = useNavigate();
  const [loginVisible, setLoginVisible] = useState<boolean>(false);
  const [registerVisible, setRegisterVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userData.userId != null) {
      navigate('welcome');
    }
  }, [userData])

  const login = () => {
    setLoginVisible(true);
  };

  const register = () => {
    setRegisterVisible(true);
  }

  const onRegister = (e) => {
    UserClient.register(e).then(resp => {
      Notifications.success("Kayıt işlemi başarıyla gerçekleşti.");

      setRegisterVisible(false);
    })
  }

  const onLogin = (e) => {
    TokenService.login(e.email, e.password).then(data => {
      localStorage.setItem(ISso.ACCESS_TOKEN, (data as ISso.TokenModel).accessToken as string);
      localStorage.setItem(ISso.REFRESH_TOKEN, (data as ISso.TokenModel).refreshToken as string);
      localStorage.setItem(ISso.TOKEN_TYPE, (data as ISso.TokenModel).type as string);
      dispatch(getCurrentUser())
    })
  }

  return (
    <>
      <HeaderView
        userData={userData}
        login={login}
        register={register}
        loginEnabled={true}
        fixed={fixed}
        lastScroll={lastScroll}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setFixed={setFixed}
        setLastScroll={setLastScroll}
        isLanding={isLanding}
      />

      <RegisterModal
        visible={registerVisible}
        onCancel={() => setRegisterVisible(false)}
        onOk={onRegister}
      />
      <LoginModal
        register={register}
        visible={loginVisible}
        onOk={onLogin}
        onCancel={() => setLoginVisible(false)} />
    </>
  );
};
