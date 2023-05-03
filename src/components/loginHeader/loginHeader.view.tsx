import {Col, Modal, Row} from "antd";
import React, {useEffect, useState} from "react";
import styles from "./loginHeader.module.scss";
import logo from "../../assets/images/logo.png";
import menu from "../../assets/images/menu.svg";
import closeMenu from "../../assets/images/close-menu.svg";
import rosette from "../../assets/images/rosette.png";
import notificationIcon from "../../assets/images/notification-icon.svg";
import {getTranslateValue} from "@components/translate/Language";
import {ISso} from "@common/interfaces/sso";
import {RoleChecker} from "../../services/role-checker";
import {useNavigate} from "react-router-dom";
import attention from "@assets/images/attention.svg";

export const LoginHeaderView = (props: Props) => {
  const {fixed, lastScroll, menuOpen, setMenuOpen, setFixed, setLastScroll} =
    props;
  const [contentsOpen, setContentsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const checkAdmin = RoleChecker.checkRole(props.user, [
    ISso.UserRole.ADMIN,
    ISso.UserRole.TENANT_MANAGER,
  ]);

  useEffect(() => {
    setIsAdmin(checkAdmin);
    setIsUser(!checkAdmin);
  }, [props.user]);

  const stickyNavigation = function () {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 30) {
      setFixed(false);
      return;
    }
    if (currentScroll > lastScroll && !fixed) {
      setFixed(true);
    }
    setLastScroll(currentScroll);
  };

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const dropdownChange = () => {
    if (contentsOpen === false) {
      setOpenDropdown(false);
    }
  };

  window.addEventListener("scroll", stickyNavigation);

  return (
    <div className={styles.header}>
      <div
        className={fixed ? styles.loginHeaderBackground : styles.loginHeader}
      >
        <img
          style={{cursor: "pointer"}}
          onClick={() => navigate("/welcome")}
          src={logo}
          alt="logo"
          width={93}
        />
        <div className={styles.dropdownHeader}>
          {menuOpen && (
            <div
              onClick={() => {
                setMenuOpen(false);
                setContentsOpen(false);
              }}
              className={styles.mobileBackground}
            />
          )}
          {contentsOpen && (
            <div
              onClick={() => setContentsOpen(false)}
              className={styles.webBackground}
            />
          )}
          <div className={styles.headerItem}>
            <img
              onClick={() => {
                handleMenu();
                setContentsOpen(true);
              }}
              className={styles.menuToggle}
              src={menuOpen ? closeMenu : menu}
            />
          </div>
          {isUser && (
            <div onClick={() => setContentsOpen(!contentsOpen)}>
              <span className={styles.dropdownName}>
                {props.user.userFullname}
              </span>
              <span className={styles.dropdownNameAbbreviation}>
                {props.user?.shortName}
              </span>
              {contentsOpen && (
                <ul className={menuOpen ? styles.userShow : styles.userHide}>
                  <li className={styles.titleDropdown}>
                    <a onClick={() => navigate("/welcome")}>
                      <Row>
                        <Col xs={2} md={1} sm={2} xl={4}>
                          <span
                            className={styles.titleDropdownNameAbbreviation}
                          >
                            {props.user?.shortName}
                          </span>
                        </Col>
                        <Col
                          xs={14}
                          md={20}
                          sm={20}
                          xl={18}
                          className={styles.downDropdownNameCol}
                        >
                          <span className={styles.downDropdownName}>
                            {props.user?.userFullname}
                          </span>
                          <br/>
                          <p>{props.user?.mail}</p>
                        </Col>
                      </Row>
                    </a>
                  </li>
                  <li onClick={props.logout}>
                    <a>
                      {getTranslateValue(
                        "loginheader-sign-out",
                        "Oturumu Kapat"
                      )}
                    </a>
                  </li>
                </ul>
              )}
            </div>
          )}
          {isAdmin && (
            <>
              <div
                className={styles.headerLocation}
                onClick={() => {
                  setContentsOpen(!contentsOpen);
                  dropdownChange();
                }}
              >
                <span className={styles.dropdownName}>
                  {props.user?.userFullname}
                </span>
                <span
                  className={
                    hasNotification
                      ? styles.loginHeaderNotification
                      : styles.displayNone
                  }
                >
                  3{" "}
                  {getTranslateValue(
                    "loginheader-new-notification",
                    "Yeni Bildirim"
                  )}
                </span>
                <span
                  className={
                    hasNotification
                      ? styles.hasNotificationBorder
                      : styles.dropdownNameAbbreviation
                  }
                >
                  {props.user?.shortName}
                </span>
                <img
                  className={
                    hasNotification
                      ? styles.notificationIcon
                      : styles.displayNone
                  }
                  src={notificationIcon}
                  alt="notificationIcon"
                  width="16"
                />
                <img
                  className={styles.adminDropdownRosette}
                  src={rosette}
                  alt="adminDropdownRosette "
                  width="14"
                />
              </div>
              {contentsOpen && (
                <ul className={menuOpen ? styles.show : styles.hide}>
                  <li className={styles.titleDropdown}>
                    <a>
                      <Row>
                        <Col xs={2} md={4} sm={2} xl={4}>
                          <span
                            className={styles.titleDropdownNameAbbreviation}
                          >
                            {props.user?.shortName}
                          </span>
                          <img
                            className={styles.adminDownDropdownRosette}
                            src={rosette}
                            alt="adminDownDropdownRosette"
                            width="16"
                          />
                        </Col>
                        <Col
                          xs={14}
                          md={18}
                          sm={18}
                          xl={18}
                          className={styles.downDropdownNameCol}
                        >
                          <span className={styles.downDropdownName}>
                            {props.user?.userFullname} <span>(Admin)</span>
                          </span>
                          <br/>
                          <p>{props.user?.mail}</p>
                        </Col>
                      </Row>
                    </a>
                  </li>
                  <li onClick={props.logout} className={styles.signOut}>
                    <a>
                      {getTranslateValue(
                        "loginheader-sign-out",
                        "Oturumu Kapat"
                      )}
                    </a>
                  </li>
                </ul>
              )}
              <Modal
                visible={visible}
                onCancel={() => setVisible(false)}
                footer
                closable={true}
                centered={true}
              >
                <div className={styles.itemCenter + " " + styles.adminModal}>
                  <img src={attention} alt=""/>
                  <h3>
                    {getTranslateValue(
                      "login-header-not-admin-message",
                      "Admin Kullanıcı Oluşturulamadı"
                    )}
                  </h3>
                  <p className={styles.modalDescription}>
                    {getTranslateValue(
                      "admin-user-action-failed",
                      "Admin kullanıcı henüz tüm servislerde oluşturulamadığından işlem yapılamamaktadır."
                    )}
                  </p>
                  <a onClick={props.logout}>
                    {" "}
                    {getTranslateValue(
                      "loginheader-sign-out",
                      "Oturumu Kapat"
                    )}{" "}
                  </a>
                </div>
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface Props {
  logout: () => void;
  user: ISso.CurrentUserModel;
  fixed: boolean;
  lastScroll: number;
  menuOpen: boolean;
  setFixed: (fixed: boolean) => void;
  setLastScroll: (lastScroll: number) => void;
  setMenuOpen: (menuOpen: boolean) => void;
}
