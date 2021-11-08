// addNewAdmin
const ADD_NEW_ADMIN_EMAIL = "ADD_NEW_ADMIN_EMAIL";
const ADD_NEW_ADMIN_PASSWORD = "ADD_NEW_ADMIN_PASSWORD";

// addMark
const ADD_MARK_TITLE = "ADD_MARK_TITLE";
const ADD_MARK_TRANSLITERATION = "ADD_MARK_TRANSLITERATION";
const ADD_MARK_IMAGE_URL = "ADD_MARK_IMAGE_URL";
const ADD_MARK_COUNTRY = "ADD_MARK_COUNTRY";
const ADD_MARK_DESCRIPTION = "ADD_MARK_DESCRIPTION";

// addAuto
const ADD_AUTO_MODELS_ID_CATEGORY = "ADD_AUTO_MODELS_ID_CATEGORY";
const ADD_AUTO_MARK_ARR = "ADD_AUTO_MARK_ARR";
const ADD_AUTO_MARK = "ADD_AUTO_MARK";
const ADD_AUTO_MARK_ARR_REFRESH = "ADD_AUTO_MARK_ARR_REFRESH";
const ADD_AUTO_TITLE = "ADD_AUTO_TITLE";
const ADD_AUTO_TRANSLITERATION = "ADD_AUTO_TRANSLITERATION";
const ADD_AUTO_IMAGE_URL = "ADD_AUTO_IMAGE_URL";
const ADD_AUTO_DESCRIPTION = "ADD_AUTO_DESCRIPTION";

// addGeneration
const ADD_GENERATION_OF_MODEL_ID_CATEGORY =
  "ADD_GENERATION_OF_MODEL_ID_CATEGORY";
const ADD_GENERATION_OF_MODEL_ID_CATEGORY_MODEL =
  "ADD_GENERATION_OF_MODEL_ID_CATEGORY_MODEL";
const ADD_GENERATION_MARK_ARR = "ADD_GENERATION_MARK_ARR";
const ADD_GENERATION_MARK = "ADD_GENERATION_MARK";
const ADD_GENERATION_MARK_ARR_REFRESH = "ADD_GENERATION_MARK_ARR_REFRESH";
const ADD_MODELS_ARR = "ADD_MODELS_ARR";
const ADD_MODEL = "ADD_MODEL";
const ADD_MODEL_ARR_REFRESH = "ADD_MODEL_ARR_REFRESH";
const ADD_GENERATION_OF_MODEL_TITLE = "ADD_GENERATION_OF_MODEL_TITLE";
const ADD_GENERATION_TRANSLITERATION = "ADD_GENERATION_TRANSLITERATION";
const ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_FROM_DB =
  "ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_FROM_DB";
const ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_IDS =
  "ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_IDS";
const ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_IDS_FILTER =
  "ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_IDS_FILTER";
const ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_FROM_DB_REFRESH =
  "ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_FROM_DB_REFRESH";
const ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_IDS_REFRESH =
  "ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_IDS_REFRESH";
const ADD_GENERATION_OF_MODEL_IMAGE_URL = "ADD_GENERATION_OF_MODEL_IMAGE_URL";
const ADD_GENERATION_OF_MODEL_START_DATE = "ADD_GENERATION_OF_MODEL_START_DATE";
const ADD_GENERATION_OF_MODEL_END_DATE = "ADD_GENERATION_OF_MODEL_END_DATE";
const ADD_GENERATION_OF_MODEL_DESCRIPTION =
  "ADD_GENERATION_OF_MODEL_DESCRIPTION";

const defaultState = {
  // addNewAdmin
  addNewAdminAdmin: {
    email: "",
    password: "",
  },
  // addMark
  addMarkAdmin: {
    title: "",
    transliteration: "",
    imageUrl: "",
    country: "",
    description: "",
  },

  // addAuto
  addAutoAdmin: {
    autoModelsIdCategory: "",
    markArr: [],
    mark: "",
    markId: "",
    title: "",
    transliteration: "",
    imageUrl: "",
    description: "",
  },

  //addGeneration
  addGenerationOfModel: {
    autoGeneationsIdCategory: "",
    autoGenerationsIdModelCategory: "",
    markArr: [],
    mark: "",
    markId: "",
    modelsArr: [],
    model: "",
    modelId: "",
    title: "",
    transliteration: "",
    typeOfBodyArrFromDB: [],
    typeOfBodyArrIDS: [],
    startYear: "",
    endYear: "",
    imageUrl: "",
    description: "",
  },
};

