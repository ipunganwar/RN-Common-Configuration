import React from 'react';
import {View, Text, Image, Linking, BackHandler, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import {Item, Input, Label, Icon, Button} from 'native-base';
import FormLogin from '../components/formLogin'
import FormLupaPassword from '../components/formLupaPassword'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'
import { Navigation } from 'react-native-navigation';
import { getLogin } from '../actions/login'
import { connect } from 'react-redux'

class LoginScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLupaPassword: false
    }
  }

  componentDidMount() {
    let self = this
    BackHandler.addEventListener('hardwareBackPress', function() {
      // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
      // Typically you would use the navigator here to go to the last state.
      if(self.state.isLupaPassword){
        self.toggleLupaPassword()
        return true
      } else {
        return false
      }
    })
  }

  toggleLupaPassword() {
    this.setState({
      isLupaPassword: !this.state.isLupaPassword
    })
  }

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView style={{flexDirection: 'column', backgroundColor: '#FFF', minHeight: DIMENSION_HEIGHT}}>
          <View style={{ marginTop: DIMENSION_HEIGHT * 0.1064, marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/logo.png')}
              style={{width: DIMENSION_WIDTH * 0.5668, height: DIMENSION_HEIGHT * 0.0871, resizeMode: "stretch"}}
            />
          </View>
          <View>
            {this.state.isLupaPassword ? (<FormLupaPassword lupaPassword={() => this.toggleLupaPassword()} navigator={this.props.navigator}/>): (<FormLogin navigator={this.props.navigator} lupaPassword={() => this.toggleLupaPassword()}/>)}
          </View>
          <View style={{marginTop: DIMENSION_HEIGHT * 0.1619, flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{marginTop: 'auto', flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end'}}>
              <Text style={{color: '#5C5C5D', fontSize: normalizeFont(11), fontFamily: fontPlatform(Platform.OS, 'Light')}}>
                Sekolah Anda belum terdaftar?  
              </Text>
              <Text> </Text>
              <Text style={{color: '#4A207C', fontFamily: fontPlatform(Platform.OS, 'SemiBold'), fontSize: normalizeFont(11)}}
                onPress={() => Linking.openURL('http://google.com')}>
                Hubungi Kami
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state,
    timeout: state.TimeoutReducer.isConnected,
  }
}


const mapDispatchToProps = (dispatch) => ({
    //SET DATA REAL, JIKA SUDAH SELESAI HARAP DIKEMBALIKAN
    // getAction: () => dispatch(getLogin())

})

export default connect(null, null)(LoginScreen);
