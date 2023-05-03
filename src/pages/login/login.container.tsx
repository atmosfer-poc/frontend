import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Notifications } from "../../services/notifications";
import { RootStore, useAppDispatch } from "@redux/store";
import {
  clearAuthState,
  getCurrentUser,
  logout,
  validateToken,
} from "@redux/actions/sso-actions";
import { useSelector } from "react-redux";
import { IAccount } from "@common/interfaces/account";
import styles from "@components/loginHeader/loginHeader.module.scss";
import attention from "@assets/images/attention.svg";
import { getTranslateValue } from "@components/translate/Language";
import { Modal } from "antd";

export const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { completed } = useSelector((state: RootStore) => state.logout);

  const [isSuiteUser, setIsSuiteUser] = useState<boolean>(true);
  const { data, loading } = useSelector((state: RootStore) => state.sso);

  const user = useSelector((state: RootStore) => state.currentUser);

  useEffect(() => {
    if (completed) {
      navigate("/");
    }
  }, [completed]);

  useEffect(() => {
    if (data.accessToken) {
      dispatch(getCurrentUser());
    }
  }, [data.accessToken]);

  useEffect(() => {
    if (user?.data?.userId) {
      if (!user.data.userChannels.includes(IAccount.ChannelType.SUITE)) {
        setIsSuiteUser(false);
      } else {
        setIsSuiteUser(true);
        navigate("/welcome");
      }
    }
  }, [user]);

  useEffect(() => {
    const query = new URLSearchParams(searchParams) as any;
    const resultCode = query.get("resultCode");
    const resultName = query.get("resultName");
    const token = query.get("token");

    if (token) {
      if (!loading && !data.accessToken) {
        dispatch(validateToken(token));
      }
    } else if (resultCode && resultName) {
      // TODO: bilal : burada hata mesajı farklı gösterilebilir
      Notifications.unexpectedError();
      navigate("/");
    } else {
      Notifications.unexpectedError();
      navigate("/");
    }
  }, []);

  const cancelSingleUserWarnModal = () => {
    setIsSuiteUser(true);
    dispatch(logout());
    dispatch(clearAuthState());
  };

  return (
    <div className={"center"}>
      {isSuiteUser ? (
        <LoadingOutlined style={{ fontSize: 50 }} spin />
      ) : (
        <Modal
          visible={!isSuiteUser}
          onCancel={cancelSingleUserWarnModal}
          footer
          closable={true}
          centered={true}
        >
          <div className={styles.itemCenter + " " + styles.adminModal}>
            <img src={attention} alt="" />
            <h3>
              {getTranslateValue(
                "not-suit-user-modal-header",
                "İşte Suit Kullanıcınız Bulunmamaktadır"
              )}
            </h3>
            <p className={styles.modalDescription}>
              {getTranslateValue(
                "not-suit-user-modal-description",
                "İşte Suit aboneliğiniz bulunmamaktadır. Tekil aboneliğiniz olduğu üründen giriş yapınız."
              )}
            </p>
            <a onClick={cancelSingleUserWarnModal}>
              {" "}
              {getTranslateValue("loginheader-sign-out", "Oturumu Kapat")}{" "}
            </a>
          </div>
        </Modal>
      )}
    </div>
  );
};
