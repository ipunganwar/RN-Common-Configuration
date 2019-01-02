const defaultState = {
  token: ''
}

const TokenReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'Token':
      let data1 = {...state, token: action.payload}
      return data1

    default:
      return state
  }
}

export default TokenReducer
