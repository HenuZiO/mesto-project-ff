export function openModal(modal) {
  modal.classList.add('popup_is-opened')
  document.addEventListener('keydown', handleCloseModal)
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', handleCloseModal)
}

function handleCloseModal(event) {
  const openedModal = document.querySelector('.popup_is-opened')
  if (openedModal && event.key === 'Escape') return closeModal(openedModal)
}

export function handleOverlayClose(event) {
  const popup = event.target.closest('.popup')
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
    closeModal(popup)
  }
}
