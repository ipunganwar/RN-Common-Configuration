export const OrderNewMenu = (newMenu) => {
  return {
    type: 'OrderNewMenu',
    payload: {
      newMenu
    }
  }
}

export const SetNewOrders = (newOrders) => {
  return {
    type: 'SetNewOrders',
    payload: {
      newOrders
    }
  }
}

export const SetResetOrder = () => {
  return {
    type: 'ResetOrder',
  }
}

export const NewOrder = (item, indexTanggal, istirahat, cb) => {
  return (dispatch, state) => {
    let currentDate = state().CalendarPesan.activeDate.slice(1, 6)
    let orders = state().OrderMenu.orders.slice()

    let indexAda = -1
    for (let i = 0; i < orders.length; i++) {
      let dateOrder = new Date(orders[i].date)
      let dateCalendarAktif = new Date(currentDate[indexTanggal].tanggal_tutup)
      if (dateOrder.getDate() == dateCalendarAktif.getDate() && dateOrder.getMonth() == dateCalendarAktif.getMonth() && dateOrder.getYear() == dateCalendarAktif.getYear()) {
        indexAda = i
      }
    }
    if (indexAda < 0) {
      switch (istirahat) {
        case 0:
          orders.push({
            date: new Date(currentDate[indexTanggal].tanggal_tutup).toDateString() + " " + new Date(currentDate[indexTanggal].tanggal_tutup).toTimeString(),
            istirahat1: [{
              id: item.kode_menu._id,
              menuName: item.kode_menu.nama_menu,
              kode_outlet: item.kode_outlet.kode_outlet,
              qty: 1,
              price: item.kode_menu.harga_terbaru,
              totalPrice: item.kode_menu.harga_terbaru
            }],
            istirahat2: [],
            istirahat3: [],
            total: item.kode_menu.harga_terbaru
          })
          break;
        case 1:
          orders.push({
            date: new Date(currentDate[indexTanggal].tanggal_tutup).toDateString() + " " + new Date(currentDate[indexTanggal].tanggal_tutup).toTimeString(),
            istirahat1: [],
            istirahat2: [{
              id: item.kode_menu._id,
              menuName: item.kode_menu.nama_menu,
              kode_outlet: item.kode_outlet.kode_outlet,
              qty: 1,
              price: item.kode_menu.harga_terbaru,
              totalPrice: item.kode_menu.harga_terbaru
            }],
            istirahat3: [],
            total: item.kode_menu.harga_terbaru
          })
          break;
        case 2:
          orders.push({
            date: new Date(currentDate[indexTanggal].tanggal_tutup).toDateString() + " " + new Date(currentDate[indexTanggal].tanggal_tutup).toTimeString(),
            istirahat1: [],
            istirahat2: [],
            istirahat3: [{
              id: item.kode_menu._id,
              menuName: item.kode_menu.nama_menu,
              kode_outlet: item.kode_outlet.kode_outlet,
              qty: 1,
              price: item.kode_menu.harga_terbaru,
              totalPrice: item.kode_menu.harga_terbaru
            }],
            total: item.kode_menu.harga_terbaru
          })
          break;
        default:

      }
    } else {
      switch (istirahat) {
        case 0:
            orders[indexAda].istirahat1.push({
              id: item.kode_menu._id,
              menuName: item.kode_menu.nama_menu,
              kode_outlet: item.kode_outlet.kode_outlet,
              qty: 1,
              price: item.kode_menu.harga_terbaru,
              totalPrice: item.kode_menu.harga_terbaru
            })
            orders[indexAda].total += item.kode_menu.harga_terbaru
        break;
        case 1:
            orders[indexAda].istirahat2.push({
              id: item.kode_menu._id,
              menuName: item.kode_menu.nama_menu,
              kode_outlet: item.kode_outlet.kode_outlet,
              qty: 1,
              price: item.kode_menu.harga_terbaru,
              totalPrice: item.kode_menu.harga_terbaru
            })
            orders[indexAda].total += item.kode_menu.harga_terbaru
          break;
        case 2:
            orders[indexAda].istirahat3.push({
              id: item.kode_menu._id,
              menuName: item.kode_menu.nama_menu,
              kode_outlet: item.kode_outlet.kode_outlet,
              qty: 1,
              price: item.kode_menu.harga_terbaru,
              totalPrice: item.kode_menu.harga_terbaru
            })
            orders[indexAda].total += item.kode_menu.harga_terbaru
          break;
        default:
      }
    }
    return dispatch(SetNewOrders(sortOrders(orders)))
    cb()
  }
}

