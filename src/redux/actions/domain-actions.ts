import { IDomain } from "@common/interfaces/domain";
import { YaniiMailClient } from "@api/yanii-mail";
import { DomainDispatch } from "@redux/types/domains";
import { Notifications } from "../../services/notifications";
import { getTranslateValue } from "@components/translate/Language";

export const createDomain =
  (model: IDomain.DomainModel) => async (dispatch: DomainDispatch) => {
    try {
      dispatch({ type: "DOMAIN_CREATE_START" });
      const data = await YaniiMailClient.createDomain(model);
      if (data.error) {
        Notifications.error(
          getTranslateValue(
            "domain-create-error",
            "Alan adı mevcut, farklı bir alan adı giriniz."
          )
        );
        dispatch({ type: "DOMAIN_CREATE_ERROR" });
      } else {
        dispatch({ type: "DOMAIN_CREATE_SUCCESS", payload: data });
      }
    } catch {
      dispatch({ type: "DOMAIN_CREATE_ERROR" });
    }
  };

export const dnsCheck =
  (model: IDomain.DomainModel) => async (dispatch: DomainDispatch) => {
    try {
      dispatch({ type: "DOMAIN_DNS_CHECK_START" });
      const data = await YaniiMailClient.dnsCheck(model);
      dispatch({ type: "DOMAIN_DNS_CHECK_SUCCESS", payload: data });
    } catch {
      dispatch({ type: "DOMAIN_DNS_CHECK_ERROR" });
    }
  };

export const getDomainList = () => async (dispatch: DomainDispatch) => {
  try {
    dispatch({ type: "GET_DOMAIN_LIST_START" });
    const data = await YaniiMailClient.getDomainList();
    dispatch({ type: "GET_DOMAIN_LIST_SUCCESS", payload: data });
  } catch {
    dispatch({ type: "GET_DOMAIN_LIST_ERROR" });
  }
};

export const updateDomainStatus =
  (model: IDomain.UpdateDomainStatusModel) =>
  async (dispatch: DomainDispatch) => {
    try {
      dispatch({ type: "UPDATE_DOMAIN_STATUS_START" });
      const data = await YaniiMailClient.updateDomainStatus(model);
      if (data.error) {
        Notifications.error("Domain güncelleme işlemi başarısız.");
      } else {
        Notifications.success();
        dispatch({ type: "UPDATE_DOMAIN_STATUS_SUCCESS", payload: data });
      }
    } catch {
      Notifications.error("Domain güncelleme işlemi başarısız.");
    }
  };

export const deleteDomain =
  (domain: string) => async (dispatch: DomainDispatch) => {
    try {
      const data = await YaniiMailClient.deleteDomain(domain);
      if (data.error) {
        if (data.status === "30005") {
          Notifications.error(
            "Domain'e tanımlı aktif kullanıcı varken silme işlemi gerçekleştirilemez."
          );
        } else {
          Notifications.unexpectedError();
        }
      } else {
        dispatch({
          type: "DOMAIN_CREATE_SUCCESS",
          payload: { domain: "MOCK" },
        });
      }
    } catch {
      Notifications.unexpectedError();
    }
  };
