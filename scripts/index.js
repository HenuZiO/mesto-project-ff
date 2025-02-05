const cardsList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content

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
