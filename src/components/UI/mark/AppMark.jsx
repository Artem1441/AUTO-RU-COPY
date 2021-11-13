import React, { useState } from "react";
import { STYLES } from "../../../utils/styles";
import { AppText } from "../text/AppText";
import "./mark.css";
import updateIcon from "../../../assets/img/updateIcon.svg";
import removeIcon from "../../../assets/img/removeIcon.svg";
import { AppButtonSmall } from "./../button/AppButtonSmall";
import { AppSwal } from "./../../../utils/swal";

export const AppMark = ({
  mark,
  setCurrentMark = () => {},
  current = false,
  isImg = true,
  isTitle = true,
  isUpdate = false,
  isDelete = false,
  updateFunc = () => {},
  deleteFunc = () => {},
}) => {
  const [visible, setVisible] = useState(true);

  return (
    <div
      className={!current ? "appMark" : "appMark appMarkActive"}
      style={{
        border: STYLES.BORDER_DEFAULT_STYLE,
        display: visible ? "flex" : "none",
      }}
      onClick={() => setCurrentMark(mark._id, mark.MarkTitle)}
    >
      {isImg && (
        <img
          src={mark.ImageUrl}
          alt={mark.MarkTitle}
          style={{ height: STYLES.MARK_SIZE }}
        />
      )}
      {isTitle & (STYLES.WINDOW_WIDTH() > 360) ? (
        <AppText style={{ fontSize: STYLES.WINDOW_WIDTH() > 600 ? 12 : 10 }}>
          {mark.MarkTitle}
        </AppText>
      ) : (
        <span style={{ display: "none" }}></span>
      )}
      <div className="appMarkBtn">
        {isUpdate && (
          <AppButtonSmall onClick={() => updateFunc(mark._id)}>
            <img src={updateIcon} style={{ height: STYLES.ICON_SIZE_SMALL }} />
          </AppButtonSmall>
        )}
        {isDelete && (
          <AppButtonSmall
            onClick={() => {
              AppSwal(
                "Удалить?",
                `Вы точно хотите это сделать?`,
                "question",
                true
              ).then((result) => {
                if (result.isConfirmed) {
                  deleteFunc(mark._id);
                  setVisible(false);
                }
              });
            }}
          >
            <img src={removeIcon} style={{ height: STYLES.ICON_SIZE_SMALL }} />
          </AppButtonSmall>
        )}
      </div>
    </div>
  );
};
