import { profileId, BASE_API_URL, GROUP_ID, headers } from '../index.js'

const cardTemplate = document.querySelector('#card-template').content

export function removeCard(cardElement, cardId) {
  return fetch(`${BASE_API_URL}${GROUP_ID}/cards/${cardId}`, {
    method: 'DELETE',
    headers
  })
    .then(res => {
      if (res.ok) {
        cardElement.remove()
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch(err => console.error('Ошибка при удалении карточки:', err))
}

export function createCard(cardInfo, handleRemoveCard, handleLike, handleImageClick) {
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

  if (cardInfo.owner && cardInfo.owner._id === profileId) {
    cardDeleteButton.style.display = 'block'
  } else {
    cardDeleteButton.style.display = 'none'
  }

  cardDeleteButton.addEventListener('click', () => {
    handleRemoveCard(cardElement, cardInfo._id)
  })

  cardLikeButton.addEventListener('click', () => {
    handleLike(cardLikeButton)
  })

  cardImage.addEventListener('click', () => {
    handleImageClick(cardInfo.name, cardInfo.link)
  })

  return cardElement
}

export function toggleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active')
}
