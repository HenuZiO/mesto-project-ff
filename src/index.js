import './styles/index.css'

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

// Profile
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__description')
const editProfileButton = document.querySelector('.profile__edit-button')
const addCardButton = document.querySelector('.profile__add-button')

// Form - edit profile
const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_description')

// Elements
const cardsList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content

// Modals
const editProfileModal = document.querySelector('.popup_type_edit')
const addCardModal = document.querySelector('.popup_type_new-card')

function removeCard(cardElement) {
  cardElement.remove()
}

function createCard(cardInfo, handleRemoveCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  const cardImage = cardElement.querySelector('.card__image')
  const cardTitle = cardElement.querySelector('.card__title')
  const cardDeleteButton = cardElement.querySelector('.card__delete-button')

  cardImage.src = cardInfo.link
  cardImage.alt = cardInfo.name
  cardTitle.textContent = cardInfo.name

  cardDeleteButton.addEventListener('click', () => {
    handleRemoveCard(cardElement)
  })

  return cardElement
}

function openModal(modal) {
  modal.classList.add('popup_is-opened')
  document.addEventListener('keydown', handleCloseModal)
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', handleCloseModal)
}

function handleCloseModal(event) {
  const openedModal = document.querySelector('.popup_is-opened')
  if (openedModal && event.key === 'Escape') return closeModal(openedModal)
}

function fillProfileForm() {
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
}

editProfileButton.addEventListener('click', () => {
  openModal(editProfileModal)
  fillProfileForm()
})

addCardButton.addEventListener('click', () => {
  openModal(addCardModal)
})

document.addEventListener('mousedown', event => {
  const popup = event.target.closest('.popup')

  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
    closeModal(popup)
  }
})

function handleFormSubmit(event) {
  event.preventDefault()
  const formData = event.target.elements
  profileName.textContent = formData.name.value
  profileJob.textContent = formData.description.value
  closeModal(editProfileModal)
}

formElement.addEventListener('submit', handleFormSubmit)

initialCards.forEach(card => {
  const cardElement = createCard(card, removeCard)
  cardsList.append(cardElement)
})
