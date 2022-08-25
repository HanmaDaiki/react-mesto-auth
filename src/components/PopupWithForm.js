import React from "react";

function PopupWithForm({
  name,
  title,
  children,
  isOpen = false,
  onClose,
  onSubmit,
  buttonText,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_active"}`}>
      <div className="popup__overlay" onClick={onClose}></div>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{isOpen && title}</h2>
        <form
          className="popup__form"
          name={isOpen ? name : ""}
          noValidate
          onSubmit={onSubmit}
        >
          {isOpen ? children : <>

            <input className='popup__input'/>
            <input className='popup__input'/>
          </>}
          <button className="popup__save" type="submit">
            {isOpen ? buttonText : 'Кнопочка'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
