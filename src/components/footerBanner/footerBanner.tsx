import React from "react";
import styles from "../footer/footer.module.scss";
import { getTranslateValue } from "../translate/Language";

export const FooterBanner = () => {
  return (
    <div className={styles.footerArea}>
      <div className={styles.footerBanner}>
        <div>
          <p>
            {getTranslateValue(
              "footer-banner",
              "Work on big ideas seamlessly lorem ipsum."
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
