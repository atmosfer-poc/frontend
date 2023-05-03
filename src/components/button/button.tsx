import React from "react";
import styles from "./button.module.scss";
import plus from "@assets/images/white-plus.svg";

export const Button = (props: Props) => {
  const {
    label,
    onClick,
    disabled,
    color,
    hasIcon,
    admin,
    type = "submit",
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={
        admin ? styles.adminButton + " " + styles[color] : styles[color]
      }
    >
      {hasIcon ? <img src={plus} /> : ""}
      <span>{label}</span>
    </button>
  );
};

interface Props {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  color: string;
  hasIcon?: boolean;
  admin?: boolean;
  type?: any;
}
