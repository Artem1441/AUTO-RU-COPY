import React, { useEffect } from "react";
import { Transition } from "../../components/transition/Transition";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { PATHS } from "../../utils/paths";
import { AppSwal } from "../../utils/swal";
import {
  AddGenerationAdminAutoDescription,
  AddGenerationAdminAutoEndYear,
  AddGenerationAdminAutoImageUrl,
  AddGenerationAdminAutoMark,
  AddGenerationAdminAutoModel,
  AddGenerationAdminAutoStartYear,
  AddGenerationAdminAutoTitle,
  AddGenerationAdminAutoTransliteration,
  AddGenerationAdminAutoTypeOfBody,
} from "./../../components/admin/Add/AddGenerationOfModelAdmin";
import {
  addGenerationDescriptionAction,
  addGenerationEndDateAction,
  addGenerationIdCategoryAction,
  addGenerationIdModelCategoryAction,
  addGenerationImageUrlAction,
  addGenerationMarkAndIdAction,
  addGenerationModelAndIdAction,
  addGenerationModelsArrayRefreshAction,
  addGenerationStartDateAction,
  addGenerationTitleAction,
  addGenerationTransliterationAction,
  addGenerationTypeOfBodyArrIDSAction,
} from "../../store/adminReducer";
import {
  CreateInFirebase,
  CreateInFirebaseWithThreeQueries,
  ReadAllInFirebase,
  ReadAllInFirebaseWithThreeQueries,
  ReadAllInFirebaseWithTwoQueries,
} from "../../firebase/crudAdmin";
import { useParams } from "react-router-dom";
import { UpdateInFirebaseWithThreeQueries } from "./../../firebase/crudAdmin";
import {
  AddGeneration,
  AddAutoData,
  UpdateGeneration,
} from "./../../firebase/addFunctions";