export const DecreaseQuantity = (itemId, indexTanggal, istirahat, cb) => {
  return (dispatch, state) => {
    let currentDate = state().CalendarPesan.activeDate.slice(1, 6)
    let orders = state().OrderMenu.orders.slice()
    let indexAda = -1
    for (let i = 0; i < orders.length; i++) {
      let dateOrder = new Date(orders[i].date)
      let dateCalendarAktif = new Date(currentDate[indexTanggal].tanggal_tutup)
      if (dateOrder.getDate() == dateCalendarAktif.getDate() && dateOrder.getMonth() == dateCalendarAktif.getMonth() && dateOrder.getYear() == dateCalendarAktif.getYear()) {
        indexAda = i
      }
    }
    switch (istirahat) {
      case 0:
        for (let i = 0;i < orders[indexAda].istirahat1.length; i++) {
          if (itemId === orders[indexAda].istirahat1[i].id) {
            orders[indexAda].istirahat1[i].qty -= 1
            orders[indexAda].istirahat1[i].totalPrice -= orders[indexAda].istirahat1[i].price
            orders[indexAda].total -= orders[indexAda].istirahat1[i].price
            if (orders[indexAda].istirahat1[i].qty < 1) {
              orders[indexAda].istirahat1.splice(i, 1)
            }
          }
        }
        break;
      case 1:
        for (let i = 0;i < orders[indexAda].istirahat2.length; i++) {
          if (itemId === orders[indexAda].istirahat2[i].id) {
            orders[indexAda].istirahat2[i].qty -= 1
            orders[indexAda].istirahat2[i].totalPrice -= orders[indexAda].istirahat2[i].price
            orders[indexAda].total -= orders[indexAda].istirahat2[i].price
            if (orders[indexAda].istirahat2[i].qty < 1) {
              orders[indexAda].istirahat2.splice(i, 1)
            }
          }
        }
        break;
      case 2:
        for (let i = 0;i < orders[indexAda].istirahat3.length; i++) {
          if (itemId === orders[indexAda].istirahat3[i].id) {
            orders[indexAda].istirahat3[i].qty -= 1
            orders[indexAda].istirahat3[i].totalPrice -= orders[indexAda].istirahat3[i].price
            orders[indexAda].total -= orders[indexAda].istirahat3[i].price
            if (orders[indexAda].istirahat3[i].qty < 1) {
              orders[indexAda].istirahat3.splice(i, 1)
            }
          }
        }
        break;
      default:
    }
    if (orders[indexAda].total <= 0) {
      orders.splice(indexAda, 1)
      return dispatch(SetNewOrders(sortOrders(orders)))
    }
    cb()
  }
}

export const IncreaseQuantity = (itemId, indexTanggal, istirahat, cb) => {
  return (dispatch, state) => {
    let currentDate = state().CalendarPesan.activeDate.slice(1, 6)
    let orders = state().OrderMenu.orders.slice()
    let indexAda = -1
    for (let i = 0; i < orders.length; i++) {
      let dateOrder = new Date(orders[i].date)
      let dateCalendarAktif = new Date(currentDate[indexTanggal].tanggal_tutup)
      if (dateOrder.getDate() == dateCalendarAktif.getDate() && dateOrder.getMonth() == dateCalendarAktif.getMonth() && dateOrder.getYear() == dateCalendarAktif.getYear()) {
        indexAda = i
      }
    }
    if (indexAda < 0) {
      //ini ntar buat object tanggal baru
    }
    switch (istirahat) {
      case 0:

        for (let i = 0;i < orders[indexAda].istirahat1.length; i++) {
          if (itemId === orders[indexAda].istirahat1[i].id) {
            orders[indexAda].istirahat1[i].qty += 1
            orders[indexAda].istirahat1[i].totalPrice += orders[indexAda].istirahat1[i].price
            orders[indexAda].total += orders[indexAda].istirahat1[i].price
          }
        }
        break;
      case 1:
        for (let i = 0;i < orders[indexAda].istirahat2.length; i++) {
          if (itemId === orders[indexAda].istirahat2[i].id) {
            orders[indexAda].istirahat2[i].qty += 1
            orders[indexAda].istirahat2[i].totalPrice += orders[indexAda].istirahat2[i].price
            orders[indexAda].total += orders[indexAda].istirahat2[i].price
          }
        }
        break;
      case 2:
        for (let i = 0;i < orders[indexAda].istirahat3.length; i++) {
          if (itemId === orders[indexAda].istirahat3[i].id) {
            orders[indexAda].istirahat3[i].qty += 1
            orders[indexAda].istirahat3[i].totalPrice += orders[indexAda].istirahat3[i].price
            orders[indexAda].total += orders[indexAda].istirahat3[i].price
          }
        }
        break;
      default:
    }
    cb()
  }
}

export function sortOrders(orders) {
  for (let i=0;i<orders.length;i++) {
    for (let j=0;j<(orders.length - i - 1);j++) {
      if (orders[j].date > orders[j+1].date) {
        let temp = orders[j]
        orders[j] = orders[j+1]
        orders[j+1] = temp
      }
    }
  }
  return orders
}
