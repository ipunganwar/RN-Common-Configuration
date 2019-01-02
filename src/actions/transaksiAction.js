import { queryTransaksi, mutationTopupTransfer } from '../graphql-client'
import { dummyQueryTransaksi } from '../dummy-state/transaksi-dummy'
import { Navigation } from 'react-native-navigation'
import { Timeout } from './timeoutAction'


export const SetTopupTransfer = (token, tanggal_waktu, bank_asal, bank_tujuan, nama_pengirim, saldo_topup) => {
  return dispatch => {
    (async function() {
      try {
        const mutation = await mutationTopupTransfer(token, tanggal_waktu, bank_asal, bank_tujuan, nama_pengirim, saldo_topup)
        console.log('mutation', mutation)

      } catch (err) {
        console.log('action topup error: ', err)
        dispatch(Timeout(false))
      }
    })()
  }
}

export const GetTransaksi = (token) => {
  return dispatch => {
    (async function(token) {
      try {
        const response = await queryTransaksi(token)

        dispatch(SetTransaksi(response.data.listMyTransaksi, response.loading))
      } catch (err) {
        console.log('action transaksi error: ', err)
        dispatch(Timeout(false))
      }

    })(token)
  }
}

const SetTransaksi = (currentTransaksi, loading) => {
  return {
    type: 'Transaksi',
    payload: { currentTransaksi, loading }
  }
}
