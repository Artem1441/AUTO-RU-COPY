import React from "react";
import { Transition } from "../../components/transition/Transition";
import { useHistory } from "react-router-dom";
import { PATHS } from "../../utils/paths";
import { UpdateNewAdminAutoEmail } from "../../components/admin/Update/UpdateNewAdmin";

export const AdminUpdateAdminPage = () => {
  const history = useHistory();
  const components = [<UpdateNewAdminAutoEmail />];

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
