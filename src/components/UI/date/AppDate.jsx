import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const AppDate = ({ dispatchFunc, currentYear, startYear, endYear }) => {
  const dispatch = useDispatch();
  const randomYear =
    2000 + Math.floor(Math.random() * (new Date().getFullYear() - 2000));
  const [years, setYears] = useState([]);
  let yearsOption = [];

  useEffect(() => {
    if (!startYear && !endYear) {
      for (let i = 1950; i <= new Date().getFullYear(); i++) {
        yearsOption.push(new Date().getFullYear() - i + 1950);
      }
    } else {
      for (let i = Number(startYear); i <= Number(endYear); i++) {
        yearsOption.push(Number(endYear) - i + Number(startYear));
      }
    }
    setYears(yearsOption);
    dispatch(dispatchFunc(Number(currentYear) || randomYear));
  }, [endYear]);

  return (
    <select
      value={Number(currentYear) || randomYear}
      onChange={(e) => dispatch(dispatchFunc(e.target.value))}
    >
      <option disabled>Укажите дату</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};
