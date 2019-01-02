const defaultState = {
  activeDate: [{active: true}],
  currentActiveDate: 0,
  currentActiveIstirahatTab: 0,
  currentTanggalPenetapanMenu: 0,
}

const CalendarPesan = (state=defaultState, action) => {
  switch (action.type) {
    case 'SetCurrentActiveIstirahatTab':
      var data = {...state, currentActiveIstirahatTab: action.payload.currentActiveIstirahatTab}
      return data
    case 'SetCurrentActiveDate':
      var data = {...state, currentActiveDate: action.payload.currentActiveDate}
      return data
    case 'SetActiveDate':
      var data = {...state, activeDate: action.payload.activeDate}
      return data
    case 'SetTanggalPenetapanMenu':
      var data = {...state, currentTanggalPenetapanMenu: action.payload.currentTanggalPenetapanMenu}
      return data
    default :
      return state
  }
}

export default CalendarPesan
