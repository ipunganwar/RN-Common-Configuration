import React from 'react';
import {View, Text, Image, Linking, BackHandler, AsyncStorage, TouchableOpacity, Platform} from 'react-native';
import {Item, Input, Label, Icon, Button} from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown'
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont , fontPlatform} from '../helpers/dimension'
import DatePicker from 'react-native-datepicker'
import { SetTopupTransfer } from '../actions/transaksiAction'

class TransferMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentJumlahTransferDropdown: 10000,
      currentBankPengirimDropdown: 'BANK BCA',
      currentBankPenerimaDropdown: 'BANK BCA',
      flagingBankPengirimDropdown: 'BANK BCA',
      flagingBankPenerimaDropdown: 'BANK BCA',
      bankPengirimName: "",
      bankPenerimaName: "",
      tanggal_waktu: new Date(),
      nama_pengirim: '',
      setColor: false,
    }
  }

  ubahDropdownJumlahTransfer (value) {
    value = value.slice(3, value.length)
    value = value.split('.').join('')

    this.setState({
      currentJumlahTransferDropdown: +value
    })
  }

  ubahDropdownBankPengirim (value) {
    this.setState({
      currentBankPengirimDropdown: value,
      flagingBankPengirimDropdown: value
    })
  }

  ubahDropdownBankPengirimOthers (value) {
    this.setState({
      currentBankPengirimDropdown: value,
      bankPengirimName: value
    })
  }

  ubahDropdownBankPenerima (value) {
    this.setState({
      currentBankPenerimaDropdown: value,
      flagingBankPenerimaDropdown: value
    })
  }

  ubahDropdownBankPenerimaOthers (value) {
    this.setState({
      currentBankPenerimaDropdown: value,
      bankPenerimaName: value
    })
  }


  dropdownSeparator() {
    return (
      <View></View>
    )
  }

  handleUsernameInput (typedUsername) {
    this.setState({
      nama_pengirim: typedUsername
    })
  }

  doTopupTransfer () {
    let { currentJumlahTransferDropdown, currentBankPengirimDropdown, currentBankPenerimaDropdown, tanggal_waktu, nama_pengirim } = this.state
    if( nama_pengirim.length <= 0 ) {
      this.setState({ setColor: true })
    }


    this.props.setTopupTransfer(this.props.token, tanggal_waktu, currentBankPengirimDropdown, currentBankPenerimaDropdown, nama_pengirim, currentJumlahTransferDropdown)

    Navigation.showModal({
      screen: 'NotificationLightBox', // unique ID registered with Navigation.registerScreen
      passProps: {
        title: 'Berhasil',
        text: 'Data Transfer Berhasil di Simpan!',
        flagging: 'Transfer',
        resetNamaPengirim: () => this.setState({nama_pengirim: ''})
      }, // simple serializable object that will pass as props to the modal (optional)
      navigatorStyle: {
        tapBackgroundToDismiss: true,
        backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        backgroundColor: "rgba(18,10,28,0.55)", // tint color for the background, you can specify alpha here (optional)
        navBarHidden: true,

      }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
      animationType: 'none' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    });

    this.setState({
      setColor: false,
      nama_pengirim: ''

    })
  }

  render() {
    // console.log(this.state.tanggal_waktu)
    let fontColor = '#4A207C'

    if (this.state.setColor) {
      fontColor = 'red'
    }

    return (
      <View style={{flexDirection: 'column', marginLeft: 'auto', marginRight: 'auto', width: DIMENSION_WIDTH * 0.9173, borderRadius: DIMENSION_WIDTH * 0.0417, minHeight: DIMENSION_HEIGHT * 0.625, backgroundColor: '#FFF'}}>
        <View style={{marginLeft: DIMENSION_WIDTH * 0.0693, marginRight: DIMENSION_WIDTH * 0.0747, flexDirection: 'row', justifyContent: 'space-between', marginTop: DIMENSION_HEIGHT * 0.03}}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{width: DIMENSION_WIDTH * 0.8333}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{justifyContent: 'center', width: DIMENSION_WIDTH * 0.7222, marginTop: DIMENSION_HEIGHT * 0.0156}}>
                <Label style={{color: '#373A3D', fontFamily: fontPlatform(Platform.OS, 'ExtraLight'), fontSize: normalizeFont(12), paddingRight: 1}}>JUMLAH TRANSFER</Label>
                <ModalDropdown
                  ref={el => this.dropdownJumlahTransfer = el}
                  onSelect={(index, value) => this.ubahDropdownJumlahTransfer(value)}
                  options={['Rp.10.000', 'Rp.25.000', 'Rp.50.000', 'Rp.100.000']}
                  defaultIndex={0}
                  defaultValue='Rp.10.000'
                  showsVerticalScrollIndicator={false}
                  renderSeparator={() => this.dropdownSeparator()}
                  style={{width: DIMENSION_WIDTH * 0.6944, height: DIMENSION_HEIGHT * 0.0313, marginTop: DIMENSION_HEIGHT * 0.0078}}
                  dropdownStyle={{width: DIMENSION_WIDTH * 0.3173, height: DIMENSION_HEIGHT * 0.2134}}
                  textStyle={{color: '#4A207C', fontSize: normalizeFont(12), fontFamily: fontPlatform(Platform.OS, 'Regular')}}
                  dropdownTextHighlightStyle={{borderLeftWidth: 3, paddingLeft: DIMENSION_WIDTH * 0.0693, borderLeftColor: '#4A207C', color: '#C400A5', fontSize: normalizeFont(12), fontFamily: fontPlatform(Platform.OS, 'Regular')}}
                  dropdownTextStyle={{paddingLeft: DIMENSION_WIDTH * 0.0722, color: '#4A207C', fontSize: normalizeFont(12), fontFamily: fontPlatform(Platform.OS, 'Medium')}}
                >
                </ModalDropdown>
              </View>
              <TouchableOpacity onPress={() => this.dropdownJumlahTransfer.show()} style={{justifyContent: 'flex-end', marginTop: DIMENSION_HEIGHT * 0.0141, alignSelf: 'flex-end'}}>
                <Icon name='ios-arrow-down' style={{color: '#4A207C', fontSize: normalizeFont(12)}}/>
              </TouchableOpacity>
            </View>
            <View style={{borderWidth: .5, borderBottomColor: '#4A207C', marginBottom: DIMENSION_HEIGHT * 0.0234, width: DIMENSION_WIDTH * 0.7389}}></View>


            <View style={{flexDirection: 'row'}}>
              <View style={{justifyContent: 'center', width: DIMENSION_WIDTH * 0.7222}}>
                <Label style={{color: '#373A3D', fontFamily: fontPlatform(Platform.OS, 'ExtraLight'), fontSize: normalizeFont(12), paddingRight: 1}}>BANK PENGIRIM</Label>
                <ModalDropdown
                  ref={el => this.dropdownBankPengirim = el}
                  onSelect={(index, value) => this.ubahDropdownBankPengirim(value)}
                  options={['TUNAI','BANK BCA', 'BANK CIMB', 'BANK BNI', 'BANK BRI', 'OTHERS']}
                  defaultIndex={0}
                  defaultValue='BANK BCA'
                  showsVerticalScrollIndicator={false}
                  renderSeparator={() => this.dropdownSeparator()}
                  style={{width: DIMENSION_WIDTH * 0.6944, height: DIMENSION_HEIGHT * 0.0313, marginTop: DIMENSION_HEIGHT * 0.0078}}
                  dropdownStyle={{width: DIMENSION_WIDTH * 0.3173, height: DIMENSION_HEIGHT * 0.2134}}
                  textStyle={{color: '#4A207C', fontSize: normalizeFont(12), fontFamily: fontPlatform(Platform.OS, 'Regular')}}
                  dropdownTextHighlightStyle={{borderLeftWidth: 3, paddingLeft: DIMENSION_WIDTH * 0.0693, borderLeftColor: '#4A207C', color: '#C400A5', fontSize: normalizeFont(12), fontFamily: fontPlatform(Platform.OS, 'Regular')}}
                  dropdownTextStyle={{paddingLeft: DIMENSION_WIDTH * 0.0722, color: '#4A207C', fontSize: normalizeFont(12), fontFamily: fontPlatform(Platform.OS, 'Medium')}}
                >
                </ModalDropdown>
              </View>
              <TouchableOpacity onPress={() => this.dropdownBankPengirim.show()} style={{justifyContent: 'flex-end', marginTop: DIMENSION_HEIGHT * 0.0141, alignSelf: 'flex-end'}}>
                <Icon name='ios-arrow-down' style={{color: '#4A207C', fontSize: normalizeFont(12)}}/>
              </TouchableOpacity>
            </View>

            <View style={{borderWidth: .5, borderBottomColor: '#4A207C', marginBottom: DIMENSION_HEIGHT * 0.0234, width: DIMENSION_WIDTH * 0.7389}}></View>

            
            { this.state.flagingBankPengirimDropdown === "OTHERS" ? 
              <View style={{ marginBottom: 10}}>
                <Item floatingLabel style={{borderColor: "#4A207C", }}>
                  <Label style={{color: '#373A3D', fontFamily: fontPlatform(Platform.OS, 'ExtraLight'), fontSize: normalizeFont(12), paddingRight: 1}}>Masukan Nama Bank Pengirim</Label>
                  <input value={this.state.bankPengirimName} style={{paddingLeft: 0, color: fontColor, fontFamily: fontPlatform(Platform.OS, 'Light')}} onChangeText={(value) => this.ubahDropdownBankPengirimOthers(value)}/>
                </Item>
              </View>
              :
              <View></View>
            }
            

            <View style={{flexDirection: 'row'}}>
              <View style={{justifyContent: 'center', width: DIMENSION_WIDTH * 0.7222}}>
                <Label style={{color: '#373A3D', fontFamily: fontPlatform(Platform.OS, 'ExtraLight'), fontSize: normalizeFont(12), paddingRight: 1}}>BANK PENERIMA</Label>
                <ModalDropdown
                  ref={el => this.dropdownBankPenerima = el}
                  onSelect={(index, value) => this.ubahDropdownBankPenerima(value)}
                  options={['BANK BCA', 'BANK CIMB', 'BANK BNI', 'BANK BRI', 'OTHERS']}
                  defaultIndex={0}
                  defaultValue='BANK BCA'
                  showsVerticalScrollIndicator={false}
                  renderSeparator={() => this.dropdownSeparator()}
                  style={{width: DIMENSION_WIDTH * 0.6944, height: DIMENSION_HEIGHT * 0.0313, marginTop: DIMENSION_HEIGHT * 0.0078}}
                  dropdownStyle={{width: DIMENSION_WIDTH * 0.3173, height: DIMENSION_HEIGHT * 0.2134}}
                  textStyle={{color: '#4A207C', fontSize: normalizeFont(12), fontFamily: fontPlatform(Platform.OS, 'Regular')}}
                  dropdownTextHighlightStyle={{borderLeftWidth: 3, paddingLeft: DIMENSION_WIDTH * 0.0693, borderLeftColor: '#4A207C', color: '#C400A5', fontSize: normalizeFont(12), fontFamily: fontPlatform(Platform.OS, 'Regular')}}
                  dropdownTextStyle={{paddingLeft: DIMENSION_WIDTH * 0.0722, color: '#4A207C', fontSize: normalizeFont(12), fontFamily: fontPlatform(Platform.OS, 'Medium')}}
                >
                </ModalDropdown>
              </View>
              <TouchableOpacity onPress={() => this.dropdownBankPenerima.show()} style={{justifyContent: 'flex-end', marginTop: DIMENSION_HEIGHT * 0.0141, alignSelf: 'flex-end'}}>
                <Icon name='ios-arrow-down' style={{color: '#4A207C', fontSize: normalizeFont(12)}}/>
              </TouchableOpacity>
            </View>
            <View style={{borderWidth: .5, borderBottomColor: '#4A207C', marginBottom: DIMENSION_HEIGHT * 0.0234, width: DIMENSION_WIDTH * 0.7389}}></View>

            { this.state.flagingBankPenerimaDropdown === "OTHERS" ? 
              <View style={{ marginBottom: 10}}>
                <Item floatingLabel style={{borderColor: "#4A207C", }}>
                  <Label style={{color: '#373A3D', fontFamily: fontPlatform(Platform.OS, 'ExtraLight'), fontSize: normalizeFont(12), paddingRight: 1}}>Masukan Nama Bank Penerima</Label>
                  <Input value={this.state.bankPenerimaName} style={{paddingLeft: 0, color: fontColor, fontFamily: fontPlatform(Platform.OS, 'Light')}} onChangeText={(value) => this.ubahDropdownBankPenerimaOthers(value)}/>
                </Item>
              </View>
              :
              <View></View>
            }

            <Label style={{color: '#373A3D', fontFamily: fontPlatform(Platform.OS, 'ExtraLight'), fontSize: normalizeFont(12), paddingRight: 1}}>WAKTU TRANSAKSI</Label>
            <DatePicker
              style={{width: DIMENSION_WIDTH * 0.5556}}
              date={this.state.tanggal_waktu}
              mode="datetime"
              format="YYYY-MM-DD HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={(datetime) => {this.setState({tanggal_waktu: datetime});}}
            />

          <Item floatingLabel style={{borderColor: fontColor, marginTop: 0, width: DIMENSION_WIDTH * 0.7222}}>
              <Label style={{color: '#373A3D', fontFamily: fontPlatform(Platform.OS, 'ExtraLight'), fontSize: normalizeFont(12), paddingRight: 1}}>NOMOR REKENING PENGIRIM</Label>
              <Input keyboardType = 'numeric' value={this.state.nama_pengirim} style={{paddingLeft: 0, color: '#4A207C', fontFamily: fontPlatform(Platform.OS, 'Light')}} onChangeText={(typedUsername) => this.handleUsernameInput(typedUsername)}/>
            </Item>



              <View style={{marginTop: DIMENSION_HEIGHT * 0.0234, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start'}}>
                <Icon name='alert' style={{color: '#4A207C', fontSize: normalizeFont(20)}}/>
                <Text style={{color: '#5C5C5D', fontSize: normalizeFont(11), fontFamily: fontPlatform(Platform.OS, 'Light')}}>
                  Apa itu transfer dan konfirmasi?
                </Text>
                <Text style={{color: '#4A207C', fontFamily: fontPlatform(Platform.OS, 'SemiBold'), fontSize: normalizeFont(11)}}
                  onPress={() => Linking.openURL('http://google.com')}>
                  Pelajari di sini
                </Text>
              </View>
              <View>
                { this.state.nama_pengirim.length == 0 ?
                  <Button rounded style={{marginTop: DIMENSION_HEIGHT * 0.0313, alignSelf: 'center',backgroundColor: '#c400a5', height: DIMENSION_HEIGHT * 0.063, width: DIMENSION_WIDTH * 0.3973, justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: '#C3B9CE', elevation: 7}}>
                    <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#FFF', textAlign: 'center', fontSize: normalizeFont(11)}}>HARAP DILENGKAPI</Text>
                  </Button>
                  :
                  <Button rounded style={{marginTop: DIMENSION_HEIGHT * 0.0313, alignSelf: 'center',backgroundColor: '#4A207C', height: DIMENSION_HEIGHT * 0.063, width: DIMENSION_WIDTH * 0.3973, justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: '#C3B9CE', elevation: 7}} onPress={() => this.doTopupTransfer()}>
                    <Text style={{fontFamily: fontPlatform(Platform.OS, 'bold'), color: '#FFF', textAlign: 'center', fontSize: normalizeFont(11)}}>KONFIRMASI</Text>
                  </Button>
                }
              </View>

            </View>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.TokenReducer.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTopupTransfer: (token, tanggal_waktu, bank_asal, bank_tujuan, nama_pengirim, saldo_topup) => dispatch(SetTopupTransfer(token, tanggal_waktu, bank_asal, bank_tujuan, nama_pengirim, saldo_topup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferMenu)
