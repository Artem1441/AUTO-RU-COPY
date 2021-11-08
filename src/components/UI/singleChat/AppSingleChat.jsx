import React, { useState, useEffect } from "react";
import "./singleChat.css";
import { STYLES } from "./../../../utils/styles";
import { AppText } from "../text/AppText";
import { AppTitle } from "../titles/AppTitle";
import { useSelector } from "react-redux";
import { Avatar } from "../../avatar/Avatar";
import { useHistory } from "react-router";
import { PATHS } from "../../../utils/paths";

export const AppSingleChat = ({ action, db, index }) => {
  const history = useHistory();
  const chatsReload = useSelector((state) => state.chatName.chatsReload);
  const [data, setData] = useState({});

  useEffect(() => {
    db.orderBy("LastUpdate", "desc")
      .get()
      .then((data) => {
        // console.log(data.docs[index].data());
        const id = data.docs[index].id;
        setData({ ...data.docs[index].data(), Id: id });
      });
  }, [chatsReload]);

  const redirectToAutoPage = (e) => {
    console.log(e);
    e.stopPropagation();

    history.push(`${PATHS.SINGLE_AUTO}/${data.AutoData.Id}`);
  };

  return (
    <div>
      {data.UserData && (
        <div
          className="appSingleChat"
          onClick={() =>
            action(data.Сompanion, data.UserData.Name, data.UserData.ImageUr)
          }
          style={{ border: STYLES.BORDER_DEFAULT_STYLE }}
        >
          <div className="appSingleChatLeft" style={{ background: STYLES.RED }}>
            <Avatar data={data.UserData.ImageUrl} />
            <AppText>{data.UserData.Name}</AppText>
          </div>
          <div className="appSingleChatRight">
            {data.Status ? (
              <AppText
                style={{
                  fontSize: STYLES.MESSAGE_SINGLE_CHAT_FONT_SIZE,
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                {data.LastMessage}
              </AppText>
            ) : (
              <AppTitle
                style={{
                  fontSize: STYLES.MESSAGE_SINGLE_CHAT_FONT_SIZE + 1,
                }}
              >
                {data.LastMessage}
              </AppTitle>
            )}

            <div className="appSingleChatAuto">
              <img
                onClick={redirectToAutoPage}
                src={data.AutoData.ImagesArr[0]}
                style={{ width: 50, height: 50 }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
