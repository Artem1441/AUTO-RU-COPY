import firebase from "firebase";
import { STYLES } from "./../utils/styles";
import { store } from "./../store/index";

export const GetAllSalesCarsFromDBWithLimit = (
  showMore,
  sortBy = { type: "dateAdded", descAsc: "desc" }
) => {
  const params = store.getState().clientGetAuto.params;
  const countAutoId = store.getState().clientGetAuto.countAutoId;

  // const startAfter1 =
  //   STYLES.DEDUCTIBLE_ID - countAutoId + startAfter - STYLES.DEFAULT_LIMIT;
  // console.log(startAfter1, countAutoId, startAfter, showMore);
  // вроде как работает, поэтому не трожь!

  if (showMore & (countAutoId !== 0)) {
    return new Promise(function (resolve, reject) {
      firebase
        .firestore()
        .collection("ClientsAutoForSale")
        .orderBy("dateAdded", "desc")
        .startAfter(countAutoId)
        .limit(STYLES.DEFAULT_LIMIT)
        .get()
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  } else {
    if (!params.markId) {
      return new Promise(function (resolve, reject) {
        console.log("aaa");
        firebase
          .firestore()
          .collection("ClientsAutoForSale")
          .orderBy("dateAdded", "desc")
          .limit(STYLES.DEFAULT_LIMIT)
          .get()
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    } else {
      const checkingId = params.generationId
        ? params.generationId
        : params.modelId
        ? params.modelId
        : params.markId;
      const checkingType = params.generationId
        ? "GenerationId"
        : params.modelId
        ? "ModelId"
        : "MarkId";
      return new Promise(function (resolve, reject) {
        firebase
          .firestore()
          .collection("ClientsAutoForSale")
          .where(checkingType, "==", checkingId)
          .orderBy(sortBy.type, sortBy.descAsc)
          // .startAfter(startAfter)
          // .limit(STYLES.DEFAULT_LIMIT)
          // получаем всё сразу
          .get()
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  }
};
