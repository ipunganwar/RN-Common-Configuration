const defaultState = {
  orders: [],
  editedOrders: []
}

const TelahOrderMenu = (state=defaultState, action) => {
  switch (action.type) {
    case 'SetOrders':
      var data = {...state, orders: JSON.parse(JSON.stringify(action.payload.newOrders))}
      return data

    case 'SetEditedOrders':
      var data = {...state, editedOrders: JSON.parse(JSON.stringify(action.payload.newOrders))}
      return data

    case 'CancelEditedOrders':
      var data = {...state, editedOrders: JSON.parse(JSON.stringify(action.payload.newOrders))}
      return data
    default :
      return state
  }
}

export default TelahOrderMenu
