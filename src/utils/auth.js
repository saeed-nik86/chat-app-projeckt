import Cookies from 'js-cookie'
const TokenKey = 'Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token,
    {
      sameSite: 'strict',
      path: '/'
    }
  )
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
