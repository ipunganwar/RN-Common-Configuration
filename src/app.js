import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import client from './client'
import store from './store'
import { ApolloProvider } from 'react-apollo'


registerScreens(store, ApolloProvider, client); // this is where you register all of your app's screens

Navigation.startSingleScreenApp({
  screen: {
    screen: 'OnBoarding1', // unique ID registered with Navigation.registerScreen
    navigatorStyle: {
      navBarHidden: true,
      orientation: 'portrait',
    }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  },
  appStyle: {
    orientation: 'portrait',
  },
})

// start the app
// Navigation.startTabBasedApp({
//   tabs: [
//     {
//       label: 'Beranda',
//       screen: 'Beranda',
//       navigationOptions: {
//         headerStyle: {
//           shadowOpacity: 1,
//           shadowOffset: {
//             height: 14,
//             width: 8
//           },
//           shadowColor: 'rgba(195,185,206,0.5)',
//           elevation: 9
//         }
//       },
//       icon: require('./assets/berandaTabIcon.png'),
//       overrideBackPress: true
//     },
//     {
//       label: 'Pesan',
//       screen: 'PesanScreen', // this is a registered name for a screen
//       icon: require('./assets/pesanTabIcon.png'),
//       title: 'Pesan',
//       navigationOptions: {
//         headerStyle: {
//           shadowOpacity: 1,
//           shadowOffset: {
//             height: 14,
//             width: 8
//           },
//           shadowColor: 'rgba(195,185,206,0.5)',
//           elevation: 9
//         }
//       },
//       overrideBackPress: true
//     },
//     {
//       label: 'Transaksi',
//       screen: 'TransaksiScreen',
//       icon: require('./assets/transaksiTabIcon.png'),
//       title: 'Transaksi',
//       navigationOptions: {
//         headerStyle: {
//           shadowOpacity: 1,
//           shadowOffset: {
//             height: 14,
//             width: 8
//           },
//           shadowColor: 'rgba(195,185,206,0.5)',
//           elevation: 9
//         }
//       },
//       overrideBackPress: true
//     },
//     {
//       label: 'Profil',
//       screen: 'ProfilScreen',
//       navigationOptions: {
//         headerStyle: {
//           shadowOpacity: 1,
//           shadowOffset: {
//             height: 14,
//             width: 8
//           },
//           shadowColor: 'rgba(195,185,206,0.5)',
//           elevation: 9
//         }
//       },
//       icon: require('./assets/profilTabIcon.png'),
//       overrideBackPress: true
//     },
//   ],
//   animationType: 'slide-down',
//   appStyle: {
//     forceTitlesDisplay: true,
//     tabBarBackgroundColor: '#FFF',
//     navBarButtonColor: '#000000',
//     tabBarButtonColor: '#717679',
//     navBarTextColor: '#000',
//     navBarTextFontFamily: 'raleway_thin',
//     tabBarSelectedButtonColor: '#C400A5',
//     navigationBarColor: '#003a66',
//     navBarBackgroundColor: '#FFF',
//     statusBarColor: '#000',
//     statusBarTextColorScheme: 'light',
//     tabFontFamily: 'raleway_regular',
//   }
// });
