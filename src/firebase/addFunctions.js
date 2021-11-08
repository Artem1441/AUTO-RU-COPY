import {
  CreateInFirebase,
  CreateInFirebaseWithThreeQueries,
  CreateInFirebaseWithTwoQueries,
  ReadAllInFirebase,
  ReadAllInFirebaseWithThreeQueries,
  ReadAllInFirebaseWithTwoQueries,
  RemoveFromFirebase,
  RemoveFromFirebaseWithThreeQueries,
  RemoveFromFirebaseWithTwoQueries,
  UpdateInFirebase,
  UpdateInFirebaseRT,
  UpdateInFirebaseWithThreeQueries,
  UpdateInFirebaseWithTwoQueries,
} from "./crudAdmin";
import firebase from "firebase";
import {
  addMarkCountryAction,
  addMarkTitleAction,
  addMarkImageUrlAction,
  addMarkDescriptionAction,
  //
  addAutoMarkAndIdAction,
  addAutoImageUrlAction,
  addAutoDescriptionAction,
  addAutoTitleAction,
  //
  addGenerationMarkArrayAction,
  addGenerationIdCategoryAction,
  addGenerationMarkArrayRefreshAction,
  addGenerationTitleAction,
  addGenerationModelsArrayRefreshAction,
  addGenerationEndDateAction,
  addGenerationImageUrlAction,
  addGenerationDescriptionAction,
  addGenerationStartDateAction,
  addGenerationTypeOfBodyArrIDSRefreshAction,
  addAutoTransliterationAction,
  addGenerationTransliterationAction,
} from "../store/adminReducer";
import { otherCategoriesAddTypeOfBodyTitleAction } from "../store/otherCategoriesReducer";
import { otherCategoriesAddTypeOfBodyImageUrlAction } from "./../store/otherCategoriesReducer";
import { addMarkTransliterationAction } from "./../store/adminReducer";

