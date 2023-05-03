import React from "react";
import { getTranslateValue } from "@components/translate/Language";
import AdvantageIcon from "@assets/images/checkmark-filled.svg";
import styles from "./packageCard.module.scss";

export const PackageCard = (props: Props) => {
  const { subscription } = props;

  const getPackageAdvantage = (
    advantageKey: string,
    advantageKeyTranslate: string
  ) => {
    const advantages = getTranslateValue(advantageKey, advantageKeyTranslate);

    return advantages.split(",").map((advantage) => {
      return (
        <div className={styles.featuresItem}>
          <img src={AdvantageIcon} alt="" /> <span>{advantage}</span>
        </div>
      );
    });
  };

  return (
    <div className={styles.packageCard}>
      <div className={styles.packageHeader}>
        <div className={styles.packageTitle}>
          <h1>{subscription.packageName}</h1>
          <div className={styles.packageLicence}>
            {subscription.usedLicenceCount}{" "}
            <sup>{getTranslateValue("active", "Aktif")}</sup> /{" "}
            {subscription.licenceCount}{" "}
            <sup>{getTranslateValue("total", "Toplam")}</sup>
          </div>
          {subscription.status === 2 && (
            <small>
              {getTranslateValue(
                "subscription-suspend-message",
                "subscription-suspend-message"
              )}
            </small>
          )}
        </div>
        {subscription.price && (
          <div className={styles.packagePrice}>
            <span className={styles.colorBlue}>
              {subscription.price} <sup>.00</sup>
            </span>{" "}
            TL / Ay
          </div>
        )}
      </div>
      <div className={styles.packageFeatures}>
        {subscription.packageId === 1
          ? getPackageAdvantage(
              "basic-package-advantage",
              "100GB E-posta, Video Konferans, 150GB Depolama Alanı, Ofis Çözümleri"
            )
          : getPackageAdvantage(
              "premium-package-advantage",
              "100GB E-posta, Video Konferans, 500GB Depolama Alanı, Ofis Çözümleri"
            )}
      </div>
    </div>
  );
};

interface Props {
  subscription: {
    packageName: string;
    usedLicenceCount: number;
    licenceCount: number;
    price: number;
    packageId: number;
    status: number;
  };
}
