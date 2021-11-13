import React from "react";
import "./redirect.css";
import { useHistory } from "react-router-dom";
import { PATHS } from "../../../utils/paths";
import { AppButton } from "../button/AppButton";
import { STYLES } from "../../../utils/styles";
import { AppText } from "./../text/AppText";

export const AppRedirectToLogin = ({ text }) => {
  const history = useHistory();

  return (
    <div
      className="appRedirect"
      style={{
        height: STYLES.FREE_SPACE_HEIGHT(),
      }}
    >
      <div className="container">
        <div className="appRedirectText">
          <AppText style={{ textAlign: "center" }}>
            Для {text} необходимо войти в систему
          </AppText>
        </div>
        <div className="appRedirectBtn">
          <AppButton onClick={() => history.push(PATHS.LOGIN)}>
            Авторизироваться
          </AppButton>
        </div>
      </div>
    </div>
  );
};
