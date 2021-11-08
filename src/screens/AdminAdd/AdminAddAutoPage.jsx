import React, { useEffect } from "react";
import { Transition } from "../../components/transition/Transition";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { PATHS } from "../../utils/paths";
import {
  CreateInFirebase,
  CreateInFirebaseWithTwoQueries,
  ReadAllInFirebase,
  ReadAllInFirebaseWithTwoQueries,
  UpdateInFirebaseWithTwoQueries,
} from "../../firebase/crudAdmin";
import { AppSwal } from "../../utils/swal";

import {
  addAutoMarkAndIdAction,
  addAutoTitleAction,
  addAutoImageUrlAction,
  addAutoDescriptionAction,
  addAutoModelsIdCategoryAction,
  addAutoTransliterationAction,
} from "../../store/adminReducer";
import {
  AddAutoAdminAutoMark,
  AddAutoAdminAutoTitle,
  AddAutoAdminAutoImageUrl,
  AddAutoAdminAutoDescription,
} from "../../components/admin/Add/AddAutoAdmin";
import { useParams } from "react-router-dom";
import { AddModel, UpdateModel } from "../../firebase/addFunctions";
import { AddAutoData } from "./../../firebase/addFunctions";
import { AddAutoAdminAutoTransliteration } from "./../../components/admin/Add/AddAutoAdmin";

