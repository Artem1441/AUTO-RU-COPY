import React, { useEffect } from "react";
import "./../admin.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminsArrayAction,
  getAdminsArrayRefreshAction,
} from "../../../store/adminUpdateReducer";
import { AppTitle } from "./../../UI/titles/AppTitle";
import {
  ReadAllInFirebase,
  RemoveFromFirebase,
} from "../../../firebase/crudAdmin";
import { AppAdmin } from "./../../UI/admin/AppAdmin";
import { AppLoader } from "../../UI/loader/AppLoader";

export const UpdateNewAdminAutoEmail = () => {
  const dispatch = useDispatch();
  const adminsArr = useSelector((state) => state.adminUpdateName.adminsArr);
  const myEmail = useSelector((state) => state.userName.email);

  useEffect(() => {
    dispatch(getAdminsArrayRefreshAction());
    ReadAllInFirebase("Admins")
      .then((data) => {
        data.forEach((dataItem) => {
          dispatch(
            getAdminsArrayAction({ ...dataItem.data(), _id: dataItem.id })
          );
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const deleteAdmin = async (id, elem) => {
    RemoveFromFirebase("Admins", id, elem);
  };

  return (
    <div className="add_auto">
      <AppTitle>Выберите администраторов которых нужно удалить</AppTitle>

      <div className="update_admins">
        {adminsArr.length > 0 ? (
          adminsArr.map((admin, index) => {
            return (
              <AppAdmin
                key={index}
                admin={admin}
                deleteAdmin={deleteAdmin}
                isShowDeleteBtn={admin.AdminEmail === myEmail ? false : true}
              />
            );
          })
        ) : (
          <AppLoader />
        )}
      </div>
    </div>
  );
};
