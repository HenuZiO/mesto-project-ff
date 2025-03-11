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

// Elements
const cardsList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content
const editProfileButton = document.querySelector('.profile__edit-button')

// Modals
const editProfileModal = document.querySelector('.popup_type_edit')

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

initialCards.forEach(card => {
  const cardElement = createCard(card, removeCard)
  cardsList.append(cardElement)
})

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

editProfileButton.addEventListener('click', () => {
  openModal(editProfileModal)
})

document.addEventListener('mousedown', event => {
  const popup = event.target.closest('.popup')

  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
    closeModal(popup)
  }
})
