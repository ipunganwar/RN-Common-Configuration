import React from 'react';
import {View, Text, Image, BackHandler, Platform} from 'react-native';
import {Button, Item, Input} from 'native-base'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'
import { Navigation } from 'react-native-navigation'
import axios from 'axios'
let BASE_URL = 'http://developmentproject_name-env.ap-southeast-1.elasticbeanstalk.com/mobile/auth'

class FormLupaPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      inputErrorBoolean: false
    }
  }

  handleEmailInput (typedEmail) {
    this.setState({
      email: typedEmail
    })
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  doForgotPassword () {
    if (this.validateEmail(this.state.email)) {
      const request = axios({
        method: 'POST',
        // url: `${BASE_URL}/login`,
        url: `${BASE_URL}/lupa_password`,
        data: {
          email: this.state.email,
        }
      }).then((dataAxios) => {
        this.props.navigator.showLightBox({
          screen: 'NotificationLightBox',
          passProps: {
            icon: 'Success',
            title: 'Berhasil',
            text: 'Cek email anda untuk password baru',
            screen: 'Login'
          },
          style: {
            tapBackgroundToDismiss: true,
            backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
            backgroundColor: "rgba(18,10,28,0.55)" // tint color for the background, you can specify alpha here (optional)
          },
        })
        this.props.lupaPassword()
      }).catch((err) => {
        // console.log(err)
        this.props.navigator.showLightBox({
          screen: 'NotificationLightBox',
          passProps: {
            icon: 'Warning',
            title: 'Gagal',
            text: 'Cek kembali email yg anda masukan',
            screen: 'Login'
          },
          style: {
            tapBackgroundToDismiss: true,
            backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
            backgroundColor: "rgba(18,10,28,0.55)" // tint color for the background, you can specify alpha here (optional)
          },
        })
      })
    } else {
      this.setState({
        inputErrorBoolean: true
      })
    }
  }

  render() {
    let borderColor = '#888E8E'
    if (this.state.email) {
      borderColor = '#4A207C'
    }
    let fontColor = '#4A207C'
    if (this.state.inputErrorBoolean) {
      borderColor = '#FD377F'
      fontColor = '#FD377F'
    }
    return (
      <View>
        <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: DIMENSION_HEIGHT * 0.0579}}>
          <Image
            source={require('../assets/warning.png')}
            style={{width: DIMENSION_WIDTH * 0.1565, height: DIMENSION_HEIGHT * 0.088}}
          />
        </View>
        <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: DIMENSION_HEIGHT * 0.0304}}>
          <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#4A207C', fontSize: normalizeFont(20), lineHeight: 24}}>
            Lupa Password
          </Text>
        </View>
        <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: DIMENSION_HEIGHT * 0.0141, width: DIMENSION_WIDTH * 0.7467}}>
          <Text style={{fontFamily: fontPlatform(Platform.OS, 'Regular'), color: '#5C5C5D', textAlign: 'center', lineHeight: 16, fontSize: normalizeFont(14)}}>
            Silahkan masukkan email yang terdaftar di akun anda.
          </Text>
        </View>
        <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: DIMENSION_HEIGHT * 0.0315}}>
          <Item floatingLabel style={{borderColor: borderColor, borderWidth: .5, width: DIMENSION_WIDTH * 0.7467}}>
            <Input value={this.state.email} style={{fontSize: normalizeFont(14), textAlign: 'center', color: fontColor, fontFamily: fontPlatform(Platform.OS, 'Light')}} onChangeText={(typedEmail) => this.handleEmailInput(typedEmail)} />
          </Item>
        </View>
        <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: DIMENSION_HEIGHT * 0.0615}}>
          <Button rounded style={{backgroundColor: '#4A207C', width: DIMENSION_WIDTH * 0.3973, height: DIMENSION_HEIGHT * 0.063, shadowColor: '#C3B9CE', shadowOffset: {width: 2, height: 4}, justifyContent: 'center', shadowOpacity: 1, shadowRadius: 8, elevation: 7}} onPress={() => this.doForgotPassword()}>
            <Text style={{color: '#FDFDFD', fontFamily: fontPlatform(Platform.OS, 'Bold'), fontSize: normalizeFont(12), lineHeight: 14}}>K I R I M</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default FormLupaPassword;
