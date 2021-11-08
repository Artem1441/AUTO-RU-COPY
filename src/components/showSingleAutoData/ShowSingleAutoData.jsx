import React, { useState, useEffect } from "react";
import { ReadAllInFirebase } from "../../firebase/crudAdmin";
import { STYLES } from "../../utils/styles";
import Slider from "../slider/Slider";
import { AppText } from "../UI/text/AppText";
import { AppTitle } from "../UI/titles/AppTitle";
import "./showSingleAutoData.css";
import { AppButton } from "./../UI/button/AppButton";
import { useHistory } from "react-router-dom";
import { PATHS } from "../../utils/paths";
import { useSelector } from "react-redux";
import { Avatar } from "../avatar/Avatar";

export const ShowSingleAutoData = ({ data }) => {
  const history = useHistory();
  const email = useSelector((state) => state.userName.email);
  const [isShow, setIsShow] = useState(false);
  const [typeOfBody, setTypeOfBody] = useState("");
  const [userData, setUserData] = useState([]);
  const [isMyAnnouncement, setIsMyAnnouncement] = useState(false);

  const leftTextStyles = {
    color: "rgba(0,0,0,0.4)",
    fontSize: 16,
    display: "flex",
  };

  const rightTextStyles = {
    color: "rgba(0,0,0,0.6)",
    fontSize: 16,
    marginLeft: 10,
  };

  useEffect(() => {
    if (data === null) {
      data = {};
      setIsShow(false);
    } else {
      if (Object.keys(data).length !== 0) {
        document.title = `Купить ${data.Mark} ${data.Model} ${data.Generation}`;
        setIsShow(true);

        ReadAllInFirebase("TypeOfBody").then((res) => {
          res.forEach((dataItem) => {
            if (dataItem.id === data.TypeOfBody) {
              setTypeOfBody(dataItem.data().TypeOfBodyTitle);
            }
          });
        });

        ReadAllInFirebase("Users").then((res) => {
          res.forEach((dataItem) => {
            if (data.UserId === dataItem.id) {
              if (!(email === dataItem.data().Email)) {
                setUserData(dataItem.data());
                setIsMyAnnouncement(true);
              }
            }
          });
        });
      }
    }
  }, [data]);

  const RedirectToChat = (id, autoId, userData, data) => {
    const name = userData.Name;
    const imgUrl = userData.ImageUrl;
    console.log(data);
    history.push(`${PATHS.CHAT_CLIENT}/${id}/${autoId}`, {
      name,
      imgUrl: imgUrl ? imgUrl : "",
    });
  };

  return (
    <div className="show_single_auto">
      {isShow && (
        <div className="container">
          <div className="show_single_auto_container">
            <div className="show_single_auto_container_main">
              <AppTitle
                style={{ fontSize: STYLES.SINGLE_AUTO_MAIN_FON_SIZE_TEXT }}
              >
                {data.Mark} {data.Model} {data.Generation}
              </AppTitle>
              <AppTitle
                style={{ fontSize: STYLES.SINGLE_AUTO_MAIN_FON_SIZE_TEXT - 6 }}
              >
                {String(data.Price)
                  .replace(/\s/g, "")
                  .replace(/(\d)(?=(\d{3})+$)/g, "$1 ")}{" "}
                руб
              </AppTitle>
            </div>

            <div className="show_single_auto_container_data">
              <div className="show_single_auto_container_data_container">
                <div className="show_single_auto_container_data_container_text">
                  <AppText style={leftTextStyles}>Пробег:</AppText>
                  <AppText style={rightTextStyles}>{data.Mileage} км</AppText>
                </div>

                <div className="show_single_auto_container_data_container_text">
                  <AppText style={leftTextStyles}>Мощность:</AppText>
                  <AppText style={rightTextStyles}>{data.Power} л.с.</AppText>
                </div>

                <div className="show_single_auto_container_data_container_text">
                  <AppText style={leftTextStyles}>Год:</AppText>
                  <AppText style={rightTextStyles}>{data.Year}</AppText>
                </div>

                <div className="show_single_auto_container_data_container_text">
                  <AppText style={leftTextStyles}>Привод:</AppText>
                  <AppText style={rightTextStyles}>{data.DriveUnit}</AppText>
                </div>

                <div className="show_single_auto_container_data_container_text">
                  <AppText style={leftTextStyles}>Трансмиссия:</AppText>
                  <AppText style={rightTextStyles}>{data.Transmission}</AppText>
                </div>

                <div className="show_single_auto_container_data_container_text">
                  <AppText style={leftTextStyles}>Мотор:</AppText>
                  <AppText style={rightTextStyles}>{data.TypeOfMotor}</AppText>
                </div>

                <div className="show_single_auto_container_data_container_text">
                  <AppText style={leftTextStyles}>Кузов:</AppText>
                  <AppText style={rightTextStyles}>{typeOfBody}</AppText>
                </div>
              </div>

              <div className="show_single_auto_container_data_slider">
                <Slider imagesArr={data.ImagesArr} isDelete={false} />
              </div>
            </div>

            <div className="show_single_auto_container_main">
              <AppTitle
                style={{ fontSize: STYLES.SINGLE_AUTO_MAIN_FON_SIZE_TEXT - 4 }}
              >
                Комментарий продавца
              </AppTitle>
            </div>

            <div className="show_single_auto_container_data_container_text">
              <AppText style={rightTextStyles}>{data.Description}</AppText>
            </div>

            {isMyAnnouncement && (
              <div
                className="show_single_auto_container_vendor"
                style={{ border: STYLES.BORDER_DEFAULT_STYLE }}
              >
                <div className="show_single_auto_container_vendor_data">
                  <Avatar data={userData.ImageUrl} />
                  <AppText>{userData.Name}</AppText>
                </div>

                <div className="show_single_auto_container_vendor_btn">
                  <AppButton
                    onClick={() =>
                      RedirectToChat(
                        data.UserId,
                        data.CountAutoId,
                        userData,
                        data
                      )
                    }
                  >
                    Написать продавцу
                  </AppButton>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
