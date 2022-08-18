import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEffect, useState } from "react";
import { api } from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "Имя",
    about: "Описание",
    avatar: "https://dummyimage.com/600x400/000/fff.png",
  });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(`В апи getCards ошибка - ${err}`);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          id: user._id,
        });
      })
      .catch((err) => {
        console.log(`В апи getUserInfo ошибка - ${err}`);
      });
  }, []);

  function handleDeleteCard(removedCard) {
    api
      .deleteCard(removedCard._id)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return removedCard._id !== card._id;
          })
        );
      })
      .catch((err) => {
        console.log(`В апи deleteCard ошибка - ${err}`);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`В апи changeLikeCardStatus ошибка - ${err}`);
      });
  }

  function handleUpdateAvatar(link) {
    api
      .patchAvatar(link)
      .then((user) => {
        setCurrentUser({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          id: user._id,
        });
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`В апи patchAvatar ошибка - ${err}`);
      });
  }

  function handleUpdateUser(user) {
    api
      .editInfoUser(user)
      .then((updateUserInfo) => {
        setCurrentUser(updateUserInfo);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`В апи editInfoUser ошибка - ${err}`);
      });
  }

  function handleAddPlace(card) {
    api
      .addNewCard(card)
      .then((card) => {
        setCards([card, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`В апи editInfoUser ошибка - ${err}`);
      });
  }

  function handleImageCardClick(card) {
    setCurrentCard(card);
    setIsImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsConfirmPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
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
    </div>
  );
}

export default App;
