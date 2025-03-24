import './styles/index.css'

import { createCard, handleCardRemove, handleCardLike } from './components/card.js'
import { openModal, closeModal, handleOverlayClose } from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js'
import { apiGetUserInfo, apiGetCards, apiUpdateUserInfo, apiAddCard } from './components/api.js'

const profile = {
  _id: '',
  name: '',
  about: '',
  avatar: ''
}

// Profile elements
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')
const editProfileButton = document.querySelector('.profile__edit-button')
const addCardButton = document.querySelector('.profile__add-button')

// Cards elements
const cardsList = document.querySelector('.places__list')

// Modals
const modals = document.querySelectorAll('.popup')
const editProfileModal = document.querySelector('.popup_type_edit')
const addCardModal = document.querySelector('.popup_type_new-card')
const imageModal = document.querySelector('.popup_type_image')

// Modal - edit profile
const editProfileForm = document.querySelector('form[name="edit-profile"]')
const nameInput = editProfileForm.querySelector('.popup__input_type_name')
const jobInput = editProfileForm.querySelector('.popup__input_type_description')

// Modal - add card
const addCardForm = document.querySelector('form[name="new-place"]')
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name')
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url')

// Modal - Card image
const imageModalImg = imageModal.querySelector('.popup__image')
const imageModalCaption = imageModal.querySelector('.popup__caption')

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error-active'
}

// Profile - Modal Handlers
function fillProfileForm() {
  nameInput.value = profile.name
  jobInput.value = profile.about
}

function handleProfileFormSubmit(event) {
  event.preventDefault()

  apiUpdateUserInfo(nameInput.value, jobInput.value)
    .then(updatedUserData => {
      profile.name = updatedUserData.name
      profile.about = updatedUserData.about
      profileName.textContent = profile.name
      profileJob.textContent = profile.about
      closeModal(editProfileModal)
    })
    .catch(err => console.error('Ошибка при обновлении профиля:', err))
}

// Add card - Modal Handlers
function handleAddCardFormSubmit(event) {
  event.preventDefault()

  const name = cardNameInput.value
  const link = cardLinkInput.value

  apiAddCard(name, link)
    .then(newCardData => {
      const cardElement = createCard(
        newCardData,
        handleCardRemove,
        handleCardLike,
        handleImageClick,
        profile._id
      )
      cardsList.prepend(cardElement)

      event.target.reset()
      clearValidation(event.target, validationConfig)
      closeModal(addCardModal)
    })
    .catch(err => console.error('Ошибка при создании карточки:', err))
}

// Image - Modal Handlers
function handleImageClick(name, link) {
  imageModalImg.src = link
  imageModalImg.alt = name
  imageModalCaption.textContent = name
  openModal(imageModal)
}

editProfileButton.addEventListener('click', () => {
  fillProfileForm()
  clearValidation(editProfileForm, validationConfig)
  openModal(editProfileModal)
})

addCardButton.addEventListener('click', () => {
  openModal(addCardModal)
})

editProfileForm.addEventListener('submit', handleProfileFormSubmit)
addCardForm.addEventListener('submit', handleAddCardFormSubmit)

modals.forEach(modal => {
  modal.classList.add('popup_is-animated')
  modal.addEventListener('mousedown', handleOverlayClose)
})

enableValidation(validationConfig)

Promise.all([apiGetUserInfo(), apiGetCards()])
  .then(([userData, cards]) => {
    profile._id = userData._id
    profile.name = userData.name
    profile.about = userData.about
    profile.avatar = userData.avatar

    profileName.textContent = profile.name
    profileJob.textContent = profile.about
    profileImage.style.backgroundImage = `url(${profile.avatar})`

    cards.forEach(card => {
      const cardElement = createCard(
        card,
        handleCardRemove,
        handleCardLike,
        handleImageClick,
        profile._id
      )
      cardsList.append(cardElement)
    })
  })
  .catch(err => console.error('Error loading data:', err))
