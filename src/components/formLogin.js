import React from 'react'
import {View, Text, TouchableOpacity, AsyncStorage, Platform} from 'react-native'
import {Button, Item, Input, Icon, Label} from 'native-base'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'
import { Navigation } from 'react-native-navigation'
import { GetLogin } from '../actions/login'
import { connect } from 'react-redux'
import { SetToken } from '../actions/berandaAction'

class FormLogin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      inputErrorBoolean: false,
    }
  }

  handlePasswordInput (typedPassword) {
    this.setState({
      password: typedPassword
    })
  }

  lupaPasswordClicked () {
    this.props.lupaPassword()
  }

  handleUsernameInput (typedUsername) {
    this.setState({
      username: typedUsername
    })
  }
  showMainScreen (isFirstLogin) {
    Navigation.startTabBasedApp({
      passProps: {firstLogin: isFirstLogin},
      tabs: [
        {
          label: 'Beranda',
          screen: 'Beranda',
          navigationOptions: {
            headerStyle: {
              shadowOpacity: 1,
              shadowOffset: {
                height: 14,
                width: 8
              },
              shadowColor: 'rgba(195,185,206,0.5)',
              elevation: 9
            }
          },
          icon: require('../assets/berandaTabIcon.png'),
          overrideBackPress: true
        },
        {
          label: 'Pesan',
          screen: 'PesanScreen', // this is a registered name for a screen
          icon: require('../assets/pesanTabIcon.png'),
          title: 'Pesan',
          navigationOptions: {
            headerStyle: {
              shadowOpacity: 1,
              shadowOffset: {
                height: 14,
                width: 8
              },
              shadowColor: 'rgba(195,185,206,0.5)',
              elevation: 9
            }
          },
          overrideBackPress: true
        },
        {
          label: 'Transaksi',
          screen: 'TransaksiScreen',
          icon: require('../assets/transaksiTabIcon.png'),
          title: 'Transaksi',
          navigationOptions: {
            headerStyle: {
              shadowOpacity: 1,
              shadowOffset: {
                height: 14,
                width: 8
              },
              shadowColor: 'rgba(195,185,206,0.5)',
              elevation: 9
            }
          },
          overrideBackPress: true
        },
        {
          label: 'Profil',
          screen: 'ProfilScreen',
          navigationOptions: {
            headerStyle: {
              shadowOpacity: 1,
              shadowOffset: {
                height: 14,
                width: 8
              },
              shadowColor: 'rgba(195,185,206,0.5)',
              elevation: 9
            }
          },
          icon: require('../assets/profilTabIcon.png'),
          overrideBackPress: true
        },
      ],
      animationType: 'slide-down',
      appStyle: {
        forceTitlesDisplay: true,
        tabBarBackgroundColor: '#FFF',
        navBarButtonColor: '#000000',
        tabBarButtonColor: '#717679',
        navBarTextColor: '#000',
        navBarTextFontFamily: {
          ...Platform.select({
            ios: { navBarTextFontFamily: 'Raleway-Thin' },
            android: { navBarTextFontFamily: 'raleway_thin'}
          })
        },
        tabBarSelectedButtonColor: '#C400A5',
        navigationBarColor: '#003a66',
        navBarBackgroundColor: '#FFF',
        statusBarColor: '#000',
        statusBarTextColorScheme: 'light',
        tabFontFamily: {
          ...Platform.select({
            ios: { tabFontFamily: 'Raleway-Regular' },
            android: { tabFontFamily: 'raleway_regular'}
          })
        },
        orientation: 'portrait'
      },
    });
  }

  async checkToken () {
    try {
      const token =  await AsyncStorage.getItem('token')
      console.log('ini token', token)
      if (token !== 'undefined') {
        this.props.setToken(token)
        this.showMainScreen(false)
      } else {
        this.doLogin()
      }
    } catch (err) {
      console.log('token beranda error: ', err)
    }
  }


  async doLogin() {
    //SET DATA REAL, JIKA SUDAH SELESAI HARAP DIKEMBALIKAN
    let isLogin = await this.props.getLogin(this.state.username, this.state.password)


    // const value =  await AsyncStorage.getItem('token')
    //UNTUK REAL DATA JANGAN LUPA DIBUKA JIKA SUDAH SELESAI
    // if (isLogin.payload.status === 200) {
    //SAMPAI sini
    if (this.props.isLogin.status === 200) {
      let isFirstLogin = isLogin.payload.data.firstLogin
      AsyncStorage.setItem('token', isLogin.payload.data.token)
      this.props.setToken(isLogin.payload.data.token)
      this.showMainScreen(isFirstLogin)
    } else if (this.props.isLogin.status === 500) {
      Navigation.showModal({
        screen: 'NotificationLightBox',
        passProps: {
          icon: 'Warning',
          title: 'Koneksi Jaringan',
          text: this.props.isLogin.data.message,
          screen: 'Login',
          flagging: 'Notifikasi'
        },
        navigatorStyle: {
          tapBackgroundToDismiss: true,
          backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
          backgroundColor: "rgba(18,10,28,0.55)", // tint color for the background, you can specify alpha here (optional)
          navBarHidden: true,
        },
        animationType: 'none'
      })
    } else {
      Navigation.showModal({
        screen: 'NotificationLightBox',
        passProps: {
          icon: 'Warning',
          title: 'Sudah Benar?',
          text: 'Cek kembali username dan password anda?',
          screen: 'Login',
          flagging: 'Notifikasi'
        },
        navigatorStyle: {
          tapBackgroundToDismiss: true,
          backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
          backgroundColor: "rgba(18,10,28,0.55)", // tint color for the background, you can specify alpha here (optional)
          navBarHidden: true,
        },
        animationType: 'none'
      })
      this.setState({
        inputErrorBoolean: true
      })
    }
  }

  render () {
    let fontColor = '#B544A8'
    let borderColor = '#4A207C'
    if (this.state.inputErrorBoolean) {
      fontColor = '#FD377F'
      borderColor = '#FD377F'
    }
    return (
      <View>
        <View style={{marginTop: DIMENSION_HEIGHT * 0.1094, marginLeft: 'auto', marginRight: 'auto', width: DIMENSION_WIDTH * 0.648, marginBottom: 16}}>
          <Item floatingLabel style={{borderColor: borderColor, }}>
            <Label style={{color: '#373A3D', fontFamily: fontPlatform(Platform.OS, 'ExtraLight'), fontSize: normalizeFont(12), paddingRight: 1}}>USERNAME</Label>
            <Input keyboardType='numeric' value={this.state.username} style={{paddingLeft: 0, color: fontColor, fontFamily: fontPlatform(Platform.OS, 'Light')}} onChangeText={(typedUsername) => this.handleUsernameInput(typedUsername)}/>
            <Icon type='MaterialIcons' name='person-outline' style={{color: borderColor, fontSize: normalizeFont(20)}}/>
          </Item>
          <Item floatingLabel style={{borderColor: borderColor, }}>
            <Label style={{color: '#373A3D', fontFamily: fontPlatform(Platform.OS, 'ExtraLight'), fontSize: normalizeFont(12), paddingRight: 1}}>PASSWORD</Label>
            <Input secureTextEntry value={this.state.password} style={{paddingLeft: 0, color: fontColor, fontFamily: fontPlatform(Platform.OS, 'Light')}} onChangeText={(typedPassword) => this.handlePasswordInput(typedPassword)}/>
            <Icon type='MaterialIcons' name='lock-outline' style={{color: borderColor, fontSize: normalizeFont(20)}}/>
          </Item>
        </View>
        <View style={{marginTop: DIMENSION_HEIGHT * 0.085, flexDirection: 'column', alignItems: 'center'}}>
          <View>
            <TouchableOpacity rounded style={{backgroundColor: '#4A207C', height: DIMENSION_HEIGHT * 0.063, width: DIMENSION_WIDTH * 0.3973, justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: '#C3B9CE', elevation: 7, borderRadius: DIMENSION_HEIGHT * 0.0313}} onPress={() => this.doLogin()}>
              <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#FFF', textAlign: 'center', fontSize: normalizeFont(11)}}>L O G I N</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: DIMENSION_HEIGHT * 0.027}}>
            <TouchableOpacity onPress={() => this.lupaPasswordClicked()}>
            <Text style={{color: '#5C5C5D', fontSize: normalizeFont(12), fontFamily: fontPlatform(Platform.OS, 'Regular')}}>
              Lupa password?
            </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loginList : state.LoginReducer.loginList ,
    isLogin: state.LoginReducer.loginList,
    timeout: state.TimeoutReducer.isConnected,
  }
}

const mapDispatchToProps = (dispatch) => ({
  //SET DATA REAL, JIKA SUDAH SELESAI HARAP DIKEMBALIKAN
    getLogin: (username, password) => dispatch(GetLogin(username, password)),
    setToken: (token) => dispatch(SetToken(token))

})

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);
