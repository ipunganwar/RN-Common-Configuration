const defaultState = {
  orders: []
}

const OrderMenu = (state=defaultState, action) => {
  switch (action.type) {
    case 'ResetOrder':
    let data = { orders: [] }
     return data

    case 'OrderNewMenu':
      let tempArr = []
      let newArr = []
      let orders = action.payload.newMenu

        for (var i = 0; i < orders.length; i++) {
          let date_pickup = new Date(orders[i].tanggal_ambil)
          let temp = date_pickup.getDate().toString() + date_pickup.getMonth().toString() + date_pickup.getYear().toString()
          if (tempArr.indexOf(temp) > -1 ){
            newArr[tempArr.indexOf(temp)].transaksi_detail = [...newArr[tempArr.indexOf(temp)].transaksi_detail, ...orders[i].transaksi_detail]
          } else {
            tempArr.push(temp)
            newArr.push(Object.assign({}, orders[i]))
          }
        }

        var data = {...state, orders: newArr}
        return data
        break;

    case 'SetNewOrders':
      var data = {...state, orders: [...action.payload.newOrders]}
      return data
    default :
      return state
  }
}

export default OrderMenu
