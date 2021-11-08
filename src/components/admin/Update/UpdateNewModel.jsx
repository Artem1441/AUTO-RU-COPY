import React, { useEffect } from "react";
import "./../admin.css";
import { useDispatch, useSelector } from "react-redux";
import { AppTitle } from "./../../UI/titles/AppTitle";
import { AppLoader } from "../../UI/loader/AppLoader";
import { AppMark } from "./../../UI/mark/AppMark";
import { useHistory } from "react-router";
import { PATHS } from "../../../utils/paths";
import { AppModel } from "./../../UI/model/AppModel";
import {
  ReadAllInFirebase,
  ReadAllInFirebaseWithTwoQueries,
  RemoveFromFirebaseWithTwoQueries,
} from "../../../firebase/crudAdmin";
import {
  getMarkAction,
  getMarkIdAction,
  getMarksArrayAction,
  getMarksArrayRefreshAction,
  getModelsArrayRefreshAction,
  getModelsArrayAction,
} from "../../../store/adminUpdateReducer";
import { RemoveModel } from "../../../firebase/addFunctions";
import { AppText } from "../../UI/text/AppText";

export const UpdateNewAdminModelMark = () => {
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

export const UpdateNewAdminModel = () => {
  const dispatch = useDispatch();
  const router = useHistory();
  const modelsArr = useSelector((state) => state.adminUpdateName.modelsArr);
  const markIdCategory = useSelector(
    (state) => state.adminUpdateName.markIdCategory
  );
  const markId = useSelector((state) => state.adminUpdateName.markId);

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

  const deleteModel = async (id) => {
    RemoveModel({
      markIdCategory: markIdCategory,
      markId: markId,
      id: id,
    });
  };

  const updateModel = async (id) => {
    router.push(
      `${PATHS.ADMIN_UPDATE_MODELS}/${markIdCategory}/${markId}/${id}`
    );
  };

  return (
    <div className="add_auto">
      <AppTitle>
        Выберите модели которые нужно удалить или отредактировать
      </AppTitle>

      <div className="add_auto_marks">
        {modelsArr.length > 0 ? (
          modelsArr.map((model, index) => {
            return (
              <AppModel
                key={index}
                model={model}
                deleteFunc={deleteModel}
                updateFunc={updateModel}
                isUpdate={true}
                isDelete={true}
              />
            );
          })
        ) : (
          // <AppLoader />
          <AppText>
            Упс... похоже, что для этой марки не созданы модели. Перейдите в
            раздел "Добавить новую модель"
          </AppText>
        )}
      </div>
    </div>
  );
};
