import React from "react";
import styles from "./header.module.scss";
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
  window.addEventListener("scroll", stickyNavigation);

  return (
    <>
      {props.userData?.userId ? (
        <LoginHeader changeTab={(e) => console.log(e)} />
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
  userData?: ISso.CurrentUserModel;
}
