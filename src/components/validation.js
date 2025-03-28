function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`)
  inputElement.classList.add(config.inputErrorClass)
  errorElement.classList.add(config.errorClass)
  errorElement.textContent = errorMessage
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`)
  inputElement.classList.remove(config.inputErrorClass)
  errorElement.classList.remove(config.errorClass)
  errorElement.textContent = ''
}

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid)
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true
    buttonElement.classList.add(config.inactiveButtonClass)
  } else {
    buttonElement.disabled = false
    buttonElement.classList.remove(config.inactiveButtonClass)
  }
}

function isValid(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity('')
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config)
  } else {
    hideInputError(formElement, inputElement, config)
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
  const buttonElement = formElement.querySelector(config.submitButtonSelector)

  toggleButtonState(inputList, buttonElement, config)

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      isValid(formElement, input, config)
      toggleButtonState(inputList, buttonElement, config)
    })
  })
}

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))

  formList.forEach(formElement => {
    setEventListeners(formElement, config)
  })
}

export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
  const buttonElement = formElement.querySelector(config.submitButtonSelector)

  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, config)
  })

  toggleButtonState(inputList, buttonElement, config)
}
