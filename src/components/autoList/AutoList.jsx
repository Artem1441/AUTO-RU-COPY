import React from "react";
import { AppSingleAuto } from "./../UI/singleAuto/AppSingleAuto";
import { AppLoader } from "./../UI/loader/AppLoader";
import { AppText } from "../UI/text/AppText";
import { STYLES } from "./../../utils/styles";

export const AutoList = ({ autoData, isLoad }) => {
  return (
    <div className="autoList">
      {autoData.length > 0 ? (
        autoData &&
        autoData.map((auto, index) => (
          <AppSingleAuto key={index} autoData={auto} />
        ))
      ) : isLoad ? (
        <AppLoader />
      ) : (
        <AppText
          style={{
            fontSize: STYLES.WINDOW_WIDTH > 480 ? 18 : 16,
            textAlign: "center",
          }}
        >
          По вашему запросы нет предложений
        </AppText>
      )}
    </div>
  );
};
