import React from "react";
import styles from "./textInput.module.scss";
import { Input } from "antd";

export const TextInput = (props: Props) => {
  const {
    label,
    onChange,
    disabled,
    placeholder,
    value,
    type,
    suffix,
    name,
    onInput,
  } = props;

  return (
    <div className={styles.inputItem}>
      <Input
        name={name}
        className={suffix ? "emailInput " : ""}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onInput={onInput}
        autoComplete={"off"}
        type={type ? type : "text"}
        suffix={suffix}
      />
      <label>{label}</label>
    </div>
  );
};

interface Props {
  label: string;
  onChange?: (any) => void;
  onInput?: (any) => void;
  value?: any;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  suffix?: string;
  name?: string;
}
