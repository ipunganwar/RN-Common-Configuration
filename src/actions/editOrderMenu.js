export const SetOrders = (orders) => {
  return {
    type: 'SetOrders',
    payload: {
      newOrders: orders
    }
  }
}

export const SetEditedOrders = (orders) => {
  return {
    type: 'SetEditedOrders',
    payload: {
      newOrders: orders
    }
  }
}

export const CancelEditedOrders = (orders) => {
  return {
    type: 'CancelEditedOrders',
    payload: {
      newOrders: orders
    }
  }
}


export const IncreaseQuantityTelahOrderMenu = (itemId, indexTanggal, istirahat, cb, index) => {
  return (dispatch, state) => {

    let order = state().TelahOrderMenu.editedOrders.slice()
    let orders = [...order]
    let indexAda = -1
    let nambah = 0

    for (let i = 0; i < orders.length; i++) {
      let dateOrder = new Date(orders[i].tanggal_ambil)
      let dateCalendarAktif = new Date(state().CalendarTelahPesan.activeDate[indexTanggal].tanggal_tutup)
      if (dateOrder.getUTCDate() == dateCalendarAktif.getUTCDate() && dateOrder.getUTCMonth() == dateCalendarAktif.getUTCMonth() && dateOrder.getUTCFullYear() == dateCalendarAktif.getUTCFullYear()) {
        indexAda = i
      }
    }

    if (indexAda < 0) {
      //ini ntar buat object tanggal baru
    }

    switch (istirahat) {
      case 0:
          for (let i = 0;i < orders[indexAda].transaksi_detail.length; i++) {
            if (itemId.kode_outlet === orders[indexAda].transaksi_detail[i].kode_outlet && itemId._id === orders[indexAda].transaksi_detail[i].kode_menu._id && itemId.jam_istirahat == orders[indexAda].transaksi_detail[i].jam_istirahat) {
              let tambah = orders[indexAda].transaksi_detail[i].jumlah_pesan += 1

              let subtotal = orders[indexAda].transaksi_detail[i].harga_beli * tambah
              let data = {...orders[indexAda].transaksi_detail[i], jumlah_pesan: tambah, sub_total: subtotal }
              orders[indexAda].transaksi_detail.splice(i, 1, data)
            }
          }
        break;
      case 1:
        for (let i = 0;i < orders[indexAda].transaksi_detail.length; i++) {
          if (itemId.kode_outlet === orders[indexAda].transaksi_detail[i].kode_outlet && itemId._id === orders[indexAda].transaksi_detail[i].kode_menu._id && itemId.jam_istirahat == orders[indexAda].transaksi_detail[i].jam_istirahat) {
            let tambah = orders[indexAda].transaksi_detail[i].jumlah_pesan += 1
            let subtotal = orders[indexAda].transaksi_detail[i].harga_beli * (tambah - orders[indexAda].transaksi_detail[i].jumlah_ambil - orders[indexAda].transaksi_detail[i].jumlah_kembali)
            let data = {...orders[indexAda].transaksi_detail[i], jumlah_pesan: tambah, sub_total: subtotal }
            orders[indexAda].transaksi_detail.splice(i, 1, data)
          }
        }
        break;
      case 2:
        for (let i = 0;i < orders[indexAda].transaksi_detail.length; i++) {
          if (itemId.kode_outlet === orders[indexAda].transaksi_detail[i].kode_outlet && itemId._id === orders[indexAda].transaksi_detail[i].kode_menu._id && itemId.jam_istirahat == orders[indexAda].transaksi_detail[i].jam_istirahat) {
            let tambah = orders[indexAda].transaksi_detail[i].jumlah_pesan += 1
            let subtotal = orders[indexAda].transaksi_detail[i].harga_beli * (tambah - orders[indexAda].transaksi_detail[i].jumlah_ambil - orders[indexAda].transaksi_detail[i].jumlah_kembali)
            let data = {...orders[indexAda].transaksi_detail[i], jumlah_pesan: tambah, sub_total: subtotal }
            orders[indexAda].transaksi_detail.splice(i, 1, data)
          }
        }
        break;
      case 3:
        for (let i = 0;i < orders[indexAda].transaksi_detail.length; i++) {
          if (itemId.kode_outlet === orders[indexAda].transaksi_detail[i].kode_outlet && itemId._id === orders[indexAda].transaksi_detail[i].kode_menu._id && itemId.jam_istirahat == orders[indexAda].transaksi_detail[i].jam_istirahat) {
            let tambah = orders[indexAda].transaksi_detail[i].jumlah_pesan += 1
            let subtotal = orders[indexAda].transaksi_detail[i].harga_beli * (tambah - orders[indexAda].transaksi_detail[i].jumlah_ambil - orders[indexAda].transaksi_detail[i].jumlah_kembali)
            let data = {...orders[indexAda].transaksi_detail[i], jumlah_pesan: tambah, sub_total: subtotal }
            orders[indexAda].transaksi_detail.splice(i, 1, data)
          }
        }
        break;
      default:
    }
    return dispatch(SetEditedOrders(orders, cb))
  }
}

