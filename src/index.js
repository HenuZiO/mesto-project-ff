import './styles/index.css'

import { initialCards } from './components/cards.js'
import { createCard, removeCard, toggleLike } from './components/card.js'
import { openModal, closeModal, handleOverlayClose } from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js'

// Profile elements
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__description')
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
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
}

function handleProfileFormSubmit(event) {
  event.preventDefault()
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closeModal(editProfileModal)
}

// Add card - Modal Handlers
function handleAddCardFormSubmit(event) {
  event.preventDefault()
  const name = cardNameInput.value
  const link = cardLinkInput.value
  const cardElement = createCard({ name, link }, removeCard, toggleLike, handleImageClick)

  cardsList.prepend(cardElement)

  event.target.reset()
  clearValidation(event.target, validationConfig)
  closeModal(addCardModal)
}

// Image - Modal Handlers
function handleImageClick(name, link) {
  imageModalImg.src = link
  imageModalImg.alt = name
  imageModalCaption.textContent = name
  openModal(imageModal)
}

initialCards.forEach(card => {
  const cardElement = createCard(card, removeCard, toggleLike, handleImageClick)
  cardsList.append(cardElement)
})

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
