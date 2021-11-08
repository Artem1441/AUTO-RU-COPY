import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./select.css";

export const AppSelectOption = ({ dispatchFunc, arr, value, defaultValue }) => {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(value || defaultValue);
  useEffect(() => {
    if (!value) dispatch(dispatchFunc(defaultValue));
  }, []);

  const choiceThisItem = (item) => {
    dispatch(dispatchFunc(item));
    setActiveItem(item)
  };

  return (
    <div className="appSelect">
      {arr.map((item, index) => (
        <div
          key={index}
          onClick={() => choiceThisItem(item)}
          className={
            activeItem === item
              ? "appSelectItem appSelectItemActive"
              : "appSelectItem"
          }
        >
          {item}
        </div>
      ))}
    </div>
  );
};
