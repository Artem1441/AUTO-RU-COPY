import React, { useContext, useEffect, useState } from "react";
import { AppButton } from "../UI/button/AppButton";
import { AppInput } from "../UI/input/AppInput";
import { NavLink } from "react-router-dom";
import "./header.css";
import { PATHS } from "../../utils/paths";
import { AppLogo } from "./../UI/logo/AppLogo";
import { STYLES } from "./../../utils/styles";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "./../../index";
import { authAction } from "../../store/userReducer";
import { SignOutUser } from "../../firebase/authFirebase";
import { AppSearch } from "./../UI/search/AppSearch";
import firebase from "firebase";

export const Header = ({ showAuth = true }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userName.isAuth);
  const myId = useSelector((state) => state.userName.myId);
  const { auth } = useContext(Context);
  const [changes, setChanges] = useState(0);

  const logOff = () => {
    SignOutUser()
      .then(() => {
        dispatch(authAction({ isAuth: false, email: "" }));
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    if (myId) {
      firebase
        .firestore()
        .collection("Users")
        .doc(myId)
        .collection("Chats")
        .where("Status", "==", false)
        .get()
        .then((data) => {
          setChanges(data.size);
        });
    }
  }, [myId]);

  return (
    <div className="header" style={{ height: STYLES.HEADER_HEIGHT }}>
      <div className="container">
        <div className="header_info">
          <div className="header_info_logo">
            <AppLogo />
          </div>
          <div className="header_search">
            <AppSearch />
          </div>
        </div>

        {showAuth && (
          <div className="header_auth">
            <div className="header_auth_login">
              {isAuth ? (
                <AppButton onClick={logOff}>Выйти</AppButton>
              ) : (
                <NavLink to={PATHS.LOGIN}>
                  <AppButton>Логин</AppButton>
                </NavLink>
              )}
            </div>
            <div className="header_auth_add">
              <NavLink to={PATHS.ADD}>
                <AppButton>Разместить авто</AppButton>
              </NavLink>
            </div>

            <div className="header_auth_add">
              <NavLink to={PATHS.CHATS_CLIENT}>
                <div className="header_new_messages">
                  <AppButton>Чаты</AppButton>
                  {changes > 0 && <span>{changes}</span>}
                </div>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
