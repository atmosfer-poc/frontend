import {notification, Spin} from "antd";
import notificationCheck from "../../assets/images/notification-check.svg";
import React from "react";
import notificationError from "../../assets/images/notification-error.svg";
import {IUser} from "@common/interfaces/user";
import {LoadingOutlined} from "@ant-design/icons";

export namespace Notifications {
  export const success = (msg?: string) => {
    let device = window.innerWidth > 1024;

    notification["success"]({
      message: "Bilgilendirme",
      description: (
        <>
          <span> {msg ? msg : 'İşlem başarıyla tamamlandı.'}</span>

          {/*<strong>mehmet.ozmen@turkcell.com.tr</strong>{" "}
          <span> {getTranslateValue("user-management-reset-password")}.</span>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />*/}
        </>
      ),
      icon: <img src={notificationCheck} />,
      placement: device ? "bottomLeft" : "top",
      duration: 20,
      maxCount: 2,
      style: {
        width: 420,
      },
    });
  }

  export const error = (msg: string) => {
    let device = window.innerWidth > 1024;

    notification["error"]({
      message: "Hata",
      description: (
        <>
          <span> {msg}</span>
        </>
      ),
      icon: <img src={notificationError} />,
      placement: device ? "bottomLeft" : "top",
      duration: 20,
      maxCount: 2,
      style: {
        width: 420,
      },
    });
  }

  export const notifyAsyncProcess = (info: IUser.AsyncProcessInfo) => {
    let device = window.innerWidth > 1024;
    const title = info.type === IUser.AsyncProcessType.USER_IMPORT_FROM_EXCEL ? "Excel ile Ekle" : 'Bilgilendirme';

    let content;
    if (info.continue) {
      content = (
        <>
          <span> Kişiler <strong>{info.fileName}</strong> dosyasından içe aktarılıyor... <strong>({info.errorCount + info.successCount}/{info.errorCount + info.successCount + info.pendingCount})</strong></span>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </>
      )
    } else {
        content = (
          <span> <strong>{info.successCount}</strong> kişi <strong>{info.fileName}</strong> dosyasından içe aktarıldı, <strong>{info.errorCount}</strong> kişi aktarılamadı.</span>
        )
    }
    notification.close(IUser.AsyncProcessType.USER_IMPORT_FROM_EXCEL);
    notification["success"]({
      key: IUser.AsyncProcessType.USER_IMPORT_FROM_EXCEL,
      message: title,
      description: (
        <>
          {content}
        </>
      ),
      icon: <img src={notificationCheck} />,
      placement: device ? "bottomLeft" : "top",
      duration: 70,
      style: {
        width: 420,
      },
    });
  }

  export const unexpectedError = () => {
    let device = window.innerWidth > 1024;

    notification["error"]({
      message: "Beklenmeyen Hata",
      description: (
        <>
          <span> Beklenmeyen bir hata ile karşılaşıldı. Lütfen sistem yöneticinize başvurunuz.</span>
        </>
      ),
      icon: <img src={notificationError} />,
      placement: device ? "bottomLeft" : "top",
      duration: 20,
      maxCount: 2,
      style: {
        width: 420,
      },
    });
  }

  export const sessionExpire = () => {
    let device = window.innerWidth > 1024;

    notification["error"]({
      message: "Bilgilendirme",
      description: (
        <>
          <span> Oturum süreniz sona ermiştir. Devam etmek için tekrar giriş yapınız.</span>
        </>
      ),
      icon: <img src={notificationError} />,
      placement: device ? "bottomLeft" : "top",
      duration: 20,
      maxCount: 2,
      style: {
        width: 420,
      },
    });
  }

  export const notFound = () => {
    let device = window.innerWidth > 1024;

    notification["error"]({
      message: 'Bilgilendirme',
      description: (
        <>
          <span> Uygun veri bulunamadı.</span>
        </>
      ),
      icon: <img src={notificationError} />,
      placement: device ? "bottomLeft" : "top",
      duration: 20,
      maxCount: 2,
      style: {
        width: 420,
      },
    });
  }
}