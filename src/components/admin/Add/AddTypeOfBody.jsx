import React from "react";
import "./../admin.css";
import { useDispatch, useSelector } from "react-redux";
import { otherCategoriesAddTypeOfBodyTitleAction } from "../../../store/otherCategoriesReducer";
import { AppTitle } from "../../UI/titles/AppTitle";
import { AppInput } from "./../../UI/input/AppInput";
import { otherCategoriesAddTypeOfBodyImageUrlAction } from "./../../../store/otherCategoriesReducer";
import { ImageUpload } from "./../../../firebase/uploadPhoto";

export const AddTypeOfBodyAdminTitle = () => {
  const dispatch = useDispatch();
  const typeOfBodyTitle = useSelector(
    (state) => state.otherCategories.typeOfBodyTitle
  );

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте название типа кузова</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppInput
          type="text"
          placeholder="Например: Хетчбек 3 дв"
          value={typeOfBodyTitle}
          onChange={(prev) =>
            dispatch(otherCategoriesAddTypeOfBodyTitleAction(prev.target.value))
          }
        />
      </div>
    </div>
  );
};

export const AddTypeOfBodyAdminImageUrl = () => {
  const typeOfBodyImageUrl = useSelector(
    (state) => state.otherCategories.typeOfBodyImageUrl
  );

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте фото типа поколения</AppTitle>
      </div>
      <div className="add_auto_input">
        <ImageUpload
          dispatchFunc={otherCategoriesAddTypeOfBodyImageUrlAction}
          folderName="typeOfBody"
        />
        {typeOfBodyImageUrl ? (
          <div className="add_auto_input_url">URL: {typeOfBodyImageUrl}</div>
        ) : (
          <div className="add_auto_input_url">Фотография пока не загружена</div>
        )}
      </div>
    </div>
  );
};
