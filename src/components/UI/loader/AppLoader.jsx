import React from "react";
import "./loader.css";
import { STYLES } from "./../../../utils/styles";

export const AppLoader = () => {
  return (
    <div className="center">
      <div
        className="loader"
        style={{ border: `3px dashed ${STYLES.RED}` }}
      ></div>
    </div>
  );
};
