import React from 'react';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import {Button} from 'native-base'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'
import { dateConverterHelper as SetDate} from '../helpers/dateConverter'
import rupiahConverter from '../helpers/rupiahConverter'

class TransaksiItemList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDetailClicked: false,
      istirahat1: [],
      istirahat2: [],
      istirahat3: [],
    }
  }

  detailOpen () {
    this.detailMenu()
    this.setState({
      isDetailClicked: true
    })
  }

  detailClose () {
    this.setState({
      istirahat1: [],
      istirahat2: [],
      istirahat3: []
    })

    this.setState({
      isDetailClicked: false
    })
  }

  detailMenu () {
    let { istirahat1, istirahat2, istirahat3 } = this.state

    this.props.item.transaksi_detail.forEach(item => {
      if(item.jam_istirahat === 1) {
        istirahat1.push(item)
      }
      else if (item.jam_istirahat === 2) {
        istirahat2.push(item)
      }
      else {
        istirahat3.push(item)
      }
    })

    this.setState({
      istirahat1: istirahat1,
      istirahat2: istirahat2,
      istirahat3: istirahat3
    })
  }

  renderCardItem () {
    if (this.state.isDetailClicked) {
      return (
        <View style={{shadowColor: '#CACDD0', shadowRadius: 40, shadowOpacity: 1, shadowOffset: {width: 0, height: 10}, elevation: 10, marginBottom: DIMENSION_HEIGHT * 0.0156, flexDirection: 'column', marginLeft: 'auto', marginRight: 'auto', width: DIMENSION_WIDTH * 0.9173, borderRadius: DIMENSION_WIDTH * 0.0417, backgroundColor: '#FFF', marginTop: DIMENSION_HEIGHT * 0.025}}>
        <TouchableOpacity onPress={() => this.detailClose()}>
          <View style={{flex: 1, flexDirection: 'row', marginTop: DIMENSION_HEIGHT * 0.036, marginBottom: 'auto', marginLeft: DIMENSION_WIDTH * 0.0693, marginRight: DIMENSION_WIDTH * 0.105, justifyContent: 'space-between'}}>
            <View style={{width: DIMENSION_WIDTH * 0.56}}>
              <Text style={{color: '#4A4A4A', fontFamily: fontPlatform(Platform.OS, 'Bold'), fontSize: normalizeFont(14), marginBottom: 20}}>
                {SetDate(this.props.item.created_at)} : {(new Date(this.props.item.created_at).getHours() + 7) > 9 ? (new Date(this.props.item.created_at).getHours() + 7) : '0'+ (new Date(this.props.item.created_at).getHours() + 7) }.{(new Date(this.props.item.created_at).getMinutes() > 9 ? new Date(this.props.item.created_at).getMinutes() : '0'+new Date(this.props.item.created_at).getMinutes() )}
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  style={{width: DIMENSION_WIDTH * 0.0273, height: DIMENSION_HEIGHT * 0.0075}}
                  source={require('../assets/upward.png')}
                />
            </View>
          </View>
          </TouchableOpacity>
          <View style={{marginTop: DIMENSION_HEIGHT * 0.0435, marginLeft: DIMENSION_WIDTH * 0.1147}}>
            <View>
              { this.state.istirahat1.length > 0 ?
                  <View>
                    <View style={{position: 'absolute', marginTop: -40}}>
                      <Text style={{color: '#3B2C71', fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(13)}}>{ this.props.item.kode_outlet.nama_outlet }</Text>
                    </View>
                    <View style={{position: 'absolute', marginTop: DIMENSION_HEIGHT * -0.0156}}>
                      <Text style={{ fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(13)}}>Pesanan : { new Date(this.props.item.tanggal_ambil).toDateString() }</Text>
                    </View>
                    <View style={{marginTop: DIMENSION_HEIGHT * 0.0156}}>
                      <Text style={{color: '#C400A5', fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(13)}}>
                        Istirahat 1
                      </Text>
                    </View>
                  </View>
                :
                 <View><Text></Text></View>
              }
              {this.state.istirahat1.map((item, index) => (
                  <View style={{marginLeft: DIMENSION_WIDTH * 0.04, flexDirection: 'row'}} key={index}>
                    <View style={{width: DIMENSION_WIDTH * 0.2453}}>
                      <Text style={{fontFamily: fontPlatform(Platform.OS, 'Medium'), color: '#4A4A4A', fontSize: normalizeFont(13)}}>
                        {item.nama_menu}
                      </Text>
                    </View>
                    <View style={{marginLeft: DIMENSION_WIDTH * 0.112, flexDirection: 'row'}}>
                      <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#C400A5', fontSize: normalizeFont(13)}}>
                        {item.jumlah_pesan}
                      </Text>
                      <Text style={{fontFamily: fontPlatform(Platform.OS, 'ExtraLight'), color: '#C400A5', fontSize: normalizeFont(13)}}>
                        x
                      </Text>
                    </View>
                    <View style={{marginLeft: DIMENSION_WIDTH * 0.0587}}>
                      <Text style={{fontFamily: fontPlatform(Platform.OS, 'SemiBold'), color: '#4A4A4A', fontSize: normalizeFont(13)}}>
                        {rupiahConverter(item.harga_beli)}
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
            <View style={{marginTop: DIMENSION_HEIGHT * 0.015}}>
              { this.state.istirahat2.length > 0 ?
                  <View>
                  <View style={{position: 'absolute', marginTop: -40}}>
                    <Text style={{color: '#3B2C71', fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(13)}}>{ this.props.item.kode_outlet.nama_outlet }</Text>
                  </View>
                  <View style={{position: 'absolute', marginTop: DIMENSION_HEIGHT * -0.0156}}>
                    <Text style={{ fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(13)}}>Pesanan : { new Date(this.props.item.tanggal_ambil).toDateString() }</Text>
                  </View>
                  <View style={{marginTop: DIMENSION_HEIGHT * 0.0156}}>
                    <Text style={{color: '#C400A5', fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(13)}}>
                      Istirahat 2
                    </Text>
                  </View>
                </View>
                :
                 <View><Text></Text></View>
              }
              {this.state.istirahat2.map((item, index) => (
                  <View style={{marginLeft: DIMENSION_WIDTH * 0.04, flexDirection: 'row'}} key={index}>
                    <View style={{width: DIMENSION_WIDTH * 0.2453}}>
                      <Text style={{fontFamily: fontPlatform(Platform.OS, 'Medium'), color: '#4A4A4A', fontSize: normalizeFont(13)}}>
                        {item.nama_menu}
                      </Text>
                    </View>
                    <View style={{marginLeft: DIMENSION_WIDTH * 0.112, flexDirection: 'row'}}>
                      <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#C400A5', fontSize: normalizeFont(13)}}>
                        {item.jumlah_pesan}
                      </Text>
                      <Text style={{fontFamily:fontPlatform(Platform.OS, 'ExtraLight'), color: '#C400A5', fontSize: normalizeFont(13)}}>
                        x
                      </Text>
                    </View>
                    <View style={{marginLeft: DIMENSION_WIDTH * 0.0587}}>
                      <Text style={{fontFamily: fontPlatform(Platform.OS, 'Medium'), color: '#4A4A4A', fontSize: normalizeFont(13)}}>
                        {rupiahConverter(item.harga_beli)}
                      </Text>
                    </View>
                  </View>
                ))}
            </View>

            <View style={{marginTop: DIMENSION_HEIGHT * 0.015}}>
              { this.state.istirahat3.length > 0 ?
                  <View>
                  <View style={{position: 'absolute', marginTop: -40}}>
                    <Text style={{color: '#3B2C71', fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(13)}}>{ this.props.item.kode_outlet.nama_outlet }</Text>
                  </View>
                  <View style={{position: 'absolute', marginTop: DIMENSION_HEIGHT * -0.0156}}>
                    <Text style={{ fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(13)}}>Pesanan : { new Date(this.props.item.tanggal_ambil).toDateString() }</Text>
                  </View>
                  <View style={{marginTop: DIMENSION_HEIGHT * 0.0156}}>
                    <Text style={{color: '#C400A5', fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(13)}}>
                      Istirahat 3
                    </Text>
                  </View>
                </View>
                :
                 <View><Text></Text></View>
              }
              {this.state.istirahat3.map((item, index) => (
                  <View style={{marginLeft: DIMENSION_WIDTH * 0.04, flexDirection: 'row'}} key={index}>
                    <View style={{width: DIMENSION_WIDTH * 0.2453}}>
                      <Text style={{fontFamily: fontPlatform(Platform.OS, 'Medium'), color: '#4A4A4A', fontSize: normalizeFont(13)}}>
                        {item.nama_menu}
                      </Text>
                    </View>
                    <View style={{marginLeft: DIMENSION_WIDTH * 0.112, flexDirection: 'row'}}>
                      <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#C400A5', fontSize: normalizeFont(13)}}>
                        {item.jumlah_pesan}
                      </Text>
                      <Text style={{fontFamily: fontPlatform(Platform.OS, 'ExtraLight'), color: '#C400A5', fontSize: normalizeFont(13)}}>
                        x
                      </Text>
                    </View>
                    <View style={{marginLeft: DIMENSION_WIDTH * 0.0587}}>
                      <Text style={{fontFamily: fontPlatform(Platform.OS, 'Medium'), color: '#4A4A4A', fontSize: normalizeFont(13)}}>
                        {rupiahConverter(item.harga_beli)}
                      </Text>
                    </View>
                  </View>
                ))}
            </View>


            <View style={{marginTop: DIMENSION_HEIGHT * 0.0285, width: DIMENSION_WIDTH * 0.7067, borderBottomWidth: .5, borderBottomColor: '#C3B9CE', opacity: .5}}>
            </View>
            <View style={{width: DIMENSION_WIDTH * 0.7067, marginTop: DIMENSION_HEIGHT * 0.0075}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={{color: '#4A4A4A', fontSize: normalizeFont(13), fontFamily: fontPlatform(Platform.OS, 'Bold')}}>
                    SubTotal
                  </Text>
                </View>
                <View>
                  <Text style={{color: '#4A4A4A', fontSize: normalizeFont(13), fontFamily: fontPlatform(Platform.OS, 'Medium')}}>
                    {rupiahConverter(this.props.item.total)}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: DIMENSION_HEIGHT * 0.0105}}>
                <View>
                  <Text style={{color: '#4A4A4A', fontSize: normalizeFont(13), fontFamily: fontPlatform(Platform.OS, 'Bold')}}>
                    Total Saldo
                  </Text>
                </View>
                <View>
                  <Text style={{color: '#4A4A4A', fontSize: normalizeFont(13), fontFamily: fontPlatform(Platform.OS, 'Medium')}}>
                    {rupiahConverter(this.props.item.saldo_akhir)}
                  </Text>
                </View>
              </View>
              <View style={{marginTop: DIMENSION_HEIGHT * 0.0105, marginBottom: DIMENSION_HEIGHT * 0.0225, width: DIMENSION_WIDTH * 0.7067, borderBottomWidth: .5, borderBottomColor: '#C3B9CE', opacity: .5}}>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: DIMENSION_HEIGHT * 0.0315}}>
                <View>
                  <Text style={{color:'#4A4A4A', fontFamily:fontPlatform(Platform.OS, 'Regular'), fontSize: normalizeFont(12)}}>
                    Status
                  </Text>
                </View>
                <View>
                  {(this.props.item.transaksi_detail[0].jumlah_pesan == this.props.item.transaksi_detail[0].jumlah_kembali && this.props.item.jam_ambil == null) ? (
                    <Text style={{color: '#6D6F7F', fontSize: normalizeFont(9), fontFamily: fontPlatform(Platform.OS, 'Bold')}}>
                      DIBATALKAN
                    </Text>
                  ) : (this.props.item.transaksi_detail[0].jam_ambil == null) ? (
                    <Text style={{color: '#C400A5', fontSize: normalizeFont(9), fontFamily: fontPlatform(Platform.OS, 'Bold')}}>
                      BELUM DIAMBIL
                    </Text>
                  ) : (this.props.item.transaksi_detail[0].jam_ambil != null) && (
                    <Text style={{color: '#3B2C71', fontSize: normalizeFont(9), fontFamily: fontPlatform(Platform.OS, 'Bold')}}>
                      SUDAH DIAMBIL
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      )
    } else {
      return (
        <View style={{marginTop: DIMENSION_HEIGHT * 0.0078, shadowColor: '#CACDD0', shadowRadius: 40, shadowOpacity: 1, shadowOffset: {width: 0, height: 10}, elevation: 10, flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', width: DIMENSION_WIDTH * 0.9173, borderRadius: DIMENSION_WIDTH * 0.0417, height: DIMENSION_HEIGHT * 0.1312 , backgroundColor: '#FFF', marginBottom: DIMENSION_HEIGHT * 0.0202}}>
          <View style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: DIMENSION_WIDTH * 0.0693}}>
            <View style={{width: DIMENSION_WIDTH * 0.56}}>
              <Text style={{color: '#4A4A4A', fontFamily: fontPlatform(Platform.OS, 'Bold'), fontSize: normalizeFont(14)}}>
                {SetDate(this.props.item.created_at)} : {(new Date(this.props.item.created_at).getHours() + 7) > 9 ? (new Date(this.props.item.created_at).getHours() + 7) : '0'+ (new Date(this.props.item.created_at).getHours() + 7)}.{(new Date(this.props.item.created_at).getMinutes() > 9 ? new Date(this.props.item.created_at).getMinutes() : '0'+new Date(this.props.item.created_at).getMinutes() )}
              </Text>
            </View>
            <View style={{marginTop: DIMENSION_HEIGHT * 0.009, borderBottomWidth: .8, opacity: .5, borderBottomColor: '#4A207C', width: DIMENSION_WIDTH * 0.5547}}>

            </View>
            <View style={{flexDirection: 'row', width: DIMENSION_WIDTH * 0.46, justifyContent: 'space-between', marginTop: DIMENSION_HEIGHT * 0.0091}}>
              <View>
                <Text style={{fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(12), color: '#4A4A4A'}}>
                  Total
                </Text>
              </View>
              <View>
                <Text style={{fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(12), color: '#4A4A4A'}}>
                  {rupiahConverter(this.props.item.total)}
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: 'auto', marginBottom: 'auto'}}>
            <Button onPress={() => this.detailOpen()} style={{borderRadius: 28.5, width: DIMENSION_WIDTH * 0.2453, backgroundColor: '#C400A5', height: DIMENSION_HEIGHT * 0.042, justifyContent: 'center'}}>
              <Text style={{color: '#FFFFFF', fontSize: normalizeFont(9), fontFamily: fontPlatform(Platform.OS, 'Bold')}}>
                D E T A I L
              </Text>
            </Button>
          </View>
        </View>
      )
    }
  }

  render () {
    return (
      this.renderCardItem()
    )
  }

}

export default TransaksiItemList
