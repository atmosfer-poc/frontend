import React from "react";
import UserDarkIcon from "@assets/icons/userDark.svg";
import UserIcon from "@assets/icons/user.svg";
import styles from "./defineDNSTable.module.scss";
import { getTranslateValue } from "@components/translate/Language";
import { Tooltip } from "antd";

export const DefineDNSTable = (props: Props) => {
  const translationsKey = {
    ["success"]: "Başarılı",
    ["error"]: "Başarısız",
  };

  const calculateTableClass = (stateValue) => {
    if (stateValue === "error") {
      return styles.unSuccessfull;
    } else if (stateValue === "success") {
      return styles.successfull;
    }
  };

  return (
    <div className={styles.domainContainer}>
      <div className={styles.caption}>{props.title}</div>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.tableColumn}>
            <th>{getTranslateValue("dns-table-host", "Host")}</th>
            <th>
              {getTranslateValue("dns-table-value", "Olması Gereken Değer")}
            </th>
            <th>{getTranslateValue("dns-table-type", "Tip")}</th>
            <th>{getTranslateValue("dns-table-status", "Durum")}</th>
          </tr>
          <tr
            className={`${styles.tableRow} ${calculateTableClass(
              props.status
            )}`}
          >
            <td> {props.host} </td>
            <td> {props.mustBeValue} </td>
            <td> {props.type} </td>
            <td>
              {translationsKey[props.status]}
              <Tooltip placement="top" title={props.info}>
                <img
                  src={props.status === "error" ? UserDarkIcon : UserIcon}
                  alt="user icon"
                />
              </Tooltip>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

interface Props {
  status: string;
  host: string;
  info: string;
  type: string;
  title: string;
  mustBeValue: string;
}
