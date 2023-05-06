import React, {useEffect, useState} from "react";
import {HeaderView} from "./header.view";
import {useSelector} from "react-redux";
import {RootStore} from "@redux/store";
import {useNavigate} from "react-router-dom";

export const Header = () => {
  const [fixed, setFixed] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const {data: userData} = useSelector(
    (state: RootStore) => state.currentUser
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.userId != null) {
      navigate("welcome");
    }
  }, [userData]);

  return (
    <>
      <HeaderView
        userData={userData}
        fixed={fixed}
        lastScroll={lastScroll}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setFixed={setFixed}
        setLastScroll={setLastScroll}
      />
    </>
  );
};
