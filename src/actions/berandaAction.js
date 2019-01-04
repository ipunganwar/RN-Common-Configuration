import { queryMenuKantin, queryMenuBySekolah, queryBeranda, queryTransaksi, mutationProfile, queryMyOrder } from '../graphql-client'
import { SetActiveDateBeranda } from './calendarTelahPesan'
import { SetActiveDate } from './calendarPesan'
import { SetEditedOrders, SetOrders, CancelEditedOrders } from './editOrderMenu'
import { SetProfile } from './profileAction'
import axios from 'axios'
import { connection } from '../helpers/api'
import { Navigation } from 'react-native-navigation'

export const setFCMToken = (userToken, fcmToken) => {
  console.log('ada ni barangnya', userToken, fcmToken)
  return dispatch => {
    (async () => {
      console.log('ada ni barangnya', userToken, fcmToken)
      try {
        let setFcmToken = await axios.post(`${connection.server.project_name}/mobile/auth/refreshDeviceToken`, {
          'firebaseToken' : fcmToken
        }, {
          headers: {
            'token' : userToken
          }
        })
      } catch (error) {
        console.error('gagal update token cuk', error)
      }
    })()
  }
}

export const SetToken = (token) => {
  return {
    type: 'Token',
    payload: token
  }
}

export const SetPostEditedOrders = (token, order, editedOrder) => {
  let url = `${connection.server.wallet}?methods=editOrdersPelanggan`
  let data = JSON.stringify({
    orders: order,
    editedOrders: editedOrder,
    token: token
  })

  return dispatch => {
    (async function(token, order, editedOrder){
      try {
        let newData = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': connection.apiKey
          },
        })
        if( newData.status == 200 ) {
          const response = await queryMyOrder(token)

          let tempArr = []
          let newArr = []
          let orders = response.data.listMyOrders

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

            dispatch(SetProfile(response.data))
            dispatch(SetOrders(newArr))
            dispatch(SetEditedOrders(newArr))

        }

      } catch (err) {
        console.log('beranda action SetPostEditedOrders error: ',err);
        Navigation.showLightBox({
          screen: 'NotificationLightBox',
          passProps: {
            icon: 'Warning',
            title: 'Error',
            text: err
          },
          style: {
            tapBackgroundToDismiss: true,
            backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
            backgroundColor: "rgba(18,10,28,0.55)" // tint color for the background, you can specify alpha here (optional)
          },
        })
      }
    })(token, order, editedOrder)
  }
}

export const GetOrder = (token) => {
  return dispatch => {
  (async function(token){
    try {
      //real state in here
      const response = await queryMyOrder(token)

      let tempArr = []
      let newArr = []
      let orders = response.data.listMyOrders

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


        dispatch(SetProfile(response.data))
        dispatch(SetOrders(newArr))
        dispatch(SetEditedOrders(newArr))
      } catch (err) {
        console.log('GetOrder action error: ',err);
      }
    })(token)
  }
}

export const SetBeranda = (token) => {
    return dispatch => {
    (async function(token){
      try {
        //real state in here
        const response = await queryBeranda(token)

        let tempArr = []
        let newArr = []
        let lalala = []
        let orders = response.data.listMyOrders

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

        dispatch(SetActiveDateBeranda(response.data.jadwal))
        dispatch(SetProfile(response.data))
        dispatch(SetOrders(newArr))
        dispatch(SetEditedOrders(newArr))
        dispatch(CancelEditedOrders(newArr))
        dispatch(SetActiveDate(response.data.jadwal))

      } catch (err) {
        console.log('SetBeranda action error: ',err);
      }
    })(token)
  }
}


const Loading = (currentLoading) => {
  return {
    type: 'Loading',
    payload: currentLoading
  }
}
