const defaultState = {
  activeDate: [{}],
  currentActiveDate: 0,
  currentActiveIstirahatTab: 0
}

const CalendarTelahPesan = (state=defaultState, action) => {
  switch (action.type) {
    case 'SetCurrentActiveIstirahatTabBeranda':
      var data = {...state, currentActiveIstirahatTab: action.payload.currentActiveIstirahatTab}
      return data
    case 'SetCurrentActiveDateBeranda':
      var data = {...state, currentActiveDate: action.payload.currentActiveDate}
      return data
    case 'SetActiveDateBeranda':
      var data = {...state, activeDate: action.payload.activeDate}
      return data
    default :
      return state
  }
}

export default CalendarTelahPesan
