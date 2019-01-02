import { combineReducers } from 'redux'

import CalendarPesan from './calendarPesanReducer'
import CalendarTelahPesan from './calendarTelahPesanReducer'
import OrderMenu from './orderMenuReducer'
import TelahOrderMenu from './telahOrderMenuReducer'
import KantinList from './kantinListReducer'
import MenuList from './menuListReducer'
import UserInfo from './userInfoReducer'
import LoginReducer from './loginReducer'
import Profile from './profileReducer'
import Loading from './Loading'
import TransaksiList from './transaksiReducer'
import TokenReducer from './setToken'
import TimeoutReducer from './timeoutReducer'

const rootReducer = combineReducers({
  CalendarPesan,
  CalendarTelahPesan,
  OrderMenu,
  TelahOrderMenu,
  KantinList,
  MenuList,
  UserInfo,
  LoginReducer,
  Profile,
  Loading,
  TransaksiList,
  TokenReducer,
  TimeoutReducer
})

export default rootReducer
