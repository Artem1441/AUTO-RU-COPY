import React from "react";
import "./footer.css";
import { STYLES } from "./../../utils/styles";

export const Footer = () => {
  return (
    <div className="footer" style={{ background: STYLES.RED }}>
      <div className="container">
        <div className="footer_rights">
          Все права защищены в бою с MINI-клубом
        </div>
      </div>
    </div>
  );
};
