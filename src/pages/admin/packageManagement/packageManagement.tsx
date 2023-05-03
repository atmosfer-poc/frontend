import { PageTitle } from "@components/dashboard/pageTitle/pageTitle";
import React, { useEffect } from "react";
import styles from "./packageManagement.module.scss";
import { getTranslateValue } from "@components/translate/Language";
import { RootStore, useAppDispatch } from "@redux/store";
import { useSelector } from "react-redux";
import { getSubscriptions } from "@redux/actions/subscriptions-actions";
import { LoadingOutlined } from "@ant-design/icons";
import { PackageCard } from "@components/packageManagement/packageCard/packageCard";
import {getCurrentUser} from "@redux/actions/sso-actions";

export const PackageManagement = () => {
  const dispatch = useAppDispatch();

  const { data, loading } = useSelector(
    (state: RootStore) => state.subscriptions
  );

  const user = useSelector((state: RootStore) => state.currentUser);

  useEffect(() => {
    if (!loading && user.data.accountId) {
      dispatch(
        getSubscriptions({
          accountId: user.data.accountId,
          onlyActive: true,
        })
      );
    }
  }, [user]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <div className={styles.panel + " " + styles.white}>
      <div className={styles.titleArea}>
        <PageTitle
          title={getTranslateValue(
            "package-management-title",
            "Paket Yönetimi"
          )}
        />
      </div>
      <h3>
        {getTranslateValue("package-management-information", "Paket Bilgileri")}
      </h3>
      {loading ? (
        <div className={"center"}>
          <LoadingOutlined style={{ fontSize: 50 }} spin />
        </div>
      ) : (
        <>
          {data?.subscriptionList?.map((subscription, index) => (
            <PackageCard key={index} subscription={subscription} />
          ))}
        </>
      )}
      <p className={styles.tableNote}>
        *
        {getTranslateValue(
          "package-management-upgrade",
          "Paket yükseltmek için müşteri temsilcisi ile iletişime geçebilirsiniz."
        )}
      </p>
      {/*<h3>{getTranslateValue("package-management-spending-history")}</h3>
      <div className={styles.searchTable}>
        <div className={styles.tableUserCount}>109 {getTranslateValue("record")}</div>
        <Input className={styles.searchInput} size="large" placeholder="Tabloda ara" prefix={<SearchOutlined />} />
      </div>
      <Table className="customTable" columns={columns} dataSource={data} onChange={onChange} scroll={{ x: 1000 }}/>*/}
    </div>
  );
};

interface DataType {
  key: React.Key;
  name: string;
  buyDate: string;
  expireDate: string;
  totalLicence: number;
  usedLicence: number;
  availableLicence: number;
  status: boolean;
}
