import React from 'react';
import {StyleSheet, View, Dimensions, Image, BackHandler, Platform} from 'react-native';
import { Button, Text } from 'native-base';
import RNExitApp from 'react-native-exit-app'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'
import {Navigation} from 'react-native-navigation'

class ConfirmationLightBox extends React.Component {
  constructor(props) {
    super(props)
  }

  dismissLightBox () {
    this.props.navigator.dismissLightBox()
  }

  confirmClicked () {
    if (this.props.isQuit) {
      // BackHandler.exitApp()
      // this.clearToken()
      RNExitApp.exitApp()
    } else {
      if (this.props.screen == 'Profil') {
        this.props.updateProfile(this.props.token, this.props.alamat, this.props.email, this.props.password)
        let text = ''
        text = 'Profil telah berhasil \n diperbaharui'
        this.dismissLightBox()
        Navigation.showModal({
          screen: 'NotificationLightBox',
          passProps: {
            title: 'Berhasil',
            text: text,
            cancelEdit: () => this.props.cancelEdit(),
            flagging: 'Profil Screen'
          },
          navigatorStyle: {
            tapBackgroundToDismiss: true,
            backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
            backgroundColor: "rgba(18,10,28,0.55)", // tint color for the background, you can specify alpha here (optional)
            navBarHidden: true,
          },
          animationType: 'none'
        })
      } else if (this.props.screen == 'ConfirmationScreen') {
        this.dismissLightBox()
        this.props.okButtonClicked()

      }
    }
  }

  async clearToken () {
    console.log('masuk clear token')
    try {
      const token =  await AsyncStorage.clear()
      RNExitApp.exitApp()
    } catch (err) {
      console.log('token loadingLightBox error: ', err)
    }
  }

  render() {
    return (
      <View style={{width: DIMENSION_WIDTH * 0.75, height: DIMENSION_HEIGHT * 0.28125, marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', backgroundColor: '#FFF', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{ marginLeft: 'auto', marginRight: 'auto'}}>
          <Image
            resizeMode='stretch'
            style={{width: DIMENSION_WIDTH * 0.1533, height: DIMENSION_HEIGHT * 0.075}}
            source={require('../assets/warning.png')}
          />
        </View>
        <View style={{marginTop: DIMENSION_HEIGHT * 0.0125, marginLeft: 'auto', marginRight: 'auto'}}>
          <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#4A207C', fontSize: normalizeFont(14)}}>
            {this.props.title}
          </Text>
        </View>
        <View style={{marginTop: DIMENSION_HEIGHT * 0.0109, marginLeft: 'auto', marginRight: 'auto', width: DIMENSION_WIDTH * 0.5639, justifyContent: 'center'}}>
          <Text style={{fontFamily: fontPlatform(Platform.OS, 'Medium'), color: '#53525B', fontSize: normalizeFont(11), textAlign: 'center'}}>
            {this.props.text}
          </Text>
        </View>
        <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: DIMENSION_HEIGHT * 0.0203, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button rounded style={{backgroundColor: '#FFFFFF', height: DIMENSION_HEIGHT * 0.0469, width: DIMENSION_WIDTH * 0.2222, marginRight: DIMENSION_WIDTH * 0.0555, justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: 'rgba(195,185,206,1)'}} onPress={() => this.dismissLightBox()}>
            <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#000', textAlign: 'justify', fontSize: normalizeFont(11)}}>BATAL</Text>
          </Button>
          <Button rounded style={{backgroundColor: '#4A207C', height: DIMENSION_HEIGHT * 0.0468, width: DIMENSION_WIDTH * 0.2222, justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: 'rgba(195,185,206,1)'}} onPress={() => this.confirmClicked()}>
            <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#FFF', textAlign: 'center', fontSize: normalizeFont(11)}}>O K</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default ConfirmationLightBox;
