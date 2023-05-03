import React from "react";
import styles from "./selectInput.module.scss";
import { Select } from "antd";
const { Option } = Select;

export const SelectInput = (props: Props) => {
  const {
    label,
    onChange,
    disabled,
    value,
    options = [],
    notFoundContent,
  } = props;
  const renderOptions = () =>
    options.map((item, index) => (
      <Option key={index} value={item.value}>
        {item.label}
      </Option>
    ));
  return (
    <div className={styles.inputItem}>
      <Select
        disabled={disabled}
        defaultValue={value}
        style={{ width: "100%" }}
        onChange={onChange}
        notFoundContent={notFoundContent}
        getPopupContainer={(trigger) => trigger.parentNode}
      >
        {renderOptions()}
      </Select>
      <label>{label}</label>
    </div>
  );
};

interface Props {
  label: string;
  notFoundContent?: string;
  onChange: (any) => void;
  value?: any;
  disabled?: boolean;
  placeholder?: string;
  options?: Array<{
    value: string;
    label: string;
  }>;
}
