import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Transition } from "../components/transition/Transition";
import { AppRedirectToLogin } from "../components/UI/redirect/AppRedirectToLogin";
import {
  ClientGetMarkAndMarkId,
  ClientGetModelAndModelId,
  ClientMultiplyImageUpload,
  ClientGetGenerationAndGenerationId,
  ClientGetTypeOfBody,
  ClientAddDateOfCar,
  ClientPowerOfCar,
  ClientMilage,
  ClientDescr,
  ClientAutoPrice,
  ClientGetTransmission,
  ClientGetMotor,
} from "../components/addAuto/AddAuto";
import { AppSwal } from "../utils/swal";
import { PATHS } from "../utils/paths";
import { CreateInFirebase, ReadAllInFirebase } from "./../firebase/crudAdmin";
import {
  clientGetAutoPriceAction,
  clientGetDescrAction,
  clientGetDriveUnitAction,
  clientGetGenerationAndGenerationIdAction,
  clientGetGenerationCollectionAction,
  clientGetImagesArrAction,
  clientGetImagesArrRefreshAction,
  clientGetMarkAndMarkIdAction,
  clientGetMilageAction,
  clientGetModelAndModelIdAction,
  clientGetModelCollectionAction,
  clientGetMotorAction,
  clientGetPowerOfAutoAction,
  clientGetTransmissionAction,
  clientGetTypeOfBodyAction,
  clientGetTypeOfBodyDateAction,
} from "../store/client/addAutoReducer";
import { STYLES } from "../utils/styles";
import { reloadCountAutoIdAction } from "../store/reloadReducer";
import { ClientGetDriveUnit } from "./../components/addAuto/AddAuto";
import firebase from "firebase";