export const DecreaseQuantityTelahOrderMenu = (itemId, indexTanggal, istirahat, cb, index) => {
  return (dispatch, state) => {
    let orders = state().TelahOrderMenu.editedOrders.slice()
    let indexAda = -1
    for (let i = 0; i < orders.length; i++) {
      let dateOrder = new Date(orders[i].tanggal_ambil)
      let dateCalendarAktif = new Date(state().CalendarTelahPesan.activeDate[indexTanggal].tanggal_tutup)
      if (dateOrder.getUTCDate() == dateCalendarAktif.getUTCDate() && dateOrder.getUTCMonth() == dateCalendarAktif.getUTCMonth() && dateOrder.getUTCFullYear() == dateCalendarAktif.getUTCFullYear()) {
        indexAda = i
      }
    }

    if (indexAda < 0) {
      //ini ntar buat object tanggal baru
    }
    switch (istirahat) {
      case 0:
        if (index < orders[indexAda].transaksi_detail.length) {
          for (let i = 0;i < orders[indexAda].transaksi_detail.length; i++) {
            if (itemId.kode_outlet === orders[indexAda].transaksi_detail[i].kode_outlet && itemId._id === orders[indexAda].transaksi_detail[i].kode_menu._id && itemId.jam_istirahat == orders[indexAda].transaksi_detail[i].jam_istirahat) {
              let tambah = orders[indexAda].transaksi_detail[i].jumlah_pesan -= 1
              let subtotal = orders[indexAda].transaksi_detail[i].harga_beli * (tambah - orders[indexAda].transaksi_detail[i].jumlah_ambil - orders[indexAda].transaksi_detail[i].jumlah_kembali)
              let data = {...orders[indexAda].transaksi_detail[i], jumlah_pesan: tambah, sub_total: subtotal }
              orders[indexAda].transaksi_detail.splice(i, 1, data)
            }
          }
        } else if (index < ((orders[indexAda].istirahat1.length) + (orders[indexAda].istirahat2.length))) {
          for (let i = 0;i < orders[indexAda].istirahat2.length; i++) {
            if (itemId.kode_outlet === orders[indexAda].transaksi_detail[i].kode_outlet && itemId._id === orders[indexAda].transaksi_detail[i].kode_menu._id && itemId.jam_istirahat == orders[indexAda].transaksi_detail[i].jam_istirahat) {
              let tambah = orders[indexAda].transaksi_detail[i].jumlah_pesan -= 1
              let subtotal = orders[indexAda].transaksi_detail[i].harga_beli * (tambah - orders[indexAda].transaksi_detail[i].jumlah_ambil - orders[indexAda].transaksi_detail[i].jumlah_kembali)
              let data = {...orders[indexAda].transaksi_detail[i], jumlah_pesan: tambah, sub_total: subtotal }
              orders[indexAda].transaksi_detail.splice(i, 1, data)
            }
          }
        } else if (index <= ((orders[indexAda].istirahat1.length) + (orders[indexAda].istirahat2.length) + (orders[indexAda].istirahat3.length) )) {
          for (let i = 0;i < orders[indexAda].istirahat3.length; i++) {
            if (itemId.kode_outlet === orders[indexAda].transaksi_detail[i].kode_outlet && itemId._id === orders[indexAda].transaksi_detail[i].kode_menu._id && itemId.jam_istirahat == orders[indexAda].transaksi_detail[i].jam_istirahat) {
              let tambah = orders[indexAda].transaksi_detail[i].jumlah_pesan -= 1
              let subtotal = orders[indexAda].transaksi_detail[i].harga_beli * (tambah - orders[indexAda].transaksi_detail[i].jumlah_ambil - orders[indexAda].transaksi_detail[i].jumlah_kembali)
              let data = {...orders[indexAda].transaksi_detail[i], jumlah_pesan: tambah, sub_total: subtotal }
              orders[indexAda].transaksi_detail.splice(i, 1, data)
            }
          }
        }
        break;
      case 1:
        for (let i = 0;i < orders[indexAda].transaksi_detail.length; i++) {
          if (itemId._id === orders[indexAda].transaksi_detail[i].kode_menu._id && itemId.jam_istirahat == orders[indexAda].transaksi_detail[i].jam_istirahat) {
            let tambah = orders[indexAda].transaksi_detail[i].jumlah_pesan -= 1
            let subtotal = orders[indexAda].transaksi_detail[i].harga_beli * tambah
            let data = {...orders[indexAda].transaksi_detail[i], jumlah_pesan: tambah, sub_total: subtotal }
            orders[indexAda].transaksi_detail.splice(i, 1, data)
          }
        }
        break;
      case 2:
        for (let i = 0;i < orders[indexAda].transaksi_detail.length; i++) {
          if (itemId._id === orders[indexAda].transaksi_detail[i].kode_menu._id && itemId.jam_istirahat == orders[indexAda].transaksi_detail[i].jam_istirahat) {
            let tambah = orders[indexAda].transaksi_detail[i].jumlah_pesan -= 1
            let subtotal = orders[indexAda].transaksi_detail[i].harga_beli * tambah
            let data = {...orders[indexAda].transaksi_detail[i], jumlah_pesan: tambah, sub_total: subtotal }
            orders[indexAda].transaksi_detail.splice(i, 1, data)
          }
        }
        break;
      case 3:
        for (let i = 0;i < orders[indexAda].transaksi_detail.length; i++) {
          if (itemId._id === orders[indexAda].transaksi_detail[i].kode_menu._id && itemId.jam_istirahat == orders[indexAda].transaksi_detail[i].jam_istirahat) {
            let tambah = orders[indexAda].transaksi_detail[i].jumlah_pesan -= 1
            let subtotal = orders[indexAda].transaksi_detail[i].harga_beli * tambah
            let data = {...orders[indexAda].transaksi_detail[i], jumlah_pesan: tambah, sub_total: subtotal }
            orders[indexAda].transaksi_detail.splice(i, 1, data)
          }
        }
        break;
      default:
    }
    return dispatch(SetEditedOrders(orders, cb))
  }
}
