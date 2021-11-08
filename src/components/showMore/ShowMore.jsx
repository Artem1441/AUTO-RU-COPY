import React, { useRef } from "react";
import { GetAllSalesCarsFromDBWithLimit } from "../../firebase/getSalesAuto";
import { useDispatch, useSelector } from "react-redux";
import { useObserver } from "./../../hooks/useObserver";
import {
  getAllCarsFromDBAction,
  setCountAutoIdAction,
} from "../../store/client/getAutoReducer";

export const ShowMore = () => {
  const dispatch = useDispatch();
  const lastElement = useRef();
  const params = useSelector((state) => state.clientGetAuto.params);
  const countAutoId = useSelector((state) => state.clientGetAuto.countAutoId);

  const showMoreAuto = () => {
    GetAllSalesCarsFromDBWithLimit(true).then((data) => {
      if (data.size > 0) {
        dispatch(setCountAutoIdAction(data.docs.reverse()[0].data().dateAdded));
      }

      data.forEach((dataItem) => {
        const id = dataItem.id;

        dispatch(getAllCarsFromDBAction({ ...dataItem.data(), id }));
      });
    });
  };

  useObserver(lastElement, countAutoId !== 0, showMoreAuto);

  return (
    <div className="autoList_scroll">
      <div ref={lastElement} className="lastElement"></div>
    </div>
  );
};
