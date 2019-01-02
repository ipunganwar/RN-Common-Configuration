import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

import OnBoarding1 from './OnBoarding1';
import OnBoarding2 from './OnBoarding2';
import OnBoarding3 from './OnBoarding3';
import LoginScreen from './LoginScreen';
import BerandaScreen from './BerandaScreen';
import MenuListItem from '../components/menuListItem';
import ConfirmationScreen from './ConfirmationScreen';
import PesanScreen from './PesanScreen';
import PilihMenuScreen from './PilihMenuScreen';
import DetailMenuScreen from './DetailMenuScreen';
import ConfirmationEditOrderScreen from './ConfirmationEditOrderScreen';
import TransaksiScreen from './TransaksiScreen';
import NotificationScreen from './NotificationScreen';
import PengaturanScreen from './PengaturanScreen';
import ProfilScreen from './ProfilScreen';
import CustomTopBar from '../components/customTopBar';
import CustomHeaderPesan from '../components/customHeaderPesan';
import CustomTopSearchBar from '../components/customTopSearchBar';
import NotificationTopBar from '../components/notificationTopBar';
import PengaturanTopBar from '../components/pengaturanTopBar';
import PilihMenuTopBar from '../components/pilihMenuTopBar';
import ConfirmationLightBox from '../components/confirmationLightBox';
import NotificationLightBox from '../components/notificationLightBox';
import ValidationLightBox from '../components/validationLightBox';
import LoadingLightBox from '../components/loadingLightBox';

// register all screens of the app (including internal ones)
export function registerScreens(store, ApolloProvider, client) {

  Navigation.registerComponent('OnBoarding1', () => OnBoarding1);
  Navigation.registerComponent('OnBoarding2', () => OnBoarding2);
  Navigation.registerComponent('OnBoarding3', () => OnBoarding3);
  Navigation.registerComponent('LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('Beranda', () => BerandaScreen, store, Provider);
  Navigation.registerComponent('MenuListItem', () => MenuListItem, store, ApolloProvider);
  Navigation.registerComponent('ConfirmationEditOrderScreen', () => ConfirmationEditOrderScreen, store, Provider);
  Navigation.registerComponent('PesanScreen', () => PesanScreen, store, Provider);
  Navigation.registerComponent('PilihMenuScreen', () => PilihMenuScreen, store, Provider);
  Navigation.registerComponent('DetailMenuScreen', () => DetailMenuScreen, store, Provider);
  Navigation.registerComponent('ConfirmationScreen', () => ConfirmationScreen, store, Provider);
  Navigation.registerComponent('TransaksiScreen', () => TransaksiScreen, store, Provider);
  Navigation.registerComponent('NotificationScreen', () => NotificationScreen, store, Provider);
  Navigation.registerComponent('PengaturanScreen', () => PengaturanScreen, store, Provider);
  Navigation.registerComponent('ProfilScreen', () => ProfilScreen, store, Provider);
  Navigation.registerComponent('CustomTopBar', () => CustomTopBar, store, Provider);
  Navigation.registerComponent('CustomHeaderPesan', () => CustomHeaderPesan, store, Provider);
  Navigation.registerComponent('CustomTopSearchBar', () => CustomTopSearchBar);
  Navigation.registerComponent('NotificationTopBar', () => NotificationTopBar);
  Navigation.registerComponent('PengaturanTopBar', () => PengaturanTopBar);
  Navigation.registerComponent('PilihMenuTopBar', () => PilihMenuTopBar);
  Navigation.registerComponent('ConfirmationLightBox', () => ConfirmationLightBox);
  Navigation.registerComponent('NotificationLightBox', () => NotificationLightBox);
  Navigation.registerComponent('ValidationLightBox', () => ValidationLightBox, store, Provider);
  Navigation.registerComponent('LoadingLightBox', () => LoadingLightBox, store, Provider);
}
