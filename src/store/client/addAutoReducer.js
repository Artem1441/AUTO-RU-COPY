const GET_MARK_AND_MARK_ID = "GET_MARK_AND_MARK_ID";
const GET_MODEL_AND_MODEL_ID = "GET_MODEL_AND_MODEL_ID";
const GET_GENERATION_AND_GENERATION_ID = "GET_GENERATION_AND_GENERATION_ID";
//
const GET_MARK_ARR = "GET_MARK_ARR";
const GET_MODEL_COLLECTION = "GET_MODEL_COLLECTION";
const GET_MODEL_ARR = "GET_MODEL_ARR";
const GET_GENERATION_COLLECTION = "GET_GENERATION_COLLECTION";
const GET_GENERATION_ARR = "GET_GENERATION_ARR";
const GET_MARK_ARR_REFRESH = "GET_MARK_ARR_REFRESH";
const GET_MODEL_ARR_REFRESH = "GET_MODEL_ARR_REFRESH";
const GET_GENERATION_ARR_REFRESH = "GET_GENERATION_ARR_REFRESH";
//
const GET_IMAGES_ARR = "GET_IMAGES_ARR";
const GET_IMAGES_ARR_REFRESH = "GET_IMAGES_ARR_REFRESH";
const FILTER_IMAGES_ARR = "FILTER_IMAGES_ARR";
const GET_DEFAULT_IMAGE = "GET_DEFAULT_IMAGE";
//
const GET_TYPE_OF_BODY = "GET_TYPE_OF_BODY";
const GET_TYPE_OF_BODY_ARR_FROM_DB = "GET_TYPE_OF_BODY_ARR_FROM_DB";
const GET_TYPE_OF_BODY_ARR_FROM_DB_REFRESH =
  "GET_TYPE_OF_BODY_ARR_FROM_DB_REFRESH";
//
const GET_DRIVE_UNIT = "GET_DRIVE_UNIT";
//
const GET_TRANSMISSION = "GET_TRANSMISSION";
//
const GET_MOTOR = "GET_MOTOR";
//
const GET_YEAR = "GET_YEAR";
//
const GET_POWER = "GET_POWER";
//
const GET_MILEAGE = "GET_MILEAGE";
//
const GET_DESCR = "GET_DESCR";
//
const GET_AUTO_PRICE = "GET_AUTO_PRICE";

const defaultState = {
  markArr: [],
  markId: "",
  mark: "",
  //
  modelCollection: "",
  modelArr: [],
  modelId: "",
  model: "",
  //
  generationCollection: "",
  generationArr: [],
  generationId: "",
  generation: "",
  //
  imagesArr: [],
  defaultImage: "",
  //
  typeOfBodyArrFromDB: [],
  typeOfBody: "",
  //
  driveUnit: "",
  //
  transmission: "",
  //
  motor: "",
  //
  year: "",
  //
  power: "",
  //
  mileage: "",
  //
  descr: "",
  //
  autoPrice: "",
};

export const addAutoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_MARK_AND_MARK_ID: {
      return {
        ...state,
        markId: action.payload.markId,
        mark: action.payload.mark,
      };
    }

    case GET_MODEL_AND_MODEL_ID: {
      return {
        ...state,
        modelId: action.payload.modelId,
        model: action.payload.model,
      };
    }

    case GET_GENERATION_AND_GENERATION_ID: {
      return {
        ...state,
        generationId: action.payload.generationId,
        generation: action.payload.generation,
      };
    }

    //

    case GET_MARK_ARR: {
      return {
        ...state,
        markArr: [...state.markArr, action.payload],
      };
    }
    case GET_MODEL_ARR: {
      return {
        ...state,
        modelArr: [...state.modelArr, action.payload],
      };
    }
    case GET_MODEL_COLLECTION: {
      return {
        ...state,
        modelCollection: action.payload,
      };
    }
    case GET_GENERATION_ARR: {
      return {
        ...state,
        generationArr: [...state.generationArr, action.payload],
      };
    }
    case GET_GENERATION_COLLECTION: {
      return {
        ...state,
        generationCollection: action.payload,
      };
    }

    case GET_MARK_ARR_REFRESH: {
      return {
        ...state,
        markArr: [],
      };
    }
    case GET_MODEL_ARR_REFRESH: {
      return {
        ...state,
        modelArr: [],
      };
    }
    case GET_GENERATION_ARR_REFRESH: {
      return {
        ...state,
        generationArr: [],
      };
    }

    //

    case GET_IMAGES_ARR: {
      return {
        ...state,
        imagesArr: [...state.imagesArr, action.payload],
      };
    }

    case GET_IMAGES_ARR_REFRESH: {
      return {
        ...state,
        imagesArr: [],
      };
    }

    case FILTER_IMAGES_ARR: {
      return {
        ...state,
        imagesArr: [...state.imagesArr.filter((url) => url !== action.payload)],
      };
    }

    case GET_DEFAULT_IMAGE: {
      return {
        ...state,
        defaultImage: action.payload,
      };
    }

    case GET_TYPE_OF_BODY: {
      return {
        ...state,
        typeOfBody: action.payload,
      };
    }

    case GET_TYPE_OF_BODY_ARR_FROM_DB: {
      return {
        ...state,
        typeOfBodyArrFromDB: [...state.typeOfBodyArrFromDB, action.payload],
      };
    }

    case GET_TYPE_OF_BODY_ARR_FROM_DB_REFRESH: {
      return {
        ...state,
        typeOfBodyArrFromDB: [],
      };
    }
    //

    case GET_DRIVE_UNIT: {
      return {
        ...state,
        driveUnit: action.payload,
      };
    }
    //

    case GET_TRANSMISSION: {
      return {
        ...state,
        transmission: action.payload,
      };
    }
    //

    case GET_MOTOR: {
      return {
        ...state,
        motor: action.payload,
      };
    }
    //

    case GET_YEAR: {
      return {
        ...state,
        year: action.payload,
      };
    }

    case GET_POWER: {
      return {
        ...state,
        power: action.payload,
      };
    }

    case GET_MILEAGE: {
      return {
        ...state,
        mileage: action.payload,
      };
    }

    case GET_DESCR: {
      return {
        ...state,
        descr: action.payload,
      };
    }

    case GET_AUTO_PRICE: {
      return {
        ...state,
        autoPrice: action.payload,
      };
    }

    default:
      return state;
  }
};

