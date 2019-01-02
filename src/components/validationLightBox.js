import React from 'react';
import {StyleSheet, View, Dimensions, Image, Platform} from 'react-native';
import { Button, Text, Item, Input, Label } from 'native-base';
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, modalStyle, fontPlatform } from '../helpers/dimension'
import {Navigation} from 'react-native-navigation'
import { connect } from 'react-redux'
import {ResetVerificationPassword} from '../actions/login'


class ValidationLightBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      inputErrorBoolean: false,
    }
  }

  componentWillMount() {
    this.props.resetVerificationPassword()
  }

  static navigatorStyle = {
    screenBackgroundColor: 'rgba(18,10,28,0.55)',
    modalPresentationStyle: modalStyle(Platform),
  };

  dismissLightBox (flag) {
    switch (flag) {
      case 'Verifikasi Password':
        this.props.okButtonClicked(this.state.password)
        break
    }
  }

  handlePasswordInput (typedPassword) {
    this.setState({
      password: typedPassword
    })
  }

  dismissMenu () {
    if (this.props.verif_password == 1) {
      Navigation.dismissModal({
        animationType: 'none' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
      });
      this.props.sendOrder()

    } else {
      return (
        <View>
          <View style={{marginTop: DIMENSION_HEIGHT * 0.025, marginLeft: 'auto', marginRight: 'auto', marginBottom: 'auto'}}>
            {this.props.icon == 'Warning' ? (
              <Image
                resizeMode='stretch'
                style={{width: DIMENSION_WIDTH * 0.1533, height: DIMENSION_HEIGHT * 0.075}}
                source={require('../assets/warning.png')}
              />) : (
              <Image
                resizeMode='stretch'
                style={{width: DIMENSION_WIDTH * 0.1533, height: DIMENSION_HEIGHT * 0.0578}}
                source={require('../assets/success.png')}
              />
            )}
          </View>
          <View style={{marginTop: DIMENSION_HEIGHT * 0.0203, marginLeft: 'auto', marginRight: 'auto'}}>
            <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: this.props.verif_password == 400 ? '#FD377F' : '#B544A8', fontSize: normalizeFont(14)}}>
              {this.props.title}
            </Text>
          </View>
          <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 0}}>
            <Item stackedLabel style={{borderColor: this.props.verif_password == 400 ? '#FD377F' : '#4A207C', }}>
              <Label style={{color: this.props.verif_password == 400 ? '#FD377F' : '#373A3D', fontFamily: fontPlatform(Platform.OS, 'ExtraLight'), fontSize: normalizeFont(12), paddingRight: 1}}>{this.props.verif_password == 400 ? 'Password anda salah' : 'Password'}</Label>
              <Input secureTextEntry placeholder='...' value={this.state.password} onChangeText={(typedPassword) => this.handlePasswordInput(typedPassword)} style={{textAlign: 'center', fontSize: normalizeFont(12), width: 50}}/>
            </Item>
          </View>
          <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}>
            <Button rounded style={{backgroundColor: '#4A207C', height: DIMENSION_HEIGHT * 0.0469, width: DIMENSION_WIDTH * 0.2222, justifyContent: 'center', shadowOffset: {width: 0, height: 8}, shadowOpacity: 1, shadowRadius: 14, shadowColor: 'rgba(195,185,206,1)'}} onPress={() => this.dismissLightBox(this.props.flagging)}>
              <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#FFF', textAlign: 'center', fontSize: normalizeFont(11) }}>O K</Text>
            </Button>
          </View>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={{width: DIMENSION_WIDTH * 0.75, height: DIMENSION_HEIGHT * 0.3013, marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', backgroundColor: '#FFF', borderRadius: DIMENSION_HEIGHT * 0.0156}}>
        { this.dismissMenu() }
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    verif_password: state.LoginReducer.verif_password
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetVerificationPassword: () => { dispatch(ResetVerificationPassword()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ValidationLightBox)
