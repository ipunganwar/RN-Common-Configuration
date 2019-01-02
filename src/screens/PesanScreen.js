import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, FlatList, BackHandler, ActivityIndicator, RefreshControl, AsyncStorage, Platform} from 'react-native';
import {Button} from 'native-base'
import CustomHeaderPesan from '../components/customHeaderPesan'
import CustomTopSearchBar from '../components/customTopSearchBar'
import KantinListItem from '../components/kantinListItem'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT } from '../helpers/dimension'
import rupiahConverter from '../helpers/rupiahConverter'
import { graphql, Query } from 'react-apollo';
import { GetKantinDanMenu } from '../actions/kantinAction'
import { CheckingTimeout } from '../actions/timeoutAction'


class PesanScreen extends React.Component {
  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this.state = {
      currentActiveIstirahatTab: props.calendarPesan.currentActiveIstirahatTab,
      currentActiveDate: props.calendarPesan.currentActiveDate,
      activeDate: props.calendarPesan.activeDate,
      kantinList: props.kantinList,
      kantinListShowed: props.kantinList,
      searchText: '',
      loading: true,
      refreshing: false,
      token: ''
    }
  }

  async setToken () {
    try {
      const token =  await AsyncStorage.getItem('token')
      this.setState({ token: token})
    } catch (err) {
      console.log('token pesan screen error: ', err)
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

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected' || event.id === 'willAppear') {

      this.props.getKantinDanMenu(this.props.token)
      this.cekLiburSemuaGa()
    } else if (event.id === 'backPress') {
      this.showConfirmBeforeQuit()
    }
    if (event.type === 'DeepLink') {
      switch (event.link) {
        case 'searchKantin':
            this.doSearchKantin(event.payload)
          break;
        default:

      }
    }
  }

  doSearchKantin (text) {
    if (text === undefined) {
      text = ''
    }
    let filteredKantinBySearch = this.state.kantinList.filter((item) => {
      return item.nama_outlet.toLowerCase().indexOf(text.toLowerCase()) > -1
    })

    this.setState({
      searchText: text,
      kantinListShowed: filteredKantinBySearch
    })
  }

  popMundur() {
    this.props.navigator.pop()
  }

  componentDidMount () {
    this.cekLiburSemuaGa()
  }

  cekLiburSemuaGa () {
    let liburSemua = true
    for (let i = 0; i < this.props.calendarPesan.activeDate.length; i++) {
      if (this.props.calendarPesan.activeDate[i].active) {
        liburSemua = false
        break;
      }
    }
    if (liburSemua) {
      Navigation.showLightBox({
        screen: 'NotificationLightBox',
        passProps: {
          icon: 'Warning',
          title: 'Tidak Beroperasi',
          text: 'Anda belum dapat melakukan pesanan untuk 5 hari ke depan'
        },
        style: {
          tapBackgroundToDismiss: true,
          backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
          backgroundColor: "rgba(18,10,28,0.55)" // tint color for the background, you can specify alpha here (optional)
        },
      })
      this.kantinTutupSwitchKeBeranda()
    }
  }

  pushToPilihMenu (kantinName, kodeOutlet) {

    //nanti push ke menu pilih kantin
    // alert(this.state.kantinList[indexKantin].name)
    this.props.navigator.push({
      screen: 'PilihMenuScreen',
      navigatorStyle: {
        navBarCustomView: 'PilihMenuTopBar',
        navBarCustomViewInitialProps: {
          title: 'Pilih Menu'
        },
        navBarHidden: true
      },
      passProps: {
        kantinName,
        kodeOutlet,
        token: this.props.token
      },
      backButtonHidden: true,
      navigatorButtons: {}
    })
  }

  filterShowedKantin () {
    if (this.state.searchText != '') {
      switch (this.props.calendarPesan.currentActiveIstirahatTab) {
        case 0:
            return this.state.kantinListShowed.filter(kantin => kantin.istirahat1)
          break;
        case 1:
            return this.state.kantinListShowed.filter(kantin => kantin.istirahat2)
          break;
        case 2:
            return this.state.kantinListShowed.filter(kantin => kantin.istirahat3)
          break;
        default:

      }
    } else {
      switch (this.props.calendarPesan.currentActiveIstirahatTab) {
        case 0:
            return this.state.kantinList.filter(kantin => kantin.istirahat1)
          break;
        case 1:
            return this.state.kantinList.filter(kantin => kantin.istirahat2)
          break;
        case 2:
            return this.state.kantinList.filter(kantin => kantin.istirahat3)
          break;
        default:

      }
    }
  }

  kantinTutupSwitchKeBeranda() {
    this.props.navigator.switchToTab({
      tabIndex: 0
    })
  }

  componentWillMount () {
    this.setToken()
  }

  componentDidMount() {
    this.props.navigator.setStyle({
      navBarCustomView: 'CustomTopSearchBar',
      navBarComponentAlignment: 'center',
      navBarCustomViewInitialProps: {title: 'PILIH KANTIN'},
      navBarHidden: true
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeDate: nextProps.calendarPesan.activeDate
    })

    if(nextProps.kantinList !== this.props.kantinList) {
      this.setState({
          kantinList: nextProps.kantinList,
          kantinListShowed: nextProps.kantinList,
          loading: nextProps.loading
        })
    }
  }

  _onRefresh() {
    this.props.getKantinDanMenu(this.props.token)
    this.setState({ refreshing: this.props.loading})
  }

  connectionTimeout () {
    if (!this.props.timeout) {
      return (
        <View style={{width: 100, marginLeft: 50, marginTop: 100}}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../assets/warning.png')}
          />
        <Text style={{marginLeft: -75, width: 300}}>Anda Offline, Coba lakukan refresh</Text>
        </View>
      )
    } else {
      return (
        this.filterShowedKantin().map((item, index) => {
          return (
            <KantinListItem item={item} key={index} index={index} handleKantinClicked={(kantinName, kodeOutlet) => this.pushToPilihMenu(kantinName, kodeOutlet)}/>
          )
        })
      )
    }
  }

  render() {
    this.props.checkingTimeout()
    return (
      <View style={{backgroundColor: '#FFF', height: '100%'}}>
        <View style={{height: 60, top: -3, left: -5, width: DIMENSION_WIDTH + 19, elevation: 4, borderBottomWidth: .1, borderColor: '#c3b9ce'}}>
          <CustomTopSearchBar title={'PILIH KANTIN'}/>
        </View>
        <ScrollView style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              colors={['purple', 'pink', 'red', 'blue']}
            />
          }
        >
          <View>
            <CustomHeaderPesan switchToBeranda={() => this.kantinTutupSwitchKeBeranda()}/>
          </View>
          <View style={styles.listKantinContainer}>
            { this.state.loading ?
                <View style={{marginTop: 200}}><ActivityIndicator size="large" color="#0000ff" /></View>
              :
                this.connectionTimeout()
              }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    minHeight: DIMENSION_HEIGHT * 0.7578
  },
  listKantinContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: DIMENSION_HEIGHT * 0.0062,
    paddingBottom: DIMENSION_HEIGHT * 0.0234
  }
});

const mapStateToProps = (state) => {
  return {
    calendarPesan: state.CalendarPesan,
    kantinList: state.KantinList.kantinList,
    loading: state.KantinList.loading,
    listMenuSekolah: state.MenuList.menuList.menuBySekolah,
    token: state.TokenReducer.token,
    timeout: state.TimeoutReducer.isConnected,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getKantinDanMenu: (token) => dispatch(GetKantinDanMenu(token)),
    checkingTimeout: () => dispatch(CheckingTimeout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PesanScreen);
