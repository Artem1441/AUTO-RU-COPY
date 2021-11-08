import React from "react";
import { Transition } from "../../components/transition/Transition";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { PATHS } from "../../utils/paths";
// import { CreateInFirebase } from "../../firebase/crudAdmin";
import { AppSwal } from "../../utils/swal";
import { UpdateNewAdminMark } from "./../../components/admin/Update/UpdateNewMark";

export const AdminUpdateMarkPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const components = [<UpdateNewAdminMark />];

  const dependenciesOfComponent = [
    () => {
      return true;
    },
  ];

  const finishFunc = () => {
    history.push(PATHS.ADMIN);
  };

  return (
    <div className="admin">
      <Transition
        components={components}
        dependencies={dependenciesOfComponent}
        finishFunc={finishFunc}
      />
    </div>
  );
};
