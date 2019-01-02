import axios from 'axios'
import { connection } from '../helpers/api'
import { Navigation } from 'react-native-navigation'
import { ErrorTimeout, Timeout } from './timeoutAction'

export function LoginSuccess(response) {
  return {
    type: 'LOGIN_SUCCESS',
    payload: response
  }
}

export function LoginFailed(error) {
  return {
    type: 'LOGIN_FAILED',
    payload: error
  }
}

export function VerificationPassword(response) {
  return {
    type: 'VERIFICATION_PASSWORD',
    payload: response
  }
}

export function VerificationPasswordError(error) {
  return {
    type: 'VERIFICATION_ERROR',
    payload: error
  }
}
export const ResetVerificationPassword = () => {
  return {
    type: 'RESET_VERIFICATION_PASSWORD',
  }
}

export const OnLoading = () => {
  return {
    type: 'ONLOADING_LOGIN',
  }
}
export const OffLoading = () => {
  return {
    type: 'OFFLOADING_LOGIN',
  }
}

export const GetLogin = (username, password) => {
  console.log("masuk sini function", connection.server.ekantin)
  return function action(dispatch){
    dispatch({ type: 'LOGIN'})
    let url = `${connection.server.ekantin}mobile/auth/login`
    let data = {
        username: username,
        password: password
      }
    const request = axios.post(url, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    return request.then(
      response => dispatch(LoginSuccess(response)),
      error => dispatch(LoginFailed(error))
    )
  }
}

export const GetVerificationPassword = (token, password) => {
  let url = `${connection.server.ekantin}mobile/auth/verif_password`
  let data = {
      password: password,
    }

  return dispatch => {
    (async function(token){
        dispatch(OnLoading())
      try {
        const request = await axios.post(url, JSON.stringify({password: data.password}), {
          headers: {
            'token': `${token}`,
            'Content-Type': 'application/json',
          },
        })
        dispatch(VerificationPassword(request.data))
        // dispatch(OffLoading())

      } catch (err){
        console.log('login action error: ',err.response);
        dispatch(VerificationPasswordError(err.response))
      }
    })(token)
  }
}
