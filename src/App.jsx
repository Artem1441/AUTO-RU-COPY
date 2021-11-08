import React, { useContext, useEffect } from "react";
import "./app.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AppLoader } from "./components/UI/loader/AppLoader";
import { PATHS } from "./utils/paths";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "./index";
import { authAction, isAdminAction, setMyId } from "./store/userReducer";
import { ReadAllInFirebase } from "./firebase/crudAdmin";

import { LoginPage } from "./screens/LoginPage";
import { AdminPage } from "./screens/AdminPage";
import { HomePage } from "./screens/HomePage";
import { AddAutoPage } from "./screens/AddAutoPage";
import { AdminAddAutoPage } from "./screens/AdminAdd/AdminAddAutoPage";
import { AdminAddNewAdmin } from "./screens/AdminAdd/AdminAddNewAdmin";
import { AdminAddMarkPage } from "./screens/AdminAdd/AdminAddMarkPage";
import { AdminAddGenerationPage } from "./screens/AdminAdd/AdminAddGenerationPage";
import { AdminUpdateAdminPage } from "./screens/AdminUpdate/AdminUpdateAdminPage";
import { AdminUpdateMarkPage } from "./screens/AdminUpdate/AdminUpdateMarkPage";
import { AdminUpdateModelPage } from "./screens/AdminUpdate/AdminUpdateModelPage";
import { AdminUpdateGenerationPage } from "./screens/AdminUpdate/AdminUpdateGenerationPage";
import { AdminAddTypeOfBodyPage } from "./screens/AdminAdd/AdminAddTypeOfBodyPage";
import { setCountAutoIdAction } from "./store/client/getAutoReducer";
import firebase from "firebase";
import { SingleAutoPage } from "./screens/SingleAutoPage";
import { ChatPage } from "./screens/ChatPage";
import { ChatsPage } from "./screens/ChatsPage";
import { STYLES } from "./utils/styles";

function App() {
  const dispatch = useDispatch();
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);
  const email = useSelector((state) => state.userName.email);
  const reloadCountAutoId = useSelector(
    (state) => state.reloadName.reloadCountAutoId
  );
  const isAdmin = useSelector((state) => state.userName.isAdmin);

  useEffect(() => {
    if (user) {
      dispatch(
        authAction(
          user !== null
            ? { isAuth: true, email: user.email }
            : { isAuth: false, email: "" }
        )
      );
    }
    email &&
      ReadAllInFirebase("Admins")
        .then((data) => {
          data.forEach((dataItem) => {
            if (dataItem.data().AdminEmail === email) {
              dispatch(isAdminAction(true));
              return;
            }
          });
        })
        .then(() => {
          console.log(email);
          firebase
            .firestore()
            .collection("Users")
            .where("Email", "==", email)
            .get()
            .then((data) => {
              data.forEach((dataItem) => {
                dispatch(setMyId(dataItem.id));
              });
            });
        })
        .catch((err) => {
          console.log(err);
        });
  }, [user, email]);

  useEffect(() => {
    dispatch(setCountAutoIdAction(0));
  }, [reloadCountAutoId]);

  if (loading) {
    return <AppLoader />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={PATHS.HOME} component={HomePage} />
        <Route exact path={`${PATHS.CARS}/:markId`} component={HomePage} />
        <Route
          exact
          path={`${PATHS.CARS}/:markId/:modelId`}
          component={HomePage}
        />
        <Route
          exact
          path={`${PATHS.CARS}/:markId/:modelId/:generationId`}
          component={HomePage}
        />
        <Route exact path={PATHS.ADD} component={AddAutoPage} />
        <Route exact path={PATHS.LOGIN} component={LoginPage} />
        <Route
          exact
          path={`${PATHS.SINGLE_AUTO}/:autoId`}
          component={SingleAutoPage}
        />
        <Route
          exact
          path={`${PATHS.CHAT_CLIENT}/:userId/:autoId`}
          component={ChatPage}
        />
        <Route exact path={`${PATHS.CHATS_CLIENT}`} component={ChatsPage} />
        <Route exact path={PATHS.ADMIN} component={AdminPage} />

        {/* {isAdmin && (
          <React.Fragment> */}
        <Route
          exact
          path={PATHS.ADMIN_ADD_NEW_ADMIN}
          component={AdminAddNewAdmin}
        />
        <Route exact path={PATHS.ADMIN_ADD_MARK} component={AdminAddMarkPage} />
        <Route
          exact
          path={PATHS.ADMIN_ADD_MODELS}
          component={AdminAddAutoPage}
        />
        <Route
          exact
          path={PATHS.ADMIN_ADD_GENERATION}
          component={AdminAddGenerationPage}
        />
        <Route
          exact
          path={PATHS.ADMIN_UPDATE_ADMINS}
          component={AdminUpdateAdminPage}
        />
        <Route
          exact
          path={PATHS.ADMIN_UPDATE_MARKS}
          component={AdminUpdateMarkPage}
        />
        <Route
          exact
          path={`${PATHS.ADMIN_UPDATE_MARKS}/:id`}
          component={AdminAddMarkPage}
        />

        <Route
          exact
          path={PATHS.ADMIN_UPDATE_MODELS}
          component={AdminUpdateModelPage}
        />

        <Route
          exact
          path={`${PATHS.ADMIN_UPDATE_MODELS}/:markIdCategory/:idMark/:id`}
          component={AdminAddAutoPage}
        />

        <Route
          exact
          path={PATHS.ADMIN_UPDATE_GENERATION}
          component={AdminUpdateGenerationPage}
        />

        <Route
          exact
          path={`${PATHS.ADMIN_UPDATE_GENERATION}/:markIdCategory/:idMark/:modelIdCategory/:idModel/:id`}
          component={AdminAddGenerationPage}
        />

        <Route
          exact
          path={PATHS.ADMIN_ADD_OTHER_CATEGORIES}
          component={AdminAddTypeOfBodyPage}
        />

        {/* ADMIN_UPDATE_GENERATION */}
        {/* </React.Fragment>
        )} */}

        {/* <Route path="/card/:username/:reponame" component={Card} />
      <Route path="/error" component={Error} /> */}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
