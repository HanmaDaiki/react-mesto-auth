import React from "react";
import {Link} from "react-router-dom";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";

function Content({
  currentUser,
  handleImageCardClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  handleEditAvatarClick,
  cards,
  handleCardLike,
  handleDeleteCard,
  isEditProfilePopupOpen,
  closeAllPopups,
  handleUpdateUser,
  isEditAvatarPopupOpen,
  handleUpdateAvatar,
  isAddPlacePopupOpen,
  handleAddPlace,
  isConfirmPopupOpen,
  currentCard,
  isImagePopupOpen,
  email,
  handleExitProfile,
}) {
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        page={
          <div className='header__profile'>
            <div>{email}</div>
            <Link to='/sing-in' className="header__link header__link_exit" onClick={handleExitProfile}>Выйти</Link>
          </div>
        }
      />
      <Main
        onCardClick={handleImageCardClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleDeleteCard}
      />
      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />

      <PopupWithForm
        name={"delete-card"}
        title={"Вы уверены?"}
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <button className="popup__save" type="button">
              Да
            </button>
          </>
        }
      />

      <ImagePopup
        card={currentCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default Content;
