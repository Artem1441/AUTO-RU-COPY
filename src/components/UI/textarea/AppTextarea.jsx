import React from "react";
import { STYLES } from "../../../utils/styles";
import "./textarea.css";

export const AppTextarea = (props) => {
  return (
    <input
      {...props}
      className="appTextarea"
      style={{ border: STYLES.BORDER_DEFAULT_STYLE }}
    />
  );
};
