import firebase from "firebase";
import { AppSwal } from "../utils/swal";

// FIRESTORE

export const CreateInFirebase = (collectionName, data) => {
  const collectionRef = firebase.firestore().collection(collectionName);
  return create(collectionRef, data);
};

export const CreateInFirebaseWithTwoQueries = (
  collectionName,
  doc,
  subcollectionName,
  data
) => {
  const collectionRef = firebase
    .firestore()
    .collection(collectionName)
    .doc(doc)
    .collection(subcollectionName);
  return create(collectionRef, data);
};

export const CreateInFirebaseWithThreeQueries = (
  collectionName,
  doc,
  subcollectionName,
  subdoc,
  subsubcollectionName,
  data
) => {
  const collectionRef = firebase
    .firestore()
    .collection(collectionName)
    .doc(doc)
    .collection(subcollectionName)
    .doc(subdoc)
    .collection(subsubcollectionName);
  return create(collectionRef, data);
};

export const ReadAllInFirebase = (collectionName) => {
  const collectionRef = firebase.firestore().collection(collectionName);
  return read(collectionRef);
};

export const ReadAllInFirebaseWithTwoQueries = (
  collectionName,
  doc,
  subcollectionName
) => {
  const collectionRef = firebase
    .firestore()
    .collection(collectionName)
    .doc(doc)
    .collection(subcollectionName);
  return read(collectionRef);
};

export const ReadAllInFirebaseWithThreeQueries = (
  collectionName,
  doc,
  subcollectionName,
  subdoc,
  subsubcollectionName
) => {
  const collectionRef = firebase
    .firestore()
    .collection(collectionName)
    .doc(doc)
    .collection(subcollectionName)
    .doc(subdoc)
    .collection(subsubcollectionName);
  return read(collectionRef);
};

export const UpdateInFirebase = (collectionName, elem, id) => {
  const collectionRef = firebase.firestore().collection(collectionName).doc(id);
  return update(collectionRef, elem);
};

export const UpdateInFirebaseWithTwoQueries = (
  collectionName,
  doc,
  subcollectionName,
  elem,
  id
) => {
  const collectionRef = firebase
    .firestore()
    .collection(collectionName)
    .doc(doc)
    .collection(subcollectionName)
    .doc(id);
  return update(collectionRef, elem);
};

export const UpdateInFirebaseWithThreeQueries = (
  collectionName,
  doc,
  subcollectionName,
  subdoc,
  subsubcollectionName,
  elem,
  id
) => {
  const collectionRef = firebase
    .firestore()
    .collection(collectionName)
    .doc(doc)
    .collection(subcollectionName)
    .doc(subdoc)
    .collection(subsubcollectionName)
    .doc(id);
  return update(collectionRef, elem);
};

export const RemoveFromFirebase = (collectionName, id, elem) => {
  const collectionRef = firebase.firestore().collection(collectionName).doc(id);
  return remove(collectionRef, elem);
};

export const RemoveFromFirebaseWithTwoQueries = (
  collectionName,
  doc,
  subcollectionName,
  id,
  elem
) => {
  const collectionRef = firebase
    .firestore()
    .collection(collectionName)
    .doc(doc)
    .collection(subcollectionName)
    .doc(id);
  return remove(collectionRef, elem);
};

export const RemoveFromFirebaseWithThreeQueries = (
  collectionName,
  doc,
  subcollectionName,
  subdoc,
  subsubcollectionName,
  id
) => {
  const collectionRef = firebase
    .firestore()
    .collection(collectionName)
    .doc(doc)
    .collection(subcollectionName)
    .doc(subdoc)
    .collection(subsubcollectionName)
    .doc(id);
  return remove(collectionRef);
};
//
// CRUD
//
const create = (collectionRef, data) => {
  return new Promise(function (resolve, reject) {
    collectionRef
      .add({
        ...data,
        // Id: collectionName + Math.random().toString(36).substr(2, 9),
        dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const read = (collectionRef) => {
  return new Promise(function (resolve, reject) {
    collectionRef
      .get()
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const update = (collectionRef, updatedElem) => {
  return new Promise(function (resolve, reject) {
    collectionRef
      .update(updatedElem)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const remove = (collectionRef) => {
  collectionRef
    .delete()
    .then(() => {
      AppSwal("Успех", `Элемент был удалён`, "success");
    })
    .catch((err) => {
      console.log(err);
    });
};

// V2

export const ReadAllInFirebaseWithTwoQueriesV2 = (
  collectionName,
  param,
  subcollectionName
) => {
  return new Promise(function (resolve, reject) {
    const FB = firebase.firestore();
    FB.collection(collectionName)
      .where(param, "==", subcollectionName)
      .get()
      .then((data) => {
        data.forEach((dataItem) => {
          FB.collection(collectionName)
            .doc(dataItem.id)
            .collection(subcollectionName)
            .get()
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        });
      });
  });
};

export const ReadAllInFirebaseWithThreeQueriesV2 = (
  collectionName,
  param1,
  subcollectionName,
  param2,
  subsubcollectionName
) => {
  return new Promise(function (resolve, reject) {
    const FB = firebase.firestore();
    let doc1 = "";
    FB.collection(collectionName)
      .where(param1, "==", subcollectionName)
      .get()
      .then((data) => {
        data.forEach((dataItem) => {
          doc1 = dataItem.id;
          FB.collection(collectionName)
            .doc(doc1)
            .collection(subcollectionName)
            .where(param2, "==", subsubcollectionName)
            .get()
            .then((data) => {
              data.forEach((dataItem) => {
                FB.collection(collectionName)
                  .doc(doc1)
                  .collection(subcollectionName)
                  .doc(dataItem.id)
                  .collection(subsubcollectionName)
                  .get()
                  .then((data) => {
                    resolve(data);
                  })
                  .catch((error) => {
                    reject(error);
                  });
              });
            });
        });
      });
  });
};
