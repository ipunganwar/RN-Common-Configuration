import { queryKantinDanMenu } from '../graphql-client'
import axios from 'axios'
import { queryMyOrder } from '../graphql-client'
import { SetEditedOrders, SetOrders, CancelEditedOrders } from './editOrderMenu'
import { SetProfile } from './profileAction'
import { SetResetOrder } from './orderMenu'
import { connection } from '../helpers/api'
import { Navigation } from 'react-native-navigation'
import { Timeout } from './timeoutAction'
import { OffLoading } from './login'

export const SetNewOrderMenu = (menu, token) => {
  let url = `${connection.server.wallet}?methods=addNewOrdersPelanggan`
  let data = JSON.stringify({
    orders: menu,
    token: token
  })

  return dispatch => {
    (async function(token){
      try {
        console.log('SetNewOrderMenu', data, url)
        let newData = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': connection.apiKey
          },
        })
        console.log('ini pesenanan siapa aja',newData)
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
            console.log('set new order', response)
            dispatch(SetProfile(response.data))
            dispatch(SetOrders(newArr))
            dispatch(SetEditedOrders(newArr))
            dispatch(SetResetOrder())
            dispatch(OffLoading())
        }

      } catch (err) {
        console.log('kantin action SetNewOrderMenu error: ',err.response);
        dispatch(SetTimeout(err.response))
        dispatch(OffLoading())
        dispatch(Timeout(false))
      }
    })(token)

  }
}

export const SetResetTimeout = () => {
  return {
    type: 'ResetTimeout',
  }
}

export const GetKantinDanMenu = (token) => {
  let list = []
  let istirahat = {istirahat1: true, istirahat2: true, istirahat3: true}
  return dispatch => {
    (async function(token) {
      try {
        //REAL STATE IS HERE
        const response = await queryKantinDanMenu(token)
        response.data.listMyKantin.forEach((item, index) => {
          list.push({...item, ...istirahat})
        })
        console.log('masuk sini', list, response);
        let menuBySekolah = ''
        if(response.data.listMenuBySekolah === null) {
          menuBySekolah = []
        } else {
          menuBySekolah = response.data.listMenuBySekolah
        }
        let menu = {listMyKantin: list, listMenuBySekolah: menuBySekolah}

        dispatch(setKantinList(list, response.loading))
        dispatch(SetAllMenu(menu))

      } catch (err) {
        console.log('error action kantin GetKantinDanMenu: ', err)
        dispatch(Timeout(false))
      }
    })(token)
  }
}

export const SetTimeout = (timeout) => {
  return {
    type: 'Timeout KANTIN',
    payload: timeout
  }
}

export const setKantinList = (currentKantinList, loading) => {
  return {
    type: 'SetKantinList',
    payload: { currentKantinList, loading }
  }
}

export const SetAllMenu = (currentAllMenu) => {
  return {
    type: 'SetAllMenu',
    payload: currentAllMenu
  }
}

export const SetOrder = (currentOrder) => {
  return {
    type: 'SET DAH',
    payload: currentOrder
  }
}
