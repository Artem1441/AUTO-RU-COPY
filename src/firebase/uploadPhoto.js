import React, { Component } from "react";
import { AppButton } from "../components/UI/button/AppButton";
import { AppButtonSmall } from "../components/UI/button/AppButtonSmall";
import { storage } from "../index";
import { store } from "../store";
import { STYLES } from "../utils/styles";
import { AppInput } from "./../components/UI/input/AppInput";

const uniqId = Math.random().toString(36).substr(2, 9);

export class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0,
    };
  }

  handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const uploadTask = storage
        .ref(`${this.props.folderName}/${uniqId + image.name}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Сам процесс
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        (error) => {
          // При ошибке
          console.log(error);
        },
        () => {
          // Ф-я выполнена ...
          storage
            .ref(this.props.folderName)
            .child(uniqId + image.name)
            .getDownloadURL()
            .then((url) => {
              if (this.props.withoutDispatch) {
                this.props.dispatchFunc(url);
              } else {
                store.dispatch(this.props.dispatchFunc(url));
              }
            });
        }
      );
    }
  };
  render() {
    return (
      <div>
        {STYLES.WINDOW_WIDTH() > 480 ? (
          <AppButton
            onClick={() => {
              document.getElementById("fileInput").click();
            }}
          >
            Выбрать фото
          </AppButton>
        ) : (
          <AppButtonSmall
            onClick={() => {
              document.getElementById("fileInput").click();
            }}
          >
            Выбрать фото
          </AppButtonSmall>
        )}
        <AppInput
          type="file"
          id="fileInput"
          onChange={this.handleChange}
          style={{ display: "none" }}
        />
      </div>
    );
  }
}

{
  /* <progress value={this.state.progress} max="100" className="progress" /> */
}
