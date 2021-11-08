import React, { useState, useEffect } from "react";
import "./../admin.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addAutoMarkAndIdAction,
  addAutoTitleAction,
  addAutoDescriptionAction,
  addAutoImageUrlAction,
  addAutoMarkArrayAction,
  addAutoMarkArrayRefreshAction,
  addAutoTransliterationAction,
} from "../../../store/adminReducer";
import { AppTitle } from "../../UI/titles/AppTitle";
import { AppInput } from "../../UI/input/AppInput";
import { ImageUpload } from "../../../firebase/uploadPhoto";
import { AppTextarea } from "../../UI/textarea/AppTextarea";
import { ReadAllInFirebase } from "../../../firebase/crudAdmin";
import { AppMark } from "../../UI/mark/AppMark";
import { AppLoader } from "../../UI/loader/AppLoader";

export const AddAutoAdminAutoMark = () => {
  const dispatch = useDispatch();
  const autoMarkArr = useSelector(
    (state) => state.adminName.addAutoAdmin.markArr
  );
  const autoMarkId = useSelector(
    (state) => state.adminName.addAutoAdmin.markId
  );

  useEffect(() => {
    dispatch(addAutoMarkArrayRefreshAction());
    ReadAllInFirebase("Marks")
      .then((data) => {
        data.forEach((dataItem) => {
          dispatch(
            addAutoMarkArrayAction({ ...dataItem.data(), _id: dataItem.id })
          );
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const setCurrentMark = (markId, mark) => {
    dispatch(addAutoMarkAndIdAction({ markId, mark }));
  };

  return (
    <div className="add_auto">
      <AppTitle>Выберите марку авто</AppTitle>
      <div className="add_auto_marks">
        {autoMarkArr.length > 0 ? (
          autoMarkArr.map((mark, index) => {
            return (
              <AppMark
                key={index}
                mark={mark}
                setCurrentMark={setCurrentMark}
                current={mark._id === autoMarkId}
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

export const AddAutoAdminAutoTitle = () => {
  const dispatch = useDispatch();
  const autoTitle = useSelector((state) => state.adminName.addAutoAdmin.title);

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте название (ENG)</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppInput
          type="text"
          placeholder={`Например: Solaris`}
          value={autoTitle}
          onChange={(prev) => dispatch(addAutoTitleAction(prev.target.value))}
        />
      </div>
    </div>
  );
};

export const AddAutoAdminAutoTransliteration = () => {
  const dispatch = useDispatch();
  const autoTransliteration = useSelector(
    (state) => state.adminName.addAutoAdmin.transliteration
  );

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте транслитерацию (РУС)</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppInput
          type="text"
          placeholder={`Например: Солярис`}
          value={autoTransliteration}
          onChange={(prev) =>
            dispatch(addAutoTransliterationAction(prev.target.value))
          }
        />
      </div>
    </div>
  );
};

export const AddAutoAdminAutoImageUrl = () => {
  const autoImageUrl = useSelector(
    (state) => state.adminName.addAutoAdmin.imageUrl
  );

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте фото модели</AppTitle>
      </div>
      <div className="add_auto_input">
        <ImageUpload
          dispatchFunc={addAutoImageUrlAction}
          folderName="autoModels"
        />
        {autoImageUrl ? (
          <div className="add_auto_input_url">URL: {autoImageUrl}</div>
        ) : (
          <div className="add_auto_input_url">Фотография пока не загружена</div>
        )}
      </div>
    </div>
  );
};

export const AddAutoAdminAutoDescription = () => {
  const dispatch = useDispatch();
  const autoDescription = useSelector(
    (state) => state.adminName.addAutoAdmin.description
  );

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте описание</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppTextarea
          type="text"
          placeholder="Например: Самая покупаемая модель авто в России и т.п."
          value={autoDescription}
          onChange={(prev) =>
            dispatch(addAutoDescriptionAction(prev.target.value))
          }
        />
      </div>
    </div>
  );
};
