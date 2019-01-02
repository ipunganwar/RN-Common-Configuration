import React from 'react'
import {ScrollView, View, Text, Image, StyleSheet, Platform} from 'react-native'
import PilihMenuTopBar from '../components/pilihMenuTopBar'
import { connect } from 'react-redux'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'
import rupiahConverter from '../helpers/rupiahConverter'

var randomImage = {
    aqua_botol: require("../dummy-assets/aqua_botol.jpg"),
    aqua_gelas: require("../dummy-assets/aqua_gelas.jpg"),
    bakso: require("../dummy-assets/bakso.jpg"),
    bakso_pedas: require("../dummy-assets/bakso_pedas.jpg"),
    batagor: require("../dummy-assets/batagor.jpg"),
    es_jeruk: require("../dummy-assets/es_jeruk.jpg"),
    es_teh: require("../dummy-assets/es_teh.png"),
    gado: require("../dummy-assets/gado.jpg"),
    gorengan: require("../dummy-assets/gorengan.jpg"),
    mie_ayam: require("../dummy-assets/mie_ayam.jpg"),
    nasgor: require("../dummy-assets/nasgor.jpg"),
    nasi_gila: require("../dummy-assets/nasi_gila.jpg"),
    nasi_putih: require("../dummy-assets/nasi_putih.jpg"),
    pecel_ayam: require("../dummy-assets/pecel_ayam.jpg"),
    pecel: require("../dummy-assets/pecel.jpg"),
    pisang_goreng: require("../dummy-assets/pisang_goreng.jpg"),
    risoles: require("../dummy-assets/risoles.jpg"),
    sate_ayam: require("../dummy-assets/sate_ayam.jpg"),
    sayur_asem: require("../dummy-assets/sayur_asem.jpeg"),
    siomay: require("../dummy-assets/siomay.jpg"),
    sop_daging: require("../dummy-assets/sop_daging.jpg"),
    soto_ayam: require("../dummy-assets/soto_ayam.jpg"),
    teh_botol: require("../dummy-assets/teh_botol.jpg"),
    profile_image: require("../dummy-assets/profile_image.jpg"),
    ayam: require("../dummy-assets/ayam.jpg"),
    bawang_merah: require("../dummy-assets/bawang_merah.jpg"),
    daging_sapi: require("../dummy-assets/daging_sapi.jpg"),
    tepung: require("../dummy-assets/tepung.jpg"),
    teh: require("../dummy-assets/teh.jpg"),
    telur: require("../dummy-assets/telur.jpg"),
  }



