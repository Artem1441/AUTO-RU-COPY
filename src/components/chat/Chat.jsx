import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
import { AppInput } from "./../UI/input/AppInput";
import { AppButton } from "./../UI/button/AppButton";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import {
  CreateInFirebaseWithTwoQueries,
  ReadAllInFirebase,
  UpdateInFirebaseWithTwoQueries,
} from "../../firebase/crudAdmin";
import {
  setAdditionalMessagesAction,
  setBottomScroll,
  setCurrentAutoDataAction,
  setCurrentCompanionDataAction,
  setLastMessageAction,
  setMessagesAction,
  setMyDataAction,
} from "../../store/client/chatReducer";
import { useSelector } from "react-redux";
import { MyMsg } from "./MyMsg";
import { CompanionMsg } from "./CompanionMsg";
import { STYLES } from "../../utils/styles";
import { useObserver } from "../../hooks/useObserver";
import backIcon from "../../assets/img/backIcon.svg";
import { useHistory, useLocation } from "react-router-dom";
import { Avatar } from "../avatar/Avatar";
import { AppTitle } from "../UI/titles/AppTitle";
import { AppButtonSmall } from "../UI/button/AppButtonSmall";

export const Chat = ({ myId, vendorId, autoId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const db = firebase.firestore();
  const messages = useSelector((state) => state.chatName.messages);
  const currentCompanionData = useSelector(
    (state) => state.chatName.currentCompanionData
  );
  const currentAutoData = useSelector(
    (state) => state.chatName.currentAutoData
  );
  const myData = useSelector((state) => state.chatName.myData);
  const chatReload = useSelector((state) => state.chatName.chatReload);

  const [value, setValue] = useState("");
  const [start, setStart] = useState(null);
  const lastElement = useRef();
  const container = useRef();

  const ReadAllMessages = (limit, descAsc = "asc") => {
    dispatch(setBottomScroll(true));
    return new Promise(function (resolve, reject) {
      db.collection("Messages")
        .doc(myId)
        .collection(vendorId + autoId)
        .orderBy("dateAdded", descAsc)
        .limit(limit)
        .get()
        .then((data) => resolve(data))
        .catch((error) => {
          reject(error);
        });
    });
  };

  const GetMoreMessages = () => {
    return new Promise(function (resolve, reject) {
      db.collection("Messages")
        .doc(myId)
        .collection(vendorId + autoId)
        .orderBy("dateAdded", "desc")
        .startAfter(start)
        .limit(STYLES.QUERY_MESSAGES)
        .get()
        .then((data) => {
          const clientHeight =
            container.current.clientHeight | window.innerHeight;
          // запоминает старую выстоу блока continer
          if (data.docs.length > 0) {
            setStart(data.docs.reverse()[0].data().dateAdded);
            dispatch(setAdditionalMessagesAction(data.docs.reverse()));
          }
          // вычитает старой высоту от новой и получаем нужную координату
          window.scrollTo(0, container.current.clientHeight - clientHeight);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const CreateMessage = (id, notMyId) => {
    const name = `${notMyId}/${autoId}`;

    return new Promise(function (resolve, reject) {
      CreateInFirebaseWithTwoQueries(
        "Messages",
        id,
        name.replace(/\\|\//g, ""),
        {
          Text: value,
          From: myId,
          To: vendorId,
          Status: id === myId ? true : false,
        }
      )
        .catch((error) => {
          reject(error);
        })
        .then(() => {
          db.collection("Users")
            .doc(id)
            .collection("Chats")
            .where("Сompanion", "==", name)
            .get()
            .then((data) => {
              if (data.size === 0) {
                const userData = id === myId ? currentCompanionData : myData;
                CreateInFirebaseWithTwoQueries("Users", id, "Chats", {
                  Сompanion: name,
                  UserData: userData,
                  AutoData: currentAutoData,
                  LastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
                  LastMessage: value,
                  Status: id === myId ? true : false,
                });
              } else {
                UpdateInFirebaseWithTwoQueries(
                  "Users",
                  id,
                  "Chats",
                  {
                    AutoData: currentAutoData,
                    LastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
                    LastMessage: value,
                    Status: id === myId ? true : false,
                  },
                  data.docs[0].id
                );
              }
            });
        });
    });
  };

  useEffect(async () => {
    if (chatReload !== 0) {
      if (messages.length === 0) {
        ReadAllMessages(STYLES.QUERY_MESSAGES, "desc").then((data) => {
          setStart(data.docs.reverse()[0].data().dateAdded);
          dispatch(setMessagesAction(data.docs.reverse()));
        });
      } else {
        ReadAllMessages(1, "desc").then((data) => {
          dispatch(setLastMessageAction(data.docs[0]));
        });
      }
    }
  }, [chatReload]);

  useEffect(() => {
    dispatch(setCurrentCompanionDataAction({}));
    dispatch(setMyDataAction({}));
    dispatch(setCurrentAutoDataAction({}));
    dispatch(setBottomScroll(true));

    ReadAllInFirebase("Users").then((data) => {
      data.forEach((dataItem) => {
        if (dataItem.id === vendorId) {
          dispatch(setCurrentCompanionDataAction(dataItem.data()));
        }
        if (dataItem.id === myId) {
          dispatch(setMyDataAction(dataItem.data()));
        }
      });
    });

    db.collection("ClientsAutoForSale")
      .where("CountAutoId", "==", Number(autoId))
      .get()
      .then((data) => {
        data.forEach((dataItem) => {
          const id = dataItem.id;
          dispatch(setCurrentAutoDataAction({ ...dataItem.data(), Id: id }));
        });
      });
  }, []);

  const sendMessage = () => {
    CreateMessage(myId, vendorId);
    CreateMessage(vendorId, myId);
    setValue("");
  };

  useObserver(lastElement, messages.length, GetMoreMessages);

  return (
    <div className="chat">
      <div className="chat_header">
        <img
          src={backIcon}
          style={{ width: STYLES.WINDOW_WIDTH > 500 ? 40 : 25 }}
          onClick={() => history.goBack()}
          className="chat_header_back"
        />
        <div className="container">
          <div className="chat_header_container">
            <Avatar data={location.state.imgUrl} />
            <AppTitle style={{ fontSize: STYLES.WINDOW_WIDTH > 500 ? 32 : 20 }}>
              {location.state.name}
            </AppTitle>
          </div>
        </div>
        <span></span>
      </div>
      <div className="container">
        <div className="chat_messages">
          <div
            className="container"
            style={{ minHeight: "100%" }}
            ref={container}
          >
            <div ref={lastElement}></div>
            {messages.map((message, index) =>
              message.data().From === myId ? (
                <MyMsg key={index} message={message.data()} />
              ) : (
                <CompanionMsg
                  key={index}
                  whereId={`${vendorId}/${autoId}`}
                  message={message.data()}
                  isLast={
                    index === messages.length - 1
                      ? db.collection("Users").doc(myId).collection("Chats")
                      : false
                  }
                  db={db
                    .collection("Messages")
                    .doc(myId)
                    .collection(vendorId + autoId)}
                />
              )
            )}
          </div>
        </div>

        <div className="chat_write">
          <div className="container">
            <div className="chat_write_input">
              <AppInput
                type="text"
                value={value}
                placeholder={`Введите сообщение`}
                onChange={(prev) => setValue(prev.target.value)}
                onKeyDown={(e) => {
                  (e.key === "Enter") & (value.length > 0) && sendMessage();
                }}
                style={{
                  width: "100%",
                  borderRadius: 20,
                  border: STYLES.BORDER_DEFAULT_STYLE,
                }}
              />
            </div>

            <div className="chat_write_btn">
              {STYLES.WINDOW_WIDTH() > 500 ? (
                <AppButton onClick={sendMessage}>Отправить</AppButton>
              ) : (
                <AppButtonSmall onClick={sendMessage}>Отправить</AppButtonSmall>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
