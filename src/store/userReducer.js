const AUTH = "AUTH";
const IS_ADMIN = "IS_ADMIN";
const SET_MY_ID = "SET_MY_ID";

const defaultState = {
  isAuth: false,
  isAdmin: false,
  email: "",
  myId: "",
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH: {
      return {
        ...state,
        isAuth: action.payload.isAuth,
        email: action.payload.email,
      };
    }
    case IS_ADMIN: {
      return {
        ...state,
        isAdmin: action.payload,
      };
    }
    case SET_MY_ID: {
      return {
        ...state,
        myId: action.payload,
      };
    }
    default:
      return state;
  }
};

export const authAction = (authArr) => ({
  type: AUTH,
  payload: authArr,
});

export const isAdminAction = (bool) => ({
  type: IS_ADMIN,
  payload: bool,
});

export const setMyId = (id) => ({
  type: SET_MY_ID,
  payload: id,
});
