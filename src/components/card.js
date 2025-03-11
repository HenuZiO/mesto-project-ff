const cardTemplate = document.querySelector('#card-template').content

export function removeCard(cardElement) {
  cardElement.remove()
}

export function createCard(cardInfo, handleRemoveCard, handleLike, handleImageClick) {
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
    handleImageClick(cardInfo.name, cardInfo.link)
  })

  return cardElement
}

export function toggleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active')
}
