import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const AccountId = 'Account-ID'
const AccountName = 'AccountName'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getID () {
  return Cookies.get(AccountId)
}

export function setID (id) {
  return Cookies.set(AccountId, id)
}

export function removeID () {
  return Cookies.remove(AccountId)
}

export function getAccount () {
  return Cookies.get(AccountName)
}

export function setAccount (name) {
  return Cookies.set(AccountName, name)
}

export function removeAccount () {
  return Cookies.remove(AccountName)
}
