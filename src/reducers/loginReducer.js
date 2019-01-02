const defaultState = {
    loginList: {
      status: 0,
      data: []
    },
    verif_password: 0,
    loading: 0
  }

  function LoginReducer(state = defaultState, action) {
    let data;
    switch(action.type) {
      case 'LOGIN_SUCCESS':
        data = {...state, loginList: action.payload}
        return data
        break
      case 'LOGIN_FAILED':
        data = {...state, loginList: action.payload}
        return data
        break
      case 'VERIFICATION_PASSWORD':
        data = {...state, verif_password: JSON.parse(JSON.stringify(action.payload.status)) ,loading: false}
        return data
        break
      case 'VERIFICATION_ERROR':
        data = {...state, verif_password: JSON.parse(JSON.stringify(action.payload.status)) ,loading: false}
        return data
        break
      case 'RESET_VERIFICATION_PASSWORD':
        data = {...state, verif_password: JSON.parse(JSON.stringify(0))}
        return data
        break
      case 'ONLOADING_LOGIN':
        data = {...state, loading: JSON.parse(JSON.stringify(true))}
        return data
        break
      case 'OFFLOADING_LOGIN':
        data = {...state, loading: JSON.parse(JSON.stringify(false))}
        return data
        break
      default:
        return state
    }
  }

  export default LoginReducer
