import React, { useEffect } from "react";
import "./../admin.css";
import { useDispatch, useSelector } from "react-redux";

import {
  ReadAllInFirebase,
  ReadAllInFirebaseWithTwoQueries,
  ReadAllInFirebaseWithThreeQueries,
} from "../../../firebase/crudAdmin";
import { AppLoader } from "../../UI/loader/AppLoader";
import { AppMark } from "./../../UI/mark/AppMark";
import { useHistory } from "react-router";
import { PATHS } from "../../../utils/paths";
import { AppModel } from "./../../UI/model/AppModel";
import {
  getMarksArrayRefreshAction,
  getMarksArrayAction,
  getModelAction,
  getMarkIdAction,
  getMarkAction,
  getModelsArrayRefreshAction,
  getModelsArrayAction,
  getModelIdAction,
  getGenerationsArrayAction,
  getGenerationsArrayRefreshAction,
} from "./../../../store/adminUpdateReducer";
import { AppTitle } from "../../UI/titles/AppTitle";
import { AppGeneration } from "./../../UI/generation/AppGeneration";
import { AppText } from "../../UI/text/AppText";
import { RemoveGeneration } from "./../../../firebase/addFunctions";

export const UpdateNewAdminGenerationMark = () => {
  const dispatch = useDispatch();
  const marksArr = useSelector((state) => state.adminUpdateName.marksArr);
  const markId = useSelector((state) => state.adminUpdateName.markId);

  useEffect(() => {
    dispatch(getMarksArrayRefreshAction());
    ReadAllInFirebase("Marks")
      .then((data) => {
        data.forEach((dataItem) => {
          dispatch(
            getMarksArrayAction({ ...dataItem.data(), _id: dataItem.id })
          );
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const setCurrentMark = (markId, mark) => {
    dispatch(getMarkIdAction(markId));
    dispatch(getMarkAction(mark));
  };

  return (
    <div className="add_auto">
      <AppTitle>Выберите марку</AppTitle>

      <div className="add_auto_marks">
        {marksArr.length > 0 ? (
          marksArr.map((mark, index) => {
            return (
              <AppMark
                key={index}
                mark={mark}
                setCurrentMark={setCurrentMark}
                current={mark._id === markId}
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

export const UpdateNewAdminGenerationModel = () => {
  const dispatch = useDispatch();
  const modelsArr = useSelector((state) => state.adminUpdateName.modelsArr);
  const markIdCategory = useSelector(
    (state) => state.adminUpdateName.markIdCategory
  );
  const markId = useSelector((state) => state.adminUpdateName.markId);
  const modelId = useSelector((state) => state.adminUpdateName.modelId);

  useEffect(() => {
    dispatch(getModelsArrayRefreshAction());

    markIdCategory &&
      ReadAllInFirebaseWithTwoQueries("AutoModels", markIdCategory, markId)
        .then((data) => {
          data.forEach((dataItem) => {
            dispatch(
              getModelsArrayAction({ ...dataItem.data(), _id: dataItem.id })
            );
          });
        })
        .catch((err) => {
          alert(err);
        });
  }, [markIdCategory]);

  const setCurrentModel = (modelId, model) => {
    dispatch(getModelIdAction(modelId));
    dispatch(getModelAction(model));
  };

  return (
    <div className="add_auto">
      <AppTitle>Выберите модель</AppTitle>

      <div className="add_auto_marks">
        {modelsArr.length > 0 ? (
          modelsArr.map((model, index) => {
            // console.log(model, modelId);
            return (
              <AppModel
                key={index}
                model={model}
                setCurrentModel={setCurrentModel}
                current={model.AutoModelId === modelId}
                getSelfId={true}
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

export const UpdateNewAdminGeneration = () => {
  const dispatch = useDispatch();
  const router = useHistory();
  const generationsArr = useSelector(
    (state) => state.adminUpdateName.generationsArr
  );
  const markIdCategory = useSelector(
    (state) => state.adminUpdateName.markIdCategory
  );
  const markId = useSelector((state) => state.adminUpdateName.markId);
  const modelIdCategory = useSelector(
    (state) => state.adminUpdateName.modelIdCategory
  );
  const modelId = useSelector((state) => state.adminUpdateName.modelId);

  useEffect(() => {
    dispatch(getGenerationsArrayRefreshAction());

    modelIdCategory &&
      ReadAllInFirebaseWithThreeQueries(
        "AutoModels",
        markIdCategory,
        markId,
        modelIdCategory,
        modelId
      )
        .then((data) => {
          console.log(markIdCategory, markId, modelIdCategory, modelId);

          data.forEach((dataItem) => {
            dispatch(
              getGenerationsArrayAction({
                ...dataItem.data(),
                _id: dataItem.id,
              })
            );
          });
        })
        .catch((err) => {
          alert(err);
        });
  }, [modelIdCategory]);

  const deleteGeneration = async (id) => {
    RemoveGeneration({
      markIdCategory: markIdCategory,
      markId: markId,
      modelIdCategory: modelIdCategory,
      modelId: modelId,
      id: id,
    });
  };

  const updateGeneration = async (id) => {
    router.push(
      `${PATHS.ADMIN_UPDATE_GENERATION}/${markIdCategory}/${markId}/${modelIdCategory}/${modelId}/${id}`
    );
  };

  return (
    <div className="add_auto">
      <AppTitle>
        Выберите поколения которые нужно удалить или отредактировать
      </AppTitle>

      <div className="add_auto_marks">
        {generationsArr.length > 0 ? (
          generationsArr.map((generation, index) => {
            // console.log(generation);
            return (
              <AppGeneration
                key={index}
                generation={generation}
                deleteFunc={deleteGeneration}
                updateFunc={updateGeneration}
                isUpdate={true}
                isDelete={true}
              />
            );
          })
        ) : (
          //   <AppLoader />
          <AppText>
            Упс... похоже, что для этой модели не созданы поколения. Перейдите в
            раздел "Добавить новое поколение"
          </AppText>
        )}
      </div>
    </div>
  );
};
