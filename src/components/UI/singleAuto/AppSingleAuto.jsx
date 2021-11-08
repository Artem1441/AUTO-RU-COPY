import React, { useEffect, useState } from "react";
import { AppText } from "../text/AppText";
import { STYLES } from "./../../../utils/styles";
import "./singleAuto.css";
import {
  ReadAllInFirebase,
  ReadAllInFirebaseWithThreeQueriesV2,
} from "./../../../firebase/crudAdmin";
import { AppTitle } from "./../titles/AppTitle";
import { Link, useHistory } from "react-router-dom";
import { PATHS } from "../../../utils/paths";

export const AppSingleAuto = ({ autoData }) => {
  const [mark, setMark] = useState(autoData.Mark);
  const [model, setModel] = useState(autoData.Model);
  const [generation, setGeneration] = useState(autoData.Generation);
  const [typeOfBody, setTypeOfBody] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  const loadStyles = {
    objectFit: "cover",
    minWidth: STYLES.SINGLE_AUTO_WIDTH,
    maxWidth: STYLES.SINGLE_AUTO_WIDTH,
    height: STYLES.SINGLE_AUTO_HEIGHT,
  };
  const notLoadStyles = {
    minWidth: STYLES.SINGLE_AUTO_WIDTH,
    maxWidth: STYLES.SINGLE_AUTO_WIDTH,
    height: STYLES.SINGLE_AUTO_HEIGHT,
    background: STYLES.RED,
  };

  const textStyles = {
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    display: "flex",
  };

  const textInTextStyles = {
    color: "rgba(0,0,0,0.6)",
    fontSize: 14,
    marginLeft: 10,
  };

  useEffect(() => {
    ReadAllInFirebaseWithThreeQueriesV2(
      "AutoModels",
      "MarkId",
      autoData.MarkId,
      "AutoModelId",
      autoData.ModelCollection
    ).then((data) => {
      data.forEach((dataItem) => {
        if (
          (dataItem.data().GenerationModelId === autoData.ModelId) &
          (dataItem.data().GenerationMarkId === autoData.MarkId) &
          (dataItem.id === autoData.GenerationId)
        ) {
          setMark(dataItem.data().GenerationMark);
          setModel(dataItem.data().GenerationModel);
          setGeneration(dataItem.data().GenerationTitle);
        }
      });
    });

    ReadAllInFirebase("TypeOfBody").then((data) => {
      data.forEach((dataItem) => {
        if (dataItem.id === autoData.TypeOfBody) {
          setTypeOfBody(dataItem.data().TypeOfBodyTitle);
        }
      });
    });
  }, []);

  const directToSingleAutoPage = ({ id, data }) => {
    window.open(`${PATHS.SINGLE_AUTO}/${id}`, "_blank").focus();
    // открытие ссылки в новом окне
    localStorage.setItem(id, JSON.stringify(data));
  };

  return (
    <div className="appSingleAuto">
      <div className="container">
        <div
          className="appSingleAutoBlock"
          onClick={() =>
            directToSingleAutoPage({ id: autoData.id, data: autoData })
          }
        >
          <img
            src={autoData.ImagesArr[0]}
            alt={autoData.Mark + autoData.Model}
            style={isLoad ? loadStyles : notLoadStyles}
            onLoad={() => {
              setIsLoad(true);
            }}
          />

          <div className="appSingleAutoBlockInfo">
            <div className="appSingleAutoBlockInfoMain">
              <AppTitle>
                {mark} {model} {generation}
              </AppTitle>
              <div className="appSingleAutoBlockInfoMainPrice">
                <AppText>
                  {String(autoData.Price)
                    .replace(/\s/g, "")
                    .replace(/(\d)(?=(\d{3})+$)/g, "$1 ")}
                  руб
                </AppText>
              </div>
            </div>

            <div className="appSingleAutoBlockInfoOther">
              <div className="appSingleAutoBlockInfoOtherMain">
                <AppText>{autoData.Year}</AppText>
                <AppText>{autoData.Mileage} км</AppText>
              </div>

              <div className="appSingleAutoBlockInfoOtherComain">
                <div className="appSingleAutoBlockInfoOtherComainBlock">
                  <AppText style={textStyles}>
                    Мощность:
                    <AppText style={textInTextStyles}>
                      {autoData.Power} л.с
                    </AppText>
                  </AppText>
                </div>

                <div className="appSingleAutoBlockInfoOtherComainBlock">
                  <AppText style={textStyles}>
                    Кузов:
                    <AppText style={textInTextStyles}>{typeOfBody}</AppText>
                  </AppText>
                </div>

                <div className="appSingleAutoBlockInfoOtherComainBlock">
                  <AppText style={textStyles}>
                    Привод:
                    <AppText style={textInTextStyles}>
                      {autoData.DriveUnit}
                    </AppText>
                  </AppText>
                </div>

                <div className="appSingleAutoBlockInfoOtherComainBlock">
                  <AppText style={textStyles}>
                    Коробка:
                    <AppText style={textInTextStyles}>
                      {autoData.Transmission}
                    </AppText>
                  </AppText>
                </div>

                <div className="appSingleAutoBlockInfoOtherComainBlock">
                  <AppText style={textStyles}>
                    Мотор:
                    <AppText style={textInTextStyles}>
                      {autoData.TypeOfMotor}
                    </AppText>
                  </AppText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
