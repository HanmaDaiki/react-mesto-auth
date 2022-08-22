import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import { api } from "../utils/Api";
import React from "react";
import Login from "./Login";
import Register from "./Register";
import Content from "./Content";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState({isOpen: false, error: false});
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
  const [loggedIn, setLoggedIn] = useState(false);
  const token = localStorage.getItem("jwt");
  const [email, setEmail] = useState("");

  useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(`В апи getCards ошибка - ${err}`);
      });

    if (token !== "") {
      api
        .identificationUser(token)
        .then((data) => {
          setEmail(data.data.email);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(`В апи identificationUser ошибка - ${err}`);
        });
    }

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

  function handleExitProfile() {
    setLoggedIn(false);
    localStorage.setItem("jwt", "");
  }

  function handleIdentificationUser(token) {
    api
      .identificationUser(token)
      .then((res) => {
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.log(`В апи identificationUser ошибка - ${err}`);
      });
  }

  function handleRegistrationUser(email, password) {
    api
      .signUp(email, password)
      .then((res) => {
        setIsInfoTooltip({isOpen: true, error: false});
      })
      .catch((err) => {
        setIsInfoTooltip({isOpen: true, error: true});
        console.log(`В апи singUp ошибка - ${err}`);
      });

    handleLoginUser(email, password);
  }

  function handleLoginUser(email, password) {
    api
      .signIn(email, password)
      .then((data) => {
        handleIdentificationUser(data.token);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(`В апи singIn ошибка - ${err}`);
      });
  }

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
    setIsInfoTooltip({isOpen: false, error: false});
  }

  return (
    <div className="page__content">
      <Switch>
        <Route path="/sign-in">
          <Header
            page={
              <>
                <Link className="header__link" to="/sign-up">
                  Регистрация
                </Link>
              </>
            }
          />
          <Login handleLoginUser={handleLoginUser} />
          <Footer />
          {loggedIn && <Redirect to="/" />}
        </Route>

        <Route path="/sign-up">
          <Header
            page={
              <>
                <Link className="header__link" to="/sign-in">
                  Войти
                </Link>
              </>
            }
          />
          <Register isOpen={isInfoTooltip.isOpen} error={isInfoTooltip.error} onClose={closeAllPopups} handleRegistrationUser={handleRegistrationUser} />
          <Footer />
          {loggedIn && <Redirect to="/" />}
        </Route>

        <ProtectedRoute
          path="/"
          handleExitProfile={handleExitProfile}
          loggedIn={loggedIn}
          component={Content}
          currentUser={currentUser}
          email={email}
          handleImageCardClick={handleImageCardClick}
          handleEditProfileClick={handleEditProfileClick}
          handleAddPlaceClick={handleAddPlaceClick}
          handleEditAvatarClick={handleEditAvatarClick}
          cards={cards}
          handleCardLike={handleCardLike}
          handleDeleteCard={handleDeleteCard}
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          closeAllPopups={closeAllPopups}
          handleUpdateUser={handleUpdateUser}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          handleUpdateAvatar={handleUpdateAvatar}
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          handleAddPlace={handleAddPlace}
          isConfirmPopupOpen={isConfirmPopupOpen}
          currentCard={currentCard}
          isImagePopupOpen={isImagePopupOpen}
        />
      </Switch>
    </div>
  );
}

export default App;
