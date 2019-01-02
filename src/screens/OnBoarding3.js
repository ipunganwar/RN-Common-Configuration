import React from 'react';
import {View, Text, Image, TouchableOpacity, Platform} from 'react-native';
import {Button, Icon} from 'native-base';
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'

class OnBoarding3 extends React.Component {

  render() {
    return (
      <View style={{backgroundColor: '#F9F9F9', minWidth: DIMENSION_WIDTH, minHeight: DIMENSION_HEIGHT}}>
        <View>
          <Image
            resizeMode='stretch'
            style={{height: DIMENSION_HEIGHT * 0.6031, width: 'auto'}}
            source={require('../assets/onboarding3.png')}
          />
        </View>
        <View style={{marginTop: DIMENSION_HEIGHT * 0.0849, flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#4A207C', fontSize: normalizeFont(24)}}>
            P R A K T I S
          </Text>
          <Text style={{color: '#373A3D', width: DIMENSION_WIDTH * 0.672, fontSize: normalizeFont(14), textAlign: 'center', fontFamily: fontPlatform(Platform.OS, 'ExtraLight')}}>
            Pembelian makanan via aplikasi, sehingga semua terlayani dengan baik
          </Text>
        </View>
        <View style={{marginTop: DIMENSION_HEIGHT * 0.0615, flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={{flexDirection: 'row'}}>
            <Button onPress={() => this.props.navigator.push({
              screen: 'LoginScreen',
              animationType: 'fade',
              navigatorStyle: {
                navBarHidden: true
              },
              backButtonHidden: true,
            })} style={{backgroundColor: '#4A207C', height: DIMENSION_HEIGHT * 0.072, width: DIMENSION_WIDTH * 0.128, borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
              <Icon name='ios-arrow-forward' />
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default OnBoarding3;
