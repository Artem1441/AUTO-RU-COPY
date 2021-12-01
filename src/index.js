import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { store } from "./store/index";
import { Provider } from "react-redux";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyCTlW3U20QDWa61qNAFktWVIvbyrPGn9Zw",
  authDomain: "testrealtimedb-9047b.firebaseapp.com",
  projectId: "testrealtimedb-9047b",
  storageBucket: "testrealtimedb-9047b.appspot.com",
  messagingSenderId: "978536752564",
  appId: "1:978536752564:web:e5ad18c91809065f3afee1",
});

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();
export const storage = firebase.storage();

ReactDOM.render(
  <Provider store={store}>
    <Context.Provider
      value={{
        auth,
        firestore,
      }}
    >
      <App />
    </Context.Provider>
  </Provider>,
  document.getElementById("root")
);
