// import Card from './Card.js';

import initialCards from './initialCards.js';

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupCardAdd = document.querySelector('.popup_type_add');
const popupImageBig = document.querySelector('.popup_type_image');

// контент
const formEditProfile = popupEditProfile.querySelector('.form');
const nameInput = popupEditProfile.querySelector('.popup__input_form_name');
const jobInput = popupEditProfile.querySelector('.popup__input_form_occupation');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const popupImageBigItem = popupImageBig.querySelector('.opened-image__image');
const popupImageBigName = popupImageBig.querySelector('.opened-image__caption');

// открытие попапов
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCardAddOpenButtonElement = document.querySelector('.profile__add-button');

// закрытие попапов
const popupCloseButtonElement = popupEditProfile.querySelector('.popup__close-button');
const popupCloseCardAdd = popupCardAdd.querySelector('.popup__close-button');
const popupCloseImageBig = popupImageBig.querySelector('.popup__close-button');

// const для card
const cardSubmitBtn = popupCardAdd.querySelector('#card-submit');
const cardListElement = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.elements__item');
const formAddCard = popupCardAdd.querySelector('.form');
const formInputCardName = popupCardAdd.querySelector('.popup__input_form_place-name');
const formInputCardLink = popupCardAdd.querySelector('.popup__input_form_place-img');

// Функции карточек: добавление, удаление, лайки

const handleDeleteCard = (event) => {
  event.target.closest('.elements__item').remove();
}

const handleLikeCard = (event) => {
  event.target.closest('.element__like').classList.toggle('element__like_active');
}

const createCard = (item) => {
  const newCard = cardTemplate.cloneNode(true);

  const cardName = newCard.querySelector('.element__caption');
  cardName.textContent = item.name;

  const cardLink = newCard.querySelector('.element__image');
  cardLink.src = item.link;
  cardLink.alt = item.name;

  const deleteCardBtn = newCard.querySelector('.element__card-delete');
  deleteCardBtn.addEventListener('click', handleDeleteCard);

  const likeCardBtn = newCard.querySelector('.element__like');
  likeCardBtn.addEventListener('click', handleLikeCard);

  cardLink.addEventListener('click', () => {
    popupImageBigItem.src = item.link;
    popupImageBigItem.alt = item.name;
    popupImageBigName.textContent = item.name;
    openPopup(popupImageBig);
  })

  return newCard;
}

const renderInitialCards = (item) => {
  cardListElement.prepend(createCard(item));
}

initialCards.forEach(function (item) {
  renderInitialCards(item);
})

//Функция отправки формы карточки

const handleFormSubmitAddCard = (e) => {
  e.preventDefault();
  renderInitialCards({
    name: formInputCardName.value,
    link: formInputCardLink.value,
  });
  e.target.reset();
  closePopup(popupCardAdd);
}


//  Открытие и закрытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}



// Закрытие попапа по overlay

const closePopupByOverlay = (e) => {
  if (!e.target.closest('.popup__container')) {
    closePopup(e.target);
  }
}

//Функция для кнопки Сохранить popup profile
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

// Функция закрытия попапов по нажатию на Esc
function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Слушатели

popupOpenButtonElement.addEventListener('click', function () {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
});

popupCloseButtonElement.addEventListener('click', function () {
  closePopup(popupEditProfile);
})

popupCardAddOpenButtonElement.addEventListener('click', function () {
  cardSubmitBtn.setAttribute('disabled', true);
  cardSubmitBtn.classList.add('popup__button_disabled');
  formAddCard.reset();
  openPopup(popupCardAdd);
})

popupCloseCardAdd.addEventListener('click', function () {
  closePopup(popupCardAdd);
})

popupCloseImageBig.addEventListener('click', function () {
  closePopup(popupImageBig);
})
formEditProfile.addEventListener('submit', submitEditProfileForm);

formAddCard.addEventListener('submit', handleFormSubmitAddCard);

popupEditProfile.addEventListener('click', closePopupByOverlay);
popupCardAdd.addEventListener('click', closePopupByOverlay);
popupImageBig.addEventListener('click', closePopupByOverlay);





