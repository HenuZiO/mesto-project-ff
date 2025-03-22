export function openModal(modal) {
  modal.classList.add('popup_is-opened')
  document.addEventListener('keydown', handleCloseModal)
}

export function closeModal(modal) {
  const form = modal.querySelector('.popup__form')
  modal.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', handleCloseModal)
  form.reset()
}

function handleCloseModal(event) {
  if (event.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened')
    if (openedModal) closeModal(openedModal)
  }
}

export function handleOverlayClose(event) {
  const popup = event.target.closest('.popup')
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
    closeModal(popup)
  }
}
