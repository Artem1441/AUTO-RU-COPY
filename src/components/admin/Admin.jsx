import React from "react";
import { AppButton } from "../UI/button/AppButton";
import { NavLink } from "react-router-dom";
import { PATHS } from "./../../utils/paths";
import createIcon from "../../assets/img/createIcon.svg";
import updateIcon from "../../assets/img/updateIcon.svg";
import { STYLES } from "../../utils/styles";
import { AppTitle } from "./../UI/titles/AppTitle";
import { AppLogo } from "./../UI/logo/AppLogo";

export const Admin = () => {
  return (
    <div className="admin">
      <div
        className="admin_header"
        style={{
          height: STYLES.HEADER_HEIGHT,
          background: STYLES.RED,
        }}
      >
        <div className="container" style={{ width: "100%" }}>
          <AppTitle>
            Админка лучшего сервиса - <AppLogo />
          </AppTitle>
        </div>
      </div>

      <div className="container">
        <div className="admin_btns">
          <div className="admin_btns_container">
            <NavLink to={PATHS.ADMIN_ADD_NEW_ADMIN}>
              <AppButton>
                <img src={createIcon} style={{ height: STYLES.ICON_SIZE }} />
                Добавить нового администратора
              </AppButton>
            </NavLink>

            <NavLink to={PATHS.ADMIN_UPDATE_ADMINS}>
              <AppButton>
                <img src={updateIcon} style={{ height: STYLES.ICON_SIZE }} />
                Редактировать администраторов
              </AppButton>
            </NavLink>
          </div>

          <div className="admin_btns_container">
            <NavLink to={PATHS.ADMIN_ADD_MARK}>
              <AppButton>
                <img src={createIcon} style={{ height: STYLES.ICON_SIZE }} />
                Добавить новую марку
              </AppButton>
            </NavLink>

            <NavLink to={PATHS.ADMIN_UPDATE_MARKS}>
              <AppButton>
                <img src={updateIcon} style={{ height: STYLES.ICON_SIZE }} />
                Редактировать марки
              </AppButton>
            </NavLink>
          </div>

          <div className="admin_btns_container">
            <NavLink to={PATHS.ADMIN_ADD_MODELS}>
              <AppButton>
                <img src={createIcon} style={{ height: STYLES.ICON_SIZE }} />
                Добавить новую модель
              </AppButton>
            </NavLink>

            <NavLink to={PATHS.ADMIN_UPDATE_MODELS}>
              <AppButton>
                <img src={updateIcon} style={{ height: STYLES.ICON_SIZE }} />
                Редактировать модели
              </AppButton>
            </NavLink>
          </div>

          <div className="admin_btns_container">
            <NavLink to={PATHS.ADMIN_ADD_GENERATION}>
              <AppButton>
                <img src={createIcon} style={{ height: STYLES.ICON_SIZE }} />
                Добавить новое поколение
              </AppButton>
            </NavLink>

            <NavLink to={PATHS.ADMIN_UPDATE_GENERATION}>
              <AppButton>
                <img src={updateIcon} style={{ height: STYLES.ICON_SIZE }} />
                Редактировать поколения
              </AppButton>
            </NavLink>
          </div>

          <div className="admin_btns_container">
            <NavLink to={PATHS.ADMIN_ADD_OTHER_CATEGORIES}>
              <AppButton>
                <img src={updateIcon} style={{ height: STYLES.ICON_SIZE }} />
                Создать тип кузова
              </AppButton>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
