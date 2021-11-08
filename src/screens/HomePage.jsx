import React, { useEffect, useState } from "react";
import { Header } from "../components/header/Header";
import { Navbar } from "../components/navbar/Navbar";
import { AutoList } from "./../components/autoList/AutoList";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCarsFromDBAction,
  getAllCarsFromDBRefreshAction,
  setCountAutoIdAction,
} from "../store/client/getAutoReducer";
import { GetAllSalesCarsFromDBWithLimit } from "../firebase/getSalesAuto";
import { useLocation, useParams } from "react-router-dom";
import { ShowMore } from "./../components/showMore/ShowMore";
import { setParamsAction } from "./../store/client/getAutoReducer";
import { AppFilterPanel } from "../components/UI/filterPanel/AppFilterPanel";
import { Footer } from "./../components/footer/Footer";
import { AppTitle } from "./../components/UI/titles/AppTitle";

export const HomePage = () => {
  const location = useLocation();
  console.log(location.state);
  const [doItAgain, setDoItAgain] = useState(0);
  const params = useParams();
  const dispatch = useDispatch();
  const autoArr = useSelector((state) => state.clientGetAuto.autoArr);

  const markId = params.markId;
  const modelId = params.modelId;
  const generationId = params.generationId;

  useEffect(() => {
    dispatch(setParamsAction(params));
    dispatch(getAllCarsFromDBRefreshAction());

    if (markId) {
      dispatch(setCountAutoIdAction(0));
    }
    GetAllSalesCarsFromDBWithLimit().then((data) => {
      if (!markId) {
        dispatch(setCountAutoIdAction(data.docs.reverse()[0].data().dateAdded));
      }
      data.forEach((dataItem) => {
        dispatchArrFunc(dataItem);
      });
      setDoItAgain(1);
    });
  }, [markId, modelId, generationId, doItAgain]);
  // здесь используется markId, modelId, generationId т.к. если ставить params, то при загрузке страницы происходит действие 3 раза (т.е. params меняяется 3 раза). При  markId, modelId, generationId меняется только один раз при запросе. ₽.$. при запросе без параметров useEffect тоже срабатывает, т.к. params меняется, следовательно как минимум markId тоже

  useEffect(() => {
    document.title = `Koz Auto`;
  }, []);

  const dispatchArrFunc = (dataItem) => {
    const id = dataItem.id;
    dispatch(getAllCarsFromDBAction({ ...dataItem.data(), id }));
  };

  return (
    <div>
      <Header />
      <Navbar />
      {markId && <AppFilterPanel name={location.state}/>}
      <AutoList autoData={autoArr} />
      <ShowMore />
      {/* <Footer /> */}
    </div>
  );
};
