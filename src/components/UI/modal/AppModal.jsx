import React from "react";
import classes from "./modal.module.css";

export const AppModal = ({ children, visible, setVisible }) => {
  const rootClasses = [classes.appModal];

  visible && rootClasses.push(classes.active);

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={classes.appModalContent}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
