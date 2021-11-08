import React from "react";
import "./../admin.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addMarkTitleAction,
  addMarkImageUrlAction,
  addMarkCountryAction,
  addMarkDescriptionAction,
} from "../../../store/adminReducer";
import { AppTitle } from "./../../UI/titles/AppTitle";
import { AppInput } from "../../UI/input/AppInput";
import { ImageUpload } from "../../../firebase/uploadPhoto";
import { AppTextarea } from "./../../UI/textarea/AppTextarea";
import { addMarkTransliterationAction } from './../../../store/adminReducer';

export const AddMarkAdminAutoTitle = () => {
  const dispatch = useDispatch();
  const markTitle = useSelector((state) => state.adminName.addMarkAdmin.title);

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте название марки (ENG)</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppInput
          type="text"
          placeholder="Например: Lada"
          value={markTitle}
          onChange={(prev) => dispatch(addMarkTitleAction(prev.target.value))}
        />
      </div>
    </div>
  );
};


export const AddMarkAdminAutoTransliteration = () => {
  const dispatch = useDispatch();
  const markTransliteration = useSelector((state) => state.adminName.addMarkAdmin.transliteration);

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте транслитерацию марки (РУС)</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppInput
          type="text"
          placeholder="Например: Лада"
          value={markTransliteration}
          onChange={(prev) => dispatch(addMarkTransliterationAction(prev.target.value))}
        />
      </div>
    </div>
  );
};

export const AddMarkAdminAutoImageUrl = () => {
  const markImageUrl = useSelector(
    (state) => state.adminName.addMarkAdmin.imageUrl
  );

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте фото логотипа</AppTitle>
      </div>
      <div className="add_auto_input">
        <ImageUpload
          dispatchFunc={addMarkImageUrlAction}
          folderName="autoMarks"
        />
        {markImageUrl ? (
          <div className="add_auto_input_url">URL: {markImageUrl}</div>
        ) : (
          <div className="add_auto_input_url">Фотография пока не загружена</div>
        )}
      </div>
    </div>
  );
};

export const AddMarkAdminAutoCountry = () => {
  const dispatch = useDispatch();
  const markCountry = useSelector(
    (state) => state.adminName.addMarkAdmin.country
  );

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте страну автомобиля</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppInput
          type="text"
          placeholder="Например: Россия"
          value={markCountry}
          onChange={(prev) => dispatch(addMarkCountryAction(prev.target.value))}
        />
      </div>
    </div>
  );
};

export const AddMarkAdminAutoDescription = () => {
  const dispatch = useDispatch();
  const markDescription = useSelector(
    (state) => state.adminName.addMarkAdmin.description
  );

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте страну автомобиля</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppTextarea
          type="text"
          placeholder="Например: Самое популярное российское авто и т.п."
          value={markDescription}
          onChange={(prev) =>
            dispatch(addMarkDescriptionAction(prev.target.value))
          }
        />
      </div>
    </div>
  );
};
