import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  AsyncStorage,
  NetInfo,
  Platform
} from 'react-native';
import { graphql, Query } from 'react-apollo';
import client from '../client'
import gql from 'graphql-tag';
import { Card, Button } from 'native-base'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'
import rupiahConverter from '../helpers/rupiahConverter'
import {Navigation} from 'react-native-navigation'
import { connect } from 'react-redux'
import { CancelEditedOrders } from '../actions/editOrderMenu'
import { SetCurrentActiveDateBeranda, SetCurrentActiveIstirahatTabBeranda, SetActiveDateBeranda } from '../actions/calendarTelahPesan'
import CustomTopBar from '../components/customTopBar'
import MenuListItem from '../components/menuListItem'
import { SetBeranda, GetOrder, setFCMToken } from '../actions/berandaAction'
import { CheckingTimeout } from '../actions/timeoutAction'
// import RNFirebase from 'react-native-firebase'

class BerandaScreen extends Component {
  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      istirahatTabsChoosen: this.props.calendarTelahPesan.currentActiveIstirahatTab,
      ubahButtonClicked: false,
      activeDate: this.props.calendarTelahPesan.activeDate.slice(0,5),
      menuList: this.props.menuList.menuList,
      showedOrderedMenuList: props.orderList.orders,
      profile: props.pelangganProfile.pelangganProfile,
      editedOrders: props.orderList.editedOrders,
      loading: true,
      calenderPosition: 0,
      refreshing: false,
      tanggalHariIni: new Date(),
      token: '',
      status: true
    }
  }

  async componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleFirstConnectivityChange);
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ status: isConnected }); }
    );
    
    // let tempTokenFCMDevice = await RNFirebase.messaging().getToken()
    // this.props.setFCMToken(this.props.token, tempTokenFCMDevice)
    // // console.log('dapet cuk', tempTokenFCMDevice)

    this.props.navigator.setStyle({
      navBarCustomView: 'CustomTopBar',
      navBarComponentAlignment: 'center',
      navBarCustomViewInitialProps: {title: 'BERANDA'},
      navBarHidden: true,
      tabStyle: {
        tabBarHidden: false
      },
      appStyle: {
        tabBarHidden: false
      }
    });
  }

  setOrders (state, calenderPosition, currentActiveIstirahatTab) {
    let tanggal_sekarang = new Date(this.state.activeDate[this.state.calenderPosition].tanggal_tutup)
    this.setState({
    }, this.applyFilterByTanggalIstirahat (calenderPosition, currentActiveIstirahatTab))
  }

  // componentDidUpdate() {
  //   const { orders } = this.props.orderList;
  //   if (orders.length > 0 && this.state.loading) {
  //     return this.setState({ loading: false }, () => {
  //       return this.setState({
  //         showedOrderedMenuList:
  //       })
  //     })
  //   }
  // }

  async setToken () {
    try {
      const token =  await AsyncStorage.getItem('token')
      this.setState({ token: token})
    } catch (err) {
      console.log('token beranda error: ', err)
    }
  }

  componentWillMount () {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleFirstConnectivityChange);
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ status: isConnected }); }
    );

    this.setState({
      showedOrderedMenuList: this.props.orderList.orders,
      activeDate: this.props.calendarTelahPesan.activeDate.slice(0, 5),
    })

    this.setToken()

    // let currentDate = this.props.calendarTelahPesan.activeDate[2].date + ' ' + this.props.calendarTelahPesan.activeDate[2].month + ' ' + this.props.calendarTelahPesan.activeDate[2].year

    this.applyFilterByTanggalIstirahat(this.props.calendarTelahPesan.currentActiveDate, this.props.calendarTelahPesan.currentActiveIstirahatTab)
    this.props.setBeranda(this.props.token)
    if (this.props.firstLogin) {
      Navigation.showModal({
        screen: 'NotificationLightBox',
        passProps: {
          title: 'Ganti Password',
          text: 'Anda harus mengganti password setelan standar sebelum menggunakan Aplikasi',
          flagging: 'First Login',
          icon: 'Warning',
          navigateToProfile: () => this.navigateToProfile()
        },
        navigatorStyle: {
          tapBackgroundToDismiss: true,
          backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
          backgroundColor: "rgba(18,10,28,0.55)", // tint color for the background, you can specify alpha here (optional)
          navBarHidden: true,
        },
        animationType: 'none'
      })
    }
  }

  navigateToProfile() {
    this.props.navigator.switchToTab({
      tabIndex: 3
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.pelangganProfile.pelangganProfile.kode_pelanggan !== 'undefined' && nextProps.calendarTelahPesan.activeDate.length > 0){
      let activeDate = nextProps.calendarTelahPesan.activeDate.slice(0,5)
        // nextProps.cancelEditedOrders([...nextProps.orderList.orders])
      this.setState({
        loading: false,
        profile: nextProps.pelangganProfile.pelangganProfile,
        activeDate: activeDate,
        istirahatTabsChoosen: nextProps.calendarTelahPesan.currentActiveIstirahatTab,
        editedOrders: nextProps.orderList.editedOrders
      })
    }

    if(this.state.showedOrderedMenuList.length > 0 && nextProps.orderList.editedOrders.length > 0) {
      let tanggal_sekarang = new Date(this.state.activeDate[this.state.calenderPosition].tanggal_tutup)
        this.setState({
          // showedOrderedMenuList: nextProps.orderList.orders,
          editedOrders: nextProps.orderList.editedOrders},
          () => this.setOrders(this.state.showedOrderedMenuList, this.state.calenderPosition, nextProps.calendarTelahPesan.currentActiveIstirahatTab)
        )
    }
  }

  applyFilterByTanggalIstirahat (indexTanggal, istirahat, reset=false) {

    let indexAda = -1
    let orders = null
    if (reset) {
      orders = this.props.orderList.orders

    } else {
      orders = this.state.editedOrders
    }

    for (let i = 0; i < orders.length; i++) {
      let dateOrder = new Date(orders[i].tanggal_ambil)
      let dateCalendarAktif = new Date(this.props.calendarTelahPesan.activeDate[indexTanggal].tanggal_tutup)
      if (dateOrder.getUTCDate() == dateCalendarAktif.getUTCDate() && dateOrder.getUTCMonth() == dateCalendarAktif.getUTCMonth() && dateOrder.getUTCFullYear() == dateCalendarAktif.getUTCFullYear()) {
        indexAda = i
      }
    }

    if (indexAda < 0) {
      this.setState({
        showedOrderedMenuList: []
      })
    } else {
      let tempArr = []
      switch (istirahat) {
        case 0:
            tempArr = orders[indexAda].transaksi_detail
          break;
        case 1:
          for(let i = 0;i < orders[indexAda].transaksi_detail.length; i++) {
            if (orders[indexAda].transaksi_detail[i].jam_istirahat === 1) {
              tempArr.push(orders[indexAda].transaksi_detail[i])
            }
          }
          break;
        case 2:
          for(let i = 0;i < orders[indexAda].transaksi_detail.length; i++) {
            if (orders[indexAda].transaksi_detail[i].jam_istirahat === 2) {
              tempArr.push(orders[indexAda].transaksi_detail[i])
            }
          }
          break;
        case 3:
          for(let i = 0;i < orders[indexAda].transaksi_detail.length; i++) {
            if (orders[indexAda].transaksi_detail[i].jam_istirahat === 3) {
              tempArr.push(orders[indexAda].transaksi_detail[i])
            }
          }
          break;
        default:
      }
      this.setState({
        showedOrderedMenuList: tempArr,
      })
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

  onNavigatorEvent(event) {
    if (event.id === 'backPress') {
      this.showConfirmBeforeQuit()
    }

    if(event.type === 'DeepLink') {
      switch(event.link) {
        case 'BerandaScreen':
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

  pesanSekarangClicked() {
    this.props.navigator.switchToTab({
      tabIndex: 1
    })
  }

  changeIstirahatTabs(tabNum) {
    // let currentDate = this.props.calendarTelahPesan.activeDate[2].date + ' ' + this.props.calendarTelahPesan.activeDate[2].month + ' ' + this.props.calendarTelahPesan.activeDate[2].year
    this.setState({
      istirahatTabsChoosen: tabNum,
    }, this.applyFilterByTanggalIstirahat(this.props.calendarTelahPesan.currentActiveDate, tabNum) )
    this.props.setCurrentActiveIstirahatTab(tabNum)
  }

  changeQuantityMenuItem(index, newQuantity) {
    // alert(index)
  }

  changeCalendarPosition(i) {
    // let currentDate = this.props.calendarTelahPesan.activeDate[i].date + ' ' + this.props.calendarTelahPesan.activeDate[i].month + ' ' + this.props.calendarTelahPesan.activeDate[i].year
    //
    // if(i - 2 > 0) {
    //   while(i - 2 != 0) {
    //     this.moveArrayLeft()
    //     i--
    //   }
    // } else {
    //   while(i - 2 != 0) {
    //     this.moveArrayRight()
    //     i++
    //   }
    // }
    this.setState({
      calenderPosition: i,
    }, this.applyFilterByTanggalIstirahat(i, this.props.calendarTelahPesan.currentActiveIstirahatTab) )
    this.props.setCurrentActiveDate(i)

  }

  moveArrayLeft() {
    let newArr = this.state.activeDate
    let temp = newArr[0]
    newArr.shift()
    newArr.push(temp)
    this.props.setActiveDate(newArr)
    this.setState({
      activeDate: newArr
    })
  }

  moveArrayRight() {
    let newArr = this.state.activeDate
    let temp = newArr[4]
    newArr.pop()
    newArr.unshift(temp)
    this.props.setActiveDate(newArr)
    this.setState({
      activeDate: newArr
    })
  }

  toggleUbahButton() {
    if(this.state.ubahButtonClicked) {
      // let currentDate = this.props.calendarTelahPesan.activeDate[2].date + ' ' + this.props.calendarTelahPesan.activeDate[2].month + ' ' + this.props.calendarTelahPesan.activeDate[2].year
      this.props.cancelEditedOrders([...this.props.orderList.orders])
      this.setState({
        ubahButtonClicked: false,
      }, this.applyFilterByTanggalIstirahat(this.props.calendarTelahPesan.currentActiveDate, this.props.calendarTelahPesan.currentActiveIstirahatTab, true))
    } else {
      this.setState({
        ubahButtonClicked: true
      })
    }
  }

  selesaiEditPesanan() {
    this.props.navigator.push({
      screen: 'ConfirmationEditOrderScreen',
      navigatorStyle: {
        navBarCustomView: 'PilihMenuTopBar',
        navBarCustomViewInitialProps: {
          title: 'TOTAL PEMBAYARAN'
        },
        navBarHidden: true
      },
      passProps: {
        pembayaranConfirmed: () => this.toggleUbahButton(),
        token: this.state.token
      },
      backButtonHidden: true,
    })
  }

  _onRefresh() {
    this.props.getOrder(this.state.token)
  }

  compareDate () {
    if (typeof this.props.calendarTelahPesan.activeDate[this.state.calenderPosition].tanggal_tutup != 'undefined') {
      let tanggal_tutup = new Date(this.props.calendarTelahPesan.activeDate[this.state.calenderPosition].tanggal_tutup)

      if (this.state.calenderPosition === 1 && this.state.showedOrderedMenuList.length > 0) {
        if(this.state.tanggalHariIni.getHours() < 17) {
          return true
        } else {
          return false
        }
      } else if (this.state.showedOrderedMenuList.length > 0 && tanggal_tutup.getMonth() > this.state.tanggalHariIni.getMonth()){
        if (tanggal_tutup.getDate() <= this.state.tanggalHariIni.getDate() && this.state.tanggalHariIni.getHours() <= 24) {
          return true
        } else {
          return false
        }

      } else if (this.state.showedOrderedMenuList.length > 0 && tanggal_tutup.getMonth() == this.state.tanggalHariIni.getMonth()) {
          if (tanggal_tutup.getDate() > this.state.tanggalHariIni.getDate() + 1 && this.state.tanggalHariIni.getHours() <= 24) {
           return true
         } else {
           return false
         }
      } else {
        return false
      }

   }
  }

  handleFirstConnectivityChange(isConnected) {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );
  }

  connectionTimeout () {
    this.props.checkingTimeout()
    let { loading, pelangganProfile, calendarTelahPesan, setActiveDate } = this.props
    let { profile, status } = this.state
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
          {this.state.showedOrderedMenuList.length > 0 ? (<FlatList
            data={[...this.state.showedOrderedMenuList]}
            renderItem={({item, index}) => <MenuListItem item={item} index={index} buttonActive={this.state.ubahButtonClicked} tanggal={this.state.tanggalHariIni} tanggalDipilih={this.props.calendarTelahPesan.activeDate[this.state.calenderPosition]}/>}
            keyExtractor={(item, index) => index.toString()}
          />) :
          this.state.activeDate[this.props.calendarTelahPesan.currentActiveDate].active != 'undefined' && this.state.activeDate[this.props.calendarTelahPesan.currentActiveDate].active ? (
              <View style={{width: DIMENSION_WIDTH * 0.4907, height: DIMENSION_HEIGHT * 0.1949, flexDirection: 'column', alignSelf: 'center', justifyContent: 'space-between'}}>
                <Image
                  resizeMode='stretch'
                  style={{marginTop: DIMENSION_HEIGHT * 0.0023, width: DIMENSION_WIDTH * 0.1306, height: DIMENSION_HEIGHT * 0.075, borderRadius: DIMENSION_HEIGHT * 0.0469, marginLeft: 'auto', marginRight: 'auto'}}
                  source={require('../assets/warning.png')}
                />
                <Text style={{color: '#53525B', fontSize: normalizeFont(11), fontFamily: fontPlatform(Platform.OS, 'Medium'), textAlign: 'center'}}>
                  Kamu belum melakukan pemesanan
                </Text>
                <TouchableOpacity onPress={()=>this.pesanSekarangClicked()} rounded style={{height: DIMENSION_HEIGHT * 0.0525, width: DIMENSION_WIDTH * 0.4806, alignSelf: 'flex-end', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#4A207C', justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: '#C3B9CE', borderRadius: DIMENSION_HEIGHT * 0.0313}}>
                  <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#FFF', textAlign: 'center', fontSize: normalizeFont(11)}}>PESAN SEKARANG</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{width: DIMENSION_WIDTH * 0.4907, height: DIMENSION_HEIGHT * 0.1949, flexDirection: 'column', alignSelf: 'center', justifyContent: 'space-between'}}>
                <Image
                  style={{marginTop: DIMENSION_HEIGHT * 0.0023, width: DIMENSION_WIDTH * 0.1306, height: DIMENSION_HEIGHT * 0.075, borderRadius: DIMENSION_HEIGHT * 0.0469, marginLeft: 'auto', marginRight: 'auto'}}
                  source={require('../assets/warning.png')}
                />
                <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#4A207C', fontSize: normalizeFont(14), textAlign: 'center'}}>
                  Tidak Beroperasi
                </Text>
                <Text style={{color: '#53525B', fontSize: normalizeFont(11), fontFamily: fontPlatform(Platform.OS, 'Medium'), textAlign: 'center'}}>
                  Silahkan coba di hari yang lain
                </Text>
                <Button rounded style={{height: DIMENSION_HEIGHT * 0.0469, width: DIMENSION_WIDTH * 0.2222, alignSelf: 'flex-end', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#4A207C', justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: '#C3B9CE'}}>
                  <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#FFF', textAlign: 'center', fontSize: normalizeFont(11)}}>O K</Text>
                </Button>
              </View>
            )
          }
          { (this.compareDate()) ? (
          <View style={{marginTop: DIMENSION_HEIGHT * 0.0125, marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row'}}>
            <Button rounded style={{backgroundColor: (this.state.ubahButtonClicked ? '#FFF' : '#4A207C'), height: DIMENSION_HEIGHT * 0.0469, width: DIMENSION_WIDTH * 0.1667, justifyContent: 'center'}}
              onPress={() => this.toggleUbahButton()}
            >
              <Text style={{fontFamily: fontPlatform(Platform.OS, 'bold'), color: this.state.ubahButtonClicked ? '#000' : '#FFF', textAlign: 'center', fontSize: normalizeFont(10)}}>{(this.state.ubahButtonClicked ? 'B A T A L' : 'U B A H')}</Text>
            </Button>
            {this.state.ubahButtonClicked ? <Button rounded style={{marginLeft: DIMENSION_WIDTH * 0.1112, backgroundColor: '#4A207C', height: DIMENSION_HEIGHT * 0.0469, width: DIMENSION_WIDTH * 0.1667, justifyContent: 'center'}}
              onPress={() => this.selesaiEditPesanan()}
            >
              <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#FFF', textAlign: 'center', fontSize: normalizeFont(10)}}>O K</Text>
            </Button> : <View></View>}
          </View>) : (<View></View>)}

        </View>
      )
    }

  }

  render() {
    let { loading, pelangganProfile, calendarTelahPesan, setActiveDate } = this.props
    let { profile, status } = this.state

    if(this.state.loading ) {
      return ( <View style={{marginTop: DIMENSION_HEIGHT * 0.4219}}><ActivityIndicator size="large" color="#0000ff" /></View> )
    }

    return (
      <View style={styles.container}>
        <View style={{height: 60, top: -3, left: -5, width: DIMENSION_WIDTH + 19, elevation: 4, borderBottomWidth: .1, borderColor: '#c3b9ce'}}>
          <CustomTopBar title={'BERANDA'}/>
        </View>
        <ScrollView style={{flex: 1, backgroundColor: 'transparent', minHeight: DIMENSION_HEIGHT * 0.7812}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              colors={['purple', 'pink', 'red', 'blue']}
            />
          }
        >
        <Card style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: DIMENSION_HEIGHT * 0.0391, marginBottom: DIMENSION_HEIGHT * 0.0208, height:DIMENSION_HEIGHT * 0.1944, width: DIMENSION_WIDTH * 0.8533, marginLeft: 'auto', marginRight: 'auto', borderRadius: DIMENSION_HEIGHT * 0.0094, shadowOffset: {width: 4, height: 2}, shadowOpacity: 1, shadowRadius: 5, shadowColor: '#C3B9CE', backgroundColor: '#FFF', elevation: 9}}>
            <View style={{}}>
              <Image
                style={{width: DIMENSION_WIDTH * 0.1528, height: DIMENSION_HEIGHT * 0.0859, borderRadius: DIMENSION_HEIGHT * 0.0469}}
                source={{uri: profile.foto_pelanggan}}
              />
            </View>
            <View style={{marginLeft: DIMENSION_WIDTH * 0.041}}>
              <Text style={{fontFamily: fontPlatform(Platform.OS, 'Light'), color: '#4A4A4A', fontSize: normalizeFont(18)}}>
                { profile.nama_pelanggan }
              </Text>
              <Text style={{fontFamily: fontPlatform(Platform.OS, 'Medium'), color: '#4A4A4A', fontSize: normalizeFont(15)}}>
                { profile.kode_pelanggan}
              </Text>
              <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#4A207E', fontSize: normalizeFont(18)}}>
                Saldo: { rupiahConverter(profile.saldo) }
              </Text>
            </View>
          </Card>
          <View style={{backgroundColor: 'transparent'}}>
            <View style={{backgroundColor: 'transparent', width: DIMENSION_WIDTH, height: DIMENSION_HEIGHT * 0.0208}}>
            </View>
            <View style={{backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#CECECE', width: DIMENSION_WIDTH, minHeight: DIMENSION_HEIGHT * 0.5312, paddingBottom: DIMENSION_HEIGHT * 0.0156}}>
              <View style={{marginTop: DIMENSION_HEIGHT * 0.0469, height: DIMENSION_HEIGHT * 0.1406}}>
                <View style={{maxHeight: DIMENSION_HEIGHT * 0.1093, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginHorizontal: DIMENSION_WIDTH * 0.0157}}>
                  {this.state.activeDate.map((data, index) =>
                    (this.props.calendarTelahPesan.currentActiveDate == index) ? (
                      <View key={index} style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: normalizeFont(11), color: '#000', fontFamily: fontPlatform(Platform.OS, 'Medium')}}>
                          {data.month}
                        </Text>
                        <Button style={{backgroundColor: '#4A207C', borderRadius: DIMENSION_HEIGHT * 0.1172, marginVertical: DIMENSION_HEIGHT * 0.0078, width: DIMENSION_WIDTH * 0.0944, height: DIMENSION_HEIGHT * 0.0531, justifyContent: 'center', marginRight: 'auto', marginLeft: 'auto'}} onPress={() => this.changeCalendarPosition(index)}>
                          <Text style={{fontSize: normalizeFont(15), color: '#FFF', fontFamily: fontPlatform(Platform.OS, 'Regular')}}>{data.date}</Text>
                        </Button>
                        <Text style={{fontSize: normalizeFont(10), color: '#000', fontFamily: fontPlatform(Platform.OS, 'Bold')}}>
                          {data.day}
                        </Text>
                      </View>
                    ) :
                    (
                      <View key={index} style={{alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFF'}}>
                        <Text style={{fontSize: normalizeFont(11), color: 'transparent', fontFamily: fontPlatform(Platform.OS, 'Medium')}}>
                          {data.month}
                        </Text>
                        <Button transparent style={{backgroundColor: '#FFF', marginVertical: DIMENSION_HEIGHT * 0.0078, width: DIMENSION_WIDTH * 0.0907, height: DIMENSION_HEIGHT * 0.0472, justifyContent: 'center'}} onPress={() => this.changeCalendarPosition(index)}>
                          <Text style={{fontSize: normalizeFont(15), color: '#373A3D', fontFamily: fontPlatform(Platform.OS, 'Medium')}}>{data.date}</Text>
                        </Button>
                        <Text style={{fontSize: normalizeFont(10), color: '#373A3D', fontFamily: fontPlatform(Platform.OS, 'Bold')}}>
                          {data.day}
                        </Text>
                      </View>
                    )
                  )}
                </View>
              </View>
              <View style={{borderTopColor: '#EDEDED', borderTopWidth: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: DIMENSION_HEIGHT * 0.0206}}>
                  <View>
                    <TouchableOpacity onPress={() => this.changeIstirahatTabs(0)}>
                      <Text style={(this.props.calendarTelahPesan.currentActiveIstirahatTab == 0 ? styles.istirahatTabsChoosen : styles.istirahatTabs)}>
                        Semua
                      </Text>
                      <View>
                        <View style={(this.props.calendarTelahPesan.currentActiveIstirahatTab == 0 ? styles.tabChoosenBorder : '')}>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => this.changeIstirahatTabs(1)}>
                      <Text style={(this.props.calendarTelahPesan.currentActiveIstirahatTab == 1 ? styles.istirahatTabsChoosen : styles.istirahatTabs)}>
                        Istirahat 1
                      </Text>
                      <View >
                        <View style={(this.props.calendarTelahPesan.currentActiveIstirahatTab == 1 ? styles.tabChoosenBorder : '')}>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => this.changeIstirahatTabs(2)}>
                      <Text style={(this.props.calendarTelahPesan.currentActiveIstirahatTab == 2 ? styles.istirahatTabsChoosen : styles.istirahatTabs)}>
                        Istirahat 2
                      </Text>
                      <View>
                        <View style={(this.props.calendarTelahPesan.currentActiveIstirahatTab == 2 ? styles.tabChoosenBorder : '')}>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => this.changeIstirahatTabs(3)}>
                      <Text style={(this.props.calendarTelahPesan.currentActiveIstirahatTab == 3 ? styles.istirahatTabsChoosen : styles.istirahatTabs)}>
                        Istirahat 3
                      </Text>
                      <View>
                        <View style={(this.props.calendarTelahPesan.currentActiveIstirahatTab == 3 ? styles.tabChoosenBorder : '')}>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{marginTop: DIMENSION_HEIGHT * 0.0234, paddingBottom: DIMENSION_HEIGHT * 0.0757}}>
                  { this.connectionTimeout() }
                </View>
              </View>
            </View>
            <View style={{alignSelf: 'center', position: 'absolute', top: DIMENSION_HEIGHT * 0.0015}}>
              <Button rounded style={{backgroundColor: '#4A207C', height: DIMENSION_HEIGHT * 0.0417, width: DIMENSION_WIDTH * 0.736, justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: '#C3B9CE'}}>
                <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#FFF', textAlign: 'center', fontSize: normalizeFont(14)}}>MENU TELAH DIPESAN</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    height: '100%'
  },
  istirahatTabs: {
    color: '#5C5C5D',
    fontSize: normalizeFont(15),
    fontFamily: fontPlatform(Platform.OS, 'Medium')
  },
  istirahatTabsChoosen: {
    color: '#C400A5',
    fontSize: normalizeFont(15),
    fontFamily: fontPlatform(Platform.OS, 'Medium'),
    height: DIMENSION_HEIGHT * 0.0531
  },
  tabChoosenBorder: {
    marginTop: DIMENSION_HEIGHT * -0.0156,
    width: DIMENSION_WIDTH * 0.0987,
    height: DIMENSION_HEIGHT * 0.0004,
    borderTopColor: '#C400A5',
    borderTopWidth: 3,
  }
});

const mapStateToProps = (state) => {
  return {
    userInfo: state.UserInfo,
    calendarTelahPesan: state.CalendarTelahPesan,
    menuList: state.MenuList,
    orderList: state.TelahOrderMenu,
    pelangganProfile: state.Profile,
    token: state.TokenReducer.token,
    timeout: state.TimeoutReducer.isConnected,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentActiveDate: (newCurrentActiveDate) => dispatch(SetCurrentActiveDateBeranda(newCurrentActiveDate)),
    setCurrentActiveIstirahatTab: (newCurrentActiveIstirahatTab) => dispatch(SetCurrentActiveIstirahatTabBeranda(newCurrentActiveIstirahatTab)),
    setActiveDate: (newActiveDate) => dispatch(SetActiveDateBeranda(newActiveDate)),
    cancelEditedOrders: (orders) => dispatch(CancelEditedOrders([...orders])),
    setBeranda: (currentBeranda) => dispatch(SetBeranda(currentBeranda)),
    getOrder: (token) => dispatch(GetOrder(token)),
    checkingTimeout: () => dispatch(CheckingTimeout()),
    setFCMToken: (userToken, fcmToken) => dispatch(setFCMToken(userToken, fcmToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BerandaScreen)
