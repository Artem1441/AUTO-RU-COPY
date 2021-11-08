import React, { useState, useEffect } from "react";
import "./../admin.css";
import { useDispatch, useSelector } from "react-redux";

import {
  addGenerationMarkArrayAction,
  addGenerationMarkArrayRefreshAction,
  addGenerationMarkAndIdAction,
  addGenerationModelAndIdAction,
  addGenerationTitleAction,
  addGenerationImageUrlAction,
  addGenerationStartDateAction,
  addGenerationEndDateAction,
  addGenerationDescriptionAction,
  addGenerationTypeOfBodyArrFromDBAction,
  addGenerationTypeOfBodyArrIDSFilterAction,
  addGenerationTransliterationAction,
} from "../../../store/adminReducer";

import { AppTitle } from "./../../UI/titles/AppTitle";
import { AppInput } from "../../UI/input/AppInput";
import { ImageUpload } from "../../../firebase/uploadPhoto";
import { AppTextarea } from "./../../UI/textarea/AppTextarea";
import {
  ReadAllInFirebase,
  ReadAllInFirebaseWithTwoQueries,
} from "../../../firebase/crudAdmin";
import { AppMark } from "../../UI/mark/AppMark";
import { AppLoader } from "../../UI/loader/AppLoader";

import { AppModel } from "./../../UI/model/AppModel";
import {
  addGenerationModelsArrAction,
  addGenerationModelsArrayRefreshAction,
  addGenerationTypeOfBodyArrFromDBRefreshAction,
  addGenerationTypeOfBodyArrDBAction,
} from "../../../store/adminReducer";
import { AppText } from "../../UI/text/AppText";
import { AppDate } from "../../UI/date/AppDate";
import { AppTypeOfBody } from "./../../UI/typeOfBody/AppTypeOfBody";
import { addGenerationTypeOfBodyArrIDSAction } from "./../../../store/adminReducer";

