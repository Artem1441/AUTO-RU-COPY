import React, { useState, useEffect } from "react";
import "./slider.css";
import { BtnSlider } from "./BtnSlider";
import { useSelector, useDispatch } from "react-redux";
import { AppButtonSmall } from "../UI/button/AppButtonSmall";
import { clientFilterImagesArrAction } from "./../../store/client/addAutoReducer";
import { STYLES } from "../../utils/styles";
import trash from "../../assets/img/trashIcon.svg";

export default function Slider({
  imagesArr,
  isDelete = true,
  isHugeSlider = false,
}) {
  const dispatch = useDispatch();
  const [slideIndex, setSlideIndex] = useState(1);
  const [isLoad, setIsLoad] = useState(false);

  const notLoadStyles = {
    background: STYLES.RED,
  };

  useEffect(() => {
    slideIndex > imagesArr.length && setSlideIndex(imagesArr.length);
  }, [imagesArr]);

  const nextSlide = () => {
    if (slideIndex !== imagesArr.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === imagesArr.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(imagesArr.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className={isHugeSlider ? "container-slider-big" : "container-slider"}>
      {imagesArr.map((url, index) => {
        return (
          <div
            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
            key={index}
          >
            <img
              style={isLoad ? {} : notLoadStyles}
              src={url}
              onLoad={() => {
                setIsLoad(true);
              }}
            />
          </div>
        );
      })}
      {imagesArr.length > 1 && (
        <BtnSlider moveSlide={nextSlide} direction={"next"} />
      )}
      {imagesArr.length > 1 && (
        <BtnSlider moveSlide={prevSlide} direction={"prev"} />
      )}

      <div className="container-dots">
        {Array.from({ length: imagesArr.length }).map((item, index) => (
          <div
            onClick={() => moveDot(index + 1)}
            key={index}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>

      <div className={"sliderDeleteBtn"}>
        {isDelete && (
          <AppButtonSmall
            onClick={() =>
              dispatch(clientFilterImagesArrAction(imagesArr[slideIndex - 1]))
            }
          >
            {STYLES.WINDOW_WIDTH > 500 ? (
              "Удалить фото"
            ) : (
              <img
                src={trash}
                alt="delete"
                style={{ width: STYLES.ICON_SIZE_SMALL }}
              />
            )}
          </AppButtonSmall>
        )}
      </div>
    </div>
  );
}