export const AdminAddAutoPage = () => {
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      ReadAllInFirebaseWithTwoQueries(
        "AutoModels",
        params.markIdCategory,
        params.idMark
      ).then((data) => {
        data.forEach((dataItem) => {
          if (dataItem.id === params.id) {
            let markId = dataItem.data().AutoMarkId;
            let mark = dataItem.data().AutoMark;
            dispatch(addAutoModelsIdCategoryAction(params.markIdCategory));
            dispatch(addAutoMarkAndIdAction({ markId, mark }));
            dispatch(addAutoTitleAction(dataItem.data().AutoTitle));
            dispatch(addAutoTransliterationAction(dataItem.data().AutoTransliteration));
            dispatch(addAutoImageUrlAction(dataItem.data().ImageUrl));
            dispatch(addAutoDescriptionAction(dataItem.data().Description));
          }
        });
      });
    }
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();

  const autoModelsIdCategory = useSelector(
    (state) => state.adminName.addAutoAdmin.autoModelsIdCategory
  );
  const autoMarkId = useSelector(
    (state) => state.adminName.addAutoAdmin.markId
  );
  const autoMark = useSelector((state) => state.adminName.addAutoAdmin.mark);
  const autoTitle = useSelector((state) => state.adminName.addAutoAdmin.title);
  const autoTransliteration = useSelector(
    (state) => state.adminName.addAutoAdmin.transliteration
  );
  const autoImageUrl = useSelector(
    (state) => state.adminName.addAutoAdmin.imageUrl
  );
  const autoDescription = useSelector(
    (state) => state.adminName.addAutoAdmin.description
  );

  const addAutoMarkDependency = async () => {
    if (autoMark === "") {
      AppSwal("Ошибка", "Вы не выбрали марку", "error");
      return false;
    }

    ReadAllInFirebase("AutoModels").then((data) => {
      let isCreateNewAutoModelsIdCategory = true;
      data.forEach((dataItem) => {
        if (dataItem.data().MarkId === autoMarkId) {
          dispatch(addAutoModelsIdCategoryAction(dataItem.id));
          isCreateNewAutoModelsIdCategory = false;
        }
      });
      // ReadAllInFirebase - проверяет ветку AutoModels на наличие ветки с названием марки и если её ещё нет, то создаёт её (чекни isCreateNewAutoModelsIdCategory => if true - уже создана ветка, if false - не создана)

      isCreateNewAutoModelsIdCategory &&
        CreateInFirebase(`AutoModels`, {
          Mark: autoMark,
          MarkId: autoMarkId,
        })
          .then((data) => {
            dispatch(addAutoModelsIdCategoryAction(data.id));
          })
          .catch((error) => {
            console.log(error);
            return false;
          });
    });

    return true;
  };

  const addAutoTitleDependency = async () => {
    if (autoTitle === "") {
      AppSwal("Ошибка", "Вы не указали название автомобиля", "error");
      return false;
    }

    if (!params.id) {
      // блок проверки на наличии такой же модели в бд
      const isNext = await ReadAllInFirebaseWithTwoQueries(
        "AutoModels",
        autoModelsIdCategory,
        autoMarkId
      ).then((data) => {
        let isCreateNewAutoMark = true;
        data.forEach((dataItem) => {
          if (dataItem.data().AutoTitle === autoTitle) {
            isCreateNewAutoMark = false;
          }
        });
        if (isCreateNewAutoMark === false) {
          AppSwal("Ошибка", `Авто ${autoTitle} уже существует`, "error");
          dispatch(addAutoTitleAction(""));
          return false;
        }
        return true;
      });
      if (!isNext) return false;
      // конец

      return true;
    } else {
      return true;
    }
  };

  const addAutoTransliterationeDependency = async () => {
    if (autoTransliteration === "") {
      AppSwal("Ошибка", "Вы не указали транслитерацию автомобиля", "error");
      return false;
    }
    return true;
  };

  const addAutoImageUrlDependency = async () => {
    if (autoImageUrl === "") {
      AppSwal("Ошибка", "Вы не загрузили фото автомобиля", "error");
      return false;
    }
    return true;
  };

  const addAutoDescriptionDependency = async () => {
    if (autoDescription === "") {
      AppSwal("Ошибка", "Вы не добавили описание автомобиля", "error");
      return false;
    }
    return true;
  };

  const finishFunc = () => {
    let Func;
    params.id ? (Func = UpdateInFirebaseWithTwoQueries) : (Func = AddModel);
    const autoModelsIdCategoryCopy = autoMarkId;
    const autoMarkIdCopy = autoModelsIdCategory;
    const autoMarkCopy = autoMark;
    const autoTitleCopy = autoTitle;
    const autoTransliterationCopy = autoTransliteration;

    !params.id
      ? AddModel({
          autoModelsIdCategory: autoModelsIdCategory,
          autoMarkId: autoMarkId,
          autoMark: autoMark,
          autoModelId: Math.random().toString(36).substr(2, 9),
          autoTitle: autoTitle,
          autoTransliteration: autoTransliteration,
          autoImageUrl: autoImageUrl,
          autoDescription: autoDescription,
          dispatch: dispatch,
        })
          .then(async (data) => {
            AddAutoData({
              Name: autoTitleCopy,
              Transliteration: autoTransliterationCopy,
              WhatIsIt: "Model",
              MarkId: autoMarkIdCopy,
              Mark: autoMarkCopy,
              ModelCollection: autoModelsIdCategoryCopy,
              ModelId: data.id,
            });

            history.push(PATHS.ADMIN);
            AppSwal(
              "Успех",
              `Вы создали модель ${autoMarkCopy} ${autoTitleCopy}`,
              "success"
            );
          })
          .catch((error) => {
            console.log(error);
          })
      : UpdateModel({
          autoModelsIdCategory: autoModelsIdCategory,
          autoMarkId: autoMarkId,
          autoMark: autoMark,
          autoTitle: autoTitle,
          autoTransliteration: autoTransliteration,
          autoImageUrl: autoImageUrl,
          autoDescription: autoDescription,
          autoModelId: Math.random().toString(36).substr(2, 9),
          elementId: params.id,
          dispatch: dispatch,
        })
          .then(async () => {
            history.push(PATHS.ADMIN);
            AppSwal(
              "Успех",
              `Вы обновили модель ${autoMarkCopy} ${autoTitleCopy}`,
              "success"
            );
          })
          .catch((error) => {
            console.log(error);
          });
  };

  const components = [
    <AddAutoAdminAutoMark />,
    <AddAutoAdminAutoTitle />,
    <AddAutoAdminAutoTransliteration />,
    <AddAutoAdminAutoImageUrl />,
    <AddAutoAdminAutoDescription />,
  ];

  const dependenciesOfComponent = [
    addAutoMarkDependency,
    addAutoTitleDependency,
    addAutoTransliterationeDependency,
    addAutoImageUrlDependency,
    addAutoDescriptionDependency,
  ];

  return (
    <div className="admin">
      {params.id ? (
        <Transition
          components={components.slice(1)}
          dependencies={dependenciesOfComponent.slice(1)}
          finishFunc={finishFunc}
        />
      ) : (
        <Transition
          components={components}
          dependencies={dependenciesOfComponent}
          finishFunc={finishFunc}
        />
      )}
    </div>
  );
};

// Func(
//   "AutoModels",
//   autoModelsIdCategory,
//   autoMarkId,
//   {
//     AutoMarkId: autoMarkId,
//     AutoMark: autoMark,
//     AutoModelId: Math.random().toString(36).substr(2, 9),
//     AutoTitle: autoTitle,
//     ImageUrl: autoImageUrl,
//     Description: autoDescription,
//   },
//   params.id
// )
//   .then(async () => {
//     dispatch(addAutoMarkAndIdAction(""));
//     dispatch(addAutoTitleAction(""));
//     dispatch(addAutoImageUrlAction(""));
//     dispatch(addAutoDescriptionAction(""));

//     AppSwal(
//       "Успех",
//       params.id
//         ? `Вы обновили позицию ${autoMark} ${autoTitle}`
//         : `Вы создали марку ${autoMark} ${autoTitle}`,
//       "success"
//     ).then((result) => {
//       if (result.isConfirmed) {
//         history.push(PATHS.ADMIN);
//       }
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
