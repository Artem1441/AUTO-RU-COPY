import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBottomScroll } from "../../store/client/chatReducer";
import { STYLES } from "../../utils/styles";
import "./chat.css";

export const MyMsg = ({ message }) => {
  const dispatch = useDispatch();
  const isBottomScroll = useSelector(state => state.chatName.isBottomScroll)

  useEffect(() => {
    if (isBottomScroll) {
      window.scrollTo(0, document.body.scrollHeight);
      dispatch(setBottomScroll(false));
    }
  }, []);

  return (
    <div className="chat_messages_right">
      <span></span>
      <span
        className="chat_messages_right_msg"
        style={{ background: STYLES.RED }}
      >
        {message.Text}
      </span>
    </div>
  );
};
