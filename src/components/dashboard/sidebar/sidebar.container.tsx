import React from "react";
import { SidebarView } from "./sidebar.view";
import { useSelector } from "react-redux";
import { RootStore } from "@redux/store";

export const Sidebar = (props: Props) => {
  const { isAdmin, documents } = props;

  const { data } = useSelector((state: RootStore) => state.parameters);

  return (
    <SidebarView
      yaaniMailUrl={data?.yaaniMailAdminUrl}
      bipMeetUrl={data?.bipMeetAdminUrl}
      lifeBoxUrl={data?.lifeBoxAdminUrl}
      isAdmin={isAdmin || false}
      documents={documents || false}
    />
  );
};
interface Props {
  isAdmin?: boolean;
  documents?: boolean;
}
