import React, { useState } from "react";
import { AppInput } from "../input/AppInput";
import { AppButton } from "../button/AppButton";
import "./form.css";
import { ImageUpload } from "./../../../firebase/uploadPhoto";
import { AppText } from "../text/AppText";
import { STYLES } from "../../../utils/styles";
import { AppButtonSmall } from "./../button/AppButtonSmall";

export const AppForm = ({ loginWithEmail, signIn }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerAction = (e) => {
    e.preventDefault();
    signIn
      ? loginWithEmail(email, password)
      : loginWithEmail(email, password, name, imageUrl);
  };


  return (
    <div>
      {imageUrl !== "" && (
        <div className="centerContainer">
          <img src={imageUrl} />
        </div>
      )}
      {!signIn && (
        <div className="centerContainer">
          {imageUrl === "" && (
            <AppText style={{ textAlign: "center" }}>
              Добавьте аватар (необязательно)
            </AppText>
          )}
          <ImageUpload
            dispatchFunc={setImageUrl}
            folderName="users"
            withoutDispatch={true}
          />
        </div>
      )}
      {!signIn && (
        <div className="formConatiner">
          <AppInput
            type="text"
            placeholder="Введите имя"
            value={name}
            onChange={(prev) => setName(prev.target.value)}
          />
        </div>
      )}
      <div className="formConatiner">
        <AppInput
          type="text"
          placeholder="Введите email"
          value={email}
          onChange={(prev) => setEmail(prev.target.value)}
        />
      </div>
      <div className="formConatiner">
        <AppInput
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(prev) => setPassword(prev.target.value)}
        />
      </div>

      <div className="formConatiner">
        {STYLES.WINDOW_WIDTH() > 480 ? (
          <AppButton onClick={registerAction} style={{ margin: 0 }}>
            {signIn ? "Войти" : "Зарегистрироваться"}
          </AppButton>
        ) : (
          <AppButtonSmall onClick={registerAction} style={{ margin: 0 }}>
            {signIn ? "Войти" : "Зарегистрироваться"}
          </AppButtonSmall>
        )}
      </div>
    </div>
  );
};