export const AddGenerationAdminAutoMark = () => {
  const dispatch = useDispatch();
  const generationMarkArr = useSelector(
    (state) => state.adminName.addGenerationOfModel.markArr
  );
  const generationMarkId = useSelector(
    (state) => state.adminName.addGenerationOfModel.markId
  );

  useEffect(() => {
    dispatch(addGenerationMarkArrayRefreshAction());
    ReadAllInFirebase("Marks")
      .then((data) => {
        data.forEach((dataItem) => {
          dispatch(
            addGenerationMarkArrayAction({
              ...dataItem.data(),
              _id: dataItem.id,
            })
          );
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const setCurrentMark = (markId, mark) => {
    dispatch(addGenerationMarkAndIdAction({ markId, mark }));
  };

  return (
    <div className="add_auto">
      <AppTitle>Выберите марку авто</AppTitle>
      <div className="add_auto_marks">
        {generationMarkArr.length > 0 ? (
          generationMarkArr.map((mark, index) => {
            return (
              <AppMark
                key={index}
                mark={mark}
                setCurrentMark={setCurrentMark}
                current={mark._id === generationMarkId}
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

export const AddGenerationAdminAutoModel = () => {
  const dispatch = useDispatch();
  const generationModelArr = useSelector(
    (state) => state.adminName.addGenerationOfModel.modelsArr
  );
  const generationModelId = useSelector(
    (state) => state.adminName.addGenerationOfModel.modelId
  );
  const autoGeneationsIdCategory = useSelector(
    (state) => state.adminName.addGenerationOfModel.autoGeneationsIdCategory
  );
  const generationMarkId = useSelector(
    (state) => state.adminName.addGenerationOfModel.markId
  );

  useEffect(() => {
    if (autoGeneationsIdCategory) {
      dispatch(addGenerationModelsArrayRefreshAction());
      ReadAllInFirebaseWithTwoQueries(
        "AutoModels",
        autoGeneationsIdCategory,
        generationMarkId
      )
        .then((data) => {
          data.forEach((dataItem) => {
            console.log(dataItem.data());
            dispatch(
              addGenerationModelsArrAction({
                ...dataItem.data(),
                _id: dataItem.id,
              })
            );
          });
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [autoGeneationsIdCategory]);

  const setCurrentModel = (modelId, model) => {
    dispatch(addGenerationModelAndIdAction({ modelId, model }));
  };

  return (
    <div className="add_auto">
      <AppTitle>Выберите модель авто</AppTitle>
      <div className="add_auto_marks">
        {generationModelArr.length > 0 ? (
          generationModelArr.map((model, index) => {
            return (
              <AppModel
                key={index}
                model={model}
                setCurrentModel={setCurrentModel}
                current={model._id === generationModelId}
                // getSelfId={true}
              />
            );
          })
        ) : (
          <AppText>
            Упс... похоже, что для этого авто не созданы модели. Перейдите в
            раздел "Добавить новое авто"
          </AppText>
        )}
      </div>
    </div>
  );
};

export const AddGenerationAdminAutoTitle = () => {
  const dispatch = useDispatch();
  const generationTitle = useSelector(
    (state) => state.adminName.addGenerationOfModel.title
  );

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте название поколения (ENG)</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppInput
          type="text"
          placeholder={`Например: 1 series`}
          value={generationTitle}
          onChange={(prev) =>
            dispatch(addGenerationTitleAction(prev.target.value))
          }
        />
      </div>
    </div>
  );
};

export const AddGenerationAdminAutoTransliteration = () => {
  const dispatch = useDispatch();
  const generationTransliteration = useSelector(
    (state) => state.adminName.addGenerationOfModel.transliteration
  );
  console.log(generationTransliteration);

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте транслитирацию поколения (РУС)</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppInput
          type="text"
          placeholder={`Например: 1 серии`}
          value={generationTransliteration}
          onChange={(prev) =>
            dispatch(addGenerationTransliterationAction(prev.target.value))
          }
        />
      </div>
    </div>
  );
};

export const AddGenerationAdminAutoTypeOfBody = () => {
  const dispatch = useDispatch();
  const typeOfBodyArrFromDB = useSelector(
    (state) => state.adminName.addGenerationOfModel.typeOfBodyArrFromDB
  );
  const typeOfBodyArrIDS = useSelector(
    (state) => state.adminName.addGenerationOfModel.typeOfBodyArrIDS
  );

  useEffect(() => {
    dispatch(addGenerationTypeOfBodyArrFromDBRefreshAction());
    ReadAllInFirebase("TypeOfBody")
      .then((data) => {
        data.forEach((dataItem) => {
          dispatch(
            addGenerationTypeOfBodyArrFromDBAction({
              ...dataItem.data(),
              _id: dataItem.id,
            })
          );
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const setCurrentTypeOfBody = (id) => {
    !typeOfBodyArrIDS.includes(id)
      ? dispatch(addGenerationTypeOfBodyArrIDSAction(id))
      : dispatch(addGenerationTypeOfBodyArrIDSFilterAction(id));
  };

  return (
    <div className="add_auto">
      <AppTitle>Выберите тип кузова авто</AppTitle>
      <div className="add_auto_marks">
        {typeOfBodyArrFromDB.length > 0 ? (
          typeOfBodyArrFromDB.map((typeOfBody, index) => {
            return (
              <AppTypeOfBody
                key={index}
                typeOfBody={typeOfBody}
                setCurrentTypeOfBody={setCurrentTypeOfBody}
                current={typeOfBodyArrIDS.includes(typeOfBody._id)}
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

export const AddGenerationAdminAutoImageUrl = () => {
  const generationImageUrl = useSelector(
    (state) => state.adminName.addGenerationOfModel.imageUrl
  );

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте фото автомобиля этого поколения</AppTitle>
        <AppText>
          (Лучше всего указывать самое популярное авто этого поколения)
        </AppText>
      </div>
      <div className="add_auto_input">
        <ImageUpload
          dispatchFunc={addGenerationImageUrlAction}
          folderName="autoGenerations"
        />
        {generationImageUrl ? (
          <div className="add_auto_input_url">URL: {generationImageUrl}</div>
        ) : (
          <div className="add_auto_input_url">Фотография пока не загружена</div>
        )}
      </div>
    </div>
  );
};

export const AddGenerationAdminAutoStartYear = () => {
  const startYear = useSelector(
    (state) => state.adminName.addGenerationOfModel.startYear
  );
  // addGenerationStartDateAction("Lol");

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте год начала производства этого поколения</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppDate
          dispatchFunc={addGenerationStartDateAction}
          currentYear={startYear}
        />
      </div>
    </div>
  );
};

export const AddGenerationAdminAutoEndYear = () => {
  const endYear = useSelector(
    (state) => state.adminName.addGenerationOfModel.endYear
  );

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте год конца производства этого поколения</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppDate
          dispatchFunc={addGenerationEndDateAction}
          currentYear={endYear}
        />
      </div>
    </div>
  );
};

export const AddGenerationAdminAutoDescription = () => {
  const dispatch = useDispatch();
  const generationDescription = useSelector(
    (state) => state.adminName.addGenerationOfModel.description
  );

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте описание</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppTextarea
          type="text"
          placeholder="Например: Самое классное поколение этой модели авто"
          value={generationDescription}
          onChange={(prev) =>
            dispatch(addGenerationDescriptionAction(prev.target.value))
          }
        />
      </div>
    </div>
  );
};
