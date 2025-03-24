import './styles/index.css'

// import { initialCards } from './components/cards.js'
import { createCard, removeCard, toggleLike } from './components/card.js'
import { openModal, closeModal, handleOverlayClose } from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js'

const initialCards = []

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
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
}

function handleProfileFormSubmit(event) {
  event.preventDefault()
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  updateProfile(nameInput.value, jobInput.value)
  closeModal(editProfileModal)
}

// Add card - Modal Handlers
function handleAddCardFormSubmit(event) {
  event.preventDefault()
  const name = cardNameInput.value
  const link = cardLinkInput.value

  fetch(`${BASE_API_URL}${GROUP_ID}/cards`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name,
      link
    })
  })
    .then(res => {
      if (res.ok) return res.json()
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .then(newCard => {
      const cardElement = createCard(newCard, removeCard, toggleLike, handleImageClick)
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

const BASE_API_URL = 'https://mesto.nomoreparties.co/v1/'
const GROUP_ID = 'wff-cohort-35'
const API_TOKEN = '77c56277-51e8-4458-ab64-19fe10c2087a'

const headers = {
  authorization: API_TOKEN,
  'Content-Type': 'application/json'
}

const getPersonalInfo = () => {
  return fetch(`${BASE_API_URL}${GROUP_ID}/users/me`, { headers }).then(res => {
    if (res.ok) return res.json()
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

const getInitialCards = () => {
  return fetch(`${BASE_API_URL}${GROUP_ID}/cards`, { headers }).then(res => {
    if (res.ok) return res.json()
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

Promise.all([getPersonalInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name
    profileJob.textContent = userData.about
    profileImage.style.backgroundImage = `url(${userData.avatar})`

    cards.forEach(card => {
      const cardElement = createCard(card, removeCard, toggleLike, handleImageClick)
      cardsList.append(cardElement)
    })
  })
  .catch(err => console.error('Error loading data:', err))

function updateProfile(name, about) {
  return fetch(`${BASE_API_URL}/${GROUP_ID}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      name,
      about
    })
  })
}