export const adminReducer = (state = defaultState, action) => {
  switch (action.type) {
    // addNewAdmin
    case ADD_NEW_ADMIN_EMAIL: {
      return {
        ...state,
        addNewAdminAdmin: { ...state.addNewAdminAdmin, email: action.payload },
      };
    }

    case ADD_NEW_ADMIN_PASSWORD: {
      return {
        ...state,
        addNewAdminAdmin: {
          ...state.addNewAdminAdmin,
          password: action.payload,
        },
      };
    }

    // addMark
    case ADD_MARK_TITLE: {
      return {
        ...state,
        addMarkAdmin: { ...state.addMarkAdmin, title: action.payload },
      };
    }
    case ADD_MARK_TRANSLITERATION: {
      return {
        ...state,
        addMarkAdmin: {
          ...state.addMarkAdmin,
          transliteration: action.payload,
        },
      };
    }
    case ADD_MARK_IMAGE_URL: {
      return {
        ...state,
        addMarkAdmin: { ...state.addMarkAdmin, imageUrl: action.payload },
      };
    }
    case ADD_MARK_COUNTRY: {
      return {
        ...state,
        addMarkAdmin: { ...state.addMarkAdmin, country: action.payload },
      };
    }
    case ADD_MARK_DESCRIPTION: {
      return {
        ...state,
        addMarkAdmin: { ...state.addMarkAdmin, description: action.payload },
      };
    }

    // addAuto
    case ADD_AUTO_MODELS_ID_CATEGORY: {
      return {
        ...state,
        addAutoAdmin: {
          ...state.addAutoAdmin,
          autoModelsIdCategory: action.payload,
        },
      };
    }
    case ADD_AUTO_MARK_ARR_REFRESH: {
      return {
        ...state,
        addAutoAdmin: {
          ...state.addAutoAdmin,
          markArr: [],
        },
      };
    }
    case ADD_AUTO_MARK_ARR: {
      return {
        ...state,
        addAutoAdmin: {
          ...state.addAutoAdmin,
          markArr: [...state.addAutoAdmin.markArr, action.payload],
        },
      };
    }
    case ADD_AUTO_MARK: {
      return {
        ...state,
        addAutoAdmin: {
          ...state.addAutoAdmin,
          mark: action.payload.mark,
          markId: action.payload.markId,
        },
      };
    }
    case ADD_AUTO_TITLE: {
      return {
        ...state,
        addAutoAdmin: { ...state.addAutoAdmin, title: action.payload },
      };
    }
    case ADD_AUTO_TRANSLITERATION: {
      return {
        ...state,
        addAutoAdmin: {
          ...state.addAutoAdmin,
          transliteration: action.payload,
        },
      };
    }

    case ADD_AUTO_IMAGE_URL: {
      return {
        ...state,
        addAutoAdmin: { ...state.addAutoAdmin, imageUrl: action.payload },
      };
    }
    case ADD_AUTO_DESCRIPTION: {
      return {
        ...state,
        addAutoAdmin: { ...state.addAutoAdmin, description: action.payload },
      };
    }

    // addGeneration
    case ADD_GENERATION_OF_MODEL_ID_CATEGORY: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          autoGeneationsIdCategory: action.payload,
        },
      };
    }
    case ADD_GENERATION_OF_MODEL_ID_CATEGORY_MODEL: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          autoGenerationsIdModelCategory: action.payload,
        },
      };
    }

    case ADD_GENERATION_MARK_ARR_REFRESH: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          markArr: [],
        },
      };
    }
    case ADD_GENERATION_MARK_ARR: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          markArr: [...state.addGenerationOfModel.markArr, action.payload],
        },
      };
    }
    case ADD_GENERATION_MARK: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          mark: action.payload.mark,
          markId: action.payload.markId,
        },
      };
    }

    case ADD_MODEL_ARR_REFRESH: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          modelsArr: [],
        },
      };
    }

    case ADD_MODELS_ARR: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          modelsArr: [...state.addGenerationOfModel.modelsArr, action.payload],
        },
      };
    }

    case ADD_MODEL: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          model: action.payload.model,
          modelId: action.payload.modelId,
        },
      };
    }

    case ADD_GENERATION_OF_MODEL_TITLE: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          title: action.payload,
        },
      };
    }

    case ADD_GENERATION_TRANSLITERATION: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          transliteration: action.payload,
        },
      };
    }

    case ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_FROM_DB: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          typeOfBodyArrFromDB: [
            ...state.addGenerationOfModel.typeOfBodyArrFromDB,
            action.payload,
          ],
        },
      };
    }

    case ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_IDS: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          typeOfBodyArrIDS: [
            ...state.addGenerationOfModel.typeOfBodyArrIDS,
            action.payload,
          ],
        },
      };
    }

    case ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_IDS_FILTER: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          typeOfBodyArrIDS: state.addGenerationOfModel.typeOfBodyArrIDS.filter(
            (typeOfBody) => typeOfBody !== action.payload
          ),
        },
      };
    }

    case ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_FROM_DB_REFRESH: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          typeOfBodyArrFromDB: [],
        },
      };
    }

    case ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_IDS_REFRESH: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          typeOfBodyArrIDS: [],
        },
      };
    }

    case ADD_GENERATION_OF_MODEL_IMAGE_URL: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          imageUrl: action.payload,
        },
      };
    }

    case ADD_GENERATION_OF_MODEL_START_DATE: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          startYear: action.payload,
        },
      };
    }

    case ADD_GENERATION_OF_MODEL_END_DATE: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          endYear: action.payload,
        },
      };
    }

    case ADD_GENERATION_OF_MODEL_DESCRIPTION: {
      return {
        ...state,
        addGenerationOfModel: {
          ...state.addGenerationOfModel,
          description: action.payload,
        },
      };
    }

    default:
      return state;
  }
};
// addNewAdmin
export const addNewAdminAction = (email) => ({
  type: ADD_NEW_ADMIN_EMAIL,
  payload: email,
});

