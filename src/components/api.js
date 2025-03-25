const BASE_API_URL = 'https://mesto.nomoreparties.co/v1/'
const GROUP_ID = 'wff-cohort-35'
const API_URL = `${BASE_API_URL}${GROUP_ID}`
const API_TOKEN = '77c56277-51e8-4458-ab64-19fe10c2087a'

const headers = {
  authorization: API_TOKEN,
  'Content-Type': 'application/json'
}

function handleResponse(res) {
  if (res.ok) return res.json()
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const apiGetUserInfo = () => {
  return fetch(`${API_URL}/users/me`, { headers }).then(handleResponse)
}

export const apiUpdateUserAvatar = avatarUrl => {
  return fetch(`${API_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  }).then(handleResponse)
}

export const apiUpdateUserInfo = (name, about) => {
  return fetch(`${API_URL}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      name,
      about
    })
  }).then(handleResponse)
}

export const apiGetCards = () => {
  return fetch(`${API_URL}/cards`, { headers }).then(handleResponse)
}

export const apiAddCard = (name, link) => {
  return fetch(`${API_URL}/cards`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name,
      link
    })
  }).then(handleResponse)
}

export const apiDeleteCard = cardId => {
  return fetch(`${API_URL}/cards/${cardId}`, {
    method: 'DELETE',
    headers
  }).then(handleResponse)
}

export const apiToggleCardLike = (cardId, isLiked) => {
  const method = isLiked ? 'DELETE' : 'PUT'

  return fetch(`${API_URL}/cards/likes/${cardId}`, {
    method,
    headers
  }).then(handleResponse)
}
