import { PageTitle } from "@components/dashboard/pageTitle/pageTitle";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import React, { useEffect, useState } from "react";
import styles from "./history.module.scss";
import { getTranslateValue } from "@components/translate/Language";
import Filter from "@assets/icons/userManagementFilter.svg";
import Download from "@assets/icons/downloadBlack.svg";
import { RootStore, useAppDispatch } from "@redux/store";
import { getUserActivities } from "@redux/actions/user-actions";
import { useSelector } from "react-redux";
import { UserClient } from "@api/user";
import {getCurrentUser} from "@redux/actions/sso-actions";

interface DataType {
  key: React.Key;
  name: string;
  date: string;
  download: boolean;
  detail: any;
  type: string;
}

export const History = () => {
  const activities = useSelector((state: RootStore) => state.users.activities);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  const fetchData = () => {
    dispatch(getUserActivities(currentPage));
  };

  const columns: ColumnsType<DataType> = [
    {
      title: getTranslateValue("history-process", "İşlem"),
      render: (name: boolean, a: any) => (
        <div className={styles.historyTableName}>
          <div>{getTranslateValue("activity." + a.activity, "activity." + a.activity)}</div>
          {a.type === "excel" ? (
            <>
              <small>
                <span className={styles.success}>{a.detail.success}</span>
                <span>
                  {" "}
                  {getTranslateValue("dns-successfull", "Başarılı")}{" "}
                </span>
                <span className={styles.red}>{a.detail.fail}</span>
                <span>
                  {" "}
                  {getTranslateValue(
                    "history-failed-registration",
                    "Başarısız kayıt"
                  )}
                </span>
                {a.detail.fileName}
              </small>
            </>
          ) : (
            <small>
              <div dangerouslySetInnerHTML={{ __html: a.description }} />
            </small>
          )}
        </div>
      ),
      dataIndex: "activity",
      filters: [
        {
          text: getTranslateValue("excel", "Excel"),
          value: "Excel",
        },
        {
          text: getTranslateValue("category 1", "Category 1"),
          value: "Category 1",
        },
        {
          text: getTranslateValue("category 2", "Category 2"),
          value: "Category 2",
        },
      ],
      filterMode: "tree",
      filterIcon: <img src={Filter} />,
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value as string),
      width: "50%",
    },
    {
      title: getTranslateValue("date", "Tarih"),
      dataIndex: "date",
      /*filters: [
        {
          text: <span>London</span>,
          value: "London",
        },
        {
          text: <span>New York</span>,
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.date.startsWith(value as string),
      filterSearch: true,
      filterIcon: <img src={Filter} />,*/
      width: "50%",
    },
    {
      render: (relatedEntityId: number, row: any) => (
        <a href="#">
          {relatedEntityId ? (
            <img
              onClick={() => downloadResult(row.id)}
              style={{ cursor: "pointer" }}
              src={Download}
            />
          ) : null}
        </a>
      ),
      dataIndex: "relatedEntityId",
      width: 10,
    },
  ];

  const downloadResult = (id: any) => {
    UserClient.getActivityResult(id).then((resp) => {
      resp.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "Result.xlsx";
        a.click();
      });
    });
  };

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    setCurrentPage((pagination.current as number) - 1);
  };

  const locale = {
    emptyText: getTranslateValue("no-data", "Veri Yok"),
  };

  return (
    <div className={styles.panel + " " + styles.white}>
      <div className={styles.titleArea}>
        <PageTitle
          title={getTranslateValue(
            "sidebar-transaction-history",
            "İşlem Geçmişi"
          )}
        />
        {/*<div className={styles.buttons}>
          <Button
            type="text"
            shape="round"
            size="middle"
            className={styles.primaryColor}
          >
            <img className={styles.cleanPanel} src={Clean} />
            {getTranslateValue("clean")}
          </Button>
        </div>*/}
      </div>
      <Table
        locale={locale}
        className="customTable"
        columns={columns}
        pagination={{
          current: currentPage + 1,
          pageSize: 10,
          total: activities.totalElements,
        }}
        dataSource={activities.content}
        onChange={onChange}
      />
    </div>
  );
};
