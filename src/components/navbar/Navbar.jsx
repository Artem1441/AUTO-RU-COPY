import React from "react";
import { NavLink } from "react-router-dom";
import { PATHS } from "../../utils/paths";
import "./navbar.css";
import { STYLES } from "./../../utils/styles";

export const Navbar = () => {
  return (
    <div
      className="navbar"
      style={{
        background: STYLES.RED,
        height: STYLES.NAVBAR_HEIGHT,
        marginBottom: 10,
      }}
    >
      {/* <NavLink to={PATHS.ADD}>
        <button>HOME</button>
      </NavLink> */}
    </div>
  );
};
