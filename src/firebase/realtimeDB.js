import firebase from "firebase";
import {
  getAllCarsFromDBAction,
  getAllCarsFromDBRefreshAction,
} from "../store/client/getAutoReducer";

// const db = firebase.database().ref("/ClientsAutoForSale");

// class ClientsAutoForSaleActions {
//   getAll() {
//     return db;
//   }

//   create(auto) {
//     return db.push(auto);
//   }

//   update(key, value) {
//     return db.child(key).update(value);
//   }

//   delete(key) {
//     return db.child(key).remove();
//   }

//   deleteAll() {
//     return db.remove();
//   }
// }

// export default new ClientsAutoForSaleActions();

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

export const ClientGetAllSalesCarsFromDBWithLimit = ({ dispatch }) => {
  // firebase.database().ref("/Ocean/").orderByChild(child).limitToLast(1000).once;

  firebase
    .database()
    .ref("ClientsAutoForSale")
    .limitToLast(5)
    .orderByChild("Mark")
    .equalTo("Skoda")
    .on("value", (snapshot) => {
      dispatch(getAllCarsFromDBRefreshAction());
      snapshot.forEach(function (childSnapshot) {
        // console.log(childSnapshot.val());
        dispatch(getAllCarsFromDBAction(childSnapshot.val()));
      });
    });
};
// https://firebase.google.com/docs/reference/node/firebase.database.Reference
