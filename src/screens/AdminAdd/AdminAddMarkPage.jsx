import React, { useEffect } from "react";
import { Transition } from "../../components/transition/Transition";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { PATHS } from "../../utils/paths";
import { ReadAllInFirebase } from "../../firebase/crudAdmin";
import { AppSwal } from "../../utils/swal";

import {
  addMarkTitleAction,
  addMarkImageUrlAction,
  addMarkCountryAction,
  addMarkDescriptionAction,
  addMarkTransliterationAction,
} from "../../store/adminReducer";
import {
  AddMarkAdminAutoCountry,
  AddMarkAdminAutoDescription,
  AddMarkAdminAutoImageUrl,
  AddMarkAdminAutoTitle,
  AddMarkAdminAutoTransliteration,
} from "../../components/admin/Add/AddMarkAdmin";
import { useParams } from "react-router-dom";
import {
  AddAutoData,
  AddMark,
  UpdateMark,
} from "./../../firebase/addFunctions";

export const AdminAddMarkPage = () => {
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      ReadAllInFirebase("Marks").then((data) => {
        data.forEach((dataItem) => {
          if (dataItem.id === params.id) {
            dispatch(addMarkTitleAction(dataItem.data().MarkTitle));
            dispatch(addMarkTransliterationAction(dataItem.data().MarkTransliteration))
            dispatch(addMarkImageUrlAction(dataItem.data().ImageUrl));
            dispatch(addMarkCountryAction(dataItem.data().Country));
            dispatch(addMarkDescriptionAction(dataItem.data().Description));
          }
        });
      });
    }
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();

  const markTitle = useSelector((state) => state.adminName.addMarkAdmin.title);
  const markTransliteration = useSelector(
    (state) => state.adminName.addMarkAdmin.transliteration
  );
  const markImageUrl = useSelector(
    (state) => state.adminName.addMarkAdmin.imageUrl
  );
  const markCountry = useSelector(
    (state) => state.adminName.addMarkAdmin.country
  );
  const markDescription = useSelector(
    (state) => state.adminName.addMarkAdmin.description
  );

  const addMarkTitleDependency = async () => {
    if (markTitle === "") {
      AppSwal("Ошибка", "Вы не указали марку", "error");
      return false;
    }

    if (!params.id) {
      // блок проверки на наличии такой же марки в бд
      const isNext = await ReadAllInFirebase("Marks").then((data) => {
        let isCreateNewAutoMark = true;
        data.forEach((dataItem) => {
          if (dataItem.data().MarkTitle === markTitle) {
            isCreateNewAutoMark = false;
          }
        });
        if (isCreateNewAutoMark === false) {
          AppSwal("Ошибка", `Марка ${markTitle} уже существует`, "error");
          dispatch(addMarkTitleAction(""));
          return false;
        }
        return true;
      });
      if (isNext) return true;
      // конец
    } else {
      return true;
    }
  };

  const addMarkTransliterationDependency = async () => {
    if (markTransliteration === "") {
      AppSwal("Ошибка", "Вы не указали транслитерацию", "error");
      return false;
    }
    return true;
  };

  const addMarkImageUrlDependency = async () => {
    if (markImageUrl === "") {
      AppSwal("Ошибка", "Вы не загрузили фото марки", "error");
      return false;
    }
    return true;
  };

  const addMarkCountryDependency = async () => {
    if (markCountry === "") {
      AppSwal("Ошибка", "Вы не добавили страну марки", "error");
      return false;
    }
    return true;
  };

  const addMarkDescriptionDependency = async () => {
    if (markDescription === "") {
      AppSwal("Ошибка", "Вы не добавили описание марки", "error");
      return false;
    }
    return true;
  };

  const finishFunc = () => {
    const markTitleCopy = markTitle;
    const markTransliterationCopy = markTransliteration;

    !params.id
      ? AddMark({
          markTitle: markTitle,
          markImageUrl: markImageUrl,
          markTransliteration: markTransliteration,
          markCountry: markCountry,
          markDescription: markDescription,
          dispatch: dispatch,
        })
          .then(async (data) => {
            AddAutoData({
              Name: markTitleCopy,
              Transliteration: markTransliterationCopy,
              WhatIsIt: "Mark",
              MarkId: data.id,
            });

            history.push(PATHS.ADMIN);
            AppSwal("Успех", `Вы создали марку ${markTitleCopy}`, "success");
          })
          .catch((error) => {
            console.log(error);
          })
      : UpdateMark({
          markTitle: markTitle,
          markTransliteration: markTransliteration,
          markImageUrl: markImageUrl,
          markCountry: markCountry,
          markDescription: markDescription,
          elementId: params.id,
          dispatch: dispatch,
        })
          .then(async () => {
            history.push(PATHS.ADMIN);
            AppSwal("Успех", `Вы обновили марку ${markTitleCopy}`, "success");
          })
          .catch((error) => {
            console.log(error);
          });
  };

  const components = [
    <AddMarkAdminAutoTitle />,
    <AddMarkAdminAutoTransliteration />,
    <AddMarkAdminAutoImageUrl />,
    <AddMarkAdminAutoCountry />,
    <AddMarkAdminAutoDescription />,
  ];

  const dependenciesOfComponent = [
    addMarkTitleDependency,
    addMarkTransliterationDependency,
    addMarkImageUrlDependency,
    addMarkCountryDependency,
    addMarkDescriptionDependency,
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

//   Func(
//     "Marks",
//     {
//       MarkTitle: markTitle,
//       ImageUrl: markImageUrl,
//       Country: markCountry,
//       Description: markDescription,
//     },
//     params.id
//     // params.id - нужен только для UpdateInFirebase, в CreateInFirebase он просто проигнорируется
//   )
//     .then(async () => {

//       history.push(PATHS.ADMIN);
//       dispatch(addMarkTitleAction(""));
//       dispatch(addMarkImageUrlAction(""));
//       dispatch(addMarkCountryAction(""));
//       dispatch(addMarkDescriptionAction(""));

//       AppSwal(
//         "Успех",
//         params.id
//           ? `Вы обновили марку ${markTitle}`
//           : `Вы создали марку ${markTitle}`,
//         "success"
//       ).then((result) => {
//         if (result.isConfirmed) {
//           history.push(PATHS.ADMIN);
//         }
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
