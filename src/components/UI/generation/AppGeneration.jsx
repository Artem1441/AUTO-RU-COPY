import React, { useState } from "react";
import { STYLES } from "../../../utils/styles";
import { AppButtonSmall } from "../button/AppButtonSmall";
import { AppText } from "../text/AppText";
import "./generation.css";
import updateIcon from "../../../assets/img/updateIcon.svg";
import removeIcon from "../../../assets/img/removeIcon.svg";
import { AppSwal } from "./../../../utils/swal";

export const AppGeneration = ({
  generation,
  setCurrentGeneration = () => {},
  current = false,
  deleteFunc = () => {},
  updateFunc = () => {},
  isUpdate = false,
  isDelete = false,
  getSelfId = false,
}) => {
  const [visible, setVisible] = useState(true);
  const [isLoad, setIsLoad] = useState(false);

  const loadStyles = {
    objectFit: "cover",
    minWidth: (STYLES.AUTO_PICTURE_SIZE * 4) / 3,
    maxWidth: (STYLES.AUTO_PICTURE_SIZE * 4) / 3,
    height: STYLES.AUTO_PICTURE_SIZE,
    objectFit: "cover",
  };
  const notLoadStyles = {
    minWidth: (STYLES.AUTO_PICTURE_SIZE * 4) / 3,
    maxWidth: (STYLES.AUTO_PICTURE_SIZE * 4) / 3,
    height: STYLES.AUTO_PICTURE_SIZE,
    background: STYLES.RED,
  };

  return (
    <div
      className={
        !current ? "appGeneration" : "appGeneration appGenerationActive"
      }
      style={{
        border: STYLES.BORDER_DEFAULT_STYLE,
        display: visible ? "flex" : "none",
      }}
      onClick={() => {
        setCurrentGeneration(
          generation,
          getSelfId ? generation.GenerationModelId : generation._id,
          !getSelfId ? generation.GenerationModelId : generation._id
        );
      }}
    >
      <img
        src={generation.ImageUrl}
        alt={generation.GenerationTitle}
        style={isLoad ? loadStyles : notLoadStyles}
        onLoad={() => {
          setIsLoad(true);
        }}
      />

      <AppText className="appGenerationTitle" style={{ fontSize: 12 }}>
        {generation.GenerationTitle}
      </AppText>
      <div className="appGenerationBtns">
        {isUpdate && (
          <AppButtonSmall onClick={() => updateFunc(generation._id)}>
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
                  deleteFunc(generation._id);
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
