import React from "react";
import { useSelector } from "react-redux";
import { Chats } from "../components/chats/Chats";
import { AppLoader } from "../components/UI/loader/AppLoader";
import { AppRedirectToLogin } from "../components/UI/redirect/AppRedirectToLogin";
import firebase from "firebase";
import { reloadChatsAction } from "../store/client/chatReducer";
import { useDispatch } from "react-redux";

export const ChatsPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userName.isAuth);
  const myId = useSelector((state) => state.userName.myId);

  if (myId) {
    const db = firebase
      .firestore()
      .collection("Users")
      .doc(myId)
      .collection("Chats");

    db.onSnapshot((snapshot) => {
      dispatch(reloadChatsAction());
    });
  }

  return (
    <div>
      {!isAuth ? (
        <AppRedirectToLogin text="просмотра чатов" />
      ) : myId ? (
        <Chats myId={myId} />
      ) : (
        <AppLoader />
      )}
    </div>
  );
};
