const defaultState = {
  isConnected: true,
  timeout_kantin: 'a'
}

const TimeoutReducer = (state=defaultState, action) => {
  let data;
  let timeout;
  switch (action.type) {
    case 'Timeout':
      data = {...state, isConnected: JSON.parse(JSON.stringify(action.payload))}
      return data

    case 'Timeout KANTIN':
      if (action.payload.status === 504 || action.payload.status === 502) {
        timeout = {...state, timeout_kantin: JSON.parse(JSON.stringify(true))}
        return timeout
      }
      break

    case 'ResetTimeout':
      var reset = {...state, timeout_kantin: JSON.parse(JSON.stringify('a'))}
      return reset
      break

    default:
      return state
  }
}

export default TimeoutReducer
