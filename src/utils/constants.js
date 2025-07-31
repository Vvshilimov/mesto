const editButton = document.querySelector('#profile__edit-button');
const formElementEditProfile = document.querySelector('#popup-edit__form');
const nameInput = formElementEditProfile.querySelector('#name');
const jobInput = formElementEditProfile.querySelector('#about');

const popupElementCreateCards = document.querySelector('#popup-create-card');
const addButton = document.querySelector('.profile__add-button');
const formElementCreateCards = popupElementCreateCards.querySelector('#popup-create-card__form');

const profileAvatar = document.querySelector('.profile__avatar');
const formElementAvatar = document.querySelector('#popup-avatar__form');

const deleteCardsButton = document.querySelector('#popup-delete-card__save-button');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_has-error',
  errorClass: 'popup__error_opened'
};

export {
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
};
