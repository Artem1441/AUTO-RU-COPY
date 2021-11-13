import React from "react";
import { STYLES } from "../../../utils/styles";
import "./textarea.css";

export const AppTextarea = (props) => {
  return (
    <textarea
      {...props}
      className="appTextarea"
      wrap="hard"
      style={{ border: STYLES.BORDER_DEFAULT_STYLE }}
    ></textarea>
  );
};

// {...props}
// className="appTextarea"
// wrap="hard"
// style={{ border: STYLES.BORDER_DEFAULT_STYLE }}>
//   <textarea />
