import React from 'react';
import {View, Text, Image, StyleSheet, Button, TouchableOpacity, ScrollView, Platform} from 'react-native';
import {Icon} from 'native-base'
import {dateConverterHelper} from '../helpers/dateConverter'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'


class NotificationListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {
        baca: this.props.item.baca,
        tanggal_waktu: this.props.item.tanggal_waktu,
        notifikasi: this.props.item.notifikasi
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: DIMENSION_WIDTH * 0.0444, marginRight: DIMENSION_WIDTH * 0.0722}}>
          <Text style={{color: this.state.item.baca == 'false' ? '#354052' : '#888E8E', fontFamily: fontPlatform(Platform.OS, 'SemiBold'), fontSize: normalizeFont(14) }}>
            {dateConverterHelper(this.state.item.tanggal_waktu)}
          </Text>

        </View>
        <View style={{marginLeft: DIMENSION_WIDTH * 0.0833, marginRight: DIMENSION_WIDTH * 0.05, marginTop: DIMENSION_HEIGHT * 0.0109}}>
          <Text style={{color: this.state.item.baca == 'false' ? '#354052' : '#888E8E', fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(14) }}>
            {this.state.item.notifikasi}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: DIMENSION_HEIGHT * 0.0234,
    borderRadius:15,
    marginHorizontal: 16,
    height: DIMENSION_HEIGHT * 0.1516,
    flexDirection: 'column',
    justifyContent: 'center',
    shadowColor: '#CACDD0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 7,
    borderBottomWidth: 0,
    backgroundColor: 'white'
  }
})
export default NotificationListItem;
