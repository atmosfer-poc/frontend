import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import styles from "./home.module.scss";
import {useLocation} from "react-router-dom";
import {Notifications} from "../../services/notifications";
import {RootStore, useAppDispatch} from "@redux/store";
import {clearAuthState, getCurrentUser} from "@redux/actions/sso-actions";
import {Header} from "@components/header/header.container";
import {useSelector} from "react-redux";
import {ISso} from "@common/interfaces/sso";
import {Form} from "antd";
import {TextInput} from "@components/dashboard/textInput/textInput";
import {getTranslateValue} from "@components/translate/Language";
import {Button as CustomButton} from "@components/button/button";
import {FormInstance} from "antd/es/form";
import {TokenService} from "@api/token";
import {RegisterModal} from "@components/registerModal/registerModal";
import {UserClient} from "@api/user";
import {OtpModal} from "@components/otpModal/otpModal";

export const HomePage = () => {
  const location = useLocation();
  const createFormRef = React.createRef<FormInstance>();
  const dispatch = useAppDispatch();
  const {data} = useSelector((state: RootStore) => state.currentUser);
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);
  const [registerVisible, setRegisterVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otpModalVisible, setOtpModalVisible] = useState<boolean>(false);


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
  }, [data]);

  const onLogin = (e) => {
    TokenService.login(e.email, e.password).then(data => {
      if (data?.status === "500" || data?.status === "401") {
        Notifications.error("Kullanıcı adı veya şifre hatalı");
      } else {
        if (data?.requireOtp) {
          setEmail(e.email);
          setPassword(e.password);
          setOtpModalVisible(true);
        } else {
          localStorage.setItem(ISso.ACCESS_TOKEN, (data as ISso.TokenModel).accessToken as string);
          localStorage.setItem(ISso.REFRESH_TOKEN, (data as ISso.TokenModel).refreshToken as string);
          localStorage.setItem(ISso.TOKEN_TYPE, (data as ISso.TokenModel).type as string);
          dispatch(getCurrentUser());
        }
      }
    });
  };

  const register = () => {
    setRegisterVisible(true);
  };

  const onRegister = (e) => {
    UserClient.register(e).then(resp => {
      Notifications.success("Kayıt işlemi başarıyla gerçekleşti.");

      setRegisterVisible(false);
    });
  };

  const onOtpModalCancel = () => {
    setPassword("");
    setEmail("");
    setOtpModalVisible(false);
  }

  const onOtpModalOk = (e) => {
    TokenService.login(email, password, e?.otp).then(data => {
      if (data?.status == "500" || data?.status == "401") {
        Notifications.error("Geçersiz otp !");
      } else {
        localStorage.setItem(ISso.ACCESS_TOKEN, (data as ISso.TokenModel).accessToken as string);
        localStorage.setItem(ISso.REFRESH_TOKEN, (data as ISso.TokenModel).refreshToken as string);
        localStorage.setItem(ISso.TOKEN_TYPE, (data as ISso.TokenModel).type as string);
        dispatch(getCurrentUser());
      }
    });
  }

  return (
    <div id="logo" className={styles.home}>
      <Header/>
      <RegisterModal
        visible={registerVisible}
        onCancel={() => setRegisterVisible(false)}
        onOk={onRegister}
      />
      <OtpModal
        visible={otpModalVisible}
        onCancel={onOtpModalCancel}
        onOk={onOtpModalOk}
      />
      <Form ref={createFormRef} name="control-ref" onFinish={onLogin} style={{paddingLeft: '25%', paddingRight: '25%', marginTop: '25%'}}>
        <div className={styles.grid6and6}>
          <Form.Item name="email">
            <TextInput
              label={getTranslateValue("e-posta", "E-Posta Adresi")}
              name="email"
              placeholder={getTranslateValue("e-posta", "E-Posta Adresi")}
            />
          </Form.Item>
          <Form.Item name="password">
            <TextInput
              label={"Şifre"}
              type={"password"}
              name="password"
              placeholder={"Şifrenizi giriniz"}
            />
          </Form.Item>
        </div>
        <div className={styles.itemCenter}>
          <CustomButton
            label={"Giriş Yap"}
            color="black"
            type={"submit"}
          />
          <CustomButton
            label={"Kayıt Ol"}
            color="black"
            onClick={register}
          />
        </div>
      </Form>
    </div>
  );
};