export const AddAutoPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    document.title = `Добавить авто`;
  }, []);

  const isAuth = useSelector((state) => state.userName.isAuth);
  const email = useSelector((state) => state.userName.email);
  const markId = useSelector((state) => state.clientAddAuto.markId);
  const mark = useSelector((state) => state.clientAddAuto.mark);
  const modelId = useSelector((state) => state.clientAddAuto.modelId);
  const model = useSelector((state) => state.clientAddAuto.model);
  const modelCollection = useSelector(
    (state) => state.clientAddAuto.modelCollection
  );
  const generationId = useSelector((state) => state.clientAddAuto.generationId);
  const generation = useSelector((state) => state.clientAddAuto.generation);
  const generationCollection = useSelector(
    (state) => state.clientAddAuto.generationCollection
  );
  const imagesArr = useSelector((state) => state.clientAddAuto.imagesArr);
  const defaultImage = useSelector((state) => state.clientAddAuto.defaultImage);
  const typeOfBody = useSelector((state) => state.clientAddAuto.typeOfBody);
  const driveUnit = useSelector((state) => state.clientAddAuto.driveUnit);
  const transmission = useSelector((state) => state.clientAddAuto.transmission);
  const motor = useSelector((state) => state.clientAddAuto.motor);
  const year = useSelector((state) => state.clientAddAuto.year);
  const power = useSelector((state) => state.clientAddAuto.power);
  const mileage = useSelector((state) => state.clientAddAuto.mileage);
  const descr = useSelector((state) => state.clientAddAuto.descr);
  const autoPrice = useSelector((state) => state.clientAddAuto.autoPrice);
  // const countAutoId = useSelector((state) => state.clientGetAuto.countAutoId);

  const clientGetMarkAndMarkIdDependency = () => {
    if (markId) {
      return true;
    }
    AppSwal("Ошибка", "Вы не выбрали марку", "error");
    return false;
  };
  const clientGetModelAndModelIdDependency = () => {
    if (modelId) {
      return true;
    }
    AppSwal("Ошибка", "Вы не выбрали модель", "error");
    return false;
  };
  const clientGetGenerationAndGenerationIdDependency = () => {
    if (generationId) {
      return true;
    }
    AppSwal("Ошибка", "Вы не выбрали поколение", "error");
    return false;
  };

  const clientGetTypeOfBodyDependency = () => {
    if (typeOfBody) {
      return true;
    }
    AppSwal("Ошибка", "Вы не выбрали тип кузова", "error");
    return false;
  };

  const clientGetDriveUnitDependency = () => {
    if (driveUnit) {
      return true;
    }
    AppSwal("Ошибка", "Вы не выбрали привод автомобиля", "error");
    return false;
  };

  const clientGetTransmissionDependency = () => {
    if (transmission) {
      return true;
    }
    AppSwal("Ошибка", "Вы не выбрали коробку передач", "error");
    return false;
  };

  const clientGetMotorDependency = () => {
    if (motor) {
      return true;
    }
    AppSwal("Ошибка", "Вы не выбрали тип двигателя", "error");
    return false;
  };

  const clientMultiplyImageUploadDependency = () => {
    if (imagesArr.length > 0) {
      return true;
    }
    dispatch(clientGetImagesArrAction(defaultImage));
    AppSwal("Внимание", "Добавлено системное фото вашего авто", "warning");
    return false;
  };

  const clientGetDateOfCarDependency = () => {
    if (year) {
      return true;
    }
    AppSwal("Ошибка", "Вы не указали год выпуска автомобиля", "error");
    return false;
  };

  const clientGetPowerOfAutoDependency = () => {
    if (power) {
      return true;
    }
    AppSwal("Ошибка", "Вы не указали количество лошадей автомобиля", "error");
    return false;
  };

  const clientGetMilageDependency = () => {
    if (mileage) {
      return true;
    }
    AppSwal("Ошибка", "Вы не указали пробег автомобиля", "error");
    return false;
  };

  const clientGetDescrDependency = () => {
    if (descr) {
      return true;
    }
    AppSwal("Ошибка", "Вы не указали описание автомобиля", "error");
    return false;
  };

  const clientGetAutoPriceDependency = () => {
    if (autoPrice) {
      if (Number(autoPrice.replace(/\s/g, "")) > 10000) {
        return true;
      }
      AppSwal("Ошибка", "Стоимость авто не меньше 10 000 рублей", "error");
      return false;
    }
    AppSwal("Ошибка", "Вы не указали стоимость автомобиля", "error");
    return false;
  };

  const components = [
    <ClientGetMarkAndMarkId />,
    <ClientGetModelAndModelId />,
    <ClientGetGenerationAndGenerationId />,
    <ClientGetTypeOfBody />,
    <ClientGetDriveUnit />,
    <ClientGetTransmission />,
    <ClientGetMotor />,
    <ClientMultiplyImageUpload />,
    <ClientAddDateOfCar />,
    <ClientPowerOfCar />,
    <ClientMilage />,
    <ClientDescr />,
    <ClientAutoPrice />,
  ];

  const dependenciesOfComponent = [
    clientGetMarkAndMarkIdDependency,
    clientGetModelAndModelIdDependency,
    clientGetGenerationAndGenerationIdDependency,
    clientGetTypeOfBodyDependency,
    clientGetDriveUnitDependency,
    clientGetTransmissionDependency,
    clientGetMotorDependency,
    clientMultiplyImageUploadDependency,
    clientGetDateOfCarDependency,
    clientGetPowerOfAutoDependency,
    clientGetMilageDependency,
    clientGetDescrDependency,
    clientGetAutoPriceDependency,
  ];

  const finishFunc = () => {
    dispatch(reloadCountAutoIdAction());

    return new Promise(function (resolve, reject) {
      firebase
        .firestore()
        .collection("Users")
        .where("Email", "==", email)
        .get()
        .then((data) => {
          console.log(email);
          data.forEach((dataItem) => resolve(dataItem.id));
        })
        .catch((error) => {
          reject(error);
        });
    }).then((userId) => {
      ReadAllInFirebase("ClientsAutoForSale")
        .then((data) => {
          return data.size;
        })
        .then((countAutoId) => {
          debugger;

          CreateInFirebase("ClientsAutoForSale", {
            MarkId: markId,
            Mark: mark,
            ModelId: modelId,
            Model: model,
            ModelCollection: modelCollection,
            GenerationId: generationId,
            Generation: generation,
            GenerationCollection: generationCollection,
            ImagesArr: imagesArr,
            TypeOfBody: typeOfBody,
            TypeOfMotor: motor,
            Transmission: transmission,
            DriveUnit: driveUnit,
            Year: year,
            Power: power,
            Mileage: mileage,
            Description: descr,
            Price: Number(autoPrice.replace(/\s/g, "")),
            CountAutoId: STYLES.DEDUCTIBLE_ID - Number(countAutoId),
            IsShow: true,
            UserId: userId,
          }).then(() => {
            AppSwal("Успех", "Вы добавили автомобиль", "success");
          });
          dispatch(clientGetMarkAndMarkIdAction({ markId: "", mark: "" }));
          dispatch(clientGetModelAndModelIdAction({ modelId: "", model: "" }));
          dispatch(clientGetModelCollectionAction(""));
          dispatch(
            clientGetGenerationAndGenerationIdAction({
              generationId: "",
              generation: "",
            })
          );
          dispatch(clientGetGenerationCollectionAction(""));
          dispatch(clientGetTypeOfBodyAction(""));
          // рефреши списков
          // dispatch(clientGetMarkArrRefreshAction())
          // dispatch(clientGetModelRefreshArrAction()); - все 3 необязательные, т.к. они сбрасываются перед запросом на сервер
          // dispatch(clientGetGenerationRefreshAction());
          dispatch(clientGetImagesArrRefreshAction());
          dispatch(clientGetTypeOfBodyDateAction(""));
          dispatch(clientGetDriveUnitAction(""));
          dispatch(clientGetTransmissionAction(""));
          dispatch(clientGetMotorAction(""));
          dispatch(clientGetPowerOfAutoAction(""));
          dispatch(clientGetMilageAction(""));
          dispatch(clientGetDescrAction(""));
          dispatch(clientGetAutoPriceAction(""));
          history.push(PATHS.HOME);
        });
    });
  };

  return (
    <div>
      {!isAuth ? (
        <AppRedirectToLogin text="добавления автомобиля" />
      ) : (
        <Transition
          components={components}
          dependencies={dependenciesOfComponent}
          finishFunc={finishFunc}
        />
      )}
    </div>
  );
};
