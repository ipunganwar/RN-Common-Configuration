export const SetCurrentActiveIstirahatTab = (currentActiveIstirahatTab) => {
  return {
    type: 'SetCurrentActiveIstirahatTab',
    payload: {
      currentActiveIstirahatTab
    }
  }
}

export const SetCurrentActiveDate = (currentActiveDate) => {
  return {
    type: 'SetCurrentActiveDate',
    payload: {
      currentActiveDate
    }
  }
}

export const SetActiveDate = (activeDate) => {
  return {
    type: 'SetActiveDate',
    payload: {
      activeDate
    }
  }
}

export const SetTanggalPenetapanMenu = (currentTanggalPenetapanMenu) => {
  return {
    type: 'SetTanggalPenetapanMenu',
    payload: {
      currentTanggalPenetapanMenu
    }
  }
}
