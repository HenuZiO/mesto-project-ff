import './styles/index.css'

import { createCard, handleCardLike } from './components/card.js'
import {
  openModal,
  closeModal,
  handleOverlayClose,
  pendingOnSave,
  pendingOffSave
} from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js'
import {
  apiGetUserInfo,
  apiGetCards,
  apiUpdateUserInfo,
  apiAddCard,
  apiUpdateUserAvatar,
  apiDeleteCard
} from './components/api.js'

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
const editAvatarModal = document.querySelector('.popup_type_edit-avatar')
const addCardModal = document.querySelector('.popup_type_new-card')
const imageModal = document.querySelector('.popup_type_image')
const confirmDeleteModal = document.querySelector('.popup_type_confirm-delete')

// Modal Content- edit profile
const editProfileForm = document.querySelector('form[name="edit-profile"]')
const nameInput = editProfileForm.querySelector('.popup__input_type_name')
const jobInput = editProfileForm.querySelector('.popup__input_type_description')

// Modal Content - edit avatar
const editAvatarForm = document.querySelector('form[name="edit-avatar"]')
const avatarInput = editAvatarForm.querySelector('.popup__input_type_url')

// Modal Content - add card
const addCardForm = document.querySelector('form[name="new-place"]')
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name')
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url')

// Modal Content - card image
const imageModalImg = imageModal.querySelector('.popup__image')
const imageModalCaption = imageModal.querySelector('.popup__caption')

// Modal Content - confirm delete
const confirmDeleteForm = confirmDeleteModal.querySelector('form[name="confirm-delete"]')

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
  pendingOnSave(editProfileForm, 'Сохранение...')

  apiUpdateUserInfo(nameInput.value, jobInput.value)
    .then(updatedUserData => {
      profile.name = updatedUserData.name
      profile.about = updatedUserData.about
      profileName.textContent = profile.name
      profileJob.textContent = profile.about
      closeModal(editProfileModal)
    })
    .catch(err => console.error('Ошибка при обновлении профиля:', err))
    .finally(() => pendingOffSave(editProfileForm, 'Сохранить'))
}

// Add card - Modal Handlers
function handleAddCardFormSubmit(event) {
  event.preventDefault()
  pendingOnSave(addCardForm, 'Создание...')

  const name = cardNameInput.value
  const link = cardLinkInput.value

  apiAddCard(name, link)
    .then(newCardData => {
      const cardElement = createCard(
        newCardData,
        handleCardLike,
        handleImageClick,
        profile._id,
        confirmDeleteModal
      )
      cardsList.prepend(cardElement)

      event.target.reset()
      clearValidation(event.target, validationConfig)
      closeModal(addCardModal)
    })
    .catch(err => console.error('Ошибка при создании карточки:', err))
    .finally(() => pendingOffSave(addCardForm, 'Создать'))
}

// Image - Modal Handlers
function handleImageClick(name, link) {
  imageModalImg.src = link
  imageModalImg.alt = name
  imageModalCaption.textContent = name
  openModal(imageModal)
}

// Edit avatar - Modal Handlers
function handleEditAvatarFormSubmit(event) {
  event.preventDefault()
  pendingOnSave(editAvatarForm, 'Сохранение...')

  apiUpdateUserAvatar(avatarInput.value)
    .then(updatedUserData => {
      profile.avatar = updatedUserData.avatar
      profileImage.style.backgroundImage = `url(${profile.avatar})`
      closeModal(editAvatarModal)
    })
    .catch(err => console.error('Ошибка при обновлении аватара:', err))
    .finally(() => pendingOffSave(editAvatarForm, 'Сохранить'))
}

function handleConfirmDeleteFormSubmit(event) {
  event.preventDefault()
  pendingOnSave(confirmDeleteForm, 'Удаление...')

  const cardId = confirmDeleteModal.dataset.cardId
  const cardElement = document.querySelector(`.card[data-card-id="${cardId}"]`)

  apiDeleteCard(cardId)
    .then(() => {
      cardElement.remove()
      closeModal(confirmDeleteModal)
    })
    .catch(err => console.error('Ошибка при удалении карточки:', err))
    .finally(() => pendingOffSave(confirmDeleteForm, 'Да'))
}

editProfileButton.addEventListener('click', () => {
  fillProfileForm()
  clearValidation(editProfileForm, validationConfig)
  openModal(editProfileModal)
})

addCardButton.addEventListener('click', () => {
  clearValidation(addCardForm, validationConfig)
  openModal(addCardModal)
})

profileImage.addEventListener('click', () => {
  clearValidation(editAvatarForm, validationConfig)
  openModal(editAvatarModal)
})

editProfileForm.addEventListener('submit', handleProfileFormSubmit)
addCardForm.addEventListener('submit', handleAddCardFormSubmit)
editAvatarForm.addEventListener('submit', handleEditAvatarFormSubmit)
confirmDeleteForm.addEventListener('submit', handleConfirmDeleteFormSubmit)

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
        handleCardLike,
        handleImageClick,
        profile._id,
        confirmDeleteModal
      )
      cardsList.append(cardElement)
    })
  })
  .catch(err => console.error('Error loading data:', err))
