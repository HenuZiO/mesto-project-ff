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
const editProfileForm = document.querySelector('form[name="edit-profile"]')
const nameInput = editProfileForm.querySelector('.popup__input_type_name')
const jobInput = editProfileForm.querySelector('.popup__input_type_description')

// Form - add card
const addCardForm = document.querySelector('form[name="new-place"]')
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name')
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url')

// Cards elements
const cardsList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content

// Modals
const editProfileModal = document.querySelector('.popup_type_edit')
const addCardModal = document.querySelector('.popup_type_new-card')
const imageModal = document.querySelector('.popup_type_image')

// Modal - Card image
const imageModalImg = imageModal.querySelector('.popup__image')
const imageModalCaption = imageModal.querySelector('.popup__caption')

function removeCard(cardElement) {
  cardElement.remove()
}

function createCard(cardInfo, handleRemoveCard, handleLike, handleImageClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  const cardImage = cardElement.querySelector('.card__image')
  const cardTitle = cardElement.querySelector('.card__title')
  const cardDeleteButton = cardElement.querySelector('.card__delete-button')
  const cardLikeButton = cardElement.querySelector('.card__like-button')

  cardImage.src = cardInfo.link
  cardImage.alt = cardInfo.name
  cardTitle.textContent = cardInfo.name

  cardDeleteButton.addEventListener('click', () => {
    handleRemoveCard(cardElement)
  })

  cardLikeButton.addEventListener('click', () => {
    handleLike(cardLikeButton)
  })

  cardImage.addEventListener('click', () => {
    handleImageClick(cardInfo)
  })

  return cardElement
}

function toggleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active')
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

document.addEventListener('mousedown', event => {
  const popup = event.target.closest('.popup')

  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
    closeModal(popup)
  }
})

function handleProfileFormSubmit(event) {
  event.preventDefault()

  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closeModal(editProfileModal)
}

function handleImageClick(cardData) {
  imageModalImg.src = cardData.link
  imageModalImg.alt = cardData.name
  imageModalCaption.textContent = cardData.name
  openModal(imageModal)
}

function handleAddCardFormSubmit(event) {
  event.preventDefault()

  const name = cardNameInput.value
  const link = cardLinkInput.value
  const cardElement = createCard({ name, link }, removeCard, toggleLike, handleImageClick)

  cardsList.prepend(cardElement)

  event.target.reset()
  closeModal(addCardModal)
}

editProfileButton.addEventListener('click', () => {
  fillProfileForm()
  openModal(editProfileModal)
})

addCardButton.addEventListener('click', () => {
  openModal(addCardModal)
})

editProfileForm.addEventListener('submit', handleProfileFormSubmit)
addCardForm.addEventListener('submit', handleAddCardFormSubmit)

initialCards.forEach(card => {
  const cardElement = createCard(card, removeCard, toggleLike, handleImageClick)
  cardsList.append(cardElement)
})
