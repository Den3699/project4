const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const formElement = popupElement.querySelector('popup__content');
const nameInput = popupElement.querySelector('.popup__input_form_name');
const jobInput = popupElement.querySelector('popup__input_form_occupation');
const profileName = document.querySelector('profile__name');
const profileOccupation = document.querySelector('.profile__occupation');


const openPopup = function() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
};


const closePopup = function() {
  popupElement.classList.remove('popup_opened');
};


function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopup();
}


popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);