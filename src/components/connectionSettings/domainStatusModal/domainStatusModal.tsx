import React from "react";
import { Modal } from "antd";
import InfoIcon from "@assets/icons/info.svg";
import styles from "./domainStatusModal.module.scss";
import { RootStore } from "@redux/store";
import { useSelector } from "react-redux";
import { DefineDNSTable } from "../defineDNSTable/defineDNSTable";
import { getTranslateValue } from "@components/translate/Language";

export const DomainStatusModal = (props: Props) => {
  const { dnsCheckResource } = useSelector((state: RootStore) => state.domain);

  return (
    <Modal
      visible={props.isModalOpen}
      onCancel={props.clearUpsertModal}
      className="domainDNSTable"
      footer
    >
      <div className={styles.domainDNSTable}>
        <div className={styles.header}>
          {getTranslateValue(
            "dns-status-definition",
            "Yapılması Gereken DNS Tanımları"
          )}
        </div>
        {dnsCheckResource.dnsCheck && (
          <DefineDNSTable
            host={dnsCheckResource?.dnsCheck?.host}
            info={dnsCheckResource?.dnsCheck?.info}
            mustBeValue={dnsCheckResource.dnsCheck?.value}
            status={dnsCheckResource?.dnsCheck?.status}
            type={dnsCheckResource?.dnsCheck?.type}
            title={getTranslateValue(
              "dns-check-label",
              "Alan Adının Aktif Olması İçin Gereken DNS Tanımı"
            )}
          />
        )}
        <DefineDNSTable
          host={dnsCheckResource?.mx?.host}
          info={dnsCheckResource?.mx?.info}
          mustBeValue={dnsCheckResource.mx?.value}
          status={dnsCheckResource?.mx?.status}
          type={dnsCheckResource?.mx?.type}
          title={getTranslateValue("mx-record", "MX Kaydı")}
        />
        <DefineDNSTable
          host={dnsCheckResource?.spf?.host}
          info={dnsCheckResource?.spf?.info}
          mustBeValue={dnsCheckResource.spf?.value}
          status={dnsCheckResource?.spf?.status}
          type={dnsCheckResource?.spf?.type}
          title={getTranslateValue("spf-record", "SPF Kaydı")}
        />
        <DefineDNSTable
          host={dnsCheckResource?.dkim?.host}
          info={dnsCheckResource?.dkim?.info}
          mustBeValue={dnsCheckResource.dkim?.value}
          status={dnsCheckResource?.dkim?.status}
          type={dnsCheckResource?.dkim?.type}
          title={getTranslateValue("dkim record", "DKIM Kaydı")}
        />
        <DefineDNSTable
          host={dnsCheckResource?.mobile?.host}
          info={dnsCheckResource?.mobile?.info}
          mustBeValue={dnsCheckResource.mobile?.value}
          status={dnsCheckResource?.mobile?.status}
          type={dnsCheckResource?.mobile?.type}
          title={getTranslateValue("mobile-app-record", "Mobil Uygulama Kaydı")}
        />
        <DefineDNSTable
          host={dnsCheckResource?.mobile1?.host}
          info={dnsCheckResource?.mobile1?.info}
          mustBeValue={dnsCheckResource.mobile1?.value}
          status={dnsCheckResource?.mobile1?.status}
          type={dnsCheckResource?.mobile1?.type}
          title={getTranslateValue(
            "mobile1-app-record",
            "Mobil Uygulama Kaydı"
          )}
        />

        <div className={styles.notification}>
          <img src={InfoIcon} alt="info icon" />
          <div>
            {getTranslateValue(
              "domain-status-info-notification",
              "DNS tanımları tamamlandıktan sonra alan adı durumunu aktif statüye çekmeniz gerekmektedir."
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

interface Props {
  clearUpsertModal: () => void;
  isModalOpen: boolean;
}
