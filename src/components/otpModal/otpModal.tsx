import React, {useEffect} from "react";
import {FormInstance} from "antd/es/form";
import {Form, Modal} from "antd";
import styles from "@components/registerModal/eulaModal.module.scss";
import {TextInput} from "@components/dashboard/textInput/textInput";
import {Button as CustomButton} from "@components/button/button";

export const OtpModal = (props: Props) => {
  const createFormRef = React.createRef<FormInstance>();

  useEffect(() => {
    if (props.visible) {
      createFormRef.current?.resetFields();
    }
  }, [props.visible])

  return (
    <Modal visible={props.visible} onCancel={props.onCancel} footer closable={true}>
      <Form ref={createFormRef} name="control-ref" onFinish={props.onOk}>
        <div style={{marginTop: '20px'}} className={styles.grid6and6}>
          <Form.Item name="otp">
            <TextInput
                label={''}
                type={'password'}
                name="otp"
                placeholder={"OTP Değerini Giriniz"}
            />
          </Form.Item>
        </div>
        <div className={styles.itemCenter}>
          <CustomButton
            label={"Onaylıyorum"}
            color="black"
            type={"submit"}
          />
        </div>
      </Form>
    </Modal>
  );
}

interface Props {
  visible: boolean;
  onOk: any;
  onCancel: any;
}
