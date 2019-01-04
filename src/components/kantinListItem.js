import React from 'react'
import {View, Text, Image, StyleSheet, Button, TouchableOpacity, Platform} from 'react-native';
import letterSpacingCustom from '../helpers/letterSpacingCustom'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'

class KantinListItem extends React.Component {
  constructor (props) {
    super(props)
  }

  handlproject_nameClicked () {
    this.props.handlproject_nameClicked(this.props.item.nama_outlet, this.props.item.kode_outlet)
  }

  render() {
    return (
      <View style={styles.cardItemKantin}>
        <TouchableOpacity onPress={() => this.handlproject_nameClicked()}>
          <View>
            <Image
              style={styles.imageHeaderItemKantin}
              source={{uri: this.props.item.kode_kantin.foto_kantin}}
            />
          </View>
          <View style={styles.containerTextTitleItemKantin}>
            <Text style={styles.textTitleItemKantin}>
              {this.props.item.nama_outlet}
            </Text>
          </View>
          <View style={styles.containerTextSubtitleItemKantin}>
            {this.props.item.istirahat1 ? <Text style={styles.textSubtitleItemKantin}>
              Istirahat 1
            </Text> : <View></View>}
            {this.props.item.istirahat2 ? <View style={{flexDirection: 'row'}}><Text style={styles.textSubtitleItemKantin}>
              •
            </Text>
            <Text style={styles.textSubtitleItemKantin}>
              Istirahat 2
            </Text></View> : <View></View>}
            {this.props.item.istirahat3 ? <View style={{flexDirection: 'row'}}><Text style={styles.textSubtitleItemKantin}>
              •
            </Text>
            <Text style={styles.textSubtitleItemKantin}>
              Istirahat 3
            </Text></View> : <View></View>}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardItemKantin: {
    flexDirection: 'column',
    marginTop: DIMENSION_HEIGHT * 0.0203,
    backgroundColor: '#FFFFFF',
    borderRadius: DIMENSION_HEIGHT * 0.0234,
    height: DIMENSION_HEIGHT * 0.3125,
    width: DIMENSION_WIDTH * 0.9173,
    shadowOffset: {width: 0, height: 10},
    shadowColor: '#CACDD0',
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 10
  },
  imageHeaderItemKantin: {
    height: DIMENSION_HEIGHT * 0.2125,
    width: DIMENSION_WIDTH * 0.9173,
    borderRadius: DIMENSION_HEIGHT * 0.0234
  },
  containerTextTitleItemKantin: {
    marginLeft: DIMENSION_WIDTH * 0.0528,
    marginTop: DIMENSION_HEIGHT * 0.0187
  },
  containerTextSubtitleItemKantin: {
    flexDirection: 'row',
    marginTop: DIMENSION_HEIGHT * 0.0063,
    marginLeft: DIMENSION_WIDTH * 0.0528
  },
  textTitleItemKantin: {
    color: '#5C5C5D',
    letterSpacing: 1,
    fontSize: normalizeFont(18),
    fontFamily: fontPlatform(Platform.OS, 'SemiBold'),
  },
  textSubtitleItemKantin: {
    color: '#5A5E62',
    fontSize: normalizeFont(11),
    marginRight: DIMENSION_WIDTH * 0.022,
    fontFamily: fontPlatform(Platform.OS, 'ExtraLight')
  }
})

export default KantinListItem;
