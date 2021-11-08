import React from "react";
import "./button.css";
import { STYLES } from "./../../../utils/styles";

export const AppButtonSmall = ({ children, ...props }) => {
  return (
    <button {...props} className="appBtnSmall" style={{ background: STYLES.RED }}>
      {children}
    </button>
  );
};
