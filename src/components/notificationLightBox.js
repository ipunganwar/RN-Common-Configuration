import React from 'react';
import {StyleSheet, View, Dimensions, Image, Platform} from 'react-native';
import { Button, Text } from 'native-base';
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform , modalStyle} from '../helpers/dimension'
import {Navigation} from 'react-native-navigation'

class NotificationLightBox extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigatorStyle = {
    screenBackgroundColor: 'rgba(18,10,28,0.55)',
    modalPresentationStyle: modalStyle(Platform),
  };

  dismissLightBox (flag) {
    switch (flag) {
      case 'First Login':
        Navigation.dismissModal({
          animationType: 'none' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
        this.props.navigateToProfile()
        break

      case 'Pesan Screen':
        this.props.navigator.dismissLightBox()
        break

      case 'Error':
        this.props.navigator.dismissLightBox()
        break

      case 'Profil Screen':
        Navigation.dismissModal({
          animationType: 'none' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
        this.props.cancelEdit()
        break

      case 'Notifikasi':
        Navigation.dismissModal({
          animationType: 'none' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
        this.props.navigator.dismissLightBox()
        break

      case 'Notifikasi Pesanan':
        this.props.resetTimeout()
        Navigation.dismissModal({
          animationType: 'none' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
        this.props.navigator.dismissLightBox()

        break

      case 'Lupa Password':
        Navigation.dismissModal({
          animationType: 'none' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
        break

      case 'Transfer':
        this.props.navigator.dismissLightBox()
        this.props.resetNamaPengirim()
        Navigation.dismissModal({
        animationType: 'none' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
        break
    }
  }

  render() {
    return (
      <View style={{width: DIMENSION_WIDTH * 0.75, height: this.props.flagging == 'First Login' ? DIMENSION_HEIGHT * 0.3013 : DIMENSION_HEIGHT * 0.2813, marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', backgroundColor: '#FFF', borderRadius: DIMENSION_HEIGHT * 0.0156}}>
        <View style={{marginTop: DIMENSION_HEIGHT * 0.025, marginLeft: 'auto', marginRight: 'auto'}}>
          {this.props.icon == 'Warning' ? (
            <Image
              resizeMode='stretch'
              style={{width: DIMENSION_WIDTH * 0.1533, height: DIMENSION_HEIGHT * 0.075}}
              source={require('../assets/warning.png')}
            />) : (
            <Image
              resizeMode='stretch'
              style={{width: DIMENSION_WIDTH * 0.1533, height: DIMENSION_HEIGHT * 0.0578}}
              source={require('../assets/success.png')}
            />
          )}
        </View>
        <View style={{marginTop: DIMENSION_HEIGHT * 0.0203, marginLeft: 'auto', marginRight: 'auto'}}>
          <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#4A207C', fontSize: normalizeFont(14)}}>
            {this.props.title}
          </Text>
        </View>
        <View style={{marginTop: DIMENSION_HEIGHT * 0.0109, marginLeft: 'auto', marginRight: 'auto', width: DIMENSION_WIDTH * 0.5639, justifyContent: 'center'}}>
          <Text style={{fontFamily: fontPlatform(Platform.OS, 'Medium'), color: '#53525B', fontSize: normalizeFont(11), textAlign: 'center'}}>
            {this.props.text}
          </Text>
        </View>
        <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: this.props.icon == 'Warning' ? 13 : 23}}>
          <Button rounded style={{backgroundColor: '#4A207C', height: DIMENSION_HEIGHT * 0.0469, width: DIMENSION_WIDTH * 0.2222, justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: 'rgba(195,185,206,1)'}} onPress={() => this.dismissLightBox(this.props.flagging)}>
            <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#FFF', textAlign: 'center', fontSize: normalizeFont(11) }}>O K</Text>
          </Button>
        </View>
      </View>
    );
  }
}


export default NotificationLightBox;
