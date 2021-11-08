import React from "react";
import { AppSingleAuto } from "./../UI/singleAuto/AppSingleAuto";
import { AppLoader } from "./../UI/loader/AppLoader";

export const AutoList = ({ autoData }) => {
  return (
    <div className="autoList">
      {autoData.length > 0 ? (
        autoData &&
        autoData.map((auto, index) => (
          <AppSingleAuto key={index} autoData={auto} />
        ))
      ) : (
        <AppLoader />
      )}
    </div>
  );
};