export const AdminAddGenerationPage = () => {
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      ReadAllInFirebaseWithThreeQueries(
        "AutoModels",
        params.markIdCategory,
        params.idMark,
        params.modelIdCategory,
        params.idModel
      ).then((data) => {
        console.log(
          params.markIdCategory,
          params.idMark,
          params.modelIdCategory,
          params.idModel
        );
        data.forEach((dataItem) => {
          console.log(dataItem.data());
          let markId = dataItem.data().GenerationMarkId;
          let mark = dataItem.data().GenerationMark;
          let modelId = dataItem.data().GenerationModelId;
          let model = dataItem.data().GenerationModel;
          dispatch(addGenerationIdCategoryAction(params.markIdCategory));
          dispatch(addGenerationMarkAndIdAction({ markId, mark }));
          dispatch(addGenerationModelAndIdAction({ modelId, model }));
          dispatch(addGenerationIdModelCategoryAction(params.modelIdCategory));
          JSON.parse(dataItem.data().GenerationTypeOfBody).map((typeOfBody) => {
            console.log(typeOfBody);
            dispatch(addGenerationTypeOfBodyArrIDSAction(typeOfBody));
          });
          dispatch(addGenerationModelsArrayRefreshAction());
          dispatch(addGenerationTitleAction(dataItem.data().GenerationTitle));
          dispatch(
            addGenerationTransliterationAction(
              dataItem.data().GenerationTransliteration
            )
          );
          dispatch(addGenerationDescriptionAction(dataItem.data().Description));
          dispatch(addGenerationEndDateAction(dataItem.data().EndYear));
          dispatch(addGenerationStartDateAction(dataItem.data().StartYear));
          dispatch(addGenerationImageUrlAction(dataItem.data().ImageUrl));
          // }
        });
      });
    }
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();
  const autoMarkId = useSelector(
    (state) => state.adminName.addGenerationOfModel.markId
  );
  const autoMark = useSelector(
    (state) => state.adminName.addGenerationOfModel.mark
  );

  const autoGeneationsIdCategory = useSelector(
    (state) => state.adminName.addGenerationOfModel.autoGeneationsIdCategory
  );

  const generationMarkId = useSelector(
    (state) => state.adminName.addGenerationOfModel.markId
  );
  const autoModel = useSelector(
    (state) => state.adminName.addGenerationOfModel.model
  );
  const autoModelId = useSelector(
    (state) => state.adminName.addGenerationOfModel.modelId
  );

  const generationTitle = useSelector(
    (state) => state.adminName.addGenerationOfModel.title
  );

  const generationTransliteration = useSelector(
    (state) => state.adminName.addGenerationOfModel.transliteration
  );

  const typeOfBodyArrIDS = useSelector(
    (state) => state.adminName.addGenerationOfModel.typeOfBodyArrIDS
  );

  const generationImageUrl = useSelector(
    (state) => state.adminName.addGenerationOfModel.imageUrl
  );
  const startYear = useSelector(
    (state) => state.adminName.addGenerationOfModel.startYear
  );

  const endYear = useSelector(
    (state) => state.adminName.addGenerationOfModel.endYear
  );

  const generationDescription = useSelector(
    (state) => state.adminName.addGenerationOfModel.description
  );

  const generationsIdModelCategory = useSelector(
    (state) =>
      state.adminName.addGenerationOfModel.autoGenerationsIdModelCategory
  );

  const addGenerationMarkDependency = async () => {
    if (autoMark === "") {
      AppSwal("Ошибка", "Вы не выбрали марку", "error");
      return false;
    }

    ReadAllInFirebase("AutoModels").then((data) => {
      let isCreateNewAutoModelsIdCategory = true;
      data.forEach((dataItem) => {
        if (dataItem.data().MarkId === autoMarkId) {
          dispatch(addGenerationIdCategoryAction(dataItem.id));
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
            dispatch(addGenerationIdCategoryAction(data.id));
          })
          .catch((error) => {
            console.log(error);
            return false;
          });
    });

    return true;
  };

  const addGenerationModelDependency = async () => {
    if (autoModel === "") {
      AppSwal("Ошибка", "Вы не выбрали авто", "error");
      return false;
    }

    ReadAllInFirebaseWithTwoQueries(
      "AutoModels",
      autoGeneationsIdCategory,
      generationMarkId
    ).then((data) => {
      data.forEach((dataItem) => {
        if (dataItem.id === autoModelId) {
          dispatch(
            addGenerationIdModelCategoryAction(dataItem.data().AutoModelId)
          );
        }
      });
    });
    return true;
  };

  const addGenerationTitleDependency = async () => {
    if (generationTitle === "") {
      AppSwal("Ошибка", "Вы не выбрали модель автомобиля", "error");
      return false;
    }

    if (!params.id) {
      // блок проверки на наличии такого же поколения в бд
      const isNext = await ReadAllInFirebaseWithThreeQueries(
        "AutoModels",
        autoGeneationsIdCategory,
        generationMarkId,
        autoModelId,
        generationsIdModelCategory
      ).then((data) => {
        let isCreateNewAutoGeneration = true;
        data.forEach((dataItem) => {
          if (dataItem.data().GenerationTitle === generationTitle) {
            isCreateNewAutoGeneration = false;
          }
        });
        if (isCreateNewAutoGeneration === false) {
          AppSwal(
            "Ошибка",
            `Поколение ${generationTitle} уже существует`,
            "error"
          );
          dispatch(addGenerationTitleAction(""));
          return false;
        }
        return true;
      });
      if (!isNext) return false;
      // // конец
    }

    return true;
  };

  const addGenerationTransliterationDependency = async () => {
    if (generationTransliteration === "") {
      AppSwal("Ошибка", "Вы не выбрали транслитирацию автомобиля", "error");
      return false;
    }
    return true;
  };

  const addGenerationTypeOfBodyDependency = () => {
    if (typeOfBodyArrIDS.length === 0) {
      AppSwal("Ошибка", "Вы не загрузили фото автомобиля", "error");
      return false;
    }
    return true;
  };

  const addGenerationImageUrlDependency = async () => {
    if (generationImageUrl === "") {
      AppSwal("Ошибка", "Вы не загрузили фото автомобиля", "error");
      return false;
    }
    return true;
  };

  const addGenerationStartDateDependency = async () => {
    if (startYear === "") {
      AppSwal("Ошибка", "Вы не добавили год начала производства", "error");
      return false;
    }
    return true;
  };

  const addGenerationEndDateDependency = async () => {
    if (endYear === "") {
      AppSwal("Ошибка", "Вы не добавили год конца производства", "error");
      return false;
    }
    return true;
  };

  const addGenerationDescriptionDependency = async () => {
    if (generationDescription === "") {
      AppSwal("Ошибка", "Вы не добавили описание", "error");
      return false;
    }
    return true;
  };

  const finishFunc = () => {
    let Func;
    params.id
      ? (Func = UpdateInFirebaseWithThreeQueries)
      : (Func = CreateInFirebaseWithThreeQueries);

    const generationMarkIdopy = autoGeneationsIdCategory;
    const autoGeneationsIdCategoryCopy = generationMarkId;
    const autoModelIdCopy = autoModelId;
    const generationsIdModelCategoryCopy = generationsIdModelCategory;
    const autoMarkCopy = autoMark;
    const autoModelCopy = autoModel;
    const generationTitleCopy = generationTitle;
    const generationTransliterationCopy = generationTransliteration;

    !params.id
      ? AddGeneration({
          autoGeneationsIdCategory: autoGeneationsIdCategory,
          generationMarkId: generationMarkId,
          autoModelId: autoModelId,
          generationsIdModelCategory: generationsIdModelCategory,
          autoMarkId: autoMarkId,
          autoMark: autoMark,
          autoModel: autoModel,
          generationTitle: generationTitle,
          generationTransliteration: generationTransliteration,
          typeOfBodyArrIDS: typeOfBodyArrIDS,
          generationImageUrl: generationImageUrl,
          startYear: startYear,
          endYear: endYear,
          generationDescription: generationDescription,
          dispatch: dispatch,
        })
          .then(async (data) => {
            AddAutoData({
              Name: generationTitleCopy,
              Transliteration: generationTransliterationCopy,
              WhatIsIt: "Generation",
              MarkId: generationMarkIdopy,
              Mark: autoMarkCopy,
              ModelCollection: autoGeneationsIdCategoryCopy,
              ModelId: autoModelIdCopy,
              Model: autoModelCopy,
              GenerationCollection: generationsIdModelCategoryCopy,
              GenerationId: data.id,
            });

            history.push(PATHS.ADMIN);
            AppSwal(
              "Успех",
              `Вы создали поколение  ${autoMarkCopy} ${autoModelCopy} ${generationTitleCopy}`,
              "success"
            );
          })
          .catch((error) => {
            console.log(error);
          })
      : UpdateGeneration({
          autoGeneationsIdCategory: params.markIdCategory,
          generationMarkId: params.idMark,
          autoModelId: params.modelIdCategory,
          generationsIdModelCategory: params.idModel,
          autoMarkId: autoMarkId,
          autoMark: autoMark,
          autoModel: autoModel,
          generationTitle: generationTitle,
          generationTransliteration: generationTransliteration,
          typeOfBodyArrIDS: typeOfBodyArrIDS,
          generationImageUrl: generationImageUrl,
          startYear: startYear,
          endYear: endYear,
          generationDescription: generationDescription,
          elementId: params.id,
          dispatch: dispatch,
        })
          .then(async () => {
            history.push(PATHS.ADMIN);
            AppSwal(
              "Успех",
              `Вы обновили поколение ${autoMarkCopy} ${autoModelCopy} ${generationTitleCopy}`,
              "success"
            );
          })
          .catch((error) => {
            console.log(error);
          });
  };

  const components = [
    <AddGenerationAdminAutoMark />,
    <AddGenerationAdminAutoModel />,
    <AddGenerationAdminAutoTitle />,
    <AddGenerationAdminAutoTransliteration />,
    <AddGenerationAdminAutoTypeOfBody />,
    <AddGenerationAdminAutoImageUrl />,
    <AddGenerationAdminAutoStartYear />,
    <AddGenerationAdminAutoEndYear />,
    <AddGenerationAdminAutoDescription />,
  ];
  const dependenciesOfComponent = [
    addGenerationMarkDependency,
    addGenerationModelDependency,
    addGenerationTitleDependency,
    addGenerationTransliterationDependency,
    addGenerationTypeOfBodyDependency,
    addGenerationImageUrlDependency,
    addGenerationStartDateDependency,
    addGenerationEndDateDependency,
    addGenerationDescriptionDependency,
  ];

  return (
    <div className="admin">
      {!params.id ? (
        <Transition
          components={components}
          dependencies={dependenciesOfComponent}
          finishFunc={finishFunc}
        />
      ) : (
        <Transition
          components={components.slice(2)}
          dependencies={dependenciesOfComponent.slice(2)}
          finishFunc={finishFunc}
        />
      )}
    </div>
  );
};
