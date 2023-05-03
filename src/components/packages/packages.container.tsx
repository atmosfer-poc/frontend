import React from "react";
import { useSelector } from "react-redux";
import { RootStore } from "@redux/store";
import { PackageView } from "./package.view";
import { getTranslateValue } from "@components/translate/Language";
export const Packages = () => {
  const parametersState = useSelector((state: RootStore) => state.parameters);

  const navigateBuyPage = () => {
    if (parametersState.data) {
      window.open(parametersState.data.buyUrl, "_self");
    }
  };

  return (
    <PackageView
      navigateBuyPage={navigateBuyPage}
      premiumPackagePrice={getTranslateValue("premium-package-price", "71.00")}
      basicPackagePrice={getTranslateValue("basic-package-price", "63.00")}
    />
  );
};
