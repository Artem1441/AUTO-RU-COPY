import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Chat } from "../components/chat/Chat";
import { AppLoader } from "../components/UI/loader/AppLoader";
import { AppRedirectToLogin } from "../components/UI/redirect/AppRedirectToLogin";
import { CreateInFirebaseWithTwoQueries } from "./../firebase/crudAdmin";
import firebase from "firebase";
import { reloadChatAction } from "../store/client/chatReducer";

export const ChatPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userName.isAuth);
  const myId = useSelector((state) => state.userName.myId);
  const { userId, autoId } = useParams();

  if (myId) {
    firebase
      .firestore()
      .collection("Messages")
      .doc(myId)
      .collection(userId + autoId)
      .onSnapshot((snapshot) => {
        //   console.log(snapshot.docs.length);
        // setMessagesLength(snapshot.docs.length);
        dispatch(reloadChatAction(snapshot.docs.length));
      });
  }

  return (
    <div>
      {!isAuth ? (
        <AppRedirectToLogin text="перехода в чат" />
      ) : myId ? (
        <Chat myId={myId} vendorId={userId} autoId={autoId} />
      ) : (
        <AppLoader />
      )}
    </div>
  );
};
