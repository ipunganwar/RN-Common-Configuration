const defaultState = {
  kantinList: []
}

const KantinList = (state=defaultState, action) => {
  switch (action.type) {
    case 'SetKantinList':
      let loading = action.payload.loading
      var data = {...state, kantinList: action.payload.currentKantinList, loading: loading}
      return data
      break

    default :
      return state
  }
}

export default KantinList
