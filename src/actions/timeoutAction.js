import { NetInfo } from 'react-native';

export const CheckingTimeout = () => {
  return dispatch => {
    (async function(){
      try {
        let isConnected = await NetInfo.isConnected.fetch()
        dispatch(Timeout(isConnected))
      } catch (err) {
        console.log('CheckingTimeout action error: ',err);
      }

    })()
  }
}

export const Timeout = (currentTimeout) => {
  return {
    type: 'Timeout',
    payload: currentTimeout
  }
}

export const ErrorTimeout = (currentTimeout) => {
  return {
    type: 'Error Timeout',
    payload: currentTimeout
  }
}
