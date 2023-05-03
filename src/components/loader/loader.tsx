import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./loader.module.scss";

export const Loader = (props: Props) => {
  if (!props.isVisible) {
    return null;
  }

  return (
    <div className={styles.container}>
      <LoadingOutlined style={{ fontSize: 50 }} spin />
    </div>
  );
};

interface Props {
  isVisible: boolean;
}