class DetailMenuScreen extends React.Component {
  static navigatorStyle = {
      tabBarHidden: true,
  }
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  tingkatPedas () {
    switch (this.props.item.tingkat_pedas) {
      case 0:
        return (
          <View>
            <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold')}}>Tidak Pedas</Text>
          </View>
        )
        break;
      case 1:
        return (
          <View>
            <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold')}}>Pedas</Text>
          </View>
        )
        break;
      case 2:
        return (
          <View>
            <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold')}}>Sangat Pedas</Text>
          </View>
        )
        break;
      case 3:
        return (
          <View>
            <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold')}}>Super Pedas</Text>
          </View>
        )
        break;
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{height: 60, top: -3, left: -9, width: DIMENSION_WIDTH + 19, elevation: 4, borderBottomWidth: .1, borderColor: '#c3b9ce'}}>
          <PilihMenuTopBar title={this.props.item.nama_menu}/>
        </View>
        <View style={styles.backgroundThumbnailContainer}>
          <Image
            style={styles.backgroundThumbnail}
            source={{ uri: this.props.item.foto_menu }}
          />
        </View>
        <View style={styles.cardDetailContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                {this.props.item.nama_menu}
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>
                {rupiahConverter(this.props.item.harga_terbaru)}
              </Text>
            </View>
            <View style={styles.istirahatListContainer}>
              <View style={styles.istirahatContainer}>
                <Text style={styles.istirahatText}>
                  Istirahat 1
                </Text>
              </View>
              <View style={styles.istirahatContainer}>
                <Text style={styles.istirahatText}>
                  •
                </Text>
              </View>
              <View style={styles.istirahatContainer}>
                <Text style={styles.istirahatText}>
                  Istirahat 2
                </Text>
              </View>
              <View style={styles.istirahatContainer}>
                <Text style={styles.istirahatText}>
                  •
                </Text>
              </View>
              <View style={styles.istirahatContainer}>
                <Text style={styles.istirahatText}>
                  Istirahat 3
                </Text>
              </View>
            </View>
          </View>
          <ScrollView style={styles.contentContainer}>
            <View style={styles.deskripsiContainer}>
              <View style={styles.deskripsiTitleContainer}>
                <Text style={styles.deskripsiTitleText}>
                  Deskripsi
                </Text>
              </View>
              <View style={styles.deskripsiContentContainer}>
                <Text style={styles.deskripsiContentText}>
                  { this.props.item.deskripsi }
                </Text>
              </View>
            </View>
            <View style={styles.bahanContainer}>
              <View style={styles.bahanTitleContainer}>
                <Text style={styles.bahanTitleText}>
                  Bahan Bahan
                </Text>
              </View>

              <View style={styles.bahanContentContainer}>
                { this.props.item.bahan.map( (bahan, index) => {
                    return (
                      <View style={styles.bahanItemContainer} key={index}>
                        <View style={styles.bahanItemImageContainer}>
                          <Image
                            style={styles.bahanItemImage}
                            source={{ uri: bahan.icon_bahan }}
                          />
                        </View>
                        <View style={styles.bahanItemTextContainer}>
                          <Text style={styles.bahanItemText}>
                            { bahan.nama_bahan}
                          </Text>
                        </View>
                      </View>
                    )
                  })
                }
              </View>
            </View>
            <View style={styles.tingkatPedasContainer}>
              <View style={styles.tingkatPedasTitleContainer}>
                <Text style={styles.tingkatPedasTitleText}>
                  Tingkat Pedas
                </Text>
              </View>
              <View style={styles.tingkatPedasContentContainer}>
                <View style={styles.tingkatPedasImageContainer}>
                  <Image
                    style={styles.tingkatPedasImage}
                    source={require('../dummy-assets/cabai.jpg')}
                  />
                </View>
                <View style={styles.tingkatPedasTextContainer}>
                  { this.tingkatPedas() }
                </View>
              </View>
            </View>
            <View style={styles.nutrisiContainer}>
              <View style={styles.nutrisiTitleContainer}>
                <Text style={styles.nutrisiTitleText}>
                  Nutrisi
                </Text>
              </View>
              <View style={styles.nutrisiSubtitleContainer}>
                <Text style={styles.nutrisiSubtitleText}>
                  {this.props.item.nama_menu} ini telah lulus uji materi dari ahli gizi dan dapur yang halal, mengandung
                </Text>
              </View>
              <View style={styles.nutrisiContentContainer}>
                <View style={styles.nutrisiItemListContainer}>
                  <View style={styles.nutrisiItemContainer}>
                    <Text style={styles.nutrisiItemTextKandungan}>
                      { this.props.item.protein }
                    </Text>
                    <Text style={styles.nutrisiItemText}>
                      gram
                    </Text>
                    <Text style={styles.nutrisiItemText}>
                      Protein
                    </Text>
                  </View>
                  <View style={styles.nutrisiItemContainer}>
                    <Text style={styles.nutrisiItemTextKandungan}>
                      { this.props.item.karbohidrat }
                    </Text>
                    <Text style={styles.nutrisiItemText}>
                      gram
                    </Text>
                    <Text style={styles.nutrisiItemText}>
                      Karbohidrat
                    </Text>
                  </View>
                  <View style={styles.nutrisiItemContainer}>
                    <Text style={styles.nutrisiItemTextKandungan}>
                      { this.props.item.kolesterol } %
                    </Text>
                    <Text style={styles.nutrisiItemText}>
                      { this.props.item.kolesterol }
                    </Text>
                    <Text style={styles.nutrisiItemText}>
                      Kolesterol
                    </Text>
                  </View>
                  <View style={styles.nutrisiItemContainer}>
                    <Text style={styles.nutrisiItemTextKandungan}>
                      { this.props.item.lemak }%
                    </Text>
                    <Text style={styles.nutrisiItemText}>
                      { this.props.item.lemak } g
                    </Text>
                    <Text style={styles.nutrisiItemText}>
                      Lemak Total
                    </Text>
                  </View>
                  <View style={styles.nutrisiItemContainer}>
                    <Text style={styles.nutrisiItemTextKandungan}>
                      { this.props.item.b1 }%
                    </Text>
                    <Text style={styles.nutrisiItemText}>
                      { this.props.item.b1 } g
                    </Text>
                    <Text style={styles.nutrisiItemText}>
                      Vitamin B1
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: '100%'
  },
  backgroundThumbnailContainer: {
    height: DIMENSION_HEIGHT * 0.7890
  },
  backgroundThumbnail: {
    height: DIMENSION_HEIGHT * 0.275,
    width: DIMENSION_WIDTH
  },
  cardDetailContainer: {
    position: 'absolute',
    top: DIMENSION_HEIGHT * 0.1718,
    bottom: 0,
    width: DIMENSION_WIDTH * 0.8888,
    left: DIMENSION_WIDTH * 0.0555,
    minHeight: DIMENSION_HEIGHT * 0.5859,
    borderRadius: DIMENSION_HEIGHT * 0.0093,
    backgroundColor: '#FFF',
  },
  titleContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0156,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: DIMENSION_WIDTH * 0.6944
  },
  titleText: {
    color: '#4A4A4A',
    fontFamily: fontPlatform(Platform.OS, 'SemiBold'),
    fontSize: normalizeFont(18)
  },
  priceContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0031,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: DIMENSION_WIDTH * 0.5555
  },
  priceText: {
    color: '#4A207C',
    fontSize: normalizeFont(14),
    fontFamily: fontPlatform(Platform.OS, 'Bold')
  },
  istirahatListContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: DIMENSION_HEIGHT * 0.0094
  },
  istirahatContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: DIMENSION_WIDTH * 0.0194
  },
  istirahatText: {
    color: '#5A5E62',
    fontSize: normalizeFont(11),
    fontFamily: fontPlatform(Platform.OS, 'ExtraLight')
  },
  contentContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0234,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: DIMENSION_WIDTH * 0.7861
  },
  deskripsiContainer: {
    width: DIMENSION_WIDTH * 0.88,
  },
  deskripsiTitleContainer: {

  },
  deskripsiTitleText: {
    color: '#373A3D',
    fontSize: normalizeFont(14),
    fontFamily: fontPlatform(Platform.OS, 'Bold')
  },
  deskripsiContentContainer: {
    width: DIMENSION_WIDTH * 0.7861,
    marginTop: DIMENSION_HEIGHT * 0.0094
  },
  deskripsiContentText: {
    color: '#373A3D',
    fontSize: normalizeFont(12),
    fontFamily: fontPlatform(Platform.OS, 'ExtraLight')
  },
  bahanContainer: {
    width: DIMENSION_WIDTH * 0.7861,
    marginTop: DIMENSION_HEIGHT * 0.0234
  },
  bahanTitleContainer: {

  },
  bahanTitleText: {
    color: '#373A3D',
    fontSize: normalizeFont(14),
    fontFamily: fontPlatform(Platform.OS, 'Bold')
  },
  bahanContentContainer: {
    width: DIMENSION_WIDTH * 0.7861,
    marginTop: DIMENSION_HEIGHT * 0.0141,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bahanItemContainer: {

  },
  bahanItemImageContainer: {

  },
  bahanItemTextContainer: {

  },
  bahanItemImage: {
    width: DIMENSION_WIDTH * 0.1139,
    height: DIMENSION_HEIGHT * 0.0657
  },
  bahanItemText: {
    color: '#373A3D',
    fontSize: normalizeFont(11),
    fontFamily: fontPlatform(Platform.OS, 'ExtraLight')
  },
  tingkatPedasContainer: {
    width: DIMENSION_WIDTH * 0.7861,
    marginTop: DIMENSION_HEIGHT * 0.0234
  },
  tingkatPedasTitleContainer: {

  },
  tingkatPedasTitleText: {
    color: '#373A3D',
    fontSize: normalizeFont(14),
    fontFamily: fontPlatform(Platform.OS, 'Bold')
  },
  tingkatPedasContentContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0125,
    flexDirection: 'row'
  },
  tingkatPedasImageContainer: {

  },
  tingkatPedasTextContainer: {
    justifyContent: 'center',
    marginLeft: DIMENSION_WIDTH * 0.0389
  },
  tingkatPedasText: {
    color: '#717679',
    fontFamily: fontPlatform(Platform.OS, 'Regular'),
    fontSize: normalizeFont(12)
  },
  tingkatPedasImage: {
    width: DIMENSION_WIDTH * 0.1389,
    height: DIMENSION_HEIGHT * 0.0547
  },
  nutrisiContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0312,
    width: DIMENSION_WIDTH * 0.7861,
    paddingBottom: DIMENSION_HEIGHT * 0.0312
  },
  nutrisiTitleContainer: {

  },
  nutrisiTitleText: {
    color: '#373A3D',
    fontSize: normalizeFont(14),
    fontFamily: fontPlatform(Platform.OS, 'Bold')
  },
  nutrisiSubtitleContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0141
  },
  nutrisiSubtitleText: {
    color: '#373A3D',
    fontFamily: fontPlatform(Platform.OS, 'ExtraLight'),
    fontSize: normalizeFont(12)
  },
  nutrisiContentContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0156
  },
  nutrisiItemListContainer: {
    flexDirection: 'column'
  },
  nutrisiItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: DIMENSION_HEIGHT * 0.0547
  },
  nutrisiItemTextKandungan: {
    width: DIMENSION_WIDTH * 0.1528,
    color: '#4A207C',
    fontSize: normalizeFont(20),
    fontFamily: fontPlatform(Platform.OS, 'Bold')
  },
  nutrisiItemText: {
    // width: DIMENSION_WIDTH * 0.1278,
    width: DIMENSION_WIDTH * 0.2188,
    color: '#717679',
    fontSize: normalizeFont(12),
    fontFamily: fontPlatform(Platform.OS, 'Regular')
  },
})

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailMenuScreen);
