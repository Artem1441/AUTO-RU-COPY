import React from "react";
import { Transition } from "../../components/transition/Transition";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { PATHS } from "../../utils/paths";
import { CreateInFirebase, ReadAllInFirebase } from "../../firebase/crudAdmin";
import { AppSwal } from "../../utils/swal";
import { SignUpUserWithEmailAndPassword } from "../../firebase/authFirebase";

import {
  addNewAdminAction,
  addNewAdminPasswordAction,
} from "../../store/adminReducer";
import {
  AddNewAdminAutoEmail,
  AddNewAdminAutoInfo,
} from "../../components/admin/Add/AddNewAdmin";

export const AdminAddNewAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const adminEmail = useSelector(
    (state) => state.adminName.addNewAdminAdmin.email
  );

  const addNewAdminEmailDependency = async () => {
    if (adminEmail === "") {
      AppSwal("Ошибка", "Вы не указали email", "error");
      return false;
    }

    // блок проверки на наличии такой же почты в бд
    const isNext = await ReadAllInFirebase("Admins").then((data) => {
      let isCreateNewAdmin = true;
      data.forEach((dataItem) => {
        if (dataItem.data().AdminEmail === adminEmail) {
          isCreateNewAdmin = false;
        }
      });
      if (isCreateNewAdmin === false) {
        AppSwal(
          "Ошибка",
          `Пользователь с почтой ${adminEmail} уже является администратором`,
          "error"
        );
        dispatch(addNewAdminAction(""));
        return false;
      }
      return true;
    });
    if (!isNext) return false;
    // конец

    CreateInFirebase("Admins", {
      AdminEmail: adminEmail,
    })
      .then(() => {
        const adminRandomPassword = Math.random().toString(36).substr(2, 9);
        SignUpUserWithEmailAndPassword(adminEmail, adminRandomPassword)
          .then(() => {
            dispatch(addNewAdminPasswordAction(adminRandomPassword));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .then(() => {
        AppSwal(
          "Успех",
          `У вас появился новый администратор ${adminEmail}`,
          "success"
        );
      })
      .catch((error) => {
        return false;
      });
    return true;
  };

  const finishFunc = () => {
    dispatch(addNewAdminAction(""));
    dispatch(addNewAdminPasswordAction(""));
    history.push(PATHS.ADMIN);
  };

  const components = [<AddNewAdminAutoEmail />, <AddNewAdminAutoInfo />];

  const dependenciesOfComponent = [
    addNewAdminEmailDependency,
    () => {
      return true;
    },
  ];

  return (
    <div className="admin">
      <Transition
        components={components}
        dependencies={dependenciesOfComponent}
        finishFunc={finishFunc}
      />
    </div>
  );
};
