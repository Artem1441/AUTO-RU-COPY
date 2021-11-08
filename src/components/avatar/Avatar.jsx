import React from "react";
import avatar from "../../assets/img/avatar.svg";
import { STYLES } from "../../utils/styles";
import "./avatar.css";

export const Avatar = ({ data }) => {
  return data !== "" ? (
    <img
      className="avatar"
      src={data}
      style={{
        width: STYLES.AVATAR_SIZE,
        height: STYLES.AVATAR_SIZE,
        background: "white"
      }}
    />
  ) : (
    <img
      className="avatar"
      src={avatar}
      style={{
        width: STYLES.AVATAR_SIZE,
        height: STYLES.AVATAR_SIZE,
        background: "white"

      }}
    />
  );
};
