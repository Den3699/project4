// const page = document.querySelector('.elements');
// const сard = document.querySelector('#elementTemplate').content.cloneNode(true);
const popupProfile = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditClose = popupEdit.querySelector('.popup__close-button');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const formProfile = popupEdit.querySelector('.popup__content');
const nameInput = popupEdit.querySelector('.popup__input_form_name');
const jobInput = popupEdit.querySelector('.popup__input_form_occupation');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');


const popupAdd = document.querySelector('.popup_type_add');
const formCard = popupAdd.querySelector('.popup__content');
const cardPlaceName = document.querySelector('.popup__place-name');
const cardPlaceImg = document.querySelector('.popup__place-img');
const placeNameInput = popupAdd.querySelector('.popup__input_form_place-name');
const placeImgInput = popupAdd.querySelector('.popup__input_form_place-img');
const popupCardOpenButton = document.querySelector('.profile__add-button');
const popupAddClose = popupAdd.querySelector('.popup__close-button');
const popupImage = document.querySelector('.popup_type_image');
const popupImageClose = popupImage.querySelector('.popup__close-button');
// const cardsList = document.querySelector('.elements');




// Открытие и закрытие попапа

function openPopup(popup) {
  popup.classList.add('popup_animated');
  popup.classList.add('popup_opened');
  // document.addEventListener('keydown', closePopupByEscape);
  document.addEventListener('mouseup', closePopupByOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
  document.removeEventListener('mouseup', closePopupByOverlay);
}


// Попап редактирования профиля


popupProfileOpenButton.addEventListener('click', () => {
  openPopup(popupEdit);

  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
});


popupEditClose.addEventListener('click', () => {
  closePopup(popupEdit);
});

function handlerFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopup(popupEdit);
}



formProfile.addEventListener('submit', handlerFormSubmit);





// Функция создания карточки


const page = document.querySelector('.elements')

function createCard(element) {
const сard = document.querySelector('#elementTemplate').content.cloneNode(true)
const cardHeading = сard.querySelector('.element__caption')
cardHeading.textContent = element.name
const cardImage = сard.querySelector('.element__image')
cardImage.src = `${element.link}`
cardImage.name = element.name
const deleteButton = сard.querySelector('.element__delete-icon')
deleteButton.addEventListener('click', handleDeleteButtonClick)


const likeButton = сard.querySelector('.element__like');
likeButton.addEventListener('click', evt => {
  evt.target.classList.toggle('element__like_active');
});


return сard

}

elements.forEach((element) => {
  const newCard = createCard(element)
  addCard(newCard, page)
})

function handleDeleteButtonClick(evt) {
  const button = evt.target
  const element = button.closest('.element')
  element.remove()
}





// Функция добавления карточки

popupCardOpenButton.addEventListener('click', () => {
  openPopup(popupAdd);
});


popupAddClose.addEventListener('click', () => {
  closePopup(popupAdd);

});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const card = {
    name: placeNameInput.value,
    link: placeImgInput.value
    // alt: placeNameInput.value
  }

  const newCard = createCard(card)
  addCard(newCard, page)
  evt.target.reset();
  closePopup(popupAdd);
}

formCard.addEventListener('submit', handleCardFormSubmit);



function addCard(element, cardContainer) {
  cardContainer.prepend(element);
}





// Открытие попапа с картинкой

const imageElement = popupImage.querySelector('.opened-image__image');
const imageCaption = popupImage.querySelector('.opened-image__caption');

function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
}

function closePopupByOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
}


page.addEventListener("click", (event) => {
  if (event.target.classList.contains("element__image")) {
    imageElement.src = event.target.src;
    imageElement.name = event.target.name;
    imageCaption.textContent = event.target.name;

    openPopup(popupImage);
  }
});

popupImageClose.addEventListener('click', () => {
  closePopup(popupImage);
});






