import React from "react";
import "./../admin.css";
import { useDispatch, useSelector } from "react-redux";
import { addNewAdminAction } from "../../../store/adminReducer";
import { AppTitle } from "./../../UI/titles/AppTitle";
import { AppInput } from "./../../UI/input/AppInput";
import { AppText } from "../../UI/text/AppText";

export const AddNewAdminAutoEmail = () => {
  const dispatch = useDispatch();
  const adminEmail = useSelector(
    (state) => state.adminName.addNewAdminAdmin.email
  );
  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Впишите почту нового админа</AppTitle>
      </div>

      <div className="add_auto_input">
        <AppInput
          type="text"
          placeholder={`Например: admin@mail.com`}
          value={adminEmail}
          onChange={(prev) => dispatch(addNewAdminAction(prev.target.value))}
        />
      </div>
    </div>
  );
};

export const AddNewAdminAutoInfo = () => {
  const adminPassword = useSelector(
    (state) => state.adminName.addNewAdminAdmin.password
  );
  const adminEmail = useSelector(
    (state) => state.adminName.addNewAdminAdmin.email
  );

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Данные для админа</AppTitle>
      </div>

      <div className="add_auto_input">
        <AppText>Email: {adminEmail}</AppText>
        <AppText>Пароль: {adminPassword}</AppText>
      </div>
    </div>
  );
};
