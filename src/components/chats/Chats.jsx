import React, { useEffect, useState } from "react";
import "./chats.css";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  refreshChatsAction,
  refreshMessagesAction,
  setChatsAction,
} from "../../store/client/chatReducer";
import { useHistory } from "react-router-dom";
import { PATHS } from "../../utils/paths";
import { AppSingleChat } from "../UI/singleChat/AppSingleChat";
import { AppTitle } from "../UI/titles/AppTitle";

export const Chats = ({ myId }) => {
  const [countChatsArr, setCountChatsArr] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const chatsReload = useSelector((state) => state.chatName.chatsReload);

  const db = firebase
    .firestore()
    .collection("Users")
    .doc(myId)
    .collection("Chats");

  useEffect(() => {
    return new Promise(function (resolve, reject) {
      dispatch(refreshChatsAction());
      db.orderBy("LastUpdate", "desc")
        .get()
        .then((data) => {
          let arr = [];
          if (data.size !== countChatsArr.length) {
            for (let i = 0; i < data.size; i++) {
              arr.push(i);
            }
            setCountChatsArr(arr);
          }
          dispatch(setChatsAction(data.docs));
        });
    });
  }, [chatsReload]);

  const redirectToChat = (url, name, imgUrl) => {
    dispatch(refreshMessagesAction());
    history.push(`${PATHS.CHAT_CLIENT}/${url}`, {
      name,
      imgUrl: imgUrl ? imgUrl : "",
    });
  };

  return (
    <div className="chats">
      <div className="container">
        <div className="chats_title">
          <AppTitle>Ваши сообщения</AppTitle>
        </div>
        {/* {console.log(countChatsArr)} */}
        {countChatsArr.map((index) => (
          <AppSingleChat
            key={index}
            // data={chat.data()}
            index={index}
            db={db}
            action={redirectToChat}
          />
        ))}
      </div>
    </div>
  );
};
