import React from "react";
import { Transition } from "../../components/transition/Transition";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { PATHS } from "../../utils/paths";
import { AppSwal } from "../../utils/swal";

import { getMarkIdCategoryAction } from "./../../store/adminUpdateReducer";
import {
  UpdateNewAdminModel,
  UpdateNewAdminModelMark,
} from "../../components/admin/Update/UpdateNewModel";
import { ReadAllInFirebase } from "../../firebase/crudAdmin";
import { CreateInFirebase } from "./../../firebase/crudAdmin";

export const AdminUpdateModelPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const markId = useSelector((state) => state.adminUpdateName.markId);
  const mark = useSelector((state) => state.adminUpdateName.mark);

  const updateModelMarkDependency = async () => {
    if (markId === "") {
      AppSwal("Ошибка", "Вы не выбрали марку", "error");
      return false;
    }

    ReadAllInFirebase("AutoModels").then((data) => {
      let isCreate = true;
      data.forEach((dataItem) => {
        if (dataItem.data().MarkId === markId) {
          dispatch(getMarkIdCategoryAction(dataItem.id));
          isCreate = false;
        }
      });
      // ReadAllInFirebase - проверяет ветку AutoModels на наличие ветки с названием марки и если её ещё нет, то создаёт её (чекни isCreateNewAutoModelsIdCategory => if true - уже создана ветка, if false - не создана)

      isCreate &&
        CreateInFirebase(`AutoModels`, {
          Mark: mark,
          MarkId: markId,
        })
          .then((data) => {
            dispatch(getMarkIdCategoryAction(data.id));
          })
          .catch((error) => {
            console.log(error);
            return false;
          });
    });

    return true;
  };

  const components = [<UpdateNewAdminModelMark />, <UpdateNewAdminModel />];

  const dependenciesOfComponent = [
    updateModelMarkDependency,
    () => {
      return true;
    },
  ];

  const finishFunc = () => {
    history.push(PATHS.ADMIN);
  };

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
