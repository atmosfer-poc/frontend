import React, {useEffect, useState} from "react";
import {LoginHeader} from "@components/loginHeader/loginHeader.container";
import {ISso} from "@common/interfaces/sso";
import {useSelector} from "react-redux";
import {RootStore} from "@redux/store";
import {Jobs} from "@components/jobs/jobs";
import {Users} from "@components/users/users";
import './welcome.module.scss'

export const Welcome = () => {
  const {data} = useSelector((state: RootStore) => state.currentUser);
  const [userRole, setUserRole] = useState<ISso.UserRole>();
  const [tab, setTab] = useState<string>('jobs');

  useEffect(() => {
    console.log(data);
    if (data.userId) {
      setUserRole(data.role);
    }
  }, [data]);

  const changeTab = (changedTab: string) => {
    setTab(changedTab);
  }

  return (
    <>
      <LoginHeader changeTab={changeTab}/>

      <div style={{marginTop: "80px", padding: "20px"}}>
        {tab === 'jobs' && (
            <Jobs userRole={userRole as ISso.UserRole} />
        )}

        {(tab === 'users' && userRole === ISso.UserRole.ADMIN) && (
          <Users />
        )}
      </div>
    </>
  );
};
