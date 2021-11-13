import React from "react";
import { STYLES } from "../../utils/styles";
import { AppButton } from "../UI/button/AppButton";
import { AppButtonSmall } from "../UI/button/AppButtonSmall";

export const TransitionBtnNext = ({ dependencyFunc, nextFunc }) => {
  const nextHandlerFunc = async () => {
    const isNext = await dependencyFunc();
    isNext && nextFunc();
  };

  return STYLES.WINDOW_WIDTH() > 360 ? (
    <AppButton onClick={nextHandlerFunc}>Дальше</AppButton>
  ) : (
    <AppButtonSmall onClick={nextHandlerFunc}>Дальше</AppButtonSmall>
  );
};

export const TransitionBtnBack = ({ backFunc }) => {
  return STYLES.WINDOW_WIDTH() > 360 ? (
    <AppButton onClick={backFunc}>Назад</AppButton>
  ) : (
    <AppButtonSmall onClick={backFunc}>Назад</AppButtonSmall>
  );
};

export const TransitionBtnFinish = ({ dependencyFunc, finishFunc }) => {
  const finishHandlerFunc = async () => {
    const isFinish = await dependencyFunc();
    isFinish && finishFunc();
  };
  return STYLES.WINDOW_WIDTH() > 360 ? (
    <AppButton onClick={finishHandlerFunc}>Готово</AppButton>
  ) : (
    <AppButtonSmall onClick={finishHandlerFunc}>Готово</AppButtonSmall>
  );
};
