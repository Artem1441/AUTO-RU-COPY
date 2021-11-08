const ADD_TYPE_OF_BODY_TITLE = "ADD_TYPE_OF_BODY_TITLE";
const ADD_TYPE_OF_BODY_IMAGE_URL = "ADD_TYPE_OF_BODY_IMAGE_URL";

const defaultState = {
  // typeOfBody
  typeOfBodyTitle: "",
  typeOfBodyImageUrl: "",
};

export const otherCategoriesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TYPE_OF_BODY_TITLE: {
      return {
        ...state,
        typeOfBodyTitle: action.payload,
      };
    }

    case ADD_TYPE_OF_BODY_IMAGE_URL: {
      return {
        ...state,
        typeOfBodyImageUrl: action.payload,
      };
    }

    default:
      return state;
  }
};

export const otherCategoriesAddTypeOfBodyTitleAction = (title) => ({
  type: ADD_TYPE_OF_BODY_TITLE,
  payload: title,
});

export const otherCategoriesAddTypeOfBodyImageUrlAction = (url) => ({
  type: ADD_TYPE_OF_BODY_IMAGE_URL,
  payload: url,
});
