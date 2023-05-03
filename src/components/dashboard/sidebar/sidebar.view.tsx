import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { getTranslateValue } from "@components/translate/Language";
import ConnectionSettingsIcon from "@assets/icons/connectionSettingsIcon.svg";
import ConnectionSettingsIconActive from "@assets/icons/connectionSettingsIconActive.svg";
import PackageManagementIcon from "@assets/icons/packageManagementIcon.svg";
import PackageManagementIconActive from "@assets/icons/packageManagementIconActive.svg";
import SsoLoginSettingsIcon from "@assets/icons/ssoLoginSettingsIcon.svg";
import SsoLoginSettingsIconActive from "@assets/icons/ssoLoginSettingsIconActive.svg";
import UserManagementIcon from "@assets/icons/userManagementIcon.svg";
import UserManagementIconActive from "@assets/icons/userManagementIconActive.svg";
import AdminPanelsIcon from "@assets/icons/adminPanelsIcon.svg";
import AdminPanelsIconActive from "@assets/icons/adminPanelsIconActive.svg";
import HomePageIcon from "@assets/icons/homePageIcon.svg";
import HomePageIconActive from "@assets/icons/homePageIconActive.svg";
import ArrowUpIcon from "@assets/images/arrow-up.svg";
import DirectionArrowImage from "@assets/images/direction-arrow.png";
import LifeboxImage from "@assets/images/lifebox-dashboard.png";
import YaaniImage from "@assets/images/yaani-dashboard.png";
import BipImage from "@assets/images/bip-dashboard.png";
import styles from "./sidebar.module.scss";

export const SidebarView = (props: Props) => {
  const { isAdmin, documents } = props;
  const [height, setHeight] = useState("100vh");
  document.addEventListener("scroll", () => {
    setHeight(
      `calc(${document.querySelector("#mainSection div")?.scrollHeight}px)`
    );
  });
  const renderContent = () => {
    if (isAdmin && !documents) {
      return (
        <div
          className={styles.sidebar + " " + styles.admin}
          style={{
            height: height,
          }}
        >
          <div
            className={styles.sidebarFixer}
            style={{
              height: height,
            }}
          >
            <div>
              <NavLink
                end
                to="/admin/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                {(prop) => (
                  <>
                    <img
                      src={prop.isActive ? HomePageIconActive : HomePageIcon}
                      alt="icon"
                    />
                    <div>
                      {getTranslateValue("sidebar-home-page", "Anasayfa")}
                    </div>
                  </>
                )}
              </NavLink>
              <NavLink
                end
                to="/admin/user-management"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                {(prop) => (
                  <>
                    <img
                      src={
                        prop.isActive
                          ? UserManagementIconActive
                          : UserManagementIcon
                      }
                      alt="icon"
                    />
                    <div className={styles.linkTitle}>
                      {getTranslateValue(
                        "sidebar-user-management",
                        "Kullanıcı Yönetimi"
                      )}
                      <span>
                        {getTranslateValue(
                          "sidebar-add-user-manage",
                          "Kullancı Ekle, Yönet"
                        )}
                      </span>
                    </div>
                  </>
                )}
              </NavLink>
              <NavLink
                end
                to="/admin/package-management"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                {(prop) => (
                  <>
                    <img
                      src={
                        prop.isActive
                          ? PackageManagementIconActive
                          : PackageManagementIcon
                      }
                      alt="icon"
                    />
                    <div className={styles.linkTitle}>
                      {getTranslateValue(
                        "sidebar-package-management",
                        "Paket Yönetimi"
                      )}
                      <span>
                        {getTranslateValue(
                          "sidebar-package-history-invoices",
                          "Paket Bilgileriniz"
                        )}
                      </span>
                    </div>
                  </>
                )}
              </NavLink>
              <NavLink
                end
                to="/admin/connection-settings"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                {(prop) => (
                  <>
                    <img
                      src={
                        prop.isActive
                          ? ConnectionSettingsIconActive
                          : ConnectionSettingsIcon
                      }
                      alt="icon"
                    />
                    <div className={styles.linkTitle}>
                      {getTranslateValue(
                        "sidebar-connection-settings",
                        "Bağlantı Ayarları"
                      )}
                      <span>
                        {getTranslateValue(
                          "sidebar-ldap-settings",
                          "LDAP Ayarları, Domain Ayarları"
                        )}
                      </span>
                    </div>
                  </>
                )}
              </NavLink>
              <NavLink
                end
                to="/admin/login-settings"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                {(prop) => (
                  <>
                    <img
                      src={
                        prop.isActive
                          ? SsoLoginSettingsIconActive
                          : SsoLoginSettingsIcon
                      }
                      alt="icon"
                    />
                    <div className={styles.linkTitle}>
                      {getTranslateValue(
                        "sidebar-login-settings",
                        "Giriş Ayarları"
                      )}
                      <span>
                        {getTranslateValue(
                          "sidebar-active-sessions",
                          "Aktif oturumlar, 2FA ayarları"
                        )}
                      </span>
                    </div>
                  </>
                )}
              </NavLink>
            </div>
            <div className={styles.adminPanels}>
              <a>
                <img src={AdminPanelsIcon} alt="icon" />
                <div>
                  {getTranslateValue(
                    "sidebar-admin-panels",
                    "Yönetim Panelleri"
                  )}
                </div>
              </a>
              <div className={styles.links}>
                <a href={props?.yaaniMailUrl} target="_blank">
                  {getTranslateValue(
                    "sidebar-yaanimail",
                    "YaaniMail Admin Panel"
                  )}
                  <img
                    className={styles.DirectionArrowImage}
                    width={12}
                    height={12}
                    src={DirectionArrowImage}
                    alt=""
                  />
                </a>
                <a href={props?.lifeBoxUrl} target="_blank">
                  {getTranslateValue(
                    "sidebar-lifebox",
                    "Lifebox Bus. Admin Panel"
                  )}
                  <img
                    className={styles.DirectionArrowImage}
                    width={12}
                    height={12}
                    src={DirectionArrowImage}
                    alt=""
                  />
                </a>
                <a href={props?.bipMeetUrl} target="_blank">
                  {getTranslateValue("sidebar-bipmeet", "BipMeet Admin Panel")}
                  <img
                    className={styles.DirectionArrowImage}
                    width={12}
                    height={12}
                    src={DirectionArrowImage}
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.sidebar}>
        <div className={styles.title}>
          {getTranslateValue("fast-access", "Hızlı Erişim")}
        </div>
        <div className={styles.linkArea}>
          <a
            className={styles.externalLink}
            href={props?.yaaniMailUrl}
            target="_blank"
          >
            <img src={YaaniImage} alt="" />
            <img src={ArrowUpIcon} alt="" />
          </a>
          <a
            className={styles.externalLink}
            href={props?.lifeBoxUrl}
            target="_blank"
          >
            <img src={LifeboxImage} alt="" />
            <img src={ArrowUpIcon} alt="" />
          </a>
          <a
            className={styles.externalLink}
            href={props?.bipMeetUrl}
            target="_blank"
          >
            <img src={BipImage} alt="" />
            <img src={ArrowUpIcon} alt="" />
          </a>
        </div>
      </div>
    );
  };

  return <>{renderContent()}</>;
};

interface Props {
  isAdmin: boolean;
  documents: boolean;
  lifeBoxUrl?: string;
  yaaniMailUrl?: string;
  bipMeetUrl?: string;
}
