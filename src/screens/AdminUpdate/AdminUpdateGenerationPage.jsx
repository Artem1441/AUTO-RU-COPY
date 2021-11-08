import React from "react";
import { Transition } from "../../components/transition/Transition";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { PATHS } from "../../utils/paths";
import { AppSwal } from "../../utils/swal";

import {
  ReadAllInFirebase,
  ReadAllInFirebaseWithTwoQueries,
} from "../../firebase/crudAdmin";
import { CreateInFirebase } from "./../../firebase/crudAdmin";
import {
  UpdateNewAdminGenerationMark,
  UpdateNewAdminGenerationModel,
  UpdateNewAdminGeneration,
} from "./../../components/admin/Update/UpdateNewGeneration";
import { getMarkIdCategoryAction } from "../../store/adminUpdateReducer";
import { getModelIdCategoryAction } from "./../../store/adminUpdateReducer";

export const AdminUpdateGenerationPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const markId = useSelector((state) => state.adminUpdateName.markId);
  const mark = useSelector((state) => state.adminUpdateName.mark);
  const markIdCategory = useSelector(
    (state) => state.adminUpdateName.markIdCategory
  );
  const generationId = useSelector(
    (state) => state.adminUpdateName.generationId
  );
  const generation = useSelector((state) => state.adminUpdateName.generation);
  const modelId = useSelector((state) => state.adminUpdateName.modelId);

  const updateGenerationMarkDependency = async () => {
    if (markId === "") {
      AppSwal("Ошибка", "Вы не выбрали марку", "error");
      return false;
    }

    ReadAllInFirebase("AutoModels").then((data) => {
      let isCreateNewAutoModelsIdCategory = true;
      data.forEach((dataItem) => {
        if (dataItem.data().MarkId === markId) {
          dispatch(getMarkIdCategoryAction(dataItem.id));
          isCreateNewAutoModelsIdCategory = false;
        }
      });
      // ReadAllInFirebase - проверяет ветку AutoModels на наличие ветки с названием марки и если её ещё нет, то создаёт её (чекни isCreateNewAutoModelsIdCategory => if true - уже создана ветка, if false - не создана)

      isCreateNewAutoModelsIdCategory &&
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

  const updateGenerationModelDependency = async () => {
    if (modelId === "") {
      AppSwal("Ошибка", "Вы не выбрали поколение", "error");
      return false;
    }

    ReadAllInFirebaseWithTwoQueries("AutoModels", markIdCategory, markId).then(
      (data) => {
        data.forEach((dataItem) => {
          if (dataItem.data().AutoModelId === modelId) {
            dispatch(getModelIdCategoryAction(dataItem.id));
          }
        });
      }
    );

    return true;
  };

  const components = [
    <UpdateNewAdminGenerationMark />,
    <UpdateNewAdminGenerationModel />,
    <UpdateNewAdminGeneration />,
  ];

  const dependenciesOfComponent = [
    updateGenerationMarkDependency,
    updateGenerationModelDependency,
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
