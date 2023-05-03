import React, {useEffect, useRef} from "react";
import styles from "./eulaModal.module.scss";
import {Button as CustomButton} from "@components/button/button";
import {Form, Modal} from "antd";
import {getTranslateValue} from "@components/translate/Language";
import {TextInput} from "@components/dashboard/textInput/textInput";
import InputMask from "react-input-mask";
import {FormInstance} from "antd/es/form";

export const RegisterModal = (props: Props) => {
  const createFormRef = React.createRef<FormInstance>();

  useEffect(() => {
    if (props.visible) {
      createFormRef.current?.resetFields();
    }
  }, [props.visible])

  return (
    <Modal visible={props.visible} onCancel={props.onCancel} footer closable={true}>
      <Form ref={createFormRef} name="control-ref" onFinish={props.onOk}>
        <div className={styles.grid6and6}>
          <Form.Item name="name">
            <TextInput
              label={getTranslateValue("user-management-form-name", "Ad")}
              name="name"
              placeholder={getTranslateValue(
                "user-management-form-name",
                "user-management-form-name"
              )}
            />
          </Form.Item>
          <Form.Item name="surname">
            <TextInput
              label={getTranslateValue(
                "user-management-form-surname",
                "Soyadı"
              )}
              name="surname"
              placeholder={getTranslateValue(
                "user-management-form-surname",
                "Soyadı"
              )}
            />
          </Form.Item>
        </div>
        <div className={styles.grid6and6}>
          <Form.Item name="msisdn">
            <InputMask
              mask="\90 599 999 99 99"
              id="msisdn"
              name="msisdn"
              placeholder={getTranslateValue(
                "user-management-form-phone",
                "Telefon No"
              )}
              type="text"
              className={styles.phoneInput}
            />
          </Form.Item>
          <Form.Item name="email">
            <TextInput
              label={getTranslateValue("e-posta", "E-Posta Adresi")}
              name="email"
              placeholder={getTranslateValue("e-posta", "E-Posta Adresi")}
            />
          </Form.Item>
        </div>
        <div className={styles.grid6and6}>
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
            label={getTranslateValue("save", "Kaydet")}
            color="black"
            type={"submit"}
          />
        </div>
      </Form>
    </Modal>
  );
};

interface Props {
  visible: boolean;
  onOk?: any;
  onCancel: any;
}
