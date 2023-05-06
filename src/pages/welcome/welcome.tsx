import React, {useEffect, useState} from "react";
import {LoginHeader} from "@components/loginHeader/loginHeader.container";
import {ISso} from "@common/interfaces/sso";
import {useSelector} from "react-redux";
import {RootStore} from "@redux/store";

export const Welcome = () => {
  const {data} = useSelector((state: RootStore) => state.currentUser);
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    console.log(data);
    if (data.userId && data.role === ISso.UserRole.ADMIN) {
      setUserIsAdmin(true);
    }
  }, [data]);

  return (
    <>
      <LoginHeader/>
      {userIsAdmin ? (
        <h1>ADMIN</h1>
      ) : (
        <h1>BİLMEMNE</h1>
      )}
    </>
  );
};
