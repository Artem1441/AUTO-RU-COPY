import React from "react";
import "./logo.css";
import { PATHS } from "./../../../utils/paths";
import { NavLink } from "react-router-dom";

export const AppLogo = () => {
  return (
    <NavLink to={PATHS.HOME} className="appLogo">
      koz.ru
    </NavLink>
  );
};