export const addNewAdminPasswordAction = (password) => ({
  type: ADD_NEW_ADMIN_PASSWORD,
  payload: password,
});

// addMark
export const addMarkTitleAction = (title) => ({
  type: ADD_MARK_TITLE,
  payload: title,
});

export const addMarkTransliterationAction = (transliteration) => ({
  type: ADD_MARK_TRANSLITERATION,
  payload: transliteration,
});

export const addMarkImageUrlAction = (url) => ({
  type: ADD_MARK_IMAGE_URL,
  payload: url,
});

export const addMarkCountryAction = (country) => ({
  type: ADD_MARK_COUNTRY,
  payload: country,
});

export const addMarkDescriptionAction = (description) => ({
  type: ADD_MARK_DESCRIPTION,
  payload: description,
});

// addAuto

export const addAutoModelsIdCategoryAction = (id) => ({
  type: ADD_AUTO_MODELS_ID_CATEGORY,
  payload: id,
});

export const addAutoMarkArrayRefreshAction = () => ({
  type: ADD_AUTO_MARK_ARR_REFRESH,
});

export const addAutoMarkArrayAction = (arr) => ({
  type: ADD_AUTO_MARK_ARR,
  payload: arr,
});

export const addAutoMarkAndIdAction = (arr) => ({
  type: ADD_AUTO_MARK,
  payload: arr,
});

export const addAutoTitleAction = (title) => ({
  type: ADD_AUTO_TITLE,
  payload: title,
});

export const addAutoTransliterationAction = (transliteration) => ({
  type: ADD_AUTO_TRANSLITERATION,
  payload: transliteration,
});

export const addAutoImageUrlAction = (url) => ({
  type: ADD_AUTO_IMAGE_URL,
  payload: url,
});

export const addAutoDescriptionAction = (description) => ({
  type: ADD_AUTO_DESCRIPTION,
  payload: description,
});

// addGeneration

export const addGenerationIdCategoryAction = (id) => ({
  type: ADD_GENERATION_OF_MODEL_ID_CATEGORY,
  payload: id,
});

export const addGenerationIdModelCategoryAction = (id) => ({
  type: ADD_GENERATION_OF_MODEL_ID_CATEGORY_MODEL,
  payload: id,
});

export const addGenerationMarkArrayAction = (arr) => ({
  type: ADD_GENERATION_MARK_ARR,
  payload: arr,
});

export const addGenerationMarkAndIdAction = (arr) => ({
  type: ADD_GENERATION_MARK,
  payload: arr,
});

export const addGenerationMarkArrayRefreshAction = () => ({
  type: ADD_GENERATION_MARK_ARR_REFRESH,
});

export const addGenerationModelsArrAction = (arr) => ({
  type: ADD_MODELS_ARR,
  payload: arr,
});

export const addGenerationModelAndIdAction = (arr) => ({
  type: ADD_MODEL,
  payload: arr,
});

export const addGenerationModelsArrayRefreshAction = () => ({
  type: ADD_MODEL_ARR_REFRESH,
});

export const addGenerationTitleAction = (title) => ({
  type: ADD_GENERATION_OF_MODEL_TITLE,
  payload: title,
});

export const addGenerationTransliterationAction = (transliteration) => ({
  type: ADD_GENERATION_TRANSLITERATION,
  payload: transliteration,
});

//

export const addGenerationTypeOfBodyArrFromDBAction = (arr) => ({
  type: ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_FROM_DB,
  payload: arr,
});

export const addGenerationTypeOfBodyArrIDSAction = (id) => ({
  type: ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_IDS,
  payload: id,
});

export const addGenerationTypeOfBodyArrIDSFilterAction = (id) => ({
  type: ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_IDS_FILTER,
  payload: id,
});

export const addGenerationTypeOfBodyArrFromDBRefreshAction = () => ({
  type: ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_FROM_DB_REFRESH,
});

export const addGenerationTypeOfBodyArrIDSRefreshAction = () => ({
  type: ADD_GENERATION_OF_MODEL_TYPE_OF_BODY_ARR_IDS_REFRESH,
});

//

export const addGenerationImageUrlAction = (description) => ({
  type: ADD_GENERATION_OF_MODEL_IMAGE_URL,
  payload: description,
});

export const addGenerationStartDateAction = (date) => ({
  type: ADD_GENERATION_OF_MODEL_START_DATE,
  payload: date,
});

export const addGenerationEndDateAction = (date) => ({
  type: ADD_GENERATION_OF_MODEL_END_DATE,
  payload: date,
});

export const addGenerationDescriptionAction = (description) => ({
  type: ADD_GENERATION_OF_MODEL_DESCRIPTION,
  payload: description,
});
