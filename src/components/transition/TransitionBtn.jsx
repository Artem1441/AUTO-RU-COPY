import React from "react";
import { AppButton } from "../UI/button/AppButton";

export const TransitionBtnNext = ({ dependencyFunc, nextFunc }) => {
  const nextHandlerFunc = async () => {
    const isNext = await dependencyFunc();
    isNext && nextFunc();
  };

  return <AppButton onClick={nextHandlerFunc}>Дальше</AppButton>;
};

export const TransitionBtnBack = ({ backFunc }) => {
  return <AppButton onClick={backFunc}>Назад</AppButton>;
};

export const TransitionBtnFinish = ({dependencyFunc, finishFunc}) => {
  const finishHandlerFunc = async () => {
    const isFinish = await dependencyFunc();
    // console.log(finishFunc)
    // finishFunc()
    isFinish && finishFunc();
  };
  return <AppButton onClick={finishHandlerFunc}>Готово</AppButton>;
};
