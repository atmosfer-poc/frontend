import React from "react";
import styles from "./footer.module.scss";
import logoGrey from "@assets/images/logo-grey.svg";
import { getTranslateValue } from "../translate/Language";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <div className={styles.footerBottom}>
      <div className={styles.footerImg}>
        <img src={logoGrey} alt="logo" />
      </div>
      <div className={styles.footerLink}>
        <NavLink to="/elucidation">
          {getTranslateValue("footer-elucation-text", "Aydınlatma Metni")}
        </NavLink>
        <NavLink to="/agreement">
          {getTranslateValue("footer-user-management", "Kullanıcı Sözleşmesi")}
        </NavLink>
        <span>{getTranslateValue("footer-copyright", "İştesuit 2022 ©")}</span>
      </div>
    </div>
  );
};
