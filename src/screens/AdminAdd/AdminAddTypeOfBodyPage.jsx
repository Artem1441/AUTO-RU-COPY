import React, { useEffect } from "react";
import { Transition } from "../../components/transition/Transition";
import { AppSwal } from "../../utils/swal";
import { useSelector, useDispatch } from "react-redux";
import { AddTypeOfBody } from "./../../firebase/addFunctions";
import {
  AddTypeOfBodyAdminTitle,
  AddTypeOfBodyAdminImageUrl,
} from "./../../components/admin/Add/AddTypeOfBody";
import { PATHS } from "../../utils/paths";
import { useHistory } from "react-router";

export const AdminAddTypeOfBodyPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const typeOfBodyTitle = useSelector(
    (state) => state.otherCategories.typeOfBodyTitle
  );
  const typeOfBodyImageUrl = useSelector(
    (state) => state.otherCategories.typeOfBodyImageUrl
  );

  const addTypeOfBodyTitleDependency = () => {
    if (typeOfBodyTitle === "") {
      AppSwal("Ошибка", "Вы не добавили название типа кузова", "error");
      return false;
    }
    return true;
  };

  const addTypeOfBodyImageUrlDependency = () => {
    if (typeOfBodyImageUrl === "") {
      AppSwal("Ошибка", "Вы не добавили изображение типа кузова", "error");
      return false;
    }
    return true;
  };

  const finishFunc = () => {
    const typeOfBodyTitleCopy = typeOfBodyTitle;
    AddTypeOfBody({
      typeOfBodyTitle: typeOfBodyTitle,
      typeOfBodyImageUrl: typeOfBodyImageUrl,
      dispatch: dispatch,
    })
      .then(async () => {
        history.push(PATHS.ADMIN);
        AppSwal(
          "Успех",
          `Вы создали тип кузова ${typeOfBodyTitleCopy}`,
          "success"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const components = [
    <AddTypeOfBodyAdminTitle />,
    <AddTypeOfBodyAdminImageUrl />,
  ];

  const dependenciesOfComponent = [
    addTypeOfBodyTitleDependency,
    addTypeOfBodyImageUrlDependency,
  ];

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
