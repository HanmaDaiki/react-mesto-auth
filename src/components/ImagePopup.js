import React from "react";

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_image ${isOpen && 'popup_active'}`}>
      <div className="popup__overlay popup__overlay_image" onClick={onClose} />
      <div className="popup__image-container">
        <img
          className="popup__image"
          src={isOpen && card.link}
          alt={`А тут была картинка с названием ${isOpen && card.name}`}
        />
        <h2 className="popup__image-title">{isOpen && card.name}</h2>
        <button className="popup__close" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;
