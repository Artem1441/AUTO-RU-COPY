import React from "react";
import { useDispatch } from "react-redux";
import { GetAllSalesCarsFromDBWithLimit } from "../../../firebase/getSalesAuto";
import { getAllCarsFromDBAction } from "../../../store/client/getAutoReducer";
import { getAllCarsFromDBRefreshAction } from "./../../../store/client/getAutoReducer";
import { AppButtonSmall } from "./../button/AppButtonSmall";
import "./filter.css";
import { AppTitle } from "./../titles/AppTitle";

export const AppFilterPanel = ({ name }) => {
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
      <div className="container appFilterContainer">
        Сортировать по:
        <AppButtonSmall onClick={() => sortBy("Price", "desc")}>
          цене (убывание)
        </AppButtonSmall>
        <AppButtonSmall onClick={() => sortBy("Price", "asc")}>
          цене (возрастание)
        </AppButtonSmall>
        <AppButtonSmall onClick={() => sortBy("dateAdded", "desc")}>
          дате загрузки (убывание)
        </AppButtonSmall>
        <AppButtonSmall onClick={() => sortBy("dateAdded", "asc")}>
          дате загрузки (возрастание)
        </AppButtonSmall>
      </div>
    </div>
  );
};
