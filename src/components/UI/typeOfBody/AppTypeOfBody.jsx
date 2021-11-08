import React, { useState } from "react";
import { STYLES } from "../../../utils/styles";
import { AppText } from "../text/AppText";
import "./typeOfBody.css";
import updateIcon from "../../../assets/img/updateIcon.svg";
import removeIcon from "../../../assets/img/removeIcon.svg";
import { AppButtonSmall } from "./../button/AppButtonSmall";
import { AppSwal } from "./../../../utils/swal";

export const AppTypeOfBody = ({
  typeOfBody,
  setCurrentTypeOfBody = () => {},
  current = false,
  isUpdate = false,
  isDelete = false,
  updateFunc = () => {},
  deleteFunc = () => {},
}) => {
  const [visible, setVisible] = useState(true);

  return (
    <div
      className={
        !current ? "appTypeOfBody" : "appTypeOfBody appTypeOfBodyActive"
      }
      style={{
        border: STYLES.BORDER_DEFAULT_STYLE,
        display: visible ? "flex" : "none",
      }}
      onClick={() => setCurrentTypeOfBody(typeOfBody._id)}
    >
      <img
        src={typeOfBody.TypeOfBodyImageUrl}
        alt={typeOfBody.TypeOfBodyTitle}
        style={{ width: STYLES.TYPE_OF_BODY_WIDTH }}
      />
      <AppText style={{ fontSize: 12 }}>{typeOfBody.TypeOfBodyTitle}</AppText>
      {/* <div className="appMarkBtn">
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
      </div> */}
    </div>
  );
};
