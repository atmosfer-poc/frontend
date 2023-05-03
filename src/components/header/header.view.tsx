import React from "react";
import styles from "./header.module.scss";
import menu from "@assets/images/menu.svg";
import closeMenu from "@assets/images/close-menu.svg";
import {Button} from "@components/button/button";
import {getTranslateValue} from "@components/translate/Language";
import {ISso} from "@common/interfaces/sso";
import {LoginHeader} from "@components/loginHeader/loginHeader.container";

export const HeaderView = (props: Props) => {
  const {
    fixed,
    lastScroll,
    menuOpen,
    setMenuOpen,
    setFixed,
    setLastScroll,
    loginEnabled,
    login,
    isLanding,
  } = props;
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
  window.addEventListener("scroll", stickyNavigation);

  return (
    <>
      {props.userData?.userId ? (
        <LoginHeader />
      ) : (
        <div className={fixed ? styles.headerBackground : styles.header}>
          <div className={styles.headerItem}>
            <div className={styles.logo}>
              <h2><a
                href={
                  localStorage.getItem(ISso.ACCESS_TOKEN)
                    ? "/welcome"
                    : "/#logo"
                }
              >
                TURKCELL POC
              </a></h2>
            </div>
            {menuOpen && (
              <div
                onClick={() => setMenuOpen(false)}
                className={styles.mobileBackground}
              />
            )}
          </div>
          <div className={styles.headerItem}>
            <Button
              label={getTranslateValue("login", "Giriş Yap")}
              onClick={() => login()}
              disabled={!loginEnabled}
              color="black"
            />
            <img
              onClick={() => handleMenu()}
              className={styles.menuToggle}
              src={menuOpen ? closeMenu : menu}
            />
          </div>
        </div>
      )}
    </>
  );
};

interface Props {
  fixed: boolean;
  lastScroll: number;
  menuOpen: boolean;
  setFixed: (fixed: boolean) => void;
  setLastScroll: (lastScroll: number) => void;
  setMenuOpen: (menuOpen: boolean) => void;
  loginEnabled: boolean;
  login: () => void;
  isLanding: boolean;
  register: any;
  userData?: ISso.CurrentUserModel;
}
