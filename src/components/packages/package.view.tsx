import React from "react";
import styles from "./packages.module.scss";
import { Button } from "@components/button/button";
import check from "@assets/images/check.svg";
import { getTranslateValue } from "@components/translate/Language";
export const PackageView = (props: Props) => {
  const { navigateBuyPage } = props;

  return (
    <div id="packages" className={styles.packages}>
      <div className={styles.container}>
        <div className={styles.packagesTitle}>
          <h2>{getTranslateValue("packages-title", "Paketler")}</h2>
          <p>
            {getTranslateValue(
              "packages-subtitle",
              "Paketler arasından ihtiyacınıza en uygun olanı seçebilirsiniz."
            )}
          </p>
        </div>
        <div className={styles.packageArea}>
          <div className={styles.package}>
            <h3>
              {getTranslateValue("dashboard-page-title", "İşte Suit")}{" "}
              <strong>{getTranslateValue("package-basic", "Basic")}</strong>
            </h3>
            <div className={styles.priceArea}>
              <div className={styles.price}>
                {props.basicPackagePrice && (
                  <>
                    <span>{props.basicPackagePrice.split(".")[0]}</span>
                    <span>.{props.basicPackagePrice.split(".")[1]}</span>
                  </>
                )}
                <span>TL</span>
              </div>
              <div className={styles.time}>
                / {getTranslateValue("packages-time", "Aylık")}
              </div>
            </div>
            <ul>
              <li>
                <div>
                  {getTranslateValue(
                    "packages-cloud-email-service",
                    "Bulut E-Posta Hizmeti"
                  )}
                </div>
                <img src={check} alt="" />
              </li>
              <li>
                <div>
                  {getTranslateValue(
                    "packages-cloud-storage-service",
                    "Bulut Depolama Hizmeti"
                  )}
                </div>
                <img src={check} alt="" />
              </li>
              <li>
                <div>
                  {getTranslateValue(
                    "packages-office-applications",
                    "Office Uygulamaları"
                  )}
                </div>
                <img src={check} alt="" />
              </li>
              <li>
                <div>
                  {getTranslateValue(
                    "packages-video-conferencing-service",
                    "Video Konferans Hizmeti"
                  )}
                </div>
                <img src={check} alt="" />
              </li>
              <li>
                <div>
                  {getTranslateValue(
                    "packages-mailbox-area",
                    "Posta Kutusu Alanı"
                  )}
                </div>
                <strong>100 GB</strong>
              </li>
              <li>
                <div>
                  {getTranslateValue(
                    "packages-cloud-storage",
                    "Bulut Depolama Hizmeti"
                  )}
                </div>
                <strong>150 GB</strong>
              </li>
            </ul>
          </div>
          <div className={styles.package}>
            <h3>
              {getTranslateValue("dashboard-page-title", "İşte Suit")}{" "}
              <strong>{getTranslateValue("package-premium", "Premium")}</strong>
            </h3>
            <div className={styles.priceArea}>
              <div className={styles.price}>
                {props.premiumPackagePrice && (
                  <>
                    <span>{props.premiumPackagePrice.split(".")[0]}</span>
                    <span>.{props.premiumPackagePrice.split(".")[1]}</span>
                  </>
                )}
                <span>TL</span>
              </div>
              <div className={styles.time}>
                / {getTranslateValue("packages-time", "Aylık")}
              </div>
            </div>
            <ul>
              <li>
                <div>
                  {getTranslateValue(
                    "packages-cloud-email-service",
                    "Bulut E-Posta Hizmeti"
                  )}
                </div>
                <img src={check} alt="" />
              </li>
              <li>
                <div>
                  {getTranslateValue(
                    "packages-cloud-storage-service",
                    "Bulut Depolama Hizmeti"
                  )}
                </div>
                <img src={check} alt="" />
              </li>
              <li>
                <div>
                  {getTranslateValue(
                    "packages-office-applications",
                    "Office Uygulamaları"
                  )}
                </div>
                <img src={check} alt="" />
              </li>
              <li>
                <div>
                  {getTranslateValue(
                    "packages-video-conferencing-service",
                    "Video Konferans Hizmeti"
                  )}
                </div>
                <img src={check} alt="" />
              </li>
              <li>
                <div>
                  {getTranslateValue(
                    "packages-mailbox-area",
                    "Posta Kutusu Alanı"
                  )}
                </div>
                <strong>100 GB</strong>
              </li>
              <li>
                <div>
                  {getTranslateValue(
                    "packages-cloud-storage",
                    "Bulut Depolama Hizmeti"
                  )}
                </div>
                <strong className={styles.green}>500 GB</strong>
              </li>
            </ul>
          </div>
          <div className={styles.priceKdv}>
            *{" "}
            {getTranslateValue(
              "package-kdv",
              "Belirtilen fiyatlar KDV hariçtir."
            )}
          </div>
        </div>
        <div className={styles.buyCard}>
          <div className={styles.textArea}>
            <h4>{getTranslateValue("packages-buycard", "Hemen Kullan!")}</h4>
            <p>
              {getTranslateValue(
                "packages-textarea",
                "Seçtiğiniz paketi kullanmaya başlamak için tıklayın!"
              )}
            </p>
          </div>
          <Button
            color="black"
            label={getTranslateValue("buy", "Hemen Kullan!")}
            onClick={navigateBuyPage}
          />
        </div>
      </div>
    </div>
  );
};

interface Props {
  navigateBuyPage: () => void;
  basicPackagePrice: any;
  premiumPackagePrice: any;
}
