import { Dropdown } from "antd";
import React, { useState } from "react";
import DropDownIcon from "@assets/icons/dropDown.svg";
import styles from "./dnsStatusColumn.module.scss";

export const DnsStatusColumn = (props: Props) => {
  const [isVisibleTooltip, setIsVisibleTooltip] = useState(false);
  const translationsKey = {
    ["active"]: "Aktif",
    ["closed"]: "Deaktif",
    ["locked"]: "Kilitlenmis",
  };

  const domainStateCondition = (activeValue) => {
    if (activeValue === "locked") {
      return styles.locked;
    }
    if (activeValue === "closed") {
      return styles.deactive;
    }
    if (activeValue === "active") {
      return styles.active;
    }
  };

  return (
    <>
      <Dropdown
        overlay={props.domainTableColumnStatus(props.domain)}
        trigger={["click"]}
        placement="bottomRight"
        className={styles.container}
        disabled={props.isDisable}
      >
        <div
          className={`${props.domainStateClassname} ${domainStateCondition(
            props.statusValue
          )}`}
        >
          <div>{translationsKey[props.label]}</div>
          <img src={DropDownIcon} alt="dropdown icon" />
        </div>
      </Dropdown>

      {isVisibleTooltip && (
        <div className="domainStateTooltip">
          DNS statüsü
          <span>
            {" "}
            “ <span className="dot" /> Başarılı ”
          </span>
          olan domain adresinizi dilerseniz aktif hale getirebilirsiniz.
        </div>
      )}
    </>
  );
};

interface Props {
  id: string;
  label: string;
  statusValue: string;
  domainStateClassname: string;
  domain: string;
  isDisable: boolean;
  domainTableColumnStatus: (domain: string) => any;
}
