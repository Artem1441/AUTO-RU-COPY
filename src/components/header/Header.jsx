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
import { AppButtonSmall } from "../UI/button/AppButtonSmall";

export const Header = ({
  showAuth = STYLES.WINDOW_WIDTH() > 480 ? true : false,
}) => {
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
            <div className="header_auth_add">
              <NavLink to={PATHS.CHATS_CLIENT}>
                <div className="header_new_messages">
                  {STYLES.WINDOW_WIDTH() > 780 ? (
                    <AppButton>Чаты</AppButton>
                  ) : (
                    <AppButtonSmall>Чаты</AppButtonSmall>
                  )}
                  {changes > 0 && <span>{changes}</span>}
                </div>
              </NavLink>
            </div>

            <div className="header_auth_add">
              <NavLink to={PATHS.ADD}>
                {STYLES.WINDOW_WIDTH() > 780 ? (
                  <AppButton>Разместить авто</AppButton>
                ) : (
                  <AppButtonSmall>Разместить авто</AppButtonSmall>
                )}
              </NavLink>
            </div>

            <div className="header_auth_login">
              {isAuth ? (
                <div>
                  {STYLES.WINDOW_WIDTH() > 780 ? (
                    <AppButton onClick={logOff}>Выйти</AppButton>
                  ) : (
                    <AppButtonSmall onClick={logOff}>Выйти</AppButtonSmall>
                  )}
                </div>
              ) : (
                <NavLink to={PATHS.LOGIN}>
                  {STYLES.WINDOW_WIDTH() > 780 ? (
                    <AppButton>Логин</AppButton>
                  ) : (
                    <AppButtonSmall>Логин</AppButtonSmall>
                  )}
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
