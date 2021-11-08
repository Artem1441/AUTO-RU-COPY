import React, { useState } from "react";
import { STYLES } from "../../../utils/styles";
import { AppButtonSmall } from "../button/AppButtonSmall";
import { AppText } from "../text/AppText";
import "./model.css";
import updateIcon from "../../../assets/img/updateIcon.svg";
import removeIcon from "../../../assets/img/removeIcon.svg";
import { AppSwal } from "./../../../utils/swal";

export const AppModel = ({
  model,
  setCurrentModel = () => {},
  current = false,
  deleteFunc = () => {},
  updateFunc = () => {},
  isUpdate = false,
  isDelete = false,
  getSelfId = false,
}) => {
  const [visible, setVisible] = useState(true);

  return (
    <div
      className={!current ? "appModel" : "appModel appModelActive"}
      style={{
        border: STYLES.BORDER_DEFAULT_STYLE,
        display: visible ? "flex" : "none",
      }}
      onClick={() =>
        setCurrentModel(
          getSelfId ? model.AutoModelId : model._id,
          model.AutoTitle,
          // толкько для случая с добавлением авто на главной странице
          !getSelfId ? model.AutoModelId : model._id
        )
      }
    >
      <img
        src={model.ImageUrl}
        alt={model.AutoTitle}
        style={{ height: STYLES.AUTO_PICTURE_SIZE }}
      />

      <AppText className="appModelTitle" style={{ fontSize: 12 }}>
        {model.AutoTitle}
      </AppText>
      <div className="appModelBtns">
        {isUpdate && (
          <AppButtonSmall onClick={() => updateFunc(model._id)}>
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
                  deleteFunc(model._id);
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
