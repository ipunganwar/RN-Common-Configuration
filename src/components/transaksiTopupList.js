import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, Platform} from 'react-native';
import {Button} from 'native-base'
import TransaksiItemList from '../components/transaksiItemList'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'
import { dateConverterHelper as SetDate} from '../helpers/dateConverter'
import rupiahConverter from '../helpers/rupiahConverter'

class TransaksiTopupList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{flexDirection: 'column', marginLeft: 'auto', marginRight: 'auto', width: DIMENSION_WIDTH * 0.9173, borderRadius: DIMENSION_WIDTH * 0.0417, height: DIMENSION_HEIGHT * 0.1312, backgroundColor: '#FFF', marginTop: DIMENSION_HEIGHT * 0.025, shadowColor: '#CACDD0', shadowRadius: 40, shadowOffset: {width: 0, height: 10}, shadowOpacity: 1, elevation: 10, marginBottom: DIMENSION_HEIGHT * 0.0202}}>
        <View style={{marginLeft: DIMENSION_WIDTH * 0.0693, marginRight: DIMENSION_WIDTH * 0.0747, flexDirection: 'row', justifyContent: 'space-between', marginTop: DIMENSION_HEIGHT * 0.03}}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={{color: '#4A4A4A', fontFamily: fontPlatform(Platform.OS, 'Bold'), fontSize: normalizeFont(14)}}>
                {SetDate(this.props.item.tanggal_waktu)} &nbsp;
              </Text>
            </View>
            <View>
              <Text style={{color: '#4A4A4A', fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(12)}}>
               : {new Date(this.props.item.tanggal_waktu).getHours() > 9 ? new Date(this.props.item.tanggal_waktu).getHours() : '0'+ new Date(this.props.item.tanggal_waktu).getHours()}.{(new Date(this.props.item.tanggal_waktu).getMinutes() > 9 ? new Date(this.props.item.tanggal_waktu).getMinutes() : '0.'+new Date(this.props.item.tanggal_waktu).getMinutes() )}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{color: '#4A4A4A', fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(12)}}>
              {rupiahConverter(this.props.item.saldo_topup)}
            </Text>
          </View>
        </View>
        <View style={{marginLeft: DIMENSION_WIDTH * 0.0693, marginRight: DIMENSION_WIDTH * 0.0747, marginTop: DIMENSION_HEIGHT * 0.008, marginBottom: DIMENSION_HEIGHT * 0.0075, borderBottomWidth: .8, opacity: .5, borderBottomColor: '#4A207C'}}>
        </View>
        <View style={{marginLeft: DIMENSION_WIDTH * 0.0693, marginRight: DIMENSION_WIDTH * 0.0747, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{color: '#4A4A4A', fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(12)}}>
              Total Saldo
            </Text>
          </View>
          <View>
            <Text style={{color: '#4A4A4A', fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(12)}}>
              {rupiahConverter(this.props.item.saldo_akhir)}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

export default TransaksiTopupList
