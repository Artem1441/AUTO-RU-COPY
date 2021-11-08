import React from "react";
import "./text.css";

export const AppText = ({ children, ...props }) => {
  return (
    <div className="appText" {...props}>
      {children}
    </div>
  );
};
