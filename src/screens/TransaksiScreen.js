import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, ActivityIndicator, RefreshControl, KeyboardAvoidingView, Platform} from 'react-native';
import {Button} from 'native-base'
import TransaksiItemList from '../components/transaksiItemList'
import TransaksiTopupList from '../components/transaksiTopupList'
import TransferMenu from '../components/transferMenu'
import CustomTopBar from '../components/customTopBar';
import {Navigation} from 'react-native-navigation'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'
import { GetTransaksi } from '../actions/transaksiAction'
import { connect } from 'react-redux'
import { CheckingTimeout } from '../actions/timeoutAction'


class TransaksiScreen extends React.Component {

  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this.state = {
      tabsChoosen: 0,
      isPembelianActive: true,
      saldo: props.saldo,
      PengembalianKartuList: props.pengembalianKartuList,
      TopupKartuList: props.topupKartuList,
      KasirPembelianList: props.kasirPembelianList,
      AplikasiPembelianList: props.aplikasiPembelianList,
      loading: true,
      refreshing: false,
    }
  }

  onNavigatorEvent(event) {
    if (event.id === 'backPress') {
      this.showConfirmBeforeQuit()
    }
    if (event.id === 'bottomTabSelected') {
      this.props.getTransaksi(this.props.token)
    }
    if(event.type === 'DeepLink') {
      switch(event.link) {
        case 'TransaksiScreen':
          this.props.navigator.push({
            screen: 'NotificationScreen',
            navigatorStyle: {
              navBarCustomView: 'NotificationTopBar',
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

  showConfirmBeforeQuit () {
    Navigation.showLightBox({
      screen: 'ConfirmationLightBox',
      passProps: {
        icon: 'Warning',
        title: 'Konfirmasi',
        text: 'Keluar dari aplikasi ?',
        isQuit: true
      },
      style: {
        tapBackgroundToDismiss: true,
        backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        backgroundColor: "rgba(18,10,28,0.55)" // tint color for the background, you can specify alpha here (optional)
      },
    })
  }

  toggleActiveButton () {
    let tab = 0
    if (this.state.isPembelianActive) {
      tab = 2
    }
    this.setState({
      isPembelianActive: !this.state.isPembelianActive,
      tabsChoosen: tab
    })
  }

  changeTabs (num) {
    this.setState({
      tabsChoosen: num
    })
  }

  componentDidMount() {
    this.props.navigator.setStyle({
      navBarCustomView: 'CustomTopBar',
      navBarComponentAlignment: 'center',
      navBarCustomViewInitialProps: {title: 'TRANSAKSI'},
      navBarHidden: true
    });
  }

  renderButton () {
    let pembelianActive = {
      button: {
        backgroundColor: '#FFF'
      },
      text: {
        marginLeft: DIMENSION_WIDTH * 0.0722, fontFamily: fontPlatform(Platform.OS, 'Bold'), fontSize: normalizeFont(14), color: '#4A4A4A'
      }
    }
    let kartuActive = {
      button: {
        backgroundColor: '#FFF'
      },
      text: {
        fontFamily: fontPlatform(Platform.OS, 'Bold'), fontSize: normalizeFont(14), color: '#4A4A4A'
      }
    }
    if (this.state.isPembelianActive) {
      pembelianActive.button = {
        backgroundColor: '#4A207C', position: 'absolute', left: DIMENSION_WIDTH * -0.0138, justifyContent: 'center'
      }
      kartuActive.button.marginLeft = DIMENSION_WIDTH * 0.3333
      kartuActive.button.justifyContent = 'center'
      pembelianActive.text = {
        fontFamily: fontPlatform(Platform.OS, 'Bold'), fontSize: normalizeFont(14), color: '#FFFFFF',
      }
    } else {
      kartuActive.button = {
        backgroundColor: '#4A207C', left: DIMENSION_WIDTH * 0.3333, position: 'absolute', justifyContent: 'center'
      }
      kartuActive.text = {
        fontFamily: fontPlatform(Platform.OS, 'Bold'), fontSize: normalizeFont(14), color: '#FFFFFF'
      }
    }
    if (this.state.isPembelianActive) {
      return (  <View><Button onPress={() => this.toggleActiveButton()} style={{shadowColor: '#C3B9CE', shadowOpacity: 1, shadowRadius: 14, shadowOffset: {width: 0, height: 8}, elevation: 10, borderRadius: DIMENSION_HEIGHT * 0.0446, width: DIMENSION_WIDTH * 0.4444, ...kartuActive.button}}>
                  <Text style={{...kartuActive.text}}>
                    KARTU
                  </Text>
                </Button>
                <Button onPress={() => this.toggleActiveButton()} style={{shadowColor: '#C3B9CE', shadowOpacity: 1, shadowRadius: 14, shadowOffset: {width: 0, height: 8}, elevation: 10, borderRadius: DIMENSION_HEIGHT * 0.0446, width: DIMENSION_WIDTH * 0.4444, ...pembelianActive.button}}>
                  <Text style={{...pembelianActive.text}}>
                    PEMBELIAN
                  </Text>
                </Button></View>
              )
    } else {
      return (  <View>
                <Button onPress={() => this.toggleActiveButton()} style={{shadowColor: '#C3B9CE', shadowOpacity: 1, shadowRadius: 14, shadowOffset: {width: 0, height: 8}, elevation: 10, borderRadius: DIMENSION_HEIGHT * 0.0446, width: DIMENSION_WIDTH * 0.4444, ...pembelianActive.button}}>
                  <Text style={{...pembelianActive.text}}>
                    PEMBELIAN
                  </Text>
                </Button>
                <Button onPress={() => this.toggleActiveButton()} style={{shadowColor: '#C3B9CE', shadowOpacity: 1, shadowRadius: 14, shadowOffset: {width: 0, height: 8}, elevation: 10, borderRadius: DIMENSION_HEIGHT * 0.0446, width: DIMENSION_WIDTH * 0.4444, ...kartuActive.button}}>
                  <Text style={{...kartuActive.text}}>
                    KARTU
                  </Text>
                </Button></View>
              )
    }
  }

  renderTabs () {
    if (this.state.isPembelianActive) {
      return (
        <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: DIMENSION_HEIGHT * 0.02187, flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => this.changeTabs(0)} style={{marginRight: DIMENSION_WIDTH * 0.09722}}>
            <Text style={(this.state.tabsChoosen == 0 ? styles.tabChoosenText : styles.tab)}>
              Aplikasi
            </Text>
            <View style={{marginTop: DIMENSION_HEIGHT * -0.0156}}>
            <View style={(this.state.tabsChoosen == 0 ? styles.tabChoosenBorder : '')}>
            </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changeTabs(1)}>
            <Text style={(this.state.tabsChoosen == 1 ? styles.tabChoosenText : styles.tab)}>
              Kasir
            </Text>
            <View style={{marginTop: DIMENSION_HEIGHT * -0.0156}}>
            <View style={(this.state.tabsChoosen == 1 ? styles.tabChoosenBorder : '')}>
            </View>
            </View>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: DIMENSION_HEIGHT * 0.0218, flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.changeTabs(2)} style={{marginRight: DIMENSION_WIDTH * 0.0972}}>
            <Text style={(this.state.tabsChoosen == 2 ? styles.tabChoosenText : styles.tab)}>
              Topup
            </Text>
            <View style={{marginTop: DIMENSION_HEIGHT * -0.0156}}>
            <View style={(this.state.tabsChoosen == 2 ? styles.tabChoosenBorder : '')}>
            </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changeTabs(3)} style={{marginRight: DIMENSION_WIDTH * 0.1111}}>
            <Text style={(this.state.tabsChoosen == 3 ? styles.tabChoosenText : styles.tab)}>
              Pengembalian
            </Text>
            <View style={{marginTop: DIMENSION_HEIGHT * -0.0156}}>
            <View style={(this.state.tabsChoosen == 3 ? styles.tabChoosenBorder : '')}>
            </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changeTabs(4)}>
              <Text style={(this.state.tabsChoosen == 4 ? styles.tabChoosenText : styles.tab)}>
              Transfer
            </Text>
            <View style={{marginTop: DIMENSION_HEIGHT * -0.0156}}>
            <View style={(this.state.tabsChoosen == 4 ? styles.tabChoosenBorder : '')}>
            </View>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }

pesanSekarangClicked () {
  this.props.navigator.switchToTab({
     tabIndex: 1
   })
}


  renderCardList () {
    switch (this.state.tabsChoosen) {
      case 0:
        if (this.state.AplikasiPembelianList.length == 0) {
          return (
            <View style={{width: DIMENSION_WIDTH * 0.4907, height: DIMENSION_HEIGHT * 0.1949, flexDirection: 'column', alignSelf: 'center', justifyContent: 'space-between', marginTop: DIMENSION_HEIGHT * 0.1563}}>
              <Image
                style={{marginTop: DIMENSION_HEIGHT * 0.0023, width: DIMENSION_WIDTH * 0.1306, height: DIMENSION_HEIGHT * 0.075, borderRadius: DIMENSION_HEIGHT * 0.0469, marginLeft: 'auto', marginRight: 'auto'}}
                source={require('../assets/warning.png')}
              />
              <Text style={{color: '#53525B', fontSize: normalizeFont(11), fontFamily: fontPlatform(Platform.OS, 'Medium'), textAlign: 'center'}}>
                Kamu belum melakukan pembelian
              </Text>
              <Button onPress={()=>this.pesanSekarangClicked()} rounded style={{height: DIMENSION_HEIGHT * 0.0525, width: DIMENSION_WIDTH * 0.4806, alignSelf: 'flex-end', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#4A207C', justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: '#C3B9CE'}}>
                <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#FFF', textAlign: 'center', fontSize: normalizeFont(11)}}>BELI SEKARANG</Text>
              </Button>
            </View>
          )
        } else {
          return (
            <FlatList
              data={this.state.AplikasiPembelianList}
              renderItem={({item}) => <TransaksiItemList item={item}/>}
              keyExtractor={(item, index) => index.toString()}
            />
          )
        }
        break
      case 1:
        if (this.state.KasirPembelianList.length > 0) {
          return (
            <FlatList
              data={this.state.KasirPembelianList}
              renderItem={({item}) => <TransaksiItemList item={item}/>}
              keyExtractor={(item, index) => index.toString()}
            />
          )
        } else {
          return (
            <View style={{width: DIMENSION_WIDTH * 0.4907, height: DIMENSION_HEIGHT * 0.1949, flexDirection: 'column', alignSelf: 'center', justifyContent: 'space-between', marginTop: DIMENSION_HEIGHT * 0.1563}}>
              <Image
                style={{marginTop: DIMENSION_HEIGHT * 0.0023, width: DIMENSION_WIDTH * 0.1306, height: DIMENSION_HEIGHT * 0.075, borderRadius: DIMENSION_HEIGHT * 0.0469, marginLeft: 'auto', marginRight: 'auto'}}
                source={require('../assets/warning.png')}
              />
              <Text style={{color: '#53525B', fontSize: normalizeFont(11), fontFamily: fontPlatform(Platform.OS, 'Medium'), textAlign: 'center'}}>
                Kamu belum melakukan pembelian
              </Text>
              <Button onPress={()=>this.pesanSekarangClicked()} rounded style={{height: DIMENSION_HEIGHT * 0.0525, width: DIMENSION_WIDTH * 0.4806, alignSelf: 'flex-end', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#4A207C', justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: '#C3B9CE'}}>
                <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#FFF', textAlign: 'center', fontSize: normalizeFont(11)}}>BELI SEKARANG</Text>
              </Button>
            </View>
          )
        }
        break

      case 2:
        if (this.state.TopupKartuList.length > 0) {
          return (
            <FlatList
              data={this.state.TopupKartuList}
              renderItem={({item}) => <TransaksiTopupList item={item} saldo={this.state.saldo}/>}
              keyExtractor={(item, index) => index.toString()}
            />
          )
        } else {
          return (
            <View style={{width: DIMENSION_WIDTH * 0.4907, height: DIMENSION_HEIGHT * 0.1949, flexDirection: 'column', alignSelf: 'center', justifyContent: 'space-between', marginTop: DIMENSION_HEIGHT * 0.1563}}>
              <Image
                style={{marginTop: DIMENSION_HEIGHT * 0.0023, width: DIMENSION_WIDTH * 0.1306, height: DIMENSION_HEIGHT * 0.075, borderRadius: DIMENSION_HEIGHT * 0.0469, marginLeft: 'auto', marginRight: 'auto'}}
                source={require('../assets/warning.png')}
              />
              <Text style={{color: '#53525B', fontSize: normalizeFont(11), fontFamily: fontPlatform(Platform.OS, 'Medium'), textAlign: 'center'}}>
                Kamu belum melakukan pembelian
              </Text>
              <Button onPress={()=>this.pesanSekarangClicked()} rounded style={{height: DIMENSION_HEIGHT * 0.0525, width: DIMENSION_WIDTH * 0.4806, alignSelf: 'flex-end', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#4A207C', justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: '#C3B9CE'}}>
                <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#FFF', textAlign: 'center', fontSize: normalizeFont(11)}}>BELI SEKARANG</Text>
              </Button>
            </View>
          )
        }

        break
      case 3:
        if (this.state.PengembalianKartuList.length > 0) {
          return (
            <FlatList
              data={this.state.PengembalianKartuList}
              renderItem={({item}) => <TransaksiItemList item={item}/>}
              keyExtractor={(item, index) => index.toString()}
            />
          )
        } else {
          return (
            <View style={{width: DIMENSION_WIDTH * 0.4907, height: DIMENSION_HEIGHT * 0.1949, flexDirection: 'column', alignSelf: 'center', justifyContent: 'space-between', marginTop: DIMENSION_HEIGHT * 0.1563}}>
              <Image
                style={{marginTop: DIMENSION_HEIGHT * 0.0023, width: DIMENSION_WIDTH * 0.1306, height: DIMENSION_HEIGHT * 0.075, borderRadius: DIMENSION_HEIGHT * 0.0469, marginLeft: 'auto', marginRight: 'auto'}}
                source={require('../assets/warning.png')}
              />
              <Text style={{color: '#53525B', fontSize: normalizeFont(11), fontFamily: fontPlatform(Platform.OS, 'Medium'), textAlign: 'center'}}>
                Kamu belum melakukan pembelian
              </Text>
              <Button onPress={()=>this.pesanSekarangClicked()} rounded style={{height: DIMENSION_HEIGHT * 0.0525, width: DIMENSION_WIDTH * 0.4806, alignSelf: 'flex-end', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#4A207C', justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: '#C3B9CE'}}>
                <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#FFF', textAlign: 'center', fontSize: normalizeFont(11)}}>BELI SEKARANG</Text>
              </Button>
            </View>
          )
        }

        break
      case 4:
      return (
        <TransferMenu />
      )

          break
    }
  }

  _onRefresh() {
    this.props.getTransaksi(this.props.token)
    this.setState({ refreshing: this.props.loading})
  }

  checkConnection () {
    this.props.checkingTimeout()
      if (!this.props.timeout) {
        return (
          <View style={{width: 100, marginLeft: 150, marginTop: 20}}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/warning.png')}
            />
          <Text style={{marginLeft: -75, width: 300}}>Anda Offline, Coba lakukan refresh</Text>
          </View>
        )
      } else {
        return (
          <View>
            { this.renderCardList() }
          </View>

        )
      }
  }

  render() {
    if(this.state.loading ) {
      return ( <View style={{marginTop: 270}}><ActivityIndicator size="large" color="#0000ff" /></View> )
    }

    return (
    <View style={{backgroundColor: '#FFF', height: '100%'}}>
      <View style={{height: 60, top: -3, left: -5, width: DIMENSION_WIDTH + 19, elevation: 4, borderBottomWidth: .1, borderColor: '#c3b9ce'}}>
        <CustomTopBar title={'TRANSAKSI'}/>
      </View>
      <ScrollView refreshControl={
        <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh.bind(this)}
        colors={['purple', 'pink', 'red', 'blue']}
        />
      }>
        <KeyboardAvoidingView style={{backgroundColor: '#FFF', minHeight: DIMENSION_HEIGHT > 700 ? DIMENSION_HEIGHT - 110 : DIMENSION_HEIGHT - 140}}>
          <View style={{flexDirection: 'row', marginLeft: this.state.pembelianActive ? DIMENSION_WIDTH * 0.4611 : DIMENSION_WIDTH * 0.11111 , marginTop: DIMENSION_HEIGHT * 0.0328}}>
            {this.renderButton()}
          </View>
          <View style={{marginBottom: DIMENSION_HEIGHT * 0.02344}}>
            {this.renderTabs()}
          </View>
          <View>
            {
              this.checkConnection()
            }
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
    );
  }

  filterAplikasi(data) {
    let aplikasiList = []
    let total

    if (data.length >= 1) {
      data.forEach( (item, index) => {
        let totalSemua = 0
        item.transaksi_detail.forEach( (detail, i) => {
          total = detail.harga_beli * detail.jumlah_pesan
          totalSemua += total
        })
        aplikasiList.push({...item, total: totalSemua, saldo: this.state.saldo})
      })
    }
    this.setState({
      AplikasiPembelianList: aplikasiList
    })
  }

  filterKasir(data) {
    let kasirList = []
    let total

    if (data.length >= 1) {
      data.forEach( (item, index) => {
        let totalSemua = 0
        item.transaksi_detail.forEach( (detail, i) => {
          total = detail.harga_beli * detail.jumlah_pesan
          totalSemua += total
        })
        kasirList.push({...item, total: totalSemua, saldo: this.state.saldo})
      })
    }
    this.setState({
      KasirPembelianList: kasirList
    })
  }

  filterPengembalian(data) {
    let pengembalianList = []
    let total

    if (data.length >= 1) {
      data.forEach( (item, index) => {
        let totalSemua = 0
        let transDet = []
        item.transaksi_detail.forEach( (detail, i) => {
          detail.jumlah_pesan = detail.jumlah_kembali
          let tempReplace = JSON.parse(JSON.stringify(detail))
          tempReplace.jumlah_pesan = detail.jumlah_kembali
          detail = JSON.parse(JSON.stringify(tempReplace))
          total = detail.harga_beli * detail.jumlah_pesan
          transDet.push(detail)
          totalSemua += total
        })
        let copyOfItem = JSON.parse(JSON.stringify(item))
        copyOfItem.transaksi_detail = transDet
        pengembalianList.push({...copyOfItem, total: totalSemua, saldo: this.state.saldo})
      })
    }
    this.setState({
      PengembalianKartuList: pengembalianList
    })
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.loading != 'undefined' && nextProps.loading != true) {
      this.filterAplikasi(nextProps.aplikasiPembelianList)
      this.filterKasir(nextProps.kasirPembelianList)
      this.filterPengembalian(nextProps.pengembalianKartuList)

      this.setState({
        TopupKartuList: nextProps.topupKartuList,
        loading: nextProps.loading
      })
    }


    if (typeof nextProps.pelangganProfile !== undefined) {
      this.setState({
        saldo: nextProps.pelangganProfile.saldo
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    aplikasiPembelianList: state.TransaksiList.listMyTransaksi.AplikasiPembelianList,
    kasirPembelianList: state.TransaksiList.listMyTransaksi.KasirPembelianList,
    topupKartuList: state.TransaksiList.listMyTransaksi.TopupKartuList,
    pengembalianKartuList: state.TransaksiList.listMyTransaksi.PengembalianKartuList,
    pelangganProfile: state.Profile.pelangganProfile,
    loading: state.TransaksiList.loading,
    token: state.TokenReducer.token,
    timeout: state.TimeoutReducer.isConnected,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTransaksi: (currentTransaksi) => dispatch(GetTransaksi(currentTransaksi)),
    checkingTimeout: () => dispatch(CheckingTimeout())
  }
}



const styles = StyleSheet.create({
  tab: {
    color: '#5C5C5D',
    fontSize: normalizeFont(15),
    fontFamily: fontPlatform(Platform.OS, 'Medium'),
  },
  tabChoosenBorder: {
    width: DIMENSION_WIDTH * 0.0987,
    borderTopColor: '#C400A5',
    borderTopWidth: 3,
  },
  tabChoosenText: {
    color: '#C400A5',
    fontSize: normalizeFont(15),
    fontFamily: fontPlatform(Platform.OS, 'Medium'),
    height: DIMENSION_HEIGHT * 0.05312,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TransaksiScreen)
