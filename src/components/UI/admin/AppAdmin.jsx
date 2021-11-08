import React, { useState } from "react";
import { STYLES } from "../../../utils/styles";
import { AppButton } from "../button/AppButton";
import { AppText } from "../text/AppText";
import "./admin.css";

export const AppAdmin = ({ admin, deleteAdmin, isShowDeleteBtn = true }) => {
  const [visible, setVisible] = useState(true);

  return (
    <div
      className="appAdmin"
      style={{
        border: STYLES.BORDER_DEFAULT_STYLE,
        display: visible ? "flex" : "none",
      }}
    >
      <AppText>{admin.AdminEmail}</AppText>

      {isShowDeleteBtn && (
        <AppButton
          onClick={() => {
            deleteAdmin(admin._id, admin.AdminEmail);
            setVisible(false);
          }}
        >
          Удалить
        </AppButton>
      )}
    </div>
  );
};
