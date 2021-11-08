import React, { useEffect, useState } from "react";
import { Navbar } from "./../components/navbar/Navbar";
import { Header } from "./../components/header/Header";
import { ShowMore } from "./../components/showMore/ShowMore";
import { ShowSingleAutoData } from "../components/showSingleAutoData/ShowSingleAutoData";
import { useParams } from "react-router-dom";
import { ReadAllInFirebase } from "../firebase/crudAdmin";

export const SingleAutoPage = ({ query }) => {
  const [data, setData] = useState({});

  let { autoId } = useParams();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(autoId));
    setData(data);
    localStorage.removeItem(autoId);
    if (!data) {
      ReadAllInFirebase("ClientsAutoForSale").then((data) => {
        data.forEach((dataItem) => {
          if (dataItem.id === autoId) {
            setData(dataItem.data());
          }
        });
      });
    }
  }, []);

  return (
    <div>
      <Header />
      <Navbar />
      <ShowSingleAutoData data={data} />
      <ShowMore />
    </div>
  );
};
