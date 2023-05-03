import React from "react";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStore} from "@redux/store";
import {ISso} from "@common/interfaces/sso";
import {Notifications} from "../../services/notifications";

export function AuthGuard(props: IProps) {
  const userState = useSelector((state: RootStore) => state.currentUser);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (userState && !userState.loading && !userState.error) {
      if (!props.roles.includes(userState.data.role)) {
        navigate(-1);
      }
    }
  }, [location, userState]);

  return (
    <>
      {props.element}
    </>
  )
}

interface IProps {
  roles: ISso.UserRole[];
  element: any;
}