import React, {useEffect, useState} from "react";
import {FormInstance} from "antd/es/form";
import {Card, Form} from "antd";
import styles from "@components/registerModal/eulaModal.module.scss";
import {TextInput} from "@components/dashboard/textInput/textInput";
import {getTranslateValue} from "@components/translate/Language";
import {Button as CustomButton} from "@components/button/button";
import {ProfilePhoto} from "@components/dashboard/profilePhoto/profilePhoto";
import {Notifications} from "../../services/notifications";
import {ProductClient} from "@api/product";

export const ProductAdd = () => {
  const createFormRef = React.createRef<FormInstance>();
  const [file, setFile] = useState<any>(null);
  const [fileBase64, setFileBase64] = useState<string>("");

  const save = (e) => {
    if (!file) {
      Notifications.error("Resim girişi zorunludur.");
    } else {
      ProductClient.addProduct(file, e).then(resp => {
        Notifications.success();
        setFile(null);
        setFileBase64("");
        createFormRef.current?.resetFields();
      });
    }
  }

  const uploadNewFile = (file: any) => {
    setFile(file);
    toBase64(file).then((resp) => {
      setFileBase64(resp as string);
    });
  };

  const removeFile = () => {
    setFile(null);
    setFileBase64("");
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });


  return (
    <div  style={{marginTop: '100px', padding: '30px'}}>
      <Form ref={createFormRef} name="control-ref" onFinish={save}>
        <div className={styles.grid6and6}>
          <Form.Item name="name">
            <TextInput
              label={getTranslateValue("user-management-form-name", "Ürün Adı")}
              name="name"
            />
          </Form.Item>
          <Form.Item name="description">
            <TextInput
              label={getTranslateValue(
                "user-management-form-surname",
                "Ürün Açıklaması"
              )}
              name="surname"
            />
          </Form.Item>
        </div>
        <div className={styles.grid6and6}>
          <Form.Item name="price">
            <TextInput
              label={getTranslateValue(
                "user-management-form-surname",
                "Ürün Fiyatı"
              )}
              type={'number'}
              name="price"
            />
          </Form.Item>
          <Form.Item name="profile">
            <ProfilePhoto
              profilePhotoBase64={fileBase64}
              uploadNewPhoto={(file) => uploadNewFile(file)}
              removePhoto={removeFile}
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
    </div>
  )
}