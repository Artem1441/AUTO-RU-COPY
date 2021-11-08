import React, { useEffect } from "react";
import { PATHS } from "./../utils/paths";
import { Admin } from "./../components/admin/Admin";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const AdminPage = () => {
  const isAdmin = useSelector((state) => state.userName.isAdmin);
  useEffect(() => {
    document.title = `Админка`;
  }, []);
  const history = useHistory();
  // history.push(PATHS.HOME)

  return <div>{isAdmin ? <Admin /> : <div>Вход для администратора</div>}</div>;
};
