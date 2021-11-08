import React, { useState } from "react";
import "./transition.css";
import { STYLES } from "./../../utils/styles";
import doneIcon from "../../assets/img/doneIcon.svg";
import {
  TransitionBtnBack,
  TransitionBtnNext,
  TransitionBtnFinish,
} from "./TransitionBtn";

export const Transition = ({ components, dependencies, finishFunc, }) => {
  const [activeBlock, setActiveBlock] = useState(0);

  const nextFunc = () => {
    setActiveBlock(activeBlock + 1);
  };

  const backFunc = () => {
    setActiveBlock(activeBlock - 1);
  };

  return (
    <div className="transition">
      <div className="transition_container">
        <div
          className="transition_container_side"
          style={{ background: STYLES.RED }}
        >
          {components.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  activeBlock !== index
                    ? "transition_container_side_btn"
                    : "transition_container_side_btn transition_container_side_btn_active"
                }
                style={{ background: index < activeBlock && STYLES.GREEN }}
                // // пока что костыль
                // onClick={() => setActiveBlock(index)}
              >
                <img src={doneIcon} style={{ height: "60%" }} />
              </div>
            );
          })}
        </div>

        <div className="transition_container_main">
          {components[activeBlock]}
          {(activeBlock === 0) & (components.length > 1) ? (
            <div className="transition_container_main_btns">
              <span></span> {/* span для стилей */}
              <TransitionBtnNext
                dependencyFunc={dependencies[activeBlock]}
                nextFunc={nextFunc}
              />
            </div>
          ) : activeBlock === components.length - 1 ? (
            <div className="transition_container_main_btns">
              {components.length > 1 ? (
                <TransitionBtnBack backFunc={backFunc} />
              ) : (
                <span></span>
              )}
              <TransitionBtnFinish
                dependencyFunc={dependencies[activeBlock]}
                finishFunc={finishFunc}
              />
            </div>
          ) : (
            <div className="transition_container_main_btns">
              <TransitionBtnBack backFunc={backFunc} />
              <TransitionBtnNext
                dependencyFunc={dependencies[activeBlock]}
                nextFunc={nextFunc}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
