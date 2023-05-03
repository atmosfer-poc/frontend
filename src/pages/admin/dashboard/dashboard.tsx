import React, { useEffect } from "react";
import styles from "./dashboard.module.scss";
import userText from "../../../assets/images/tilted-text-user.svg";
import userLeft from "../../../assets/images/user-left-background.svg";
import userRight from "../../../assets/images/user-right-background.svg";
import userTop from "../../../assets/images/user-top-background.svg";
import packagesText from "../../../assets/images/tilted-text-packages.svg";
import packagesLeft from "../../../assets/images/packages-left-background.svg";
import packagesRight from "../../../assets/images/packages-right-background.svg";
import packagesTop from "../../../assets/images/packages-top-background.svg";
import arrowUp from "../../../assets/images/arrow-up.svg";
import yaani15141 from "../../../assets/images/yaanimail-151x41.png";
import bip15141 from "../../../assets/images/bipmeet-151x41.png";
import lifebox15141 from "../../../assets/images/lifebox-151x41.jpeg";
import { getTranslateValue } from "@components/translate/Language";
import { getSubscriptionUserCount } from "@redux/actions/subscription-user-actions";
import { Type } from "@common/interfaces/type";
import { RootStore, useAppDispatch } from "@redux/store";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@redux/actions/sso-actions";

export const AdminDashboard = () => {
  const dispatch = useAppDispatch();

  const { data, loading } = useSelector(
    (state: RootStore) => state.subscriptionUserCount
  );

  const parameters = useSelector((state: RootStore) => state.parameters);
  const currentUser = useSelector((state: RootStore) => state.currentUser);

  useEffect(() => {
    dispatch(getCurrentUser());

    if (!loading) {
      dispatch(
        getSubscriptionUserCount({
          period: Type.PeriodType.THIS_MONTH,
        })
      );
    }
  }, []);

  return (
    <div className={styles.panel + " " + styles.white}>
      <div className={styles.adminPanel}>
        <div className={styles.title}>
          <div>
            <strong>
              {getTranslateValue("dashboard-page-title", "İşte Suit")}{" "}
            </strong>
            {getTranslateValue("loginheader", "Yönetim Paneli")}
          </div>
          <h1>{currentUser?.data?.companyName}</h1>
        </div>
        <div className={styles.adminCards}>
          <div className={styles.card}>
            <h2>
              {getTranslateValue(
                "dashboard-active-users",
                "Aktif Kullanıcı Sayısı"
              )}
            </h2>
            <p>
              {getTranslateValue(
                "dashboard-continuing-users",
                "Aktif statüde İşte Suit aboneliği kullanımına devam eden kullanıcılarınızın sayısı"
              )}
            </p>
            <div className={styles.count} style={{ marginTop: "35px" }}>
              {data?.activeUserCount ? data?.activeUserCount : "-"}{" "}
              {data?.activeUserCount && (
                <small> {getTranslateValue("person", "Kişi")}</small>
              )}
            </div>
            <img src={userText} className={styles.cardText} />
            <img src={userTop} className={styles.cardTop} />
            <img src={userLeft} className={styles.cardLeft} />
            <img src={userRight} className={styles.cardRight} />
          </div>
          <div className={styles.card}>
            <h2>{getTranslateValue("header-packages", "Paketler")}</h2>
            <p>
              {getTranslateValue(
                "dashboard-paid-users",
                "Satın alınmış olan İşte Suit aboneliklerinizin sayısı"
              )}
            </p>
            <div className={styles.packages}>
              <div>
                <a href="#">
                  {getTranslateValue(
                    "dashboard-istesuit-basic",
                    "İşte Suit Basic"
                  )}
                </a>
                <div className={styles.count}>
                  {data?.basicLicenceCount}{" "}
                  <small>
                    {getTranslateValue("dashboard-package-licence", "Lisans")}
                  </small>
                </div>
              </div>
              <div>
                <a>
                  {getTranslateValue(
                    "dashboard-istesuit-premium",
                    "İşte Suit Premium"
                  )}
                </a>
                <div className={styles.count}>
                  {data?.premiumLicenceCount}{" "}
                  <small>
                    {getTranslateValue("dashboard-package-licence", "Lisans")}
                  </small>
                </div>
              </div>
            </div>
            <img src={packagesText} className={styles.cardText} />
            <img src={packagesTop} className={styles.cardTop} />
            <img src={packagesLeft} className={styles.cardLeft} />
            <img src={packagesRight} className={styles.cardRight} />
          </div>
        </div>
        <div className={styles.panels}>
          <h1>
            {getTranslateValue("sidebar-admin-panels", "Yönetim Panelleri")}
          </h1>
          <p>
            {getTranslateValue(
              "connection-settings-admin-panel-content",
              "İşte Suit ürünü ile bağlantılı olarak kullanabildiğiniz uygulamalara ait ayar ve düzenlemeleri ilgili uygulamaların yönetim panelinden yapmak için yönlendirme linklerine tıklayabilirsiniz."
            )}
          </p>
          <div className={styles.links}>
            <a
              className={styles.externalLink}
              href={parameters?.data?.yaaniMailAdminUrl}
              target="_blank"
            >
              <img src={yaani15141} alt="" />
              <img src={arrowUp} alt="" />
            </a>
            <a
              className={styles.externalLink}
              href={parameters?.data?.lifeBoxAdminUrl}
              target="_blank"
            >
              <img src={lifebox15141} alt="" />
              <img src={arrowUp} alt="" />
            </a>
            <a
              className={styles.externalLink}
              href={parameters?.data?.bipMeetAdminUrl}
              target="_blank"
            >
              <img src={bip15141} alt="" />
              <img src={arrowUp} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
