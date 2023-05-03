import React, { forwardRef, useEffect, useState } from "react";
import { getTranslateValue } from "@components/translate/Language";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import { FormInstance } from "antd/es/form";
import { TextInput } from "@components/dashboard/textInput/textInput";
import SuccessIcon from "@assets/images/check-successful.svg";
import RefreshIcon from "@assets/images/refresh.svg";
import { Button as CustomButton } from "@components/button/button";
import { useSelector } from "react-redux";
import { RootStore } from "@redux/store";
import styles from "./addLDAPModal.module.scss";
import { Notifications } from "../../../services/notifications";
import { LdapClient } from "@api/ldap";
import passwordHidden from "@assets/images/password-hidden.svg";
import passwordVisible from "@assets/images/password-visible.svg";

export type Ref = FormInstance;

export const AddLDAPModal = forwardRef<Ref, Props>((props, ref) => {
  const [host, setHost] = useState<any>();
  const [showPassword, setShowPassword] = useState(false);
  const [port, setPort] = useState<any>();
  const [userDn, setUserDn] = useState<any>();
  const [password, setPassword] = useState<any>();
  const authenticationMethodState = useSelector(
    (state: RootStore) => state.authenticationMethod
  );

  useEffect(() => {
    if (props.isModalOpen) {
      (ref as any).current?.resetFields();
      if (props.formInitialValues) {
        setHost(props.formInitialValues.host);
        setPort(props.formInitialValues.port);
        setUserDn(props.formInitialValues.userDn);
      }
    }
  }, [props.isModalOpen]);

  const ldapConnectionTest = () => {
    if (host && port && userDn && password) {
      LdapClient.testConnection({
        url: host + ":" + port,
        userName: userDn,
        password: password,
      })
        .then((resp) => {
          if (resp.error) {
            if (resp.status === "40011") {
              Notifications.error("Host 'ldap://' ile başlamalıdır.");
            } else if (resp.status === "40010") {
              Notifications.error("Bağlantı başarısız oldu.");
            } else if (resp.status === "40009") {
              Notifications.error("Giriş bilgileri hatalı.");
            } else if (resp.status === 500) {
              Notifications.unexpectedError();
            }
          } else {
            props.setConnectionStatus(true);
          }
        })
        .catch(() => {
          Notifications.unexpectedError();
        });
    } else {
      Notifications.error("Host, port, userDn ve şifre girmelisiniz.");
    }
  };

  return (
    <Modal visible={props.isModalOpen} onCancel={props.clearUpsertModal} footer>
      <h3>
        {props.willBeUpdateId
          ? getTranslateValue("ldap-update", "LDAP Güncelle")
          : getTranslateValue("connection-settings-add-ldap", "LDAP Ekle")}
      </h3>
      <Form
        initialValues={props.formInitialValues}
        ref={ref}
        name="control-ref"
        onValuesChange={(e) => {
          if (e.host) {
            setHost(e.host);
          }
          if (e.port) {
            setPort(e.port);
          }
          if (e.userDn) {
            setUserDn(e.userDn);
          }
          if (e.password) {
            setPassword(e.password);
          }
        }}
        onFinish={(e) => {
          if (!e.searchQuery || !e.ssoSearchQuery || !e.searchBase) {
            Notifications.error("Gerekli tüm alanlar doldurulmalıdır.");
          } else {
            props.onFinish(e);
          }
        }}
      >
        <div className={styles.grid6and6}>
          <Form.Item name="host">
            <TextInput
              label={getTranslateValue("add-ldap-host", "Host")}
              placeholder={getTranslateValue("add-ldap-host-star", "Host *")}
              name="host"
            />
          </Form.Item>
          <Form.Item name="port">
            <TextInput
              label={getTranslateValue("add-ldap-port", "Port")}
              placeholder={getTranslateValue("add-ldap-port-star", "Port *")}
              name="port"
            />
          </Form.Item>
        </div>
        <Form.Item name="userDn">
          <TextInput
            label={getTranslateValue("add-lpdap-userdn", "UserDn")}
            placeholder={getTranslateValue("add-lpdap-userdn-star", "UserDn *")}
            name="userDn"
          />
        </Form.Item>
        <div className={styles.grid6and6}>
          <Form.Item className={styles.ldapModalPasswordInput} name="password">
          <div>
            <TextInput
              label={getTranslateValue("password", "Şifre")}
              placeholder={getTranslateValue("password-star", "Şifre *")}
              name="password"
              type={showPassword ? "text" : "password"}
            />
              <img
                onClick={() => setShowPassword(!showPassword)}
                src={showPassword ? passwordHidden : passwordVisible}
                alt="ldapPassword"
              />
            </div>
          </Form.Item>

          <div>
            {props.connectionStatus ? (
              <Button className={styles.successConnection}>
                {getTranslateValue(
                  "connection-settings-successful",
                  "Bağlantı başarılı"
                )}
                <img src={SuccessIcon} alt="success icon" />
              </Button>
            ) : (
              <Button
                onClick={ldapConnectionTest}
                className={styles.checkConnection}
              >
                {getTranslateValue(
                  "connection-settings-test",
                  "Bağlantıyı test et"
                )}
                <img src={RefreshIcon} alt="Refresh icon" />
              </Button>
            )}
          </div>
        </div>
        <hr />
        <Form.Item name="baseDn">
          <TextInput
            label={getTranslateValue("Base Dn", "Base Dn")}
            placeholder={getTranslateValue("Base Dn", "Base Dn *")}
            name="baseDn"
            disabled={!props.connectionStatus}
          />
        </Form.Item>
        <small className="input-description">
          {getTranslateValue(
            "connection-settings-base",
            "Bind işlemi için kullanılacak model : dc=example, dc=com"
          )}
        </small>
        <Form.Item name="passwordAttribute">
          <TextInput
            label={getTranslateValue(
              "add-ldap-password-attribute",
              "Password Attribute"
            )}
            placeholder={getTranslateValue(
              "add-ldap-password-attribute",
              "Password Attribute"
            )}
            name="passwordAttribute"
            disabled={!props.connectionStatus}
          />
        </Form.Item>
        <small className="input-description">
          {getTranslateValue(
            "connection-settings-password-attribute",
            "LDAP’tan aranacak LDAP kaynağı modeli : ou=users, dc=example, dc=com"
          )}
        </small>

        <Form.Item name="searchBase">
          <TextInput
            label={getTranslateValue("add-ldap-search-base", "Search")}
            placeholder={getTranslateValue("add-ldap-search-base", "Search")}
            name="searchBase"
            disabled={!props.connectionStatus}
          />
        </Form.Item>
        <small className="input-description">
          {getTranslateValue(
            "connection-settings-password-attribute",
            "LDAP’tan aranacak LDAP kaynağı modeli : ou=users, dc=example, dc=com"
          )}
        </small>
        <Form.Item name="searchQuery">
          <TextInput
            label={getTranslateValue("add-ldap-search-query", "Search Query")}
            placeholder={getTranslateValue(
              "add-ldap-search-query",
              "Search Query"
            )}
            name="searchQuery"
            disabled={!props.connectionStatus}
          />
        </Form.Item>
        <small className="input-description">
          {getTranslateValue(
            "connection-settings-search-query",
            "Arama yapılırken kullanılacak model : ((uid={USER})(mail={USER})). Mail kısmına kullanıcının LDAP’ında bulunan mail özdeğeri girilmelidir."
          )}
        </small>
        <Form.Item required name="ssoSearchQuery">
          <TextInput
            label={getTranslateValue(
              "add-ldap-sso-search-query",
              "SSO Search Query"
            )}
            placeholder={getTranslateValue(
              "add-ldap-sso-search-query",
              "SSO Search Query"
            )}
            name="ssoSearchQuery"
            disabled={!props.connectionStatus}
          />
        </Form.Item>
        <small className="input-description">
          {getTranslateValue("connection-settings-sso-search-query", "")}
        </small>
        <Form.Item name="emailDnFilter">
          <TextInput
            label={getTranslateValue(
              "add-ldap-email-dn-filter",
              "EmailDnFilter"
            )}
            placeholder={getTranslateValue(
              "add-ldap-email-dn-filter",
              "EmailDnFilter"
            )}
            name="emailDnFilter"
            disabled={!props.connectionStatus}
          />
        </Form.Item>
        <small className="input-description">
          {getTranslateValue(
            "connection-settings-e-posta-search-query",
            "E-posta araması için kullanılacak model. “EmailDnFilter” : “{parametre adı} = %n” her kullanıcının e-postası içindir."
          )}
        </small>

        <div className="item-center">
          {authenticationMethodState.loading ? (
            <div className={"center"}>
              <LoadingOutlined style={{ fontSize: 50 }} spin />
            </div>
          ) : (
            <CustomButton
              type={"submit"}
              label={getTranslateValue("save", "Kaydet")}
              color="black"
              disabled={!props.connectionStatus}
            />
          )}
        </div>
      </Form>
    </Modal>
  );
});

interface Props {
  isModalOpen: boolean;
  clearUpsertModal: () => void;
  willBeUpdateId: number;
  formInitialValues: any;
  onFinish: (values: any) => void;
  connectionStatus: boolean;
  setConnectionStatus: (e: boolean) => void;
}
