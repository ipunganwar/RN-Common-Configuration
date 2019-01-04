import { LoginSuccess, LoginFailed } from '../actions/login'

const login = {
  username: '0023012222',
  password: 'project_name123'
}

const success = {
    status: 200,
    data: ['berhasil login']
}

const failed = {
    status: 404,
    data: ['user / password not found']
}

export function getLoginDummy (username, password) {
    return dispatch => {
      if(login.username === username && login.password === password) {
        dispatch(LoginSuccess(success))
      }
      else if (username.length === 0 && password.length === 0) {
        dispatch(LoginFailed(failed))
      }
      else {
        dispatch(LoginFailed(failed))
      }
    }
}
