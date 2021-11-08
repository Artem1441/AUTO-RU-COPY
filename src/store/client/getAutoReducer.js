import { STYLES } from "./../../utils/styles";

const GET_ALL_CARS_FROM_DB = "GET_ALL_CARS_FROM_DB";
const GET_ALL_CARS_FROM_DB_REFRESH = "GET_ALL_CARS_FROM_DB_REFRESH";
// const SET_START_AFTER = "SET_START_AFTER";
const SET_PARAMS = "SET_PARAMS";
const SET_COUNT_ID = "SET_COUNT_ID"

const defaultState = {
  autoArr: [],
  // startAfter: STYLES.DEDUCTIBLE_ID,
  params: [],
  countAutoId: 0,
};

export const getAutoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ALL_CARS_FROM_DB: {
      return {
        ...state,
        autoArr: [...state.autoArr, action.payload],
      };
    }

    case GET_ALL_CARS_FROM_DB_REFRESH: {
      return {
        ...state,
        autoArr: [],
      };
    }

    // case SET_START_AFTER: {
    //   return {
    //     ...state,
    //     startAfter:
    //       action.payload === null ? state.startAfter + STYLES.DEFAULT_LIMIT : 0,
    //   };
    // }

    case SET_PARAMS: {
      return {
        ...state,
        params: action.payload,
      };
    }

    case SET_COUNT_ID: {
      return {
        ...state,
        countAutoId: action.payload
      }
    }

    default:
      return state;
  }
};

export const getAllCarsFromDBAction = (elem) => ({
  type: GET_ALL_CARS_FROM_DB,
  payload: elem,
});

export const getAllCarsFromDBRefreshAction = () => ({
  type: GET_ALL_CARS_FROM_DB_REFRESH,
});

// export const setStartAfterAction = (bool = null) => ({
//   type: SET_START_AFTER,
//   payload: bool,
// });

export const setParamsAction = (arr) => ({
  type: SET_PARAMS,
  payload: arr,
});

export const setCountAutoIdAction = (number) => ({
  type: SET_COUNT_ID,
  payload: number,

})
