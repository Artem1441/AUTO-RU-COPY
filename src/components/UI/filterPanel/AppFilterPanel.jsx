import React from "react";
import { useDispatch } from "react-redux";
import { GetAllSalesCarsFromDBWithLimit } from "../../../firebase/getSalesAuto";
import { getAllCarsFromDBAction } from "../../../store/client/getAutoReducer";
import { getAllCarsFromDBRefreshAction } from "./../../../store/client/getAutoReducer";
import { AppButtonSmall } from "./../button/AppButtonSmall";
import "./filter.css";
import { AppTitle } from "./../titles/AppTitle";
import { AppText } from "../text/AppText";

export const AppFilterPanel = ({ name, isLoad }) => {
  const dispatch = useDispatch();

  const sortBy = (type, descAsc) => {
    dispatch(getAllCarsFromDBRefreshAction());
    GetAllSalesCarsFromDBWithLimit(false, { type, descAsc }).then((data) => {
      data.forEach((dataItem) => {
        const id = dataItem.id;
        dispatch(getAllCarsFromDBAction({ ...dataItem.data(), id }));
      });
    });
  };

  return (
    <div className="appFilter">
      <div className="container appFilterTitle">
        <AppTitle>{name}</AppTitle>
      </div>
      {isLoad && (
        <div className="container appFilterSort">
          <AppText>Сортировать по:</AppText>
        </div>
      )}
      {isLoad && (
        <div className="container appFilterContainer">
          <div className="appFilterContainerBtn">
            <AppButtonSmall onClick={() => sortBy("Price", "desc")}>
              цене (убывание)
            </AppButtonSmall>
          </div>
          <div className="appFilterContainerBtn">
            <AppButtonSmall onClick={() => sortBy("Price", "asc")}>
              цене (возрастание)
            </AppButtonSmall>
          </div>
          <div className="appFilterContainerBtn">
            <AppButtonSmall onClick={() => sortBy("dateAdded", "desc")}>
              дате загрузки (убывание)
            </AppButtonSmall>
          </div>
          <div className="appFilterContainerBtn">
            <AppButtonSmall onClick={() => sortBy("dateAdded", "asc")}>
              дате загрузки (возрастание)
            </AppButtonSmall>
          </div>
        </div>
      )}
    </div>
  );
};
