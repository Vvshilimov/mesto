// импорты
import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/Api.js';
import {
  editButton,
  formElementEditProfile,
  nameInput,
  jobInput,
  addButton,
  formElementCreateCards,
  profileAvatar,
  formElementAvatar,
  deleteCardsButton,
  config
} from '../utils/constants.js';
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-202',
  headers: {
    authorization: 'eb71d7d3-76e0-4fcc-b713-f0c9ad1551c9',
    'Content-Type': 'application/json'
  }
});
api.renderUserAndCards()
  .then(([user, data]) => {
    userInfo.setUserInfo({  name: user.name, about: user.about, avatar: user.avatar});
    cardList.renderCards({ cards: data, userId: user._id, insertMethod: 'append'})
  })
  .catch(err => console.log(err));

const popupFullScreen = new PopupWithImage('#popup-picture');
popupFullScreen.setEventListeners();
const handleCardClick = data => popupFullScreen.open(data);
const cardList = new Section({
  renderer: data => {
    cardList.addItem(createNewCard(data.card, data.userId), data.insertMethod);
  }
},
'.elements__list'
);
const popupDeleteCard = new PopupWithConfirm('#popup-delete-card', cardData => {
  deleteCardsButton.textContent = 'Удаление...';
  api.deleteCard(cardData.data)
    .then(() => {
      cardData.element.remove();
      cardData.element = null;
      popupDeleteCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => deleteCardsButton.textContent = 'Да')
});
popupDeleteCard.setEventListeners();
const popupAddCard = new PopupWithForm('#popup-create-card', (data, submitButton) => {
  submitButton.textContent = 'Создание...';
  api.addCard(data)
    .then(card => {
      cardList.addItem(createNewCard(card));
      popupAddCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      submitButton.textContent = 'Создать'
    })
});
popupAddCard.setEventListeners();
const popupEditAvatar = new PopupWithForm('#popup-avatar', (data, submitButton) => {
  submitButton.textContent = 'Сохранить...';
  api.setUserAvatar(data)
    .then(data => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`
      popupEditAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      submitButton.textContent = 'Сохранить'
    })
});
popupEditAvatar.setEventListeners();
const createNewCard = (data, userId) => {
  const newCard = new Card(data, '#cardTemplate', handleCardClick, handleLikeSet, handleLikeDelete, handleCardDelete, userId);
  return newCard.createCard();
};
const handleCardDelete = element => popupDeleteCard.open(element);
const handleLikeSet = (cardData, evt) => {
  api.setLike(cardData.data)
    .then(res => {
      cardData.counterLikes.textContent = res.likes.length;
      evt.target.classList.add('element__like-button_active');
    })
    .catch(err => console.log(err))
};

const handleLikeDelete = (cardData, evt) => {
  api.deleteLike(cardData.data)
    .then(res => {
      cardData.counterLikes.textContent = res.likes.length;
      evt.target.classList.remove('element__like-button_active');
    })
    .catch(err => console.log(err))
};
const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job', avatarSelector: ".profile__avatar"});
const popupEditProfile = new PopupWithForm('#popup-edit', (data, submitButton) => {
  submitButton.textContent = 'Сохранение...';
  api.setUserInfo(data)
    .then(data => {userInfo.setUserInfo(data)})
    .then(() => popupEditProfile.close())
    .catch(err => console.log(err))
    .finally(() => submitButton.textContent = 'Сохранить')
});
popupEditProfile.setEventListeners();
const formValidators = {};
const enableValidation = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(config);
addButton.addEventListener('click', () => { 
  popupAddCard.open();
  formValidators[formElementCreateCards.getAttribute('name')].resetValidation();
});
editButton.addEventListener("click", () => { 
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.about;
  formValidators[formElementEditProfile.getAttribute('name')].resetValidation(); 
  popupEditProfile.open();
});
profileAvatar.addEventListener("click", () => {
  formValidators[formElementAvatar.getAttribute('name')].resetValidation();
  popupEditAvatar.open();
});
