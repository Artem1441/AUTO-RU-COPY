// get/update/delete admins
const GET_ADMINS_ARRAY = "GET_ADMINS_ARRAY";
const GET_ADMINS_ARRAY_REFRESH = "GET_ADMINS_ARRAY_REFRESH";

// get/update/delete marks
const GET_MARKS_ARRAY = "GET_MARKS_ARRAY";
const GET_MARKS_ARRAY_REFRESH = "GET_MARKS_ARRAY_REFRESH";
const GET_MARK_ID = "GET_MARK_ID";
const GET_MARK = "GET_MARK";
const GET_MARK_ID_CATEGORY = "GET_MARK_ID_CATEGORY";

// get/update/delete models
const GET_MODELS_ARRAY = "GET_MODELS_ARRAY";
const GET_MODELS_ARRAY_REFRESH = "GET_MODELS_ARRAY_REFRESH";
const GET_MODEL_ID = "GET_MODEL_ID";
const GET_MODEL = "GET_MODEL";
const GET_MODEL_ID_CATEGORY = "GET_MODEL_ID_CATEGORY";

// get/update/delete generations
const GET_GENERATIONS_ARRAY = "GET_GENERATIONS_ARRAY";
const GET_GENERATIONS_ARRAY_REFRESH = "GET_GENERATIONS_ARRAY_REFRESH";
const GET_GENERATION_ID = "GET_GENERATION_ID";
const GET_GENERATION_ID_CATEGORY = "GET_GENERATION_ID_CATEGORY";

const defaultState = {
  // get/update/delete admins
  adminsArr: [],
  // get/update/delete marks
  marksArr: [],
  markId: "",
  mark: "",
  markIdCategory: "",
  // get/update/delete models
  modelsArr: [],
  modelId: "",
  modelIdCategory: "",
  // get/update/delete generations
  generationsArr: [],
  generationId: "",
  generationIdCategory: "",
};
export const adminUpdateReducer = (state = defaultState, action) => {
  switch (action.type) {
    // get/update/delete admins
    case GET_ADMINS_ARRAY: {
      return {
        ...state,
        adminsArr: [...state.adminsArr, action.payload],
      };
    }

    case GET_ADMINS_ARRAY_REFRESH: {
      return {
        ...state,
        adminsArr: [],
      };
    }

    // get/update/delete marks

    case GET_MARKS_ARRAY: {
      return {
        ...state,
        marksArr: [...state.marksArr, action.payload],
      };
    }

    case GET_MARKS_ARRAY_REFRESH: {
      return {
        ...state,
        marksArr: [],
      };
    }

    case GET_MARK_ID: {
      return {
        ...state,
        markId: action.payload,
      };
    }

    case GET_MARK: {
      return {
        ...state,
        mark: action.payload,
      };
    }

    case GET_MARK_ID_CATEGORY: {
      return {
        ...state,
        markIdCategory: action.payload,
      };
    }
    // get/update/delete models

    case GET_MODELS_ARRAY: {
      return {
        ...state,
        modelsArr: [...state.modelsArr, action.payload],
      };
    }

    case GET_MODELS_ARRAY_REFRESH: {
      return {
        ...state,
        modelsArr: [],
      };
    }

    case GET_MODEL_ID: {
      return {
        ...state,
        modelId: action.payload,
      };
    }

    case GET_MODEL: {
      return {
        ...state,
        model: action.payload,
      };
    }

    case GET_MODEL_ID_CATEGORY: {
      return {
        ...state,
        modelIdCategory: action.payload,
      };
    }

    // get/update/delete generation

    case GET_GENERATIONS_ARRAY: {
      return {
        ...state,
        generationsArr: [...state.generationsArr, action.payload],
      };
    }

    case GET_GENERATIONS_ARRAY_REFRESH: {
      return {
        ...state,
        generationsArr: [],
      };
    }

    case GET_GENERATION_ID: {
      return {
        ...state,
        generationId: action.payload,
      };
    }

    case GET_GENERATION_ID_CATEGORY: {
      return {
        ...state,
        generationIdCategory: action.payload,
      };
    }

    default:
      return state;
  }
};

// get/update/delete admins
export const getAdminsArrayAction = (arr) => ({
  type: GET_ADMINS_ARRAY,
  payload: arr,
});

export const getAdminsArrayRefreshAction = () => ({
  type: GET_ADMINS_ARRAY_REFRESH,
});

// get/update/delete marks
export const getMarksArrayAction = (arr) => ({
  type: GET_MARKS_ARRAY,
  payload: arr,
});

export const getMarksArrayRefreshAction = () => ({
  type: GET_MARKS_ARRAY_REFRESH,
});

export const getMarkIdAction = (id) => ({
  type: GET_MARK_ID,
  payload: id,
});

export const getMarkAction = (mark) => ({
  type: GET_MARK,
  payload: mark,
});

export const getMarkIdCategoryAction = (id) => ({
  type: GET_MARK_ID_CATEGORY,
  payload: id,
});

// get/update/delete models
export const getModelsArrayAction = (arr) => ({
  type: GET_MODELS_ARRAY,
  payload: arr,
});

export const getModelsArrayRefreshAction = () => ({
  type: GET_MODELS_ARRAY_REFRESH,
});

export const getModelIdAction = (id) => ({
  type: GET_MODEL_ID,
  payload: id,
});

export const getModelAction = (mark) => ({
  type: GET_MODEL,
  payload: mark,
});

export const getModelIdCategoryAction = (id) => ({
  type: GET_MODEL_ID_CATEGORY,
  payload: id,
});

// get/update/delete generation
export const getGenerationsArrayAction = (arr) => ({
  type: GET_GENERATIONS_ARRAY,
  payload: arr,
});

export const getGenerationsArrayRefreshAction = () => ({
  type: GET_GENERATIONS_ARRAY_REFRESH,
});

export const getGenerationIdAction = (id) => ({
  type: GET_GENERATION_ID,
  payload: id,
});

export const getGenerationIdCategoryAction = (id) => ({
  type: GET_GENERATION_ID_CATEGORY,
  payload: id,
});
