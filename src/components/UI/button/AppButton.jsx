import React from "react";
import "./button.css";
import { STYLES } from "./../../../utils/styles";

export const AppButton = ({ children, ...props }) => {
  return (
    <button {...props} className="appBtn" style={{ background: STYLES.RED }}>
      {children}
    </button>
  );
};
