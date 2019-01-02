const defaultState = {
  Loading: true
}

const Loading = (state=defaultState, action) => {
  switch (action.type) {
    case 'Loading':
      var data = {...state, Loading: action.payload}
      return data
    default:
      return state
  }
}

export default Loading
