import React from 'react';
import {View, Text, Image, StyleSheet, Button, TouchableOpacity, Platform} from 'react-native';
import {Icon} from 'native-base'
import { connect } from 'react-redux'
import {IncreaseQuantityTelahOrderMenu, DecreaseQuantityTelahOrderMenu} from '../actions/editOrderMenu'
import rupiahConverter from '../helpers/rupiahConverter'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'

class MenuListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qty: 0,
    }
  }

  componentWillReceiveProps (nextProps) {
    let total = nextProps.item.jumlah_pesan - nextProps.item.jumlah_kembali - nextProps.item.jumlah_ambil
    this.setState({ qty: total})
  }

  incrementQuantity() {
    // let currentDate = this.props.calendarTelahPesan.activeDate[2].date + ' ' + this.props.calendarTelahPesan.activeDate[2].month + ' ' + this.props.calendarTelahPesan.activeDate[2].year
    let temp = { _id: this.props.item.kode_menu._id, jam_istirahat: this.props.item.jam_istirahat, kode_outlet: this.props.item.kode_outlet}
    this.props.increaseQty(temp, this.props.calendarTelahPesan.currentActiveDate, this.props.calendarTelahPesan.currentActiveIstirahatTab, () => {this.forceUpdate()}, this.props.index)
  }

  decrementQuantity() {
    if (this.state.qty > 0) {
      // let currentDate = this.props.calendarTelahPesan.activeDate[2].date + ' ' + this.props.calendarTelahPesan.activeDate[2].month + ' ' + this.props.calendarTelahPesan.activeDate[2].year
      let temp = { _id: this.props.item.kode_menu._id, jam_istirahat: this.props.item.jam_istirahat, kode_outlet: this.props.item.kode_outlet}
      this.props.decreaseQty(temp, this.props.calendarTelahPesan.currentActiveDate, this.props.calendarTelahPesan.currentActiveIstirahatTab, () => {this.forceUpdate()}, this.props.index)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imageMenu}
          source={{uri: this.props.item.kode_menu.foto_menu }}
        />
        <View style={{alignSelf: 'center', width: DIMENSION_WIDTH * 0.4028}}>
          <Text style={styles.nameItem}>
            {this.props.item.nama_menu}
          </Text>
          <Text style={styles.priceItem}>
            {rupiahConverter(this.props.item.harga_beli)}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonQuantityOnly}>
            {this.props.buttonActive ? (
              <TouchableOpacity onPress={() => this.decrementQuantity()}>
                <View style={{ backgroundColor: '#FFF', borderRadius: DIMENSION_HEIGHT * 0.078, borderRightWidth: 1, borderColor: '#CECECE', width: DIMENSION_WIDTH * 0.05833, height: DIMENSION_HEIGHT * 0.03281, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: '#CECECE'}}>
                    -
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (<View></View>)}
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', fontFamily: fontPlatform(Platform.OS, 'SemiBold'), fontSize: normalizeFont(10), color: '#373A3D'}}>
                {this.props.item.jumlah_pesan - this.props.item.jumlah_kembali - this.props.item.jumlah_ambil}
              </Text>
            </View>
            {this.props.buttonActive ? (
              <TouchableOpacity onPress={() => this.incrementQuantity()}>
                <View style={{ backgroundColor: '#4A207C', borderRadius: DIMENSION_HEIGHT * 0.078, width: DIMENSION_WIDTH * 0.05833, height: DIMENSION_HEIGHT * 0.03281, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: '#FFF'}}>
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (<View></View>)}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: DIMENSION_HEIGHT * 0.0125,
    marginBottom: DIMENSION_HEIGHT * 0.0125,
    borderRadius: DIMENSION_HEIGHT * 0.0234,
    marginHorizontal: DIMENSION_WIDTH * 0.0445,
    height: DIMENSION_HEIGHT * 0.08125,
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
    fontSize: normalizeFont(15),
    color: '#717679',
    fontFamily: fontPlatform(Platform.OS, 'Regular'),
    textAlign: 'justify'
  },
  priceItem: {
    fontSize: normalizeFont(10),
    color: '#717679',
    fontFamily: fontPlatform(Platform.OS, 'Regular')
  },
  imageMenu: {
    width: DIMENSION_WIDTH * 0.2361,
    height: DIMENSION_HEIGHT * 0.08125,
    borderRadius: DIMENSION_HEIGHT * 0.0234,
    marginRight: DIMENSION_WIDTH * 0.04166
  },
  buttonContainer: {
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: DIMENSION_WIDTH * 0.05555
  },
  buttonQuantityOnly: {
    borderRadius: DIMENSION_HEIGHT * 0.0234,
    borderWidth: 1,
    borderColor: '#ddd',
    width: DIMENSION_WIDTH * 0.16944,
    height:DIMENSION_HEIGHT * 0.03593,
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
})
const mapStateToProps = (state) => {
  return {
    calendarTelahPesan: state.CalendarTelahPesan,
    menuList: state.MenuList,
    orderList: state.TelahOrderMenu
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increaseQty: (itemId, tanggal, istirahat, cb, index) => dispatch(IncreaseQuantityTelahOrderMenu(itemId, tanggal, istirahat, cb, index)),
    decreaseQty: (itemId, tanggal, istirahat, cb, index) => dispatch(DecreaseQuantityTelahOrderMenu(itemId, tanggal, istirahat, cb, index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuListItem);
