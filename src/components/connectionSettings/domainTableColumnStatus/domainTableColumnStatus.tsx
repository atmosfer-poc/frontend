import { getTranslateValue } from "@components/translate/Language";
import { useAppDispatch } from "@redux/store";
import { Menu } from "antd";
import React from "react";
import { IDomain } from "@common/interfaces/domain";
import {
  getDomainList,
  updateDomainStatus,
} from "@redux/actions/domain-actions";

export const DomainTableColumnStatus = (props: Props) => {
  const dispatch = useAppDispatch();

  const onChangeDomainStatus = async (value) => {
    await dispatch(updateDomainStatus({ ...value, domain: props.domain }));
    await dispatch(getDomainList());
  };

  return (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <div
              onClick={() =>
                onChangeDomainStatus({
                  domainStatus: IDomain.DomainStatusType.LOCKED,
                })
              }
            >
              {getTranslateValue("lock", "Kilitle")}
            </div>
          ),
        },
        {
          key: "2",
          label: (
            <div
              onClick={() =>
                onChangeDomainStatus({
                  domainStatus: IDomain.DomainStatusType.CLOSED,
                })
              }
            >
              {getTranslateValue("deactivated", "Deaktif")}
            </div>
          ),
        },
        {
          key: "3",
          label: (
            <div
              onClick={() =>
                onChangeDomainStatus({
                  domainStatus: IDomain.DomainStatusType.ACTIVE,
                })
              }
            >
              {getTranslateValue("active", "Aktif")}
            </div>
          ),
        },
      ]}
    />
  );
};

interface Props {
  domain: string;
}
