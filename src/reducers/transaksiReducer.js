const defaultState = {
  listMyTransaksi: {
    AplikasiPembelianList: [],
    KasirPembelianList: [],
    TopupKartuList: [],
    PengembalianKartuList: [],
  }
}

const TransaksiList = (state=defaultState, action) => {
  switch (action.type) {
    case 'Transaksi':
      let { currentTransaksi } = action.payload
      let aplikasi = currentTransaksi.aplikasi.length > 0 ? [...currentTransaksi.aplikasi] : []
      let kasir = currentTransaksi.kasir.length > 0 ? [...currentTransaksi.kasir] : []
      let topup = currentTransaksi.topup.length > 0 ? [...currentTransaksi.topup] : []
      let pengembalian = currentTransaksi.pengembalian.length > 0 ? [...currentTransaksi.pengembalian] : []
      let loading = action.payload.loading
      let data = {...state, loading: loading, listMyTransaksi: {AplikasiPembelianList: aplikasi, KasirPembelianList: kasir, TopupKartuList: topup, PengembalianKartuList: pengembalian }}
      return data

    default:
      return state
  }
}

export default TransaksiList
