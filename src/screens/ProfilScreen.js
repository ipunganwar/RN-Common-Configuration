import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, AsyncStorage, KeyboardAvoidingView, RefreshControl, Platform} from 'react-native';
import {Item, Input, Label, Button} from 'native-base';
import Barcode from 'react-native-barcode-builder';
import CustomTopBar from '../components/customTopBar';
import { connect } from 'react-redux'
import {Navigation} from 'react-native-navigation'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'
import { GetUpdateProfile } from '../actions/profileAction'
import { CheckingTimeout } from '../actions/timeoutAction'


class ProfilScreen extends React.Component {
  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      pelangganProfile: props.pelangganProfile,
      kodeSekolah: {},
      password: '123456',
      oldPassword: '123456',
      validatePassword: '123456',
      isBarcodeShown: false,
      inputEdited: false,
      verifPassword: '123456',
      isPasswordMatch: true,
      alamat: 'Jl.example',
      oldAlamat: 'Jl.example',
      email: 'example@gmail.com',
      oldEmail: 'example@gmail.com',
      token: ''
    }
  }

  showConfirmBeforeQuit () {
    Navigation.showLightBox({
      screen: 'ConfirmationLightBox',
      passProps: {
        icon: 'Warning',
        title: 'Konfirmasi',
        text: 'Keluar dari aplikasi KotakMakan?',
        isQuit: true
      },
      style: {
        tapBackgroundToDismiss: true,
        backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        backgroundColor: "rgba(18,10,28,0.55)" // tint color for the background, you can specify alpha here (optional)
      },
    })
  }

  componentDidMount() {
    this.props.navigator.setStyle({
      navBarCustomView: 'CustomTopBar',
      navBarComponentAlignment: 'center',
      navBarCustomViewInitialProps: {title: 'PROFIL'},
      navBarHidden: true
    });
  }

  handleEmailInput (typedEmail) {
    this.setState({
      email: typedEmail
    })
  }

  handleAlamatInput (typedAlamat) {
    this.setState({
      alamat: typedAlamat
    })
  }

  handlePasswordInput (typedPassword)  {
    if(typedPassword != this.state.verifPassword) {
      this.setState({
        isPasswordMatch: false,
        password: typedPassword
      })
    } else {
      this.setState({
        isPasswordMatch: true,
        password: typedPassword
      })
    }
  }

  handleVerifPasswordInput (typedVerifPassword) {
    if(this.state.password != typedVerifPassword) {
      this.setState({
        isPasswordMatch: false,
        verifPassword: typedVerifPassword
      })
    } else {
      this.setState({
        isPasswordMatch: true,
        verifPassword: typedVerifPassword
      })
    }
  }

  showBarCode () {
    this.setState({
      isBarcodeShown: true
    })
  }

  hideBarCode () {
    this.setState({
      isBarcodeShown: false
    })
  }

  logoutClicked () {
    // alert(`jangan cabut dulu ${this.state.pelangganProfile.nama_pelanggan}`)
    this.showConfirmBeforeQuit ()
  }

  handleUpdate(token, alamat, email, password) {
    this.props.getUpdateProfile(token, alamat, email, password)
  }

  simpanButtonClicked () {
    if (this.state.email && this.state.alamat && this.state.pelangganProfile.password && this.state.verifPassword) {
      if (this.state.isPasswordMatch) {
        this.props.navigator.showLightBox({
          screen: 'ConfirmationLightBox',
          passProps: {
            title: 'Konfirmasi',
            text: 'Apakah kamu yakin akan menyimpan info baru ini?',
            alamat: this.state.alamat,
            email: this.state.email,
            password: this.state.password,
            cancelEdit: () => this.cancelEdit(),
            updateProfile: (token, alamat, email, password) => this.handleUpdate(token, alamat, email, password),
            token: this.state.token,
            screen: 'Profil'
          },
          style: {
            tapBackgroundToDismiss: true,
            backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
            backgroundColor: "rgba(18,10,28,0.55)" // tint color for the background, you can specify alpha here (optional)
          },
        })
      }
    }
  }

  validateMenu() {
    let { password, email, pelangganProfile, verifPassword, validatePassword, alamat } = this.state
    // email = (email.length === 0 ? pelangganProfile.email : email)
    // alamat = (alamat.length === 0 ? pelangganProfile.alamat : alamat)
    // password = (password.length === 0 ? validatePassword : password)
    // verifPassword = (verifPassword.length === 0 ? validatePassword : verifPassword)

    return {email, password, verifPassword, alamat}
  }

  inputFocus (param) {
    let menu = this.validateMenu()

    switch(param) {
      case 'EMAIL':
          this.setState({
            inputEdited: true,
            email: menu.email,
            alamat: menu.alamat,
            password: menu.password,
            verifPassword: menu.verifPassword
          })
          break;

      case 'ALAMAT':
        this.setState({
          inputEdited: true,
          alamat: menu.alamat,
          password: menu.password,
          email: menu.email,
          verifPassword: menu.verifPassword
        })
        break;

      case 'PASSWORD':
          this.setState({
            inputEdited: true,
            password: '',
            alamat: menu.alamat,
            email: menu.email,
            verifPassword: menu.verifPassword
          })
          break;

      case 'VERIFIKASI':
          this.setState({
            inputEdited: true,
            password: menu.password,
            alamat: menu.alamat,
            email: menu.email,
            verifPassword: ''
          })
          break;

      default:
        this.setState({
          inputEdited: true
        })
    }
  }

  cancelEdit () {
    this.setState({
      email: this.state.pelangganProfile.email,
      alamat: this.state.pelangganProfile.alamat,
      password: '123456',
      inputEdited: false
    })
  }


  onNavigatorEvent(event) {
    if (event.id === 'backPress') {
      this.showConfirmBeforeQuit()
    }
    if(event.type === 'DeepLink') {
      switch(event.link) {
        case 'ProfilScreen':
          this.props.navigator.push({
            screen: 'PengaturanScreen',
            navigatorStyle: {
              navBarCustomView: 'PengaturanTopBar',
              navBarHidden: true
            },
            backButtonHidden: true,
            navigatorButtons: {}
          })
        case 'back':
          this.props.navigator.pop({
            //animation
          })
        default:
          break;
      }
    }
  }

  async setToken () {
    try {
      const token =  await AsyncStorage.getItem('token')
      this.setState({ token: token})
    } catch (err) {
      console.log('token beranda error: ', err)
    }
  }

  componentWillMount () {
    this.setToken()
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.pelangganProfile !== this.props.pelangganProfile && nextProps.kodeSekolah !== this.props.kodeSekolah) {
      this.setState({
        pelangganProfile: nextProps.pelangganProfile,
        alamat: nextProps.pelangganProfile.alamat,
        email: nextProps.pelangganProfile.email,
        oldAlamat: nextProps.pelangganProfile.alamat,
        oldEmail: nextProps.pelangganProfile.email,
        kodeSekolah: nextProps.kodeSekolah
      })
    }
  }

  kodePelangganWithSpace () {
    let returned = ''
    for (var i = 0; i < this.state.pelangganProfile.kode_pelanggan.length; i++) {
      returned += this.state.pelangganProfile.kode_pelanggan[i]
      returned += ' '
    }
    return returned
  }

  checkConnection () {
    let inputColor = {
      email: '#000',
      alamat: '#000',
      password: '#000',
      verifPassword: '#000'
    }
    let borderColor = {
      email: '#4A207C',
      alamat: '#4A207C',
      password: '#4A207C',
      verifPassword: '#4A207C'
    }
    if (!this.state.pelangganProfile.password || !this.state.verifPassword) {
      inputColor.password = '#C400A5'
      inputColor.verifPassword = '#C400A5'
      borderColor.password = '#FD377F'
      borderColor.verifPassword = '#FD377F'
    }
    if (!this.state.isPasswordMatch) {
      inputColor.password = '#C400A5'
      inputColor.verifPassword = '#C400A5'
      borderColor.password = '#FD377F'
      borderColor.verifPassword = '#FD377F'
    }
    if (!this.state.email) {
      inputColor.email = '#C400A5'
      borderColor.email = '#FD377F'
    }
    if (!this.state.alamat) {
      inputColor.alamat = '#C400A5'
      borderColor.alamat = '#FD377F'
    }

    this.props.checkingTimeout()
    if (!this.props.timeout) {
      return (
        <View style={{width: 100, marginLeft: 150, marginTop: 190}}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../assets/warning.png')}
          />
        <Text style={{marginLeft: -75, width: 300}}>Anda Offline, Coba lakukan refresh</Text>
        </View>
      )
    }else {
      return (
        <View>
          <View style={styles.container}>
            <View style={{alignItems: 'flex-end', marginTop: DIMENSION_HEIGHT * 0.0172, marginRight:DIMENSION_WIDTH * 0.0417}}>
              {this.state.isBarcodeShown ? (
                <View style={{width: DIMENSION_WIDTH * 0.0694, height: DIMENSION_HEIGHT * 0.0313, backgroundColor: 'transparent'}}>
                </View>
              ): (
              <TouchableOpacity onPress={() => this.showBarCode()}>
                <Image
                  style={{width: DIMENSION_WIDTH * 0.0694, height: DIMENSION_HEIGHT * 0.0313}}
                  source={require('../assets/barcodeIcon.png')}
                />
              </TouchableOpacity>)}
            </View>
            <View style={{alignItems: 'center', flexDirection: 'row', marginLeft: DIMENSION_WIDTH * 0.0833}}>
              <View>
                <Image
                  style={{width: DIMENSION_WIDTH * 0.1389, height: DIMENSION_HEIGHT * 0.0781, borderRadius: DIMENSION_HEIGHT * 0.0453}}
                  source={{uri: this.state.pelangganProfile.foto_pelanggan}}
                />
              </View>
              <View style={{marginLeft: DIMENSION_WIDTH * 0.0375}}>
                <Text style={{fontFamily: fontPlatform(Platform.OS, 'Medium'), color: '#000', fontSize: normalizeFont(18)}}>
                  {this.state.pelangganProfile.nama_pelanggan}
                </Text>
                <Text style={{fontFamily: fontPlatform(Platform.OS, 'ExtraLight'), color: '#000', fontSize: normalizeFont(14)}}>
                  {this.state.pelangganProfile.username}
                </Text>
                <Text style={{fontFamily: fontPlatform(Platform.OS, 'ExtraLight'), color: '#000', fontSize: normalizeFont(14)}}>
                  {this.state.kodeSekolah.nama_sekolah} | {this.state.pelangganProfile.kelas}
                </Text>
              </View>
            </View>
            {this.state.isBarcodeShown ? (
              <View style={{marginTop: DIMENSION_HEIGHT * 0.0703}}>
                <Barcode value={this.state.pelangganProfile.kode_pelanggan} width={1.7} format="CODE128"/>
                <View style={{width: DIMENSION_WIDTH * 0.6827, marginLeft: 'auto', marginRight: 'auto'}}>
                  <Text style={{textAlign: 'center', marginTop: DIMENSION_HEIGHT * 0.0141, fontFamily: fontPlatform(Platform.OS, 'ExtraLight'), fontSize: normalizeFont(14), color: '#000', width: '100%'}}>
                    {this.kodePelangganWithSpace()}
                  </Text>
                </View>
                <View style={{marginLeft: DIMENSION_WIDTH * 0.0417,marginRight: DIMENSION_WIDTH * 0.0417, width: DIMENSION_WIDTH * 0.8373, marginTop: DIMENSION_HEIGHT * 0.0156}}>
                  <Text adjustsFontSizeToFit style={{fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(11), color: '#53525B', textAlign: 'center'}}>
                    Tunjukkan barcode untuk melakukan transaksi
                  </Text>
                </View>
              </View>) : (
              <View style={{marginTop: DIMENSION_HEIGHT * 0.021, alignItems: 'center'}}>
                <View style={{marginTop: DIMENSION_HEIGHT * 0.0156}}>
                  <Item floatingLabel style={{borderColor: borderColor.email, borderWidth: 0.5, width: DIMENSION_WIDTH * 0.7}}>
                    <Label style={{fontSize: normalizeFont(11), color: '#373A3D', fontFamily: fontPlatform(Platform.OS, 'ExtraLight')}}>EMAIL</Label>
                    <Input value={this.state.email} style={{paddingLeft: 0, color: inputColor.email, fontFamily: fontPlatform(Platform.OS, 'ExtraLight'), fontSize: normalizeFont(13)}} onFocus={() => this.inputFocus('EMAIL')} onChangeText={(typedEmail) => this.handleEmailInput(typedEmail)}/>
                  </Item>
                </View>
                <View style={{marginTop: DIMENSION_HEIGHT * 0.0156}}>
                  <Item floatingLabel style={{borderColor: borderColor.alamat, borderWidth: 0.5, width: DIMENSION_WIDTH * 0.7}}>
                    <Label style={{fontSize: normalizeFont(11), color: '#373A3D', fontFamily: fontPlatform(Platform.OS, 'ExtraLight')}}>ALAMAT</Label>
                    <Input multiline={true} value={this.state.alamat} style={{paddingLeft: 0, color: inputColor.alamat, fontFamily: fontPlatform(Platform.OS, 'ExtraLight'), fontSize: normalizeFont(13)}} onFocus={() => this.inputFocus('ALAMAT')} onChangeText={(typedAlamat) => this.handleAlamatInput(typedAlamat)}/>
                  </Item>
                </View>
                <View style={{marginTop: DIMENSION_HEIGHT * 0.0156}}>
                  <Item floatingLabel style={{borderColor: borderColor.password, borderWidth: 0.5, width: DIMENSION_WIDTH * 0.7}}>
                    <Label style={{fontSize: normalizeFont(11), color: '#373A3D', fontFamily: fontPlatform(Platform.OS, 'ExtraLight')}}>PASSWORD</Label>
                    <Input value={this.state.password} secureTextEntry style={{paddingLeft: 0, color: inputColor.password, fontFamily: fontPlatform(Platform.OS, 'Bold'), fontSize: normalizeFont(14)}} onFocus={() => this.inputFocus('PASSWORD')} onChangeText={(typedPassword) => this.handlePasswordInput(typedPassword)}/>
                  </Item>
                </View>
                {this.state.inputEdited ? (<View style={{marginTop: DIMENSION_HEIGHT * 0.0312}}>
                  <Item floatingLabel style={{borderColor: borderColor.verifPassword, borderWidth: 0.5, width: DIMENSION_WIDTH * 0.7}}>
                    <Label style={{fontSize: normalizeFont(11), color: '#373A3D', fontFamily: fontPlatform(Platform.OS, 'ExtraLight')}}>PASSWORD BARU VERIFIKASI</Label>
                    <Input value={this.state.verifPassword} secureTextEntry style={{paddingLeft: 0, color: inputColor.verifPassword, fontFamily: fontPlatform(Platform.OS, 'Bold'), fontSize: normalizeFont(14)}} onFocus={() => this.inputFocus('VERIFIKASI')} onChangeText={(typedVerifPassword) => this.handleVerifPasswordInput(typedVerifPassword)}/>
                  </Item>
                </View>) : <View></View>}
              </View>
            )}
            {this.state.isBarcodeShown ? (
              <View  style={{marginTop: DIMENSION_HEIGHT * 0.0313, marginLeft: 'auto', marginRight: 'auto', alignSelf:'flex-end'}}>
                <Button rounded style={{backgroundColor: '#4A207C', height: DIMENSION_HEIGHT * 0.0593, width: DIMENSION_WIDTH * 0.3666, justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: '#C3B9CE'}} onPress={() => this.hideBarCode()}>
                  <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#FFF', textAlign: 'center', fontSize: normalizeFont(11)}}>K E M B A L I</Text>
                </Button>
              </View>) :
            (<View style={{marginTop: DIMENSION_HEIGHT * 0.0484, marginLeft: 'auto', marginRight: 'auto', alignSelf:'flex-end'}}>
              {this.state.inputEdited ? (
                <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
                  <Button rounded style={{marginRight: DIMENSION_WIDTH * 0.0944, backgroundColor: '#FFF', height: DIMENSION_HEIGHT * 0.0468, width: DIMENSION_WIDTH * 0.2777, justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: '#C3B9CE'}} onPress={() => this.cancelEdit()}>
                    <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#000', textAlign: 'center', fontSize: normalizeFont(11)}}>B A T A L</Text>
                  </Button>
                  <Button rounded style={{backgroundColor: '#4A207C', height: DIMENSION_HEIGHT * 0.0468, width: DIMENSION_WIDTH * 0.2777, justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: '#C3B9CE'}} onPress={() => this.simpanButtonClicked()}>
                    <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#FFF', textAlign: 'center', fontSize: normalizeFont(11)}}>S I M P A N</Text>
                  </Button>
                </View>
              ) : (<Button rounded style={{backgroundColor: '#4A207C', height: DIMENSION_HEIGHT * 0.0593, width: DIMENSION_WIDTH * 0.3666, justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: '#C3B9CE'}} onPress={() => this.logoutClicked()}>
                <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#FFF', textAlign: 'center', fontSize: normalizeFont(11)}}>L O G O U T</Text>
              </Button>)}
            </View>)}
          </View>
        </View>
      )
    }
  }

  render() {
    let inputColor = {
      email: '#000',
      alamat: '#000',
      password: '#000',
      verifPassword: '#000'
    }
    let borderColor = {
      email: '#4A207C',
      alamat: '#4A207C',
      password: '#4A207C',
      verifPassword: '#4A207C'
    }
    if (!this.state.pelangganProfile.password || !this.state.verifPassword) {
      inputColor.password = '#C400A5'
      inputColor.verifPassword = '#C400A5'
      borderColor.password = '#FD377F'
      borderColor.verifPassword = '#FD377F'
    }
    if (!this.state.isPasswordMatch) {
      inputColor.password = '#C400A5'
      inputColor.verifPassword = '#C400A5'
      borderColor.password = '#FD377F'
      borderColor.verifPassword = '#FD377F'
    }
    if (!this.state.email) {
      inputColor.email = '#C400A5'
      borderColor.email = '#FD377F'
    }
    if (!this.state.alamat) {
      inputColor.alamat = '#C400A5'
      borderColor.alamat = '#FD377F'
    }

    return (
      <View style={{backgroundColor: '#FFF', height: '100%'}}>
        <View style={{height: 60, top: -3, left: -5, width: DIMENSION_WIDTH + 19, elevation: 4, borderBottomWidth: .1, borderColor: '#c3b9ce'}}>
          <CustomTopBar title={'PROFIL'}/>
        </View>
        <ScrollView>
          <KeyboardAvoidingView style={{backgroundColor: '#F9F9F9', minHeight: DIMENSION_HEIGHT - 100}}>
            { this.checkConnection() }
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    width: DIMENSION_WIDTH * 0.9166,
    height: DIMENSION_HEIGHT * 0.7156,
    marginLeft: DIMENSION_WIDTH * 0.0416,
    marginRight: DIMENSION_WIDTH * 0.0416,
    marginTop: DIMENSION_HEIGHT * 0.0375,
    marginBottom: DIMENSION_HEIGHT * 0.0281,
    shadowRadius: 40,
    shadowOpacity: 1,
    shadowColor: '#CACDD0',
    shadowOffset: { width: 0, height: 10 },
    borderRadius: DIMENSION_HEIGHT * 0.0234,
    elevation: 10
  }
});

const mapStateToProps = (state) => {
  return {
    userInfo: state.UserInfo,
    pelangganProfile: state.Profile.pelangganProfile,
    alamat: state.Profile.pelangganProfile.alamat,
    kodeSekolah: state.Profile.pelangganProfile.kode_sekolah,
    timeout: state.TimeoutReducer.isConnected,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUpdateProfile: (currentToken, currentAlamat, currentEmail, currentPassword) => dispatch(GetUpdateProfile(currentToken, currentAlamat, currentEmail, currentPassword)),
    checkingTimeout: () => dispatch(CheckingTimeout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilScreen);
