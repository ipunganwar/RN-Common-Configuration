import { queryProfile, mutationProfile, readNotification } from '../graphql-client'
import { Navigation } from 'react-native-navigation'

export const SetProfile = (currentProfile) => {
  return {
    type: 'SetProfile',
    payload: {
      currentProfile
    }
  }
}

export const GetUpdateProfile = (token, alamat, email, password) => {
  return dispatch => {
    (async function(token, alamat, email, password) {
      try {
        //real state here
        const mutate = await mutationProfile(token, alamat, email, password)
        const response = await queryProfile(token)

        dispatch(SetProfile(response.data))

      } catch (err) {
        console.log('error profile action: ', err);
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

    })(token, alamat, email, password)
  }
}

export const ReadAllNotification = (token, lastNotification) => {
  return dispatch => {
    (async function(token, lastNotification) {
      try {
        //real state here
        const mutate = await readNotification(token, lastNotification)
        const response = await queryProfile(token)
        
        dispatch(SetProfile(response.data))

      } catch (err) {
        console.log('error profile action, read notif: ', err);
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
    })(token, lastNotification)
  }
}
