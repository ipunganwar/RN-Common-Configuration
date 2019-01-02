import React from 'react';
import {ScrollView, View, Text, FlatList, Image, TouchableOpacity, Linking, Platform} from 'react-native';
import PengaturanTopBar from '../components/pengaturanTopBar'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, fontPlatform } from '../helpers/dimension'
import { connect } from 'react-redux'

class PengaturanScreen extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.setState({
      notificationList: this.props.profile.notifikasi
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      notificationList: nextProps.profile.notifikasi
    })
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '#F9F9F9', minHeight: DIMENSION_HEIGHT}}>
        <View style={{height: 60, top: -3, left: -9, width: DIMENSION_WIDTH + 19, elevation: 4, borderBottomWidth: .1, borderColor: '#c3b9ce'}}>
          <PengaturanTopBar/>
        </View>
        <View style={{marginLeft: 37, marginTop: 19}}>
          <Text style={{ fontFamily: fontPlatform(Platform.OS, 'Bold'), fontSize: 15, lineHeight: 18, color: '#262628', marginBottom: 10 }}>Versi</Text>
          <Text style={{ fontFamily: fontPlatform(Platform.OS, 'Bold'), fontSize: 15, lineHeight: 18, color: '#9B9B9B', marginBottom: 14 }}>3.1.15</Text>
          <View style={{ height: 1, width: 300, borderColor: '#C3B9CE', borderWidth: 1, borderStyle: 'solid' }}/>

          <TouchableOpacity onPress={()=>{ Linking.openURL('https://google.com')}}>
            <View style={{ marginTop: 15, flexDirection: 'row', marginBottom: 15}}>
              <Image
                style={{width: 13, height: 21, marginRight: 22}}
                source={require('../assets/pertanyaan.png')}
              />
              <Text style={{ fontFamily: fontPlatform(Platform.OS, 'Bold'), fontSize: 15, lineHeight: 18, color: '#262628'}}>Pertanyaan Umum</Text>
            </View>
          </TouchableOpacity>
          <View style={{ height: 1, width: 300, borderColor: '#C3B9CE', borderWidth: 1, borderStyle: 'solid' }}/>
          <TouchableOpacity onPress={()=>{ Linking.openURL('https://google.com')}}>
            <View style={{ marginTop: 15, flexDirection: 'row', marginBottom: 15}}>
              <Image
                style={{width: 15, height: 20, marginRight: 22}}
                source={require('../assets/privasi.png')}
              />
              <Text style={{ fontFamily: fontPlatform(Platform.OS, 'Bold'), fontSize: 15, lineHeight: 18, color: '#262628'}}>Kebijakan Privasi</Text>
            </View>
          </TouchableOpacity>
          <View style={{ height: 1, width: 300, borderColor: '#C3B9CE', borderWidth: 1, borderStyle: 'solid' }}/>
          <TouchableOpacity onPress={()=>{ Linking.openURL('https://google.com')}}>
            <View style={{ marginTop: 15, flexDirection: 'row', marginBottom: 15}}>
              <Image
                style={{width: 20, height: 20, marginRight: 22}}
                source={require('../assets/tentang.png')}
              />
            <Text style={{ fontFamily: fontPlatform(Platform.OS, 'Bold'), fontSize: 15, lineHeight: 18, color: '#262628'}}>Tentang Aplikasi</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.Profile.pelangganProfile
  }
}

export default connect(mapStateToProps, null)(PengaturanScreen)
