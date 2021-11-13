import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PATHS } from "../../utils/paths";
import "./navbar.css";
import { STYLES } from "./../../utils/styles";
import { AppButtonSmall } from "../UI/button/AppButtonSmall";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "../..";
import { SignOutUser } from "../../firebase/authFirebase";
import firebase from "firebase";
import { authAction } from "../../store/userReducer";

export const Navbar = ({
  showAuth = STYLES.WINDOW_WIDTH() <= 480 ? true : false,
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
    <div
      className="navbar"
      style={{
        background: STYLES.RED,
        height: STYLES.NAVBAR_HEIGHT,
        marginBottom: 10,
      }}
    >
      {/* <NavLink to={PATHS.ADD}>
        <button>HOME</button>
      </NavLink> */}

      {showAuth && (
        <div className="navbar_auth">
          <div className="navbar_auth_add">
            <NavLink to={PATHS.CHATS_CLIENT}>
              <div className="navbar_new_messages">
                <AppButtonSmall>Чаты</AppButtonSmall>
                {changes > 0 && <span>{changes}</span>}
              </div>
            </NavLink>
          </div>

          <div className="navbar_auth_add">
            <NavLink to={PATHS.ADD}>
              <AppButtonSmall>Разместить авто</AppButtonSmall>
            </NavLink>
          </div>

          <div className="navbar_auth_login">
            {isAuth ? (
              <div>
                <AppButtonSmall onClick={logOff}>Выйти</AppButtonSmall>
              </div>
            ) : (
              <NavLink to={PATHS.LOGIN}>
                <AppButtonSmall>Логин</AppButtonSmall>
              </NavLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
