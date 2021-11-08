import firebase from "firebase";
import { authAction } from "../store/userReducer";
import { CreateInFirebase } from "./crudAdmin";

// export const SignInUserWithGoogle = async (auth) => {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   console.log(provider);
//   const { user } = await auth.signInWithPopup(provider);

//   authAction(
//     user !== null
//       ? { isAuth: true, email: user.email }
//       : { isAuth: true, email: "" }
//   );
// };

export const SignUpUserWithEmailAndPassword = async (
  email,
  password,
  name,
  imageUrl
) => {
  return new Promise(function (resolve, reject) {
    if (!name) {
      reject("Введите имя");
    }
    if (name.length < 2) {
      reject("Имя должно быть больше 1 символа");
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        CreateInFirebase("Users", {
          Email: email.toLowerCase(),
          Name: name,
          ImageUrl: imageUrl,
        });
        resolve(data);
      })
      .catch((error) => {
        // console.log(error.message);
        if (error.message === "The email address is badly formatted.") {
          reject("Email имеет неправильный формат");
        } else if (
          (error.message ===
            "The password must be 6 characters long or more.") |
          (error.message === "Password should be at least 6 characters")
        ) {
          reject("Пароль должен быть больше 6 символов");
        } else if (
          error.message ===
          "The email address is already in use by another account."
        ) {
          reject(
            "Пользователь с таким email'ом уже существует. Попробуйте другой"
          );
        } else {
          reject(
            "Произошла ошибка. Попробуйте зайти позже. Дело в том, что создатель очень плохой прогер и ничего не умеет, кроме того, как менять колор кнопочкам. И да, вы перезайдёте, и ничего (абсолютно) не произойдёт"
          );
        }
      });
  });
};

export const SignInUserWithEmailAndPassword = (email, password) => {
  return new Promise(function (resolve, reject) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        // console.log(error.message);
        if (error.message === "The email address is badly formatted.") {
          reject("Email имеет неправильный формат");
        } else if (
          (error.message ===
            "The password is invalid or the user does not have a password.") |
          (error.message ===
            "There is no user record corresponding to this identifier. The user may have been deleted.")
        ) {
          reject("Пароль или email не подходит");
        } else {
          reject(
            "Произошла ошибка. Попробуйте зайти позже. Дело в том, что создатель очень плохой прогер и ничего не умеет, кроме того, как менять колор кнопочкам. И да, вы перезайдёте, и ничего (абсолютно) не произойдёт"
          );
        }
      });
  });
};

export const SignOutUser = () => {
  return new Promise(function (resolve, reject) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        resolve("Вы вышли из системы");
      })
      .catch((error) => {
        reject(error);
      });
  });
};
