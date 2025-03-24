import { apiDeleteCard, apiToggleCardLike } from './api.js'

const cardTemplate = document.querySelector('#card-template').content

export function createCard(
  cardInfo,
  handleRemoveCard,
  handleLike,
  handleImageClick,
  currentUserId
) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  const cardImage = cardElement.querySelector('.card__image')
  const cardTitle = cardElement.querySelector('.card__title')
  const cardDeleteButton = cardElement.querySelector('.card__delete-button')
  const cardLikeButton = cardElement.querySelector('.card__like-button')
  const cardLikesCounter = cardElement.querySelector('.card__like-counter')

  cardImage.src = cardInfo.link
  cardImage.alt = cardInfo.name
  cardTitle.textContent = cardInfo.name
  cardLikesCounter.textContent = cardInfo.likes.length

  if (cardInfo.likes.some(like => like._id === currentUserId)) {
    cardLikeButton.classList.add('card__like-button_is-active')
  }

  if (cardInfo.owner && cardInfo.owner._id === currentUserId) {
    cardDeleteButton.style.display = 'block'
  } else {
    cardDeleteButton.style.display = 'none'
  }

  cardDeleteButton.addEventListener('click', () => {
    handleRemoveCard(cardElement, cardInfo._id)
  })

  cardLikeButton.addEventListener('click', () => {
    handleLike(cardLikeButton, cardInfo._id)
  })

  cardImage.addEventListener('click', () => {
    handleImageClick(cardInfo.name, cardInfo.link)
  })

  return cardElement
}

export function handleCardRemove(cardElement, cardId) {
  apiDeleteCard(cardId)
    .then(() => {
      cardElement.remove()
    })
    .catch(err => console.error('Ошибка при удалении карточки:', err))
}

export function handleCardLike(likeButton, cardId) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active')

  apiToggleCardLike(cardId, isLiked)
    .then(updatedCard => {
      likeButton.classList.toggle('card__like-button_is-active')
      const likesCounter = likeButton
        .closest('.card__like-container')
        .querySelector('.card__like-counter')
      likesCounter.textContent = updatedCard.likes.length
    })
    .catch(err => console.error('Ошибка при обновлении лайка:', err))
}
