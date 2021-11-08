import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ReadAllInFirebase,
  ReadAllInFirebaseWithThreeQueriesV2,
  ReadAllInFirebaseWithTwoQueriesV2,
} from "../../firebase/crudAdmin";
import {
  clientGetGenerationAction,
  clientGetGenerationRefreshAction,
  clientGetMarkAndMarkIdAction,
  clientGetMarkArrRefreshAction,
  clientGetModelAndModelIdAction,
  clientGetModelArrAction,
  clientGetGenerationAndGenerationIdAction,
  clientGetImagesArrAction,
  clientGetTypeOfBodyAction,
  clientGetTypeOfBodyArrFromDBRefreshAction,
  clientGetTypeOfBodyArrFromDBAction,
  clientGetTypeOfBodyDateAction,
  clientGetPowerOfAutoAction,
  clientGetMilageAction,
  clientGetDescrAction,
  clientGetAutoPriceAction,
  clientGetDefaultImageAction,
  clientGetGenerationCollectionAction,
  clientGetModelCollectionAction,
  clientGetDriveUnitAction,
  clientGetTransmissionAction,
  clientGetMotorAction,
} from "../../store/client/addAutoReducer";
import { AppGeneration } from "../UI/generation/AppGeneration";
import { AppLoader } from "../UI/loader/AppLoader";
import { AppTitle } from "../UI/titles/AppTitle";
import { AppMark } from "./../UI/mark/AppMark";
import { AppModel } from "./../UI/model/AppModel";
import { MultiplyImageUpload } from "./../../firebase/uploadMultiplyImages";
import {
  clientGetMarkArrAction,
  clientGetModelRefreshArrAction,
} from "./../../store/client/addAutoReducer";
import "./addAuto.css";
import Slider from "./../slider/Slider";
import { AppTypeOfBody } from "./../UI/typeOfBody/AppTypeOfBody";
import { AppDate } from "./../UI/date/AppDate";
import { AppInput } from "./../UI/input/AppInput";
import { AppTextarea } from "./../UI/textarea/AppTextarea";
import { AppText } from "../UI/text/AppText";
import { AppSelectOption } from "./../UI/select-option/AppSelectOption";

