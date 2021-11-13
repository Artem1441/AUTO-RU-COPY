import React from "react";
import "./logo.css";
import { PATHS } from "./../../../utils/paths";
import { NavLink } from "react-router-dom";
import goat from "../../../assets/img/goat.png";
import { STYLES } from "./../../../utils/styles";

export const AppLogo = () => {
  return (
    <NavLink to={PATHS.HOME} className="appLogo">
      <img src={goat} style={{ width: STYLES.LOGO_SIZE }} />
    </NavLink>
  );
};