export const AddTypeOfBody = async ({
  typeOfBodyTitle,
  typeOfBodyImageUrl,
  dispatch,
}) => {
  return new Promise(function (resolve, reject) {
    dispatch(otherCategoriesAddTypeOfBodyTitleAction(""));
    dispatch(otherCategoriesAddTypeOfBodyImageUrlAction(""));

    CreateInFirebase("TypeOfBody", {
      TypeOfBodyTitle: typeOfBodyTitle,
      TypeOfBodyImageUrl: typeOfBodyImageUrl,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const AddMark = async ({
  markTitle,
  markTransliteration,
  markImageUrl,
  markCountry,
  markDescription,
  dispatch,
}) => {
  return new Promise(function (resolve, reject) {
    dispatch(addMarkTitleAction(""));
    dispatch(addMarkTransliterationAction(""));
    dispatch(addMarkImageUrlAction(""));
    dispatch(addMarkCountryAction(""));
    dispatch(addMarkDescriptionAction(""));

    CreateInFirebase("Marks", {
      MarkTitle: markTitle,
      MarkTransliteration: markTransliteration,
      ImageUrl: markImageUrl,
      Country: markCountry,
      Description: markDescription,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const AddModel = async ({
  autoModelsIdCategory,
  autoMarkId,
  autoMark,
  autoModelId,
  autoTitle,
  autoTransliteration,
  autoImageUrl,
  autoDescription,
  dispatch,
}) => {
  return new Promise(function (resolve, reject) {
    dispatch(addAutoMarkAndIdAction(""));
    dispatch(addAutoTitleAction(""));
    dispatch(addAutoTransliterationAction(""));
    dispatch(addAutoImageUrlAction(""));
    dispatch(addAutoDescriptionAction(""));

    CreateInFirebaseWithTwoQueries(
      "AutoModels",
      autoModelsIdCategory,
      autoMarkId,
      {
        AutoMarkId: autoMarkId,
        AutoMark: autoMark,
        AutoModelId: autoModelId,
        AutoTitle: autoTitle,
        AutoTransliteration: autoTransliteration,
        ImageUrl: autoImageUrl,
        Description: autoDescription,
      }
    )
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const AddGeneration = ({
  autoGeneationsIdCategory,
  generationMarkId,
  autoModelId,
  generationsIdModelCategory,
  autoMarkId,
  autoModel,
  autoMark,
  generationTitle,
  generationTransliteration,
  typeOfBodyArrIDS,
  generationImageUrl,
  startYear,
  endYear,
  generationDescription,
  dispatch,
}) => {
  console.log(generationTransliteration);
  return new Promise(function (resolve, reject) {
    dispatch(addGenerationMarkArrayAction(""));
    dispatch(addGenerationIdCategoryAction(""));
    dispatch(addGenerationMarkArrayRefreshAction());
    dispatch(addGenerationModelsArrayRefreshAction());
    dispatch(addGenerationTitleAction(""));
    dispatch(addGenerationTransliterationAction(""));
    dispatch(addGenerationTypeOfBodyArrIDSRefreshAction());
    dispatch(addGenerationDescriptionAction(""));
    dispatch(addGenerationEndDateAction(""));
    dispatch(addGenerationStartDateAction(""));
    dispatch(addGenerationImageUrlAction(""));

    CreateInFirebaseWithThreeQueries(
      "AutoModels",
      autoGeneationsIdCategory,
      generationMarkId,
      autoModelId,
      generationsIdModelCategory,
      {
        GenerationMarkId: autoMarkId,
        GenerationMark: autoMark,
        GenerationModelId: autoModelId,
        GenerationModel: autoModel,
        GenerationTitle: generationTitle,
        GenerationTransliteration: generationTransliteration,
        GenerationTypeOfBody: JSON.stringify(typeOfBodyArrIDS),
        ImageUrl: generationImageUrl,
        StartYear: startYear,
        EndYear: endYear,
        Description: generationDescription,
      }
    )
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const UpdateMark = ({
  markTitle,
  markTransliteration,
  markImageUrl,
  markCountry,
  markDescription,
  elementId,
  dispatch,
}) => {
  return new Promise(function (resolve, reject) {
    ReadAllInFirebase("Marks")
      .then((data) => {
        data.forEach((dataItem) => {
          if (dataItem.id === elementId) {
            UpdateAutoData({
              name: markTitle,
              transliteration: markTransliteration,
              checkingId: elementId,
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(addMarkTitleAction(""));
    dispatch(addMarkTransliterationAction(""));
    dispatch(addMarkImageUrlAction(""));
    dispatch(addMarkCountryAction(""));
    dispatch(addMarkDescriptionAction(""));
    UpdateInFirebase(
      "Marks",
      {
        MarkTitle: markTitle,
        MarkTransliteration: markTransliteration,
        ImageUrl: markImageUrl,
        Country: markCountry,
        Description: markDescription,
      },
      elementId
    )
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const UpdateModel = ({
  autoModelsIdCategory,
  autoMarkId,
  autoMark,
  autoTitle,
  autoTransliteration,
  autoImageUrl,
  autoDescription,
  autoModelId,
  elementId,
  dispatch,
}) => {
  return new Promise(function (resolve, reject) {
    ReadAllInFirebaseWithTwoQueries(
      "AutoModels",
      autoModelsIdCategory,
      autoMarkId
    )
      .then((data) => {
        data.forEach((dataItem) => {
          if (dataItem.id === elementId) {
            UpdateAutoData({
              name: autoTitle,
              transliteration: autoTransliteration,
              checkingId: elementId,
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(addAutoMarkAndIdAction(""));
    dispatch(addAutoTitleAction(""));
    dispatch(addAutoTransliterationAction(""));
    dispatch(addAutoImageUrlAction(""));
    dispatch(addAutoDescriptionAction(""));

    UpdateInFirebaseWithTwoQueries(
      "AutoModels",
      autoModelsIdCategory,
      autoMarkId,
      {
        AutoMarkId: autoMarkId,
        AutoMark: autoMark,
        AutoModelId: autoModelId,
        AutoTitle: autoTitle,
        AutoTransliteration: autoTransliteration,
        ImageUrl: autoImageUrl,
        Description: autoDescription,
      },
      elementId
    )
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const UpdateGeneration = ({
  autoGeneationsIdCategory,
  generationMarkId,
  autoModelId,
  generationsIdModelCategory,
  autoMarkId,
  autoMark,
  autoModel,
  generationTitle,
  generationTransliteration,
  typeOfBodyArrIDS,
  generationImageUrl,
  startYear,
  endYear,
  generationDescription,
  elementId,
  dispatch,
}) => {
  return new Promise(function (resolve, reject) {
    ReadAllInFirebaseWithThreeQueries(
      "AutoModels",
      autoGeneationsIdCategory,
      generationMarkId,
      autoModelId,
      generationsIdModelCategory
    )
      .then((data) => {
        data.forEach((dataItem) => {
          if (dataItem.id === elementId) {
            UpdateAutoData({
              transliteration: generationTransliteration,
              name: generationTitle,
              checkingId: elementId,
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(addGenerationMarkArrayAction(""));
    dispatch(addGenerationIdCategoryAction(""));
    dispatch(addGenerationMarkArrayRefreshAction());
    dispatch(addGenerationModelsArrayRefreshAction());
    dispatch(addGenerationTitleAction(""));
    dispatch(addGenerationTransliterationAction(""));
    dispatch(addGenerationDescriptionAction(""));
    dispatch(addGenerationEndDateAction(""));
    dispatch(addGenerationStartDateAction(""));
    dispatch(addGenerationImageUrlAction(""));

    UpdateInFirebaseWithThreeQueries(
      "AutoModels",
      autoGeneationsIdCategory,
      generationMarkId,
      autoModelId,
      generationsIdModelCategory,
      {
        GenerationMarkId: autoMarkId,
        GenerationMark: autoMark,
        GenerationModelId: autoModelId,
        GenerationModel: autoModel,
        GenerationTitle: generationTitle,
        GenerationTransliteration: generationTransliteration,
        GenerationTypeOfBody: JSON.stringify(typeOfBodyArrIDS),
        ImageUrl: generationImageUrl,
        StartYear: startYear,
        EndYear: endYear,
        Description: generationDescription,
      },
      elementId
    )
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const RemoveMark = ({ id }) => {
  RemoveAutoData({ checkingId: id });
  RemoveFromFirebase("Marks", id);
};

export const RemoveModel = ({ markIdCategory, markId, id }) => {
  RemoveAutoData({ checkingId: id });
  RemoveFromFirebaseWithTwoQueries("AutoModels", markIdCategory, markId, id);
};

export const RemoveGeneration = ({
  markIdCategory,
  markId,
  modelIdCategory,
  modelId,
  id,
}) => {
  RemoveAutoData({ checkingId: id });
  RemoveFromFirebaseWithThreeQueries(
    "AutoModels",
    markIdCategory,
    markId,
    modelIdCategory,
    modelId,
    id
  );
};

export const ClientsAutoForSaleCreate = (data) => {
  return new Promise(function (resolve, reject) {
    firebase
      .database()
      .ref("ClientsAutoForSale")
      .push(data)

      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const AddAutoData = ({
  WhatIsIt,
  MarkId,
  Mark,
  Transliteration,
  ModelCollection,
  ModelId,
  Model,
  GenerationCollection,
  GenerationId,
  Name,
}) => {
  return new Promise(function (resolve, reject) {
    firebase
      .database()
      .ref("AutoData")
      .push({
        WhatIsIt: WhatIsIt,
        Mark: Mark ? Mark : null,
        MarkId: MarkId,
        ModelCollection: ModelCollection ? ModelCollection : null,
        ModelId: ModelId ? ModelId : null,
        Model: Model ? Model : null,
        GenerationCollection: GenerationCollection
          ? GenerationCollection
          : null,
        GenerationId: GenerationId ? GenerationId : null,
        ChekingId: GenerationId || ModelId || MarkId,
        Name: Name,
        Transliteration: Transliteration,
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const UpdateAutoData = ({ name, transliteration, checkingId }) => {
  firebase
    .database()
    .ref("AutoData")
    .orderByChild("ChekingId")
    .equalTo(checkingId)
    .once("value", (data) => {
      data.forEach(function (dataItem) {
        firebase.database().ref(`AutoData/${dataItem.key}`).update({
          Name: name,
          Transliteration: transliteration,
        });
      });
    });
};

const RemoveAutoData = ({ checkingId }) => {
  firebase
    .database()
    .ref("AutoData")
    .orderByChild("ChekingId")
    .equalTo(checkingId)
    .once("value", (data) => {
      data.forEach(function (dataItem) {
        firebase.database().ref(`AutoData/${dataItem.key}`).remove();
      });
    });
};

// export const AddAutoData = ({
//   WhatIsIt,
//   MarkId,
//   Transliteration,
//   ModelCollection,
//   ModelId,
//   GenerationCollection,
//   GenerationId,
//   Name,
// }) => {
//   return new Promise(function (resolve, reject) {
//     CreateInFirebase("AutoData", {
//       WhatIsIt: WhatIsIt,
//       MarkId: MarkId,
//       ModelCollection: ModelCollection ? ModelCollection : null,
//       ModelId: ModelId ? ModelId : null,
//       GenerationCollection: GenerationCollection ? GenerationCollection : null,
//       GenerationId: GenerationId ? GenerationId : null,
//       ChekingId: GenerationId || ModelId || MarkId,
//       Name: Name,
//       Transliteration: Transliteration,
//     })
//       .then((data) => {
//         resolve(data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// const UpdateAutoData = ({ name, transliteration, checkingId }) => {
//   return new Promise(function (resolve, reject) {
//     firebase
//       .firestore()
//       .collection("AutoData")
//       .where("ChekingId", "==", checkingId)
//       .get()
//       .then((data) => {
//         data.forEach((dataItem) => {
//           UpdateInFirebase(
//             "AutoData",
//             { Name: name, Transliteration: transliteration },
//             dataItem.id
//           );
//         });
//         resolve(data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// const RemoveAutoData = ({ checkingId }) => {
//   return new Promise(function (resolve, reject) {
//     firebase
//       .firestore()
//       .collection("AutoData")
//       .where("ChekingId", "==", checkingId)
//       .get()
//       .then(function (data) {
//         data.forEach(function (dataItem) {
//           dataItem.ref.delete();
//         });
//       })
//       .then((data) => {
//         resolve(data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };
