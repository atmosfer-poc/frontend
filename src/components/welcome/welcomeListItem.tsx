import React from "react";
import Ball from "@assets/images/ball.png";
import { getTranslateValue } from "@components/translate/Language";
import GoLinkIcon from "@assets/images/arrow-up.svg";
import DownloadIcon from "@assets/images/download-blue.svg";
import styles from "./welcomeListItem.module.scss";

export const WelcomeListItem = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.ball}>
        <img src={Ball} alt="ball" />
      </div>
      <div className={styles.logoContainer}>
        <img src={props.logoSrc} alt="logo" />
      </div>
      <div className={styles.textLogoContainer}>
        <img src={props.textLogoSrc} alt="text-logo" />
      </div>
      <div className={styles.description}>{props.description}</div>
      <div className={styles.logoBackground}>
        <img src={props.logoBackgroundSrc} alt="background logo" />
      </div>
      <div className={styles.goLogoLink}>
        <a href={props.downloadLink} className={styles.downloadLink}>
          <div className={styles.top}>
            <img
              className={styles.dowloadIcon}
              src={DownloadIcon}
              alt="download icon"
            />
            <span>{getTranslateValue("dowland", "İndir")}</span>
          </div>
        </a>
        <span className={styles.section} />
        <a href={props.url} target="_blank" className={styles.goLink}>
          <span className={styles.goLinkText}>
            {getTranslateValue("go", "Git")}
          </span>
          <img
            className={styles.goLinkIcon}
            src={GoLinkIcon}
            alt="arrow icon"
          />
        </a>
      </div>
    </div>
  );
};

interface Props {
  logoSrc: string;
  logoBackgroundSrc: string;
  textLogoSrc: string;
  description: string;
  url: string;
  downloadLink: string;
}
