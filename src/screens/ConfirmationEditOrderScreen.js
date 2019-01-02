import React from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, AsyncStorage, Platform } from 'react-native'
import { connect } from 'react-redux'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'
import PilihMenuTopBar from '../components/pilihMenuTopBar'
import rupiahConverter from '../helpers/rupiahConverter'
import {dateConverterHelper} from '../helpers/dateConverter'
import { SetPostEditedOrders } from '../actions/berandaAction'
import { Navigation } from 'react-native-navigation'
import { GetVerificationPassword } from '../actions/login'
import { SetResetTimeout } from '../actions/kantinAction'
import { ResetVerificationPassword } from '../actions/login'
import { SetResetOrder } from '../actions/orderMenu'


class ConfirmationEditOrderScreen extends React.Component {
  static navigatorStyle = {
    tabBarHidden: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      orderBerubah: []
    }
  }

  checkPassword () {
    Navigation.showModal({
      screen: 'ValidationLightBox',
      passProps: {
        icon: 'Warning',
        title: 'Masukan Password Anda',
        screen: 'Login',
        okButtonClicked: (password) => this.verifPassword(password),
        sendOrder: () => this.confirmBelanjaClicked(),
        flagging: 'Verifikasi Password'
      },
      navigatorStyle: {
        tapBackgroundToDismiss: true,
        backgroundBlur: "light",
        backgroundColor: "rgba(18,10,28,0.55)",
        navBarHidden: true,
      },
      animationType: 'none'
    })
  }


  componentWillReceiveProps (nextProps) {
    this.cariOrderYgBerubah(nextProps)
  }

  componentWillMount () {
    this.cariOrderYgBerubah(this.props)
  }

  confirmBelanjaClicked () {
    this.props.setPostEditedOrders(this.props.token, this.props.telahOrderMenu.orders, this.props.telahOrderMenu.editedOrders)
    this.props.pembayaranConfirmed()
    this.props.setResetTimeout()
    this.props.resetVerificationPassword()

    Navigation.showModal({
      screen: 'LoadingLightBox',
      passProps: {
        transaksiBerhasilLightBox: () => this.transaksiBerhasilLightBox()
      }, // simple serializable object that will pass as props to the modal (optional)
      navigatorStyle: {
        tapBackgroundToDismiss: true,
        backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        backgroundColor: "rgba(18,10,28,0.55)", // tint color for the background, you can specify alpha here (optional)
        navBarHidden: true,
      }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
      animationType: 'none' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    });
  }

  transaksiBerhasilLightBox () {
    Navigation.showModal({
      screen: 'NotificationLightBox',
      passProps: {
        title: 'Berhasil',
        text: 'Jangan sampai telat ambil makanannya ya!',
        flagging: 'Notifikasi Pesanan',
        resetTimeout: () => this.props.setResetTimeout(),
      },
      navigatorStyle: {
        tapBackgroundToDismiss: true,
        backgroundBlur: "dark",
        backgroundColor: "rgba(18,10,28,0.55)",
        navBarHidden: true,

      },
      navigatorButtons: {},
      animationType: 'none'
    });
    this.props.navigator.popToRoot()
    this.props.navigator.switchToTab({
      tabIndex: 0
    })
   }

  confirmBelanja () {
    this.props.navigator.showLightBox({
      screen: 'ConfirmationLightBox',
      passProps: {
        okButtonClicked: () => this.checkPassword(),
        title: 'Pembayaran',
        text: 'Apakah kamu yakin akan melakukan pembayaran ini?',
        screen: 'ConfirmationScreen'
      },
      style: {
        tapBackgroundToDismiss: true,
        backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        backgroundColor: "rgba(18,10,28,0.55)" // tint color for the background, you can specify alpha here (optional)
      },
    })
  }

  batalBelanja () {
    this.props.navigator.pop()
  }


  cariOrderYgBerubah (nextProps) {
    let ordersLama = nextProps.telahOrderMenu.orders
    let editedOrdersLama = nextProps.telahOrderMenu.editedOrders

    let ordersBaru = []
    for (let i = 0;i<ordersLama.length;i++) {
      let temp = {
        date: ordersLama[i].tanggal_ambil,
        istirahat1: [],
        istirahat2: [],
        istirahat3: [],
        total: 0
      }
      for (let j=0;j<ordersLama[i].transaksi_detail.length;j++) {
        if (ordersLama[i].transaksi_detail[j].jumlah_pesan != editedOrdersLama[i].transaksi_detail[j].jumlah_pesan && editedOrdersLama[i].transaksi_detail[j].jam_istirahat == 1) {
          let totalPrice = editedOrdersLama[i].transaksi_detail[j].harga_beli * (editedOrdersLama[i].transaksi_detail[j].jumlah_pesan - ordersLama[i].transaksi_detail[j].jumlah_pesan)
          temp.istirahat1.push({
            id: editedOrdersLama[i].transaksi_detail[j]._id,
            menuName: editedOrdersLama[i].transaksi_detail[j].nama_menu,
            qty: editedOrdersLama[i].transaksi_detail[j].jumlah_pesan - ordersLama[i].transaksi_detail[j].jumlah_pesan,
            price: editedOrdersLama[i].transaksi_detail[j].harga_beli,
            totalPrice: totalPrice,
          })
          temp.total += totalPrice
        }
      }

      for (let j=0;j<ordersLama[i].transaksi_detail.length;j++) {
        if (ordersLama[i].transaksi_detail[j].jumlah_pesan != editedOrdersLama[i].transaksi_detail[j].jumlah_pesan && editedOrdersLama[i].transaksi_detail[j].jam_istirahat == 2) {

          let totalPrice = editedOrdersLama[i].transaksi_detail[j].harga_beli * (editedOrdersLama[i].transaksi_detail[j].jumlah_pesan - ordersLama[i].transaksi_detail[j].jumlah_pesan)
          temp.istirahat2.push({
            id: editedOrdersLama[i].transaksi_detail[j]._id,
            menuName: editedOrdersLama[i].transaksi_detail[j].nama_menu,
            qty: editedOrdersLama[i].transaksi_detail[j].jumlah_pesan - ordersLama[i].transaksi_detail[j].jumlah_pesan,
            price: editedOrdersLama[i].transaksi_detail[j].harga_beli,
            totalPrice: totalPrice,
          })
          temp.total += totalPrice
        }
      }
      for (let j=0;j<ordersLama[i].transaksi_detail.length;j++) {
        if (ordersLama[i].transaksi_detail[j].jumlah_pesan != editedOrdersLama[i].transaksi_detail[j].jumlah_pesan && editedOrdersLama[i].transaksi_detail[j].jam_istirahat == 3) {

          let totalPrice = editedOrdersLama[i].transaksi_detail[j].harga_beli * (editedOrdersLama[i].transaksi_detail[j].jumlah_pesan - ordersLama[i].transaksi_detail[j].jumlah_pesan)
          temp.istirahat3.push({
            id: editedOrdersLama[i].transaksi_detail[j]._id,
            menuName: editedOrdersLama[i].transaksi_detail[j].nama_menu,
            qty: editedOrdersLama[i].transaksi_detail[j].jumlah_pesan - ordersLama[i].transaksi_detail[j].jumlah_pesan,
            price: editedOrdersLama[i].transaksi_detail[j].harga_beli,
            totalPrice: totalPrice,
          })
          temp.total += totalPrice
        }
      }
      if (temp.istirahat1.length > 0 || temp.istirahat2.length > 0 || temp.istirahat3.length > 0) {
        ordersBaru.push(temp)
      }
    }


    this.setState({
      orderBerubah: ordersBaru
    })
  }

  confirmBelanja () {
    this.props.navigator.showLightBox({
      screen: 'ConfirmationLightBox',
      passProps: {
        okButtonClicked: () => this.checkPassword(),
        title: 'Pembayaran',
        text: 'Apakah kamu yakin akan melakukan pembayaran ini?',
        screen: 'ConfirmationScreen'
      },
      style: {
        tapBackgroundToDismiss: true,
        backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        backgroundColor: "rgba(18,10,28,0.55)" // tint color for the background, you can specify alpha here (optional)
      },
    })
  }


  verifPassword(password) {
    this.props.getVerificationPassword(this.props.token, password)
  }

  countTotalPrice () {
    let total = 0
    for(let i=0;i< this.state.orderBerubah.length;i++) {
      total += this.state.orderBerubah[i].total
    }
    return total
  }

  renderMenuItem (menu) {
    return (menu.map((item, index) => (
      <View style={styles.menuContainer} key={index}>
        <View style={styles.menuNameContainer}>
          <Text style={styles.menuNameText}>
            {item.menuName}
          </Text>
        </View>
        <View style={styles.menuQtyContainer}>
          <Text style={styles.menuQtyText}>
            {item.qty}
          </Text>
          <Text style={styles.menuQtyTextX}>
            x
          </Text>
        </View>
        <View style={styles.menuPriceContainer}>
          <Text style={styles.menuPriceText}>
            {rupiahConverter(item.price)}
          </Text>
        </View>
      </View>
    )))
  }

  renderOrderCard () {
    return (this.state.orderBerubah.map((order, index) => (
      <View style={styles.cardContainer} key={index}>
        <View style={styles.cardHeaderContainer}>
          <Text style={styles.cardHeaderText}>
            {dateConverterHelper(order.date)}
          </Text>
        </View>
        <View style={styles.cardContentContainer}>
          <View style={styles.istirahatContainer}>
            {order.istirahat1.length < 1 ? (<View></View>) : (
              <View style={styles.istirahatTitleContainer}>
                <Text style={styles.istirahatTitleText}>
                  Istirahat 1
                </Text>
              </View>
            )}
            {this.renderMenuItem(order.istirahat1)}
            {order.istirahat2.length < 1 ? (<View></View>) : (
              <View style={styles.istirahatTitleContainer}>
                <Text style={styles.istirahatTitleText}>
                  Istirahat 2
                </Text>
              </View>
            )}
            {this.renderMenuItem(order.istirahat2)}
            {order.istirahat3.length < 1 ? (<View></View>) : (
              <View style={styles.istirahatTitleContainer}>
                <Text style={styles.istirahatTitleText}>
                  Istirahat 3
                </Text>
              </View>
            )}
            {this.renderMenuItem(order.istirahat3)}
          </View>
        </View>
        <View style={styles.cardFooterContainer}>
          <View style={styles.footerTitleContainer}>
            <Text style={styles.footerTitleText}>
              SubTotal
            </Text>
          </View>
          <View style={styles.subTotalContainer}>
            <Text style={styles.subTotalText}>
              {rupiahConverter(order.total)}
            </Text>
          </View>
        </View>
      </View>
    ) ))
  }

  render () {
    return (
      <View style={{height: '100%', backgroundColor: '#FFF'}}>
        <View style={{height: 60, top: -3, left: -9, width: DIMENSION_WIDTH + 19, elevation: 4, borderBottomWidth: .1, borderColor: '#c3b9ce'}}>
          <PilihMenuTopBar title='TOTAL PEMBAYARAN'/>
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.cardListContainer}>
            {this.renderOrderCard()}
          </View>
          <View style={styles.detailPembayaranContainer}>
            <View style={styles.detailPembayaranTitleContainer}>
              <Text style={styles.detailPembayaranTitleText}>
                Detail Pembayaran
              </Text>
            </View>
            <View style={styles.detailPembayaranContentContainer}>
              <View style={styles.detailPembayaranContentItemContainer}>
                <View style={styles.detailPembayaranContentTitleContainer}>
                  <Text style={styles.detailPembayaranContentTitleText}>
                    Saldo
                  </Text>
                </View>
                <View style={styles.detailPembayaranContentContentContainer}>
                  <Text style={styles.detailPembayaranContentContentText}>
                    {rupiahConverter(this.props.profile.pelangganProfile.saldo)}
                  </Text>
                </View>
              </View>
              <View style={styles.detailPembayaranContentItemContainer}>
                <View style={styles.detailPembayaranContentTitleContainer}>
                  <Text style={styles.detailPembayaranContentTitleText}>
                    {this.countTotalPrice() < 0 ? 'Pengembalian Saldo' : 'Total Menu Tambahan'}
                  </Text>
                </View>
                <View style={styles.detailPembayaranContentContentContainer}>
                  <Text style={styles.detailPembayaranContentContentText}>
                    {this.countTotalPrice() < 0 ? rupiahConverter(this.countTotalPrice() * -1) : rupiahConverter(this.countTotalPrice())}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {this.props.profile.pelangganProfile.saldo - this.countTotalPrice() < 0 ? (
          <View style={styles.absolutePosition}>
            <View style={styles.absolutePositionTextContainer}>
              <Text style={styles.absolutePositionText}>
                SISA SALDO : {rupiahConverter(this.props.profile.pelangganProfile.saldo - this.countTotalPrice())}
              </Text>
            </View>
            <View style={styles.absolutePositionButtonContainer}>
              <TouchableOpacity onPress={() => this.batalBelanja()}>
                <Text style={styles.absolutePositionButtonText}>
                  B A T A L →
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
        <View style={styles.absolutePositionTrue}>
          <View style={styles.absolutePositionTextContainer}>
            <Text style={styles.absolutePositionText}>
              SISA SALDO : {rupiahConverter(this.props.profile.pelangganProfile.saldo - this.countTotalPrice())}
            </Text>
          </View>
          <View style={styles.absolutePositionButtonContainer}>
            <TouchableOpacity onPress={() => this.confirmBelanja()}>
              <Text style={styles.absolutePositionButtonText}>
                B A Y A R →
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  cardListContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: DIMENSION_WIDTH * 0.9556,
    marginTop: DIMENSION_HEIGHT * 0.0063,
    paddingBottom: DIMENSION_WIDTH * 0.0833
  },
  cardContainer: {
    width: DIMENSION_WIDTH * 0.9556,
    marginTop: DIMENSION_HEIGHT * 0.0234,
    borderRadius: 15,
    shadowColor: '#CACDD0',
    elevation: 5
  },
  cardHeaderContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0375,
    marginLeft: DIMENSION_WIDTH * 0.0722,
  },
  cardHeaderText: {
    color: '#4A4A4A',
    fontSize: normalizeFont(14),
    fontFamily: fontPlatform(Platform.OS, 'Bold')
  },
  cardContentContainer: {
    marginLeft: DIMENSION_WIDTH * 0.1,
  },
  istirahatContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0156
  },
  istirahatTitleContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0156
  },
  istirahatTitleText: {
    color: '#C400A5',
    fontSize: normalizeFont(13),
    fontFamily: fontPlatform(Platform.OS, 'Medium')
  },
  menuContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0078,
    marginLeft: DIMENSION_WIDTH * 0.0222,
    marginRight: DIMENSION_WIDTH * 0.0611,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  menuNameContainer: {
    width: DIMENSION_WIDTH * 0.3056
  },
  menuNameText: {
    color: '#4A4A4A',
    fontSize: normalizeFont(13),
    fontFamily: fontPlatform(Platform.OS, 'Medium')
  },
  menuQtyContainer: {
    flexDirection: 'row'
  },
  menuQtyText: {
    color: '#C400A5',
    fontSize: normalizeFont(13),
    fontFamily: fontPlatform(Platform.OS, 'SemiBold')
  },
  menuQtyTextX: {
    color: '#C400A5',
    fontSize: normalizeFont(13),
    fontFamily: fontPlatform(Platform.OS, 'ExtraLight')
  },
  menuPriceContainer: {
    width: DIMENSION_WIDTH * 0.25,
    alignItems: 'flex-end'
  },
  menuPriceText: {
    color: '#4A4A4A',
    fontSize: normalizeFont(13),
    fontFamily: fontPlatform(Platform.OS, 'Medium')
  },
  cardFooterContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0234,
    marginLeft: DIMENSION_WIDTH * 0.1,
    marginRight: DIMENSION_WIDTH * 0.0611,
    paddingBottom: DIMENSION_HEIGHT * 0.0438,
    borderTopWidth: .5,
    borderTopColor: '#C3B9CE',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  footerTitleContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0078
  },
  footerTitleText: {
    color: '#4A4A4A',
    fontFamily: fontPlatform(Platform.OS, 'Bold'),
    fontSize: normalizeFont(13)
  },
  subTotalContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0078
  },
  subTotalText: {
    color: '#4A4A4A',
    fontSize: normalizeFont(13),
    fontFamily: fontPlatform(Platform.OS, 'Medium')
  },
  detailPembayaranContainer: {
    marginLeft: DIMENSION_WIDTH * 0.1639,
    marginRight: 'auto',
    paddingBottom: DIMENSION_HEIGHT * 0.1094
  },
  detailPembayaranTitleContainer: {
    width: DIMENSION_WIDTH * 0.3917,
    paddingBottom: DIMENSION_HEIGHT * 0.0188,
    borderBottomWidth: .5,
    borderBottomColor: '#C3B9CE'
  },
  detailPembayaranTitleText: {
    color: '#4A207C',
    fontSize: normalizeFont(15),
    fontFamily: fontPlatform(Platform.OS, 'Bold')
  },
  detailPembayaranContentContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0125
  },
  detailPembayaranContentItemContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0109,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: DIMENSION_WIDTH * 0.7528
  },
  detailPembayaranContentTitleContainer: {

  },
  detailPembayaranContentTitleText: {
    color: '#4A4A4A',
    fontSize: normalizeFont(13),
    fontFamily: fontPlatform(Platform.OS, 'Bold')
  },
  detailPembayaranContentContentContainer: {

  },
  detailPembayaranContentContentText: {
    color: '#4A4A4A',
    fontSize: normalizeFont(13),
    fontFamily: fontPlatform(Platform.OS, 'Medium')
  },
  absolutePosition: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    alignSelf: 'stretch',
    height: DIMENSION_HEIGHT * 0.0781,
    backgroundColor: '#FD377F',
    shadowColor: '#C3B9CE',
    shadowRadius: 12,
    shadowOffset: {width: 17, height: -6},
    shadowOpacity: 1,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  absolutePositionTextContainer: {
    marginTop: 'auto',
    marginLeft: 9,
    marginBottom: 'auto'
  },
  absolutePositionText: {
    color: '#FFFFFF',
    fontSize: normalizeFont(16),
    fontFamily: fontPlatform(Platform.OS, 'Bold')
  },
  absolutePositionButtonContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight:  DIMENSION_WIDTH * 0.0556
  },
  absolutePositionButtonText: {
    color: '#FFFFFF',
    fontSize: normalizeFont(13),
    fontFamily: fontPlatform(Platform.OS, 'Medium')
  }
})
const mapStateToProps = (state) => {
  return {
    telahOrderMenu: state.TelahOrderMenu,
    profile: state.Profile,
    verif_password: state.LoginReducer.verif_password,
    timeout_kantin: state.TimeoutReducer.timeout_kantin,
    login_loading: state.LoginReducer.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPostEditedOrders: (token, order, editedOrder) => dispatch(SetPostEditedOrders(token, order, editedOrder)),
    getVerificationPassword: (token, password) => { dispatch(GetVerificationPassword(token, password)) },
    setResetTimeout: () => dispatch(SetResetTimeout()),
    resetVerificationPassword: () => dispatch(ResetVerificationPassword()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationEditOrderScreen);
