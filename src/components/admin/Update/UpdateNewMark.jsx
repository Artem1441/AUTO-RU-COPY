import React, { useEffect } from "react";
import "./../admin.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getMarksArrayAction,
  getMarksArrayRefreshAction,
} from "../../../store/adminUpdateReducer";
import { AppTitle } from "./../../UI/titles/AppTitle";
import { ReadAllInFirebase } from "../../../firebase/crudAdmin";
import { AppLoader } from "../../UI/loader/AppLoader";
import { AppMark } from "./../../UI/mark/AppMark";
import { useHistory } from "react-router";
import { PATHS } from "../../../utils/paths";
import { RemoveMark } from "./../../../firebase/addFunctions";
import { AppText } from "../../UI/text/AppText";

export const UpdateNewAdminMark = () => {
  const dispatch = useDispatch();
  const router = useHistory();
  const marksArr = useSelector((state) => state.adminUpdateName.marksArr);

  useEffect(() => {
    dispatch(getMarksArrayRefreshAction());
    ReadAllInFirebase("Marks")
      .then((data) => {
        data.forEach((dataItem) => {
          dispatch(
            getMarksArrayAction({ ...dataItem.data(), _id: dataItem.id })
          );
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const deleteMark = async (id) => {
    RemoveMark({ id });
  };

  const updateMark = async (id) => {
    router.push(`${PATHS.ADMIN_UPDATE_MARKS}/${id}`);
  };

  return (
    <div className="add_auto">
      <AppTitle>
        Выберите марки которые нужно удалить или отредактировать
      </AppTitle>

      <div className="add_auto_marks">
        {marksArr.length > 0 ? (
          marksArr.map((mark, index) => {
            return (
              <AppMark
                key={index}
                mark={mark}
                deleteFunc={deleteMark}
                updateFunc={updateMark}
                isUpdate={true}
                isDelete={true}
              />
            );
          })
        ) : (
          // <AppLoader />
          <AppText>
            Упс... похоже, что не создана не одна марка. Перейдите в раздел
            "Добавить новую марку"
          </AppText>
        )}
      </div>
    </div>
  );
};
