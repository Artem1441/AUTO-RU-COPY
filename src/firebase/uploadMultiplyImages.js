import React, { useState, useEffect } from "react";
import { storage } from "../index";
import { AppInput } from "./../components/UI/input/AppInput";
import { AppButton } from "./../components/UI/button/AppButton";
import { AppButtonSmall } from "../components/UI/button/AppButtonSmall";
import { STYLES } from "../utils/styles";

export const MultiplyImageUpload = ({ dispatch, saveFunc, dependences }) => {
  const [uniqId, setUniqId] = useState("");
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
    e.target.value = null;
    // сброс хранения файлов загружаемых в input file. Чтобы можно было дважды загружать один файл
  };

  useEffect(() => {
    if (images.length > 0) {
      setUniqId(Math.random().toString(36).substr(2, 9));
      handleUpload();
      setImages([]);
    }
  }, [images]);

  useEffect(() => {
    setImages([]);
    setProgress(0);
    setUniqId("");
  }, [dependences]);

  const handleUpload = () => {
    const promises = [];
    images.map((image) => {
      const uploadTask = storage
        .ref(`carsForSale/${uniqId + image.name}`)
        .put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref("carsForSale")
            .child(uniqId + image.name)
            .getDownloadURL()
            .then((urls) => {
              dispatch(saveFunc(urls));
              setUrls((prevState) => [...prevState, urls]);
            });
        }
      );
    });

    Promise.all(promises)
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* <progress value={progress} max="100" /> */}

      {/* {urls.map((url, i) => (
        <div key={i}>
          <a href={url} target="_blank">
            {url}
          </a>
        </div>
      ))} */}

      {/* {urls.map((url, i) => (
        <img
          key={i}
          style={{ width: "500px" }}
          src={url || "http://via.placeholder.com/300"}
          alt="firebase-image"
        />
      ))} */}

      {STYLES.WINDOW_WIDTH() > 480 ? (
        <AppButton
          onClick={() => {
            document.getElementById("fileInputMultiply").click();
          }}
        >
          Выбрать фотографии
        </AppButton>
      ) : (
        <AppButtonSmall
          onClick={() => {
            document.getElementById("fileInputMultiply").click();
          }}
        >
          Выбрать фотографии
        </AppButtonSmall>
      )}

      <AppInput
        type="file"
        id="fileInputMultiply"
        multiple
        onChange={handleChange}
        style={{ display: "none" }}
      />
      {/* <progress value={progress} max="100" /> */}
    </div>
  );
};
