import React, {useEffect, useRef} from "react";
import styles from "./eulaModal.module.scss";
import {Button as CustomButton} from "@components/button/button";
import {Form, Modal} from "antd";
import {getTranslateValue} from "@components/translate/Language";
import {TextInput} from "@components/dashboard/textInput/textInput";
import {FormInstance} from "antd/es/form";

export const LoginModal = (props: Props) => {
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
            onClick={props.register}
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
  register: any
}