export const ClientGetMarkAndMarkId = () => {
  const dispatch = useDispatch();
  const markArr = useSelector((state) => state.clientAddAuto.markArr);
  const markId = useSelector((state) => state.clientAddAuto.markId);

  useEffect(() => {
    dispatch(clientGetMarkArrRefreshAction());
    ReadAllInFirebase("Marks")
      .then((data) => {
        data.forEach((dataItem) => {
          dispatch(
            clientGetMarkArrAction({ ...dataItem.data(), _id: dataItem.id })
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setCurrentMark = (markId, mark) => {
    dispatch(clientGetMarkAndMarkIdAction({ markId, mark }));
  };

  return (
    <div className="add_auto">
      <AppTitle>Выберите марку</AppTitle>

      <div className="add_auto_marks">
        {markArr.length > 0 ? (
          markArr.map((mark, index) => {
            return (
              <AppMark
                key={index}
                mark={mark}
                setCurrentMark={setCurrentMark}
                current={mark._id === markId}
              />
            );
          })
        ) : (
          <AppLoader />
        )}
      </div>
    </div>
  );
};

export const ClientGetModelAndModelId = () => {
  const dispatch = useDispatch();
  const modelArr = useSelector((state) => state.clientAddAuto.modelArr);
  const markId = useSelector((state) => state.clientAddAuto.markId);
  const modelId = useSelector((state) => state.clientAddAuto.modelId);

  useEffect(() => {
    dispatch(clientGetModelRefreshArrAction());

    ReadAllInFirebaseWithTwoQueriesV2("AutoModels", "MarkId", markId)
      .then((data) => {
        data.forEach((dataItem) => {
          dispatch(
            clientGetModelArrAction({ ...dataItem.data(), _id: dataItem.id })
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setCurrentModel = (modelId, model, modelCollection) => {
    dispatch(clientGetModelAndModelIdAction({ modelId, model }));
    dispatch(clientGetModelCollectionAction(modelCollection));
  };

  return (
    <div className="add_auto">
      <AppTitle>Выберите модель</AppTitle>

      <div className="add_auto_marks">
        {modelArr.length > 0 ? (
          modelArr.map((model, index) => {
            return (
              <AppModel
                key={index}
                model={model}
                setCurrentModel={setCurrentModel}
                current={model._id === modelId}
                // getSelfId={true}
              />
            );
          })
        ) : (
          <AppLoader />
        )}
      </div>
    </div>
  );
};

export const ClientGetGenerationAndGenerationId = () => {
  const dispatch = useDispatch();
  const generationArr = useSelector(
    (state) => state.clientAddAuto.generationArr
  );
  const markId = useSelector((state) => state.clientAddAuto.markId);
  // const modelId = useSelector((state) => state.clientAddAuto.modelId);
  const modelCollection = useSelector(
    (state) => state.clientAddAuto.modelCollection
  );
  const generationId = useSelector((state) => state.clientAddAuto.generationId);

  useEffect(() => {
    dispatch(clientGetGenerationRefreshAction());

    ReadAllInFirebaseWithThreeQueriesV2(
      "AutoModels",
      "MarkId",
      markId,
      "AutoModelId",
      modelCollection
    )
      .then((data) => {
        data.forEach((dataItem) => {
          dispatch(
            clientGetGenerationAction({ ...dataItem.data(), _id: dataItem.id })
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setCurrentGeneration = (
    generationId,
    generation,
    img,
    generationCollection
  ) => {
    dispatch(
      clientGetGenerationAndGenerationIdAction({ generationId, generation })
    );
    dispatch(clientGetGenerationCollectionAction(generationCollection));
    dispatch(clientGetDefaultImageAction(img));
  };

  return (
    <div className="add_auto">
      <AppTitle>Выберите поколение вашего автомобиля</AppTitle>

      <div className="add_auto_marks">
        {generationArr.length > 0 ? (
          generationArr.map((generation, index) => {
            return (
              <AppGeneration
                key={index}
                generation={generation}
                setCurrentGeneration={setCurrentGeneration}
                current={generation._id === generationId}
                getSelfId={false}
              />
            );
          })
        ) : (
          <AppLoader />
        )}
      </div>
    </div>
  );
};

export const ClientGetTypeOfBody = () => {
  const dispatch = useDispatch();
  const generationArr = useSelector(
    (state) => state.clientAddAuto.generationArr
  );
  const typeOfBodyArrFromDB = useSelector(
    (state) => state.clientAddAuto.typeOfBodyArrFromDB
  );
  const typeOfBody = useSelector((state) => state.clientAddAuto.typeOfBody);

  useEffect(() => {
    dispatch(clientGetTypeOfBodyArrFromDBRefreshAction());
    ReadAllInFirebase("TypeOfBody")
      .then((data) => {
        data.forEach((dataItem) => {
          dispatch(
            clientGetTypeOfBodyArrFromDBAction({
              ...dataItem.data(),
              _id: dataItem.id,
            })
          );
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const setCurrentTypeOfBody = (id) => {
    dispatch(clientGetTypeOfBodyAction(id));
  };

  return (
    <div className="add_auto">
      <AppTitle>Выберите тип кузова авто</AppTitle>
      <div className="add_auto_marks">
        {typeOfBodyArrFromDB.length > 0 ? (
          typeOfBodyArrFromDB.map((type, index) => {
            if (
              JSON.parse(generationArr[0].GenerationTypeOfBody).includes(
                type._id
              )
            ) {
              return (
                <AppTypeOfBody
                  key={index}
                  typeOfBody={type}
                  setCurrentTypeOfBody={setCurrentTypeOfBody}
                  current={typeOfBody === type._id}
                />
              );
            }
          })
        ) : (
          <AppLoader />
        )}
      </div>
    </div>
  );
};

export const ClientGetDriveUnit = () => {
  const driveUnit = useSelector((state) => state.clientAddAuto.driveUnit);
  const typeOfDriveUnit = ["Полный", "Задний", "Передний"];

  return (
    <div className="add_auto">
      <AppTitle>Выберите привод автомобиля</AppTitle>

      <AppSelectOption
        arr={typeOfDriveUnit}
        dispatchFunc={clientGetDriveUnitAction}
        value={driveUnit}
        defaultValue={typeOfDriveUnit[0]}
      />
    </div>
  );
};

export const ClientGetTransmission = () => {
  const transmission = useSelector((state) => state.clientAddAuto.transmission);
  const typeOfTransmission = ["Механическая", "Автоматическая"];

  return (
    <div className="add_auto">
      <AppTitle>Выберите коробку передач</AppTitle>

      <AppSelectOption
        arr={typeOfTransmission}
        dispatchFunc={clientGetTransmissionAction}
        value={transmission}
        defaultValue={typeOfTransmission[0]}
      />
    </div>
  );
};

export const ClientGetMotor = () => {
  const motor = useSelector((state) => state.clientAddAuto.motor);
  const typeOfMotor = ["Бензин", "Дизель", "Электромотор"];

  return (
    <div className="add_auto">
      <AppTitle>Выберите коробку передач</AppTitle>

      <AppSelectOption
        arr={typeOfMotor}
        dispatchFunc={clientGetMotorAction}
        value={motor}
        defaultValue={typeOfMotor[0]}
      />
    </div>
  );
};

export const ClientMultiplyImageUpload = () => {
  const dispatch = useDispatch();
  const imagesArr = useSelector((state) => state.clientAddAuto.imagesArr);

  return (
    <div className="add_auto">
      <AppTitle>Выберите фотографии вашего автомобиля</AppTitle>
      <AppText>
        Если не хотите выставлять фотографии своего автомобиля, Вы всегда можете
        выбрать дефолтное (системное) фото
      </AppText>
      <MultiplyImageUpload
        dispatch={dispatch}
        saveFunc={clientGetImagesArrAction}
        dependences={imagesArr.length === 0}
      />
      {imagesArr.length > 0 && <Slider imagesArr={imagesArr} />}
    </div>
  );
};

export const ClientAddDateOfCar = () => {
  const year = useSelector((state) => state.clientAddAuto.year);
  const markId = useSelector((state) => state.clientAddAuto.markId);
  const modelCollection = useSelector(
    (state) => state.clientAddAuto.modelCollection
  );
  const generationId = useSelector((state) => state.clientAddAuto.generationId);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    ReadAllInFirebaseWithThreeQueriesV2(
      "AutoModels",
      "MarkId",
      markId,
      "AutoModelId",
      modelCollection
    )
      .then((data) => {
        data.forEach((dataItem) => {
          if (dataItem.id === generationId) {
            setStartDate(dataItem.data().StartYear);
            setEndDate(dataItem.data().EndYear);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте год выпуска вашего автомобиля</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppDate
          dispatchFunc={clientGetTypeOfBodyDateAction}
          currentYear={year}
          startYear={startDate}
          endYear={endDate}
        />
      </div>
    </div>
  );
};

export const ClientPowerOfCar = () => {
  const dispatch = useDispatch();
  const power = useSelector((state) => state.clientAddAuto.power);

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте кол-во лошадек под капотом (в л.с.)</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppInput
          type="number"
          placeholder={`Например: 560`}
          value={power}
          onChange={(prev) =>
            dispatch(clientGetPowerOfAutoAction(prev.target.value))
          }
        />
      </div>
    </div>
  );
};

export const ClientMilage = () => {
  const dispatch = useDispatch();
  const mileage = useSelector((state) => state.clientAddAuto.mileage);

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте пробег под капотом (в км)</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppInput
          type="text"
          placeholder={`Например: 100 000 км`}
          value={mileage}
          onChange={(prev) => {
            dispatch(
              clientGetMilageAction(
                prev.target.value
                  .replace(/\s/g, "")
                  .replace(/(\d)(?=(\d{3})+$)/g, "$1 ")
              )
            );
          }}
        />
      </div>
    </div>
  );
};

export const ClientDescr = () => {
  const dispatch = useDispatch();
  const descr = useSelector((state) => state.clientAddAuto.descr);

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте описание</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppTextarea
          type="text"
          placeholder="Тут уж на что фантазия способна"
          value={descr}
          onChange={(prev) => dispatch(clientGetDescrAction(prev.target.value))}
        />
      </div>
    </div>
  );
};

export const ClientAutoPrice = () => {
  const dispatch = useDispatch();
  const autoPrice = useSelector((state) => state.clientAddAuto.autoPrice);

  return (
    <div className="add_auto">
      <div className="add_auto_title">
        <AppTitle>Добавьте стоимость автомобиля (в рублях)</AppTitle>
      </div>
      <div className="add_auto_input">
        <AppInput
          type="text"
          placeholder="Например: 75 000"
          value={autoPrice}
          onChange={(prev) =>
            dispatch(
              clientGetAutoPriceAction(
                prev.target.value
                  .replace(/\s/g, "")
                  .replace(/(\d)(?=(\d{3})+$)/g, "$1 ")
              )
            )
          }
        />
      </div>
    </div>
  );
};
