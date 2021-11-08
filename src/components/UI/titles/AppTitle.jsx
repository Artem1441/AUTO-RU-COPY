import React from "react";
import "./title.css";

export const AppTitle = ({ children, ...props }) => {
  return (
    <div className="appTitle" {...props}>
      {children}
    </div>
  );
};
