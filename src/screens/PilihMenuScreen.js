import React from 'react'
import {ScrollView, View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, RefreshControl, Platform} from 'react-native'
import {Icon, Button} from 'native-base'
import ModalDropdown from 'react-native-modal-dropdown'
import CustomHeaderPesan from '../components/customHeaderPesan'
import PilihMenuTopBar from '../components/pilihMenuTopBar'
import { connect } from 'react-redux'
import {IncreaseQuantity, DecreaseQuantity, NewOrder} from '../actions/orderMenu'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'
import {categoryFilter, kantinFilter, dateFilter} from '../helpers/filterHelper'
import rupiahConverter from '../helpers/rupiahConverter'
import Loading from '../components/Loading'
import { dateOnly as SetDate} from '../helpers/dateConverter'
import { SetNewOrderMenuDummy, HelperDummy } from '../dummy-state/pesan-dummy'
import { GetKantinDanMenu } from '../actions/kantinAction'


class PilihMenuScreen extends React.Component {
  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      ubahDulu: false,
      currentActiveIstirahatTab: props.calendarPesan.currentActiveIstirahatTab,
      currentActiveDate: props.calendarPesan.currentActiveDate,
      currentTanggalPenetapanMenu: props.calendarPesan.currentTanggalPenetapanMenu,
      currentCategoryDropdown: 'Semua',
      currentKantinDropdown: props.kantinName,
      activeDate: props.calendarPesan.activeDate.slice(1, 6),
      kantinList: props.kantinList.kantinList,
      menu: props.menuList,
      showedMenu: [],
      tabBarHidden: true,
      searchText: '',
      kodeOutlet: props.kodeOutlet,
      kantinName: props.kantinName,
      refreshing: false,
    }
  }

  static navigatorStyle = {
    tabBarHidden: true,
  }

  componentWillMount () {
    this.applyFilter('Semua', this.props.kantinName)

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.menuList.length > 0) {
      let activeDate = nextProps.calendarPesan.activeDate.slice(1,6)
      this.setState({
        activeDate: activeDate,
        currentTanggalPenetapanMenu: nextProps.calendarPesan.currentTanggalPenetapanMenu,
        menu: nextProps.menuList
      }, () => this.applyFilter(this.state.currentCategoryDropdown, this.state.currentKantinDropdown))
    }

    if(nextProps.calendarPesan.currentActiveDate !== this.state.currentActiveDate) {
      this.setState({
        currentActiveDate: nextProps.calendarPesan.currentActiveDate
      })
    }
  }

  filterShowedKantin () {
    let list = this.state.kantinList
    switch (this.props.calendarPesan.currentActiveIstirahatTab) {
      case 0:
          list = this.state.kantinList.filter(kantin => kantin.istirahat1)
        break;
      case 1:
          list = this.state.kantinList.filter(kantin => kantin.istirahat2)
        break;
      case 2:
          list = this.state.kantinList.filter(kantin => kantin.istirahat3)
        break;
      default:
    }

    return list.map((item) => item.nama_outlet)
  }


  async applyFilter(category, kantin) {
    // let menu = this.state.menu
    let dateNow = this.state.activeDate[this.state.currentActiveDate].tanggal_tutup
    let monthNow = this.state.activeDate[this.state.currentActiveDate].month
    let yearNow = this.state.activeDate[this.state.currentActiveDate].year

    let menu = await this.setHargaMenuTerbaru()
    let filteredMenuByCategory = categoryFilter(category, menu)
    let filteredMenuByKantin = kantinFilter(kantin, filteredMenuByCategory)
    let filteredMenuByDate = dateFilter(filteredMenuByKantin, dateNow)

    if (this.state.searchText != '') {
      // filteredMenuByKantin = filteredMenuByKantin.filter((item) => item.kode_outlet.nama_outlet.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1)
      filteredMenuByDate = filteredMenuByDate.filter((item) => item.kode_menu.nama_menu.toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1)
    }

    this.setState({
      showedMenu: filteredMenuByDate
    })
  }

  onNavigatorEvent(event) {
    if(event.type === 'DeepLink') {
      switch(event.link) {
        case 'back':
          this.props.navigator.pop({
            //animation
          })
        case 'searchMenu':
          if(event.payload === undefined) {
            this.setState({
              searchText: ''
            }, ()=>{this.applyFilter(this.state.currentCategoryDropdown, this.state.currentKantinDropdown)})
          } else {
            this.setState({
              searchText: event.payload
            }, ()=>{this.applyFilter(this.state.currentCategoryDropdown, this.state.currentKantinDropdown)})
          }
        default:
          break;
      }
    }
  }

  checkKantinNameIndex () {
    let data = this.filterShowedKantin()
    for (let i = 0; i < data.length; i++) {
      if (data[i] === this.props.kantinName) {
        return i
      }
    }
  }

  pushToConfirm () {
    this.props.navigator.push({
      screen: 'ConfirmationScreen',
      navigatorStyle: {
        navBarCustomView: 'PilihMenuTopBar',
        navBarCustomViewInitialProps: {
          title: 'TOTAL PEMBAYARAN'
        },
        navBarHidden: true
      },
      passProps: {
        token: this.props.token
      },
      backButtonHidden: true,
    })
  }

  pushToDetail(item) {
    this.props.navigator.push({
      screen: 'DetailMenuScreen',
      navigatorStyle: {
        navBarCustomView: 'PilihMenuTopBar',
        navBarCustomViewInitialProps: {
          title: item.kode_menu.nama_menu,
        },
        navBarHidden: true
      },
      passProps: {
        item: item.kode_menu,
        // harga: this.state.hargaBerdasarTanggal
      },
      backButtonHidden: true,
      navigatorButtons: {}
    })
  }

  ubahDropdownCategory (value) {
    this.setState({
      currentCategoryDropdown: value
    })
    this.applyFilter(value, this.state.currentKantinDropdown)
  }

  ubahDropdownKantin (value) {
    this.setState({
      currentKantinDropdown: value
    })
    this.applyFilter(this.state.currentCategoryDropdown, value)
  }

  dropdownSeparator() {
    return (
      <View></View>
    )
  }

  checkQuantity (id) {
    // let currentDate = this.props.calendarPesan.activeDate[2].date + ' ' + this.props.calendarPesan.activeDate[2].month + ' ' + this.props.calendarPesan.activeDate[2].year
    let indexAda = -1
    let currentDate = this.props.calendarPesan.activeDate.slice(1, 6)


    for (let i = 0; i < this.props.orderMenu.orders.length; i++) {
      let dateOrder = new Date(this.props.orderMenu.orders[i].date)
      let dateCalendarAktif = new Date(currentDate[this.props.calendarPesan.currentActiveDate].tanggal_tutup)
      if (dateOrder.getDate() == dateCalendarAktif.getDate() && dateOrder.getMonth() == dateCalendarAktif.getMonth() && dateOrder.getYear() == dateCalendarAktif.getYear()) {
        indexAda = i
      }
    }
    if (indexAda < 0) {
      return -1
    }
    let menuIstirahat = []
    if (this.props.calendarPesan.currentActiveIstirahatTab === 0 ) {
      menuIstirahat = this.props.orderMenu.orders[indexAda].istirahat1
    } else if (this.props.calendarPesan.currentActiveIstirahatTab === 1) {
      menuIstirahat = this.props.orderMenu.orders[indexAda].istirahat2
    } else if (this.props.calendarPesan.currentActiveIstirahatTab === 2) {
      menuIstirahat = this.props.orderMenu.orders[indexAda].istirahat3
    }
    for (let i = 0;i < menuIstirahat.length; i++) {
      if (id === menuIstirahat[i].id) {
        return menuIstirahat[i].qty
      }
    }
    return -1
  }

  countTotalQuantity () {
    let qty = 0
    for(let j=0;j < this.props.orderMenu.orders.length; j++) {
      for(let i=0;i < this.props.orderMenu.orders[j].istirahat1.length; i++) {
        qty+= this.props.orderMenu.orders[j].istirahat1[i].qty
      }
      for(let i=0;i < this.props.orderMenu.orders[j].istirahat2.length; i++) {
        qty+= this.props.orderMenu.orders[j].istirahat2[i].qty
      }
      for(let i=0;i < this.props.orderMenu.orders[j].istirahat3.length; i++) {
        qty+= this.props.orderMenu.orders[j].istirahat3[i].qty
      }
    }
    return qty
  }

  countTotalPrice () {
    let total = 0
    for(let i=0;i< this.props.orderMenu.orders.length;i++) {
      total += this.props.orderMenu.orders[i].total
    }
    return total
  }

  increaseQuantity (id) {
    // let currentDate = this.props.calendarPesan.activeDate[2].date + ' ' + this.props.calendarPesan.activeDate[2].month + ' ' + this.props.calendarPesan.activeDate[2].year
    this.props.increaseQty(id, this.props.calendarPesan.currentActiveDate, this.props.calendarPesan.currentActiveIstirahatTab, () => this.forceUpdate())

  }

  decreaseQuantity (id) {
    // let currentDate = this.props.calendarPesan.activeDate[2].date + ' ' + this.props.calendarPesan.activeDate[2].month + ' ' + this.props.calendarPesan.activeDate[2].year
    this.props.decreaseQty(id, this.props.calendarPesan.currentActiveDate, this.props.calendarPesan.currentActiveIstirahatTab, () => this.forceUpdate())

  }

  tambahButtonClicked (item) {
    // let currentDate = this.props.calendarPesan.activeDate[2].date + ' ' + this.props.calendarPesan.activeDate[2].month + ' ' + this.props.calendarPesan.activeDate[2].year
    this.props.newOrder(item, this.props.calendarPesan.currentActiveDate, this.props.calendarPesan.currentActiveIstirahatTab, () => this.forceUpdate())
  }

  setHargaMenuTerbaru () {
    let tanggalMenuAktif = this.state.activeDate[this.state.currentTanggalPenetapanMenu]
    let price = 0
    let data = []

    this.state.menu.forEach( (item, index) => {
        if (item.kode_menu.harga.length === 1) {
          let harga_terbaru = item.kode_menu.harga[0].harga
          data.push({...item, kode_menu: { ...item.kode_menu, harga_terbaru: harga_terbaru }})
        }

        else {
          item.kode_menu.harga.forEach( menu => {
            let date1 = new Date (menu.tanggal_penetapan)
            if ( +tanggalMenuAktif.date >= date1.getDate()) {
              let harga_terbaru = menu.harga
              let terbaru = {...item, kode_menu: { ...item.kode_menu, harga_terbaru: harga_terbaru }}
              data.splice(index, 1, terbaru )
            }
          })
        }
    })
    return data
  }

  setMenu (item, index) {
    return (
      <View style={styles.itemCardContainer} key={index}>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.pushToDetail(item)}>
          <Image
            style={{width: DIMENSION_WIDTH * 0.2361, height: DIMENSION_HEIGHT * 0.0812, borderRadius: DIMENSION_HEIGHT * 0.0234, marginRight: DIMENSION_WIDTH * 0.0417}}
            source={{uri: item.kode_menu.foto_menu }}
          />
          <View style={{alignSelf: 'center', width: DIMENSION_WIDTH * 0.4167}}>
            <Text style={styles.nameItem}>
              { item.kode_menu.nama_menu }
            </Text>
            <Text style={styles.priceItem}>
              { rupiahConverter(item.kode_menu.harga_terbaru) }
            </Text>
          </View>
        </TouchableOpacity>
        {this.checkQuantity(item.kode_menu._id) < 1 ? (
          <TouchableOpacity onPress={() => this.tambahButtonClicked(item)}>
            <View style={{marginTop: 'auto', marginBottom:'auto', justifyContent: 'center', width: DIMENSION_WIDTH * 0.1513, height: DIMENSION_HEIGHT * 0.0234, backgroundColor: '#FFFFFF', borderWidth: .3, borderColor: '#CECECE', borderRadius: 15}}>
              <Text style={{fontFamily: fontPlatform(Platform.OS, 'SemiBold'), fontSize: normalizeFont(9), color: '#4A207C', marginTop: 0, marginLeft: 10}}>
                TAMBAH
              </Text>
            </View>
          </TouchableOpacity>

        ) : (
          <View style={{marginTop: 'auto', marginBottom: 'auto', borderRadius: DIMENSION_HEIGHT * 0.0234, borderWidth: 1, borderColor: '#ddd', width: DIMENSION_WIDTH * 0.1694, height:DIMENSION_HEIGHT * 0.0359, justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.decreaseQuantity(item.kode_menu._id)}>
              <View style={{ backgroundColor: '#FFF', borderRadius: DIMENSION_HEIGHT * 0.0781, borderRightWidth: 1, borderColor: '#CECECE', width: DIMENSION_WIDTH * 0.0583, height: DIMENSION_HEIGHT * 0.0328, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: '#CECECE'}}>
                  —
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', fontFamily: fontPlatform(Platform.OS, 'SemiBold'), fontSize: normalizeFont(10), color: '#373A3D'}}>
                {this.checkQuantity(item.kode_menu._id)}
              </Text>
            </View>
            <TouchableOpacity onPress={() => this.increaseQuantity(item.kode_menu._id)}>
              <View style={{ backgroundColor: '#4A207C', borderRadius: DIMENSION_HEIGHT * 0.0781, width: DIMENSION_WIDTH * 0.0583, height: DIMENSION_HEIGHT * 0.0328, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: '#FFF'}}>
                  +
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }

  renderMenuItem () {
    let day = this.state.activeDate[this.state.currentActiveDate].day
    let getDay = day.trim().toLowerCase()
    return this.state.showedMenu.map((item, index) => {
        if (!item[getDay]) {
          return (
            <View key={index} />
          )
        } else {
          return this.setMenu(item, index)
        }
      })
    }

    _onRefresh() {
      this.props.getKantinDanMenu(this.props.token)
    }

  render() {
    return (
    <View style={{height: '100%'}}>
      <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            colors={['purple', 'pink', 'red', 'blue']}
          />
        }
      >
        <View style={{height: 60, top: -3, left: -9, width: DIMENSION_WIDTH + 19, elevation: 4, borderBottomWidth: .1, borderColor: '#c3b9ce'}}>
          <PilihMenuTopBar title='Pilih Menu'/>
        </View>
        <View>
          <CustomHeaderPesan triggerChange={() => this.checkQuantity()}/>
        </View>
        <View style={styles.containerFilterMenuKantin}>
          <View style={styles.filterContainer}>
            <View>
              <Text style={styles.titleFilter}>
                Menu
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{justifyContent: 'center'}}>
                <ModalDropdown
                  onSelect={(index, value) => this.ubahDropdownCategory(value)}
                  options={['Semua', 'Makanan', 'Minuman', 'Snack']}
                  defaultIndex={0}
                  defaultValue='Semua'
                  showsVerticalScrollIndicator={false}
                  renderSeparator={() => this.dropdownSeparator()}
                  style={{width: DIMENSION_WIDTH * 0.1813, height: DIMENSION_HEIGHT * 0.0158, marginTop: DIMENSION_HEIGHT * 0.0078}}
                  dropdownStyle={{width: DIMENSION_WIDTH * 0.3173, height: DIMENSION_HEIGHT * 0.2134}}
                  textStyle={{color: '#373A3D', fontSize: normalizeFont(11), fontFamily: fontPlatform(Platform.OS, 'Regular')}}
                  dropdownTextHighlightStyle={{borderLeftWidth: 3, paddingLeft: DIMENSION_WIDTH * 0.0693, borderLeftColor: '#C400A5', color: '#C400A5', fontSize: normalizeFont(12), fontFamily: fontPlatform(Platform.OS, 'Regular')}}
                  dropdownTextStyle={{paddingLeft: DIMENSION_WIDTH * 0.0722, color: '#5C5C5D', fontSize: normalizeFont(12), fontFamily: fontPlatform(Platform.OS, 'Medium')}}
                >
                </ModalDropdown>
              </View>
              <View style={{justifyContent: 'flex-end', marginTop: DIMENSION_HEIGHT * 0.0141}}>
                <Icon name='ios-arrow-down' style={{fontSize: normalizeFont(11)}}/>
              </View>
            </View>
          </View>
          <View style={styles.filterContainer}>
            <View>
              <Text style={styles.titleFilter}>
                Kantin
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{justifyContent: 'center'}}>
              <ModalDropdown
                onSelect={(index, value) => this.ubahDropdownKantin(value)}
                options={[...this.filterShowedKantin()]}
                defaultIndex={this.checkKantinNameIndex()}
                defaultValue={this.props.kantinName}
                showsVerticalScrollIndicator={true}
                renderSeparator={() => this.dropdownSeparator()}
                style={{width: DIMENSION_WIDTH * 0.4053, height: DIMENSION_HEIGHT * 0.0158, marginTop: DIMENSION_HEIGHT * 0.0078}}
                dropdownStyle={{width: DIMENSION_WIDTH * 0.4053, height: (DIMENSION_HEIGHT * 0.2134) * (this.filterShowedKantin().length / 4)}}
                textStyle={{color: '#373A3D', fontSize: normalizeFont(11), fontFamily: fontPlatform(Platform.OS, 'Regular')}}
                dropdownTextHighlightStyle={{borderLeftWidth: 3, paddingLeft: DIMENSION_WIDTH * 0.0693, borderLeftColor: '#C400A5', color: '#C400A5', fontSize: normalizeFont(12), fontFamily: fontPlatform(Platform.OS, 'Regular')}}
                dropdownTextStyle={{paddingLeft: DIMENSION_WIDTH * 0.0722, color: '#5C5C5D', fontSize: normalizeFont(12), fontFamily: fontPlatform(Platform.OS, 'Medium')}}
              >
              </ModalDropdown>
              </View>
              <View style={{justifyContent: 'flex-end', marginTop: DIMENSION_HEIGHT * 0.0141}}>
                <Icon name='ios-arrow-down' style={{fontSize: normalizeFont(11)}}/>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.listItemContainer}>
          {this.renderMenuItem()}
        </View>
      </ScrollView>
      {this.props.orderMenu.orders.length < 1 ? (<View></View>) : (
        <View style={styles.absolutePositionTrue}>
            <View style={styles.absolutePositionLeft}>
              <Button style={styles.absolutePositionLeftButton}>
                <Text style={styles.absolutePositionLeftButtonText}>
                  {this.countTotalQuantity()}
                </Text>
              </Button>
            </View>
            <View style={styles.absolutePositionCenter}>
              <TouchableOpacity onPress={() => this.pushToConfirm()}>
                <View>
                  <Text style={styles.absolutePositionCenterText}>
                    LANJUTKAN
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.absolutePositionRight}>
              <Text style={styles.absolutePositionRightText}>
                {rupiahConverter(this.countTotalPrice())}
              </Text>
            </View>
        </View>
      )}
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    minHeight: DIMENSION_HEIGHT * 0.7578
  },
  containerFilterMenuKantin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: DIMENSION_WIDTH * 0.0587,
    marginTop: DIMENSION_HEIGHT * 0.0165,
    marginRight: DIMENSION_WIDTH * 0.0587
  },
  filterContainer: {
    flexDirection: 'column'
  },
  listItemContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0353
  },
  titleFilter: {
    color: '#373A3D',
    fontSize: normalizeFont(13),
    fontFamily: fontPlatform(Platform.OS, 'Bold')
  },
  itemCardContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0125,
    marginBottom: DIMENSION_HEIGHT * 0.0125,
    borderRadius: DIMENSION_HEIGHT * 0.0234,
    marginHorizontal: DIMENSION_WIDTH * 0.0444,
    height: DIMENSION_HEIGHT * 0.0812,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    shadowColor: '#CACDD0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 5,
    borderBottomWidth: 0,
    backgroundColor: 'white'
  },
  nameItem: {
    fontSize: normalizeFont(14),
    color: '#717679',
    fontFamily: fontPlatform(Platform.OS, 'Regular')
  },
  priceItem: {
    fontSize: normalizeFont(11),
    color: '#717679',
    fontFamily: fontPlatform(Platform.OS, 'Regular')
  },
  absolutePositionTrue: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    alignSelf: 'stretch',
    height: DIMENSION_HEIGHT * 0.0781,
    backgroundColor: '#4A207C',
    shadowColor: '#C3B9CE',
    shadowRadius: 12,
    shadowOffset: {width: 17, height: -6},
    shadowOpacity: 1,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  absolutePositionLeft: {
    marginLeft: DIMENSION_WIDTH * 0.0333,
    marginTop: DIMENSION_HEIGHT * 0.0234,
    marginBottom: DIMENSION_HEIGHT * 0.0234
  },
  absolutePositionLeftButton: {
    justifyContent: 'center',
    width: DIMENSION_WIDTH * 0.0972,
    height: DIMENSION_HEIGHT * 0.0313,
    borderRadius: DIMENSION_HEIGHT * 0.0234,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    backgroundColor: 'transparent'
  },
  absolutePositionLeftButtonText: {
    color: '#FFFFFF',
    fontSize: normalizeFont(10),
    fontFamily: fontPlatform(Platform.OS, 'SemiBold')
  },
  absolutePositionCenter: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: DIMENSION_WIDTH * 0.2139,
    marginRight: 'auto'
  },
  absolutePositionCenterText: {
    color: '#FFFFFF',
    fontSize: normalizeFont(13),
    fontFamily: fontPlatform(Platform.OS, 'Medium')
  },
  absolutePositionRight: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: DIMENSION_WIDTH * 0.0528
  },
  absolutePositionRightText: {
    color: '#FFFFFF',
    fontSize: normalizeFont(16),
    fontFamily: fontPlatform(Platform.OS, 'Light')
  }
})

const mapStateToProps = (state) => {
  return {
    calendarPesan: state.CalendarPesan,
    kantinList: state.KantinList,
    menuList: state.MenuList.menuList.menuBySekolah,
    orderMenu: state.OrderMenu,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increaseQty: (id, tanggal, istirahat, cb) => dispatch(IncreaseQuantity(id, tanggal, istirahat, cb)),
    decreaseQty: (id, tanggal, istirahat, cb) => dispatch(DecreaseQuantity(id, tanggal, istirahat, cb)),
    newOrder: (item, tanggal, istirahat, cb) => dispatch(NewOrder(item, tanggal, istirahat, cb)),
    getKantinDanMenu: (token) => dispatch(GetKantinDanMenu(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PilihMenuScreen);
