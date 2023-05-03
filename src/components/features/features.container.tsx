import React from "react";
import { Check768px } from "../../hook/CheckMobile";
import { FeaturesView } from "./features.view";

export const Features = () => {
  return <FeaturesView check798px={Check768px()} />;
};
