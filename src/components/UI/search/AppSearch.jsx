import React, { useState, useEffect, useRef } from "react";
import "./search.css";
import { AppInput } from "./../input/AppInput";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { PATHS } from "../../../utils/paths";

export const AppSearch = () => {
  const history = useHistory();
  const [searchingArr, setSearchingArr] = useState([]);
  const [searchingQuery, setSearchingQuery] = useState("");
  const [visiblePromt, setVisiblePromt] = useState(false);

  const rootEl = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (rootEl.current) {
        rootEl.current.contains(e.target) || setVisiblePromt(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    setVisiblePromt(true);
    if (searchingQuery.length > 0) {
      // ЗДЕСЬ НУЖНО ПОМЕНЯТЬ ССЫЛКУ ДЛЯ НОВОЙ БД
      axios
        .get(
          "https://testrealtimedb-9047b-default-rtdb.firebaseio.com/AutoData.json"
        )
        .then((res) => {
          const query = searchingQuery.toLowerCase();
          setSearchingArr([]);
          for (const key in res.data) {
            const elemName = res.data[key].Name.toLowerCase();
            const elemTransliteration =
              res.data[key].Transliteration.toLowerCase();

            const queryArr = query.split(" ");

            const firstChecking =
              (elemName
                .slice(0, query.length)
                .indexOf(queryArr[queryArr.length - 1]) !==
                -1) |
              (elemTransliteration
                .slice(0, query.length)
                .indexOf(queryArr[queryArr.length - 1]) !==
                -1);

            const secondChecking =
              (elemName.slice(0, query.length) ===
                queryArr[queryArr.length - 1]) |
              (elemTransliteration.slice(0, query.length) ===
                queryArr[queryArr.length - 1]);

            const thirdChecking = queryArr[queryArr.length - 1] !== "";

            if (firstChecking & secondChecking & thirdChecking) {
              setSearchingArr((prev) => {
                return [...prev, res.data[key]];
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setVisiblePromt(false);
        });
    } else {
      setSearchingArr([]);
    }
  }, [searchingQuery]);

  const getAutoBySearch = ({
    MarkId,
    ModelId,
    GenerationId,
    WhatIsIt,
    Name,
  }) => {
    if (WhatIsIt === "Mark") {
      setSearchingQuery("");
      history.push(`${PATHS.CARS}/${MarkId}`, Name);
    } else if (WhatIsIt === "Model") {
      setSearchingQuery("");
      history.push(`${PATHS.CARS}/${MarkId}/${ModelId}`, Name);
    } else if (WhatIsIt === "Generation") {
      setSearchingQuery("");
      history.push(`${PATHS.CARS}/${MarkId}/${ModelId}/${GenerationId}`, Name);
    } else {
      console.log("err");
    }
  };

  return (
    <form action="/" method="get" className="appSearch" ref={rootEl}>
      <AppInput
        type="text"
        id="header-search"
        placeholder="Поиск по объявлениям"
        value={searchingQuery}
        onChange={(prev) => setSearchingQuery(prev.target.value)}
        autoComplete="off"
      />

      {visiblePromt && (
        <ul className="appSearchList">
          {searchingArr.map((searchingArrItem, index) => (
            <li
              key={index}
              className="appSearchListItem"
              onClick={() => {
                const Mark = searchingArrItem.Mark || "";
                const Model = searchingArrItem.Model || "";
                getAutoBySearch({
                  MarkId: searchingArrItem.MarkId && searchingArrItem.MarkId,
                  ModelId: searchingArrItem.ModelId && searchingArrItem.ModelId,
                  GenerationId:
                    searchingArrItem.GenerationId &&
                    searchingArrItem.GenerationId,
                  WhatIsIt: searchingArrItem.WhatIsIt,
                  Name: `${Mark} ${Model} ${searchingArrItem.Name}`,
                });
              }}
            >
              {searchingArrItem.Mark && searchingArrItem.Mark}{" "}
              {searchingArrItem.Model && searchingArrItem.Model}{" "}
              {searchingArrItem.Name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};