//
//
//

export const clientGetMarkAndMarkIdAction = (arr) => ({
  type: GET_MARK_AND_MARK_ID,
  payload: arr,
});
export const clientGetModelAndModelIdAction = (arr) => ({
  type: GET_MODEL_AND_MODEL_ID,
  payload: arr,
});
export const clientGetGenerationAndGenerationIdAction = (arr) => ({
  type: GET_GENERATION_AND_GENERATION_ID,
  payload: arr,
});

//

export const clientGetMarkArrAction = (arr) => ({
  type: GET_MARK_ARR,
  payload: arr,
});
export const clientGetModelArrAction = (arr) => ({
  type: GET_MODEL_ARR,
  payload: arr,
});
export const clientGetModelCollectionAction = (id) => ({
  type: GET_MODEL_COLLECTION,
  payload: id,
});
export const clientGetGenerationAction = (arr) => ({
  type: GET_GENERATION_ARR,
  payload: arr,
});
export const clientGetGenerationCollectionAction = (id) => ({
  type: GET_GENERATION_COLLECTION,
  payload: id,
});
export const clientGetMarkArrRefreshAction = () => ({
  type: GET_MARK_ARR_REFRESH,
});
export const clientGetModelRefreshArrAction = () => ({
  type: GET_MODEL_ARR_REFRESH,
});
export const clientGetGenerationRefreshAction = () => ({
  type: GET_GENERATION_ARR_REFRESH,
});

//

export const clientGetImagesArrAction = (url) => ({
  type: GET_IMAGES_ARR,
  payload: url,
});

export const clientGetImagesArrRefreshAction = () => ({
  type: GET_IMAGES_ARR_REFRESH,
});

export const clientFilterImagesArrAction = (url) => ({
  type: FILTER_IMAGES_ARR,
  payload: url,
});

export const clientGetDefaultImageAction = (url) => ({
  type: GET_DEFAULT_IMAGE,
  payload: url,
});

//

export const clientGetTypeOfBodyAction = (id) => ({
  type: GET_TYPE_OF_BODY,
  payload: id,
});

export const clientGetTypeOfBodyArrFromDBAction = (arr) => ({
  type: GET_TYPE_OF_BODY_ARR_FROM_DB,
  payload: arr,
});

export const clientGetTypeOfBodyArrFromDBRefreshAction = () => ({
  type: GET_TYPE_OF_BODY_ARR_FROM_DB_REFRESH,
});

//

export const clientGetDriveUnitAction = (str) => ({
  type: GET_DRIVE_UNIT,
  payload: str,
});

//

export const clientGetTransmissionAction = (str) => ({
  type: GET_TRANSMISSION,
  payload: str,
});

//

export const clientGetMotorAction = (str) => ({
  type: GET_MOTOR,
  payload: str,
});

//

export const clientGetTypeOfBodyDateAction = (year) => ({
  type: GET_YEAR,
  payload: year,
});

//

export const clientGetPowerOfAutoAction = (power) => ({
  type: GET_POWER,
  payload: power,
});

//

export const clientGetMilageAction = (milage) => ({
  type: GET_MILEAGE,
  payload: milage,
});

//

export const clientGetDescrAction = (descr) => ({
  type: GET_DESCR,
  payload: descr,
});

export const clientGetAutoPriceAction = (price) => ({
  type: GET_AUTO_PRICE,
  payload: price,
});
