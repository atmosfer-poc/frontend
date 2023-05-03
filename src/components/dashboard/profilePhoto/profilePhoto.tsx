import React from "react";
import styles from "./profilePhoto.module.scss";
import UserImage from "@assets/images/manuelUser.svg";
import { getTranslateValue } from "@components/translate/Language";
import { Upload, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";

interface Props {
  profilePhotoBase64: string;
  uploadNewPhoto: (file: RcFile | undefined) => void;
  removePhoto: () => void;
}

export const ProfilePhoto = (props: Props) => {
  const data: UploadProps = {
    name: "file",
    maxCount: 1,
    multiple: false,
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== "uploading") {
        props.uploadNewPhoto(info.file.originFileObj);
      }
      if (info.file.status === "done") {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className={styles.profilePhoto}>
      <img
        src={props.profilePhotoBase64 ? props.profilePhotoBase64 : UserImage}
        alt="icon"
      />
      <div>
        <div className={styles.title}>
          <span>{getTranslateValue("profile-photo", "Ürün Fotoğrafı")}</span>
          <div>
            <Upload accept={".png,.jpg"} {...data}>
              <a>{getTranslateValue("profile-photo-change", "Değiştir")}</a> /
            </Upload>{" "}
            <a onClick={props.removePhoto}>
              {getTranslateValue("profile-photo-remove", "Kaldır")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
