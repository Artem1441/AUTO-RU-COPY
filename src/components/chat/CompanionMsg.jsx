import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBottomScroll } from "../../store/client/chatReducer";
import "./chat.css";

export const CompanionMsg = ({ message, db, isLast, whereId }) => {
  const dispatch = useDispatch();
  const isBottomScroll = useSelector((state) => state.chatName.isBottomScroll);

  useEffect(() => {
    if (!message.Status) {
      db.where("Status", "==", false)
        .get()
        .then((data) => {
          data.forEach((dataItem) => {
            db.doc(dataItem.id).update({ Status: true });
          });
        });
    }
    if (isBottomScroll) {
      window.scrollTo(0, document.body.scrollHeight);
      dispatch(setBottomScroll(false));
    }

    if (isLast) {
      isLast
        .where("Сompanion", "==", whereId)
        .get()
        .then((data) => {
          isLast.doc(data.docs[0].id).update({ Status: true });
        });
    }
  }, []);

  return (
    <div className="chat_messages_left">
      <span className="chat_messages_left_msg">{message.Text}</span>
    </div>
  );
};
