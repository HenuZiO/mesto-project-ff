const BASE_API_URL = 'https://mesto.nomoreparties.co/v1/'
const GROUP_ID = 'wff-cohort-35'
const API_TOKEN = '77c56277-51e8-4458-ab64-19fe10c2087a'

const headers = {
  authorization: API_TOKEN,
  'Content-Type': 'application/json'
}

export const apiGetUserInfo = () => {
  return fetch(`${BASE_API_URL}${GROUP_ID}/users/me`, { headers }).then(res => {
    if (res.ok) return res.json()
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const apiUpdateProfileAvatar = avatarUrl => {
  return fetch(`${BASE_API_URL}${GROUP_ID}/users/me/avatar`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  }).then(res => {
    if (res.ok) return res.json()
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const apiGetCards = () => {
  return fetch(`${BASE_API_URL}${GROUP_ID}/cards`, { headers }).then(res => {
    if (res.ok) return res.json()
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const apiUpdateUserInfo = (name, about) => {
  return fetch(`${BASE_API_URL}${GROUP_ID}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      name,
      about
    })
  }).then(res => {
    if (res.ok) return res.json()
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const apiAddCard = (name, link) => {
  return fetch(`${BASE_API_URL}${GROUP_ID}/cards`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name,
      link
    })
  }).then(res => {
    if (res.ok) return res.json()
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const apiDeleteCard = cardId => {
  return fetch(`${BASE_API_URL}${GROUP_ID}/cards/${cardId}`, {
    method: 'DELETE',
    headers
  }).then(res => {
    if (res.ok) return res.json()
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const apiToggleCardLike = (cardId, isLiked) => {
  const method = isLiked ? 'DELETE' : 'PUT'

  return fetch(`${BASE_API_URL}${GROUP_ID}/cards/likes/${cardId}`, {
    method,
    headers
  }).then(res => {
    if (res.ok) return res.json()
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}
