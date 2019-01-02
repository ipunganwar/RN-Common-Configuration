const defaultState = {
  saldo: 150000
}

const UserInfo = (state=defaultState, action) => {
  switch (action.type) {
    case 'SetSaldo':
      var data = {...state, saldo: action.payload.saldo}
      return data
    default :
      return state
  }
}

export default UserInfo
