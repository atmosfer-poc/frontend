import React, { forwardRef, useEffect, useState } from "react";
import { Form, Modal } from "antd";
import { Button as CustomButton } from "@components/button/button";
import { TextInput } from "@components/dashboard/textInput/textInput";
import ErrorIcon from "@assets/icons/error.svg";
import { getTranslateValue } from "@components/translate/Language";
import { FormInstance } from "antd/es/form";
import styles from "./addDomainModal.module.scss";

export type Ref = FormInstance;

export const AddDomainModal = forwardRef<Ref, Props>((props, ref) => {
  const [domainInputError, setDomainInputError] = useState(false);
  const [modalInputValue, setModalInputValue] = useState("");

  const onChangeDomainModalInput = (e) => {
    const domainRegex =
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

    setModalInputValue(e.target.value);

    if (e.target.value.match(domainRegex)) {
      setDomainInputError(false);
      props.setDomainModalSave(true);
    } else {
      setDomainInputError(true);
    }
  };

  useEffect(() => {
    if (props.visibleDomainModal) {
      setModalInputValue("");
    }
  }, [props.visibleDomainModal]);

  return (
    <Modal
      className="addDomainModal"
      visible={props.visibleDomainModal}
      onCancel={props.clearUpsertModal}
      footer
    >
      <h3>
        {getTranslateValue("connection-setting-add-domain", "Domain Ekle")}
      </h3>
      <Form
        initialValues={props.initialValue}
        ref={ref}
        name="control-ref"
        onFinish={() => props.onFinish(modalInputValue)}
      >
        <Form.Item
          className={`${domainInputError ? "error" : ""}  addDomainFormItem`}
        >
          <TextInput
            label={getTranslateValue("domain", "Alan Adı")}
            placeholder={getTranslateValue("domain-star", "Alan Adı *")}
            name="domainName"
            value={modalInputValue}
            onChange={onChangeDomainModalInput}
          />
          {domainInputError && (
            <>
              <img src={ErrorIcon} alt="error icon" />
              <div className="errorText">
                {getTranslateValue(
                  "add-domain-error",
                  "Alan adınızı doğru girdiğinizden emin olunuz."
                )}
              </div>
            </>
          )}
        </Form.Item>
        <div className={styles.domainModalButton}>
          <CustomButton
            type={"submit"}
            label={getTranslateValue("save", "Kaydet")}
            color="black"
            disabled={!props.domainModalSave || domainInputError}
          />
        </div>
      </Form>
    </Modal>
  );
});

interface Props {
  visibleDomainModal: boolean;
  clearUpsertModal: () => void;
  initialValue: any;
  onFinish: (value: any) => void;
  domainModalSave: boolean;
  setDomainModalSave: (e: boolean) => void;
}
