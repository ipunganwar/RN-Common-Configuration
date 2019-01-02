export const SetCurrentActiveIstirahatTabBeranda = (currentActiveIstirahatTab) => {
  return {
    type: 'SetCurrentActiveIstirahatTabBeranda',
    payload: {
      currentActiveIstirahatTab
    }
  }
}

export const SetCurrentActiveDateBeranda = (currentActiveDate) => {
  return {
    type: 'SetCurrentActiveDateBeranda',
    payload: {
      currentActiveDate
    }
  }
}

export const SetActiveDateBeranda = (activeDate) => {
  return {
    type: 'SetActiveDateBeranda',
    payload: {
      activeDate
    }
  }
}
