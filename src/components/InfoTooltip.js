import React from "react";

function InfoTooltip({ onClose, isOpen, error }) {
  console.log(isOpen);
  if (isOpen) {
    return (
      <div className="tooltip">
        <div className="tooltip__overlay" onClick={onClose}></div>
        <div className="tooltip__container">
          <button
            onClick={onClose}
            className="tooltip__close"
            type="button"
          ></button>
          {error ? (
            <>
              <img
                className="tooltip__image"
                src={require("../image/cancel.png")}
                alt="Картинка ошибки реигстрации"
              />
              <span className="tooltip__title">
                Что-то пошло не так! Попробуйте ещё раз.
              </span>
            </>
          ) : (
            <>
              <img
                className="tooltip__image"
                src={require("../image/accept.png")}
                alt="Картинка успешной реигстрации"
              />
              <span className="tooltip__title">
                Вы успешно зарегистрировались!
              </span>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default InfoTooltip;
