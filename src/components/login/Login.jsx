import React, { useContext, useEffect, useState } from "react";
import { STYLES } from "../../utils/styles";
import { AppButton } from "../UI/button/AppButton";
import "./login.css";
import googleIcon from "../../assets/img/googleIcon.svg";
import emailIcon from "../../assets/img/emailIcon.svg";
import userIcon from "../../assets/img/userIcon.svg";
import { Context } from "./../../index";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/userReducer";
import { PATHS } from "./../../utils/paths";
import { AppModal } from "./../UI/modal/AppModal";
import { AppForm } from "../UI/form/AppForm";
import {
  SignInUserWithEmailAndPassword,
  SignInUserWithGoogle,
  SignUpUserWithEmailAndPassword,
} from "../../firebase/authFirebase";
import { AppSwal } from "../../utils/swal";

export const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userName.isAuth);
  const { auth } = useContext(Context);
  const [modalSignUp, setModalSignUp] = useState(false);
  const [modalSignIn, setModalSignIn] = useState(false);

  useEffect(() => {
    isAuth && history.push(PATHS.HOME);
  }, [isAuth]);

  // const loginWithGoogle = async () => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   const { user } = await auth.signInWithPopup(provider);
  //   dispatch(authAction(user !== null ? true : false));
  // };

  // const loginWithEmail = (email, password) => {
  //   try {
  //     console.log("aa");
  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(email, password)
  //       // .then(() => {});
  //   } catch (e) {
  //     console.log(e, "111");
  //   }
  // };

  const signUpWithEmailAndPassword = (email, password, name, imageUrl) => {
    SignUpUserWithEmailAndPassword(email, password, name, imageUrl)
      .then((data) => {
        dispatch(authAction({ isAuth: true, email }));
      })
      .catch((err) => {
        AppSwal("Ошибка", err, "error");
      });
  };

  const signInWithEmailAndPassword = (email, password) => {
    SignInUserWithEmailAndPassword(email, password)
      .then((data) => {
        dispatch(authAction({ isAuth: true, email }));
      })
      .catch((err) => {
        AppSwal("Ошибка", err, "error");
      });
  };

  return (
    <div
      className="appLogin"
      style={{
        height: STYLES.FREE_SPACE_HEIGHT(),
      }}
    >
      <div className="container">
        <div className="appLoginAuth">
          <AppModal visible={modalSignIn} setVisible={setModalSignIn}>
            <AppForm
              loginWithEmail={signInWithEmailAndPassword}
              signIn={true}
            />
          </AppModal>

          <AppModal visible={modalSignUp} setVisible={setModalSignUp}>
            <AppForm
              loginWithEmail={signUpWithEmailAndPassword}
              signIn={false}
            />
          </AppModal>

          {/* <AppButton onClick={() => SignInUserWithGoogle(auth)}>
            <img src={googleIcon} style={{ height: STYLES.ICON_SIZE }} />
            Войти через гугл
          </AppButton> 
          пока не работает
          */}

          {/* <div style={{ marginRight: 20, marginLeft: 20 }}></div> */}

          <AppButton onClick={() => setModalSignIn(true)}>
            <img src={emailIcon} style={{ height: STYLES.ICON_SIZE }} />
            Войти через email
          </AppButton>

          <div style={{ marginRight: 20, marginLeft: 20 }}></div>

          <AppButton onClick={() => setModalSignUp(true)}>
            <img src={userIcon} style={{ height: STYLES.ICON_SIZE }} />
            Зарегистрироваться
          </AppButton>
        </div>
      </div>
    </div>
  );
};
