const defaultState = {
  pelangganProfile: {
    email: 'A',
    alamat: 'A',
    password: 'A'
  }
}

const ProfileReducer = (state=defaultState, action) => {
  switch (action.type) {
    // case 'setQueryData':
    //   let data = {...state, pelangganProfile: action.payload}
    //   return data
    case 'SetProfile':
      let data1 = {...state, pelangganProfile: action.payload.currentProfile.pelangganProfile}
      return data1

    default:
      return state
  }
}

export default ProfileReducer
