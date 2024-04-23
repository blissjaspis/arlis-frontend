import axios from 'axios'
import Cookies from 'js-cookie'

export function apiAuth() {
  const domain = import.meta.env.VITE_BACKEND_DOMAIN
  const session = Cookies.get('ar_gym_session')

  const api = axios.create({
    baseURL: domain,
    headers: {
      Authorization: session,
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })

  return api
}

export function setSession(type: string, access_token: string) {
  Cookies.set('ar_gym_session', `${type} ${access_token}`)
}
