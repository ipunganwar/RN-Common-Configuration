import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, Platform} from 'react-native';
import {Button} from 'native-base';
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'

class OnBoarding1 extends React.Component {

  render() {
    return (
      <View style={{backgroundColor: '#F9F9F9', minWidth: DIMENSION_WIDTH, minHeight: DIMENSION_HEIGHT}}>
        <View>
          <Image
            resizeMode='stretch'
            style={{height: DIMENSION_HEIGHT * 0.6031, width: 'auto'}}
            source={require('../assets/onboarding1.png')}
          />
        </View>
        <View style={{marginTop: DIMENSION_HEIGHT * 0.0849, flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{ fontFamily: fontPlatform(Platform.OS, 'Bold'), color: '#4A207C', fontSize: normalizeFont(24)}}>
            K U A L I T A S
          </Text>
          <Text style={{color: '#373A3D', width: DIMENSION_WIDTH * 0.672, fontSize: normalizeFont(14), textAlign: 'center', fontFamily: fontPlatform(Platform.OS, 'ExtraLight')}}>
            Makanan dan minuman berkualitas aman, halal, higienis, dan bergizi
          </Text>
        </View>
        <View style={{marginTop: DIMENSION_HEIGHT * 0.096, flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={{justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigator.push({
              screen: 'LoginScreen',
              animationType: 'fade',
              navigatorStyle: {
                navBarHidden: true
              },
              backButtonHidden: true,
            })}>
              <View style={{height: DIMENSION_HEIGHT * 0.0625, width: DIMENSION_WIDTH * 0.1389, justifyContent: 'center'}}>
                <Text style={{fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(14), color: '#4A207C'}}>
                  S K I P
                </Text>
              </View>

            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', height: DIMENSION_HEIGHT * 0.0391}}>
            <Button style={{alignSelf: 'flex-end', backgroundColor: '#4A207C', height: DIMENSION_HEIGHT * 0.033, width: DIMENSION_WIDTH * 0.0293, borderRadius: 5}}>
            </Button>
            <Button style={{alignSelf: 'flex-end', backgroundColor: '#C400A5', marginLeft: 9, marginRight: 9, height: DIMENSION_HEIGHT * 0.0165, width: DIMENSION_WIDTH * 0.0293, borderRadius: 50}}>
            </Button>
            <Button style={{alignSelf: 'flex-end', backgroundColor: '#C400A5', height: DIMENSION_HEIGHT * 0.0165, width: DIMENSION_WIDTH * 0.0293, borderRadius: 50}}>
            </Button>
          </View>
          <View style={{justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigator.push({
              screen: 'OnBoarding2',
              animationType: 'slide-horizontal',
              navigatorStyle: {
                navBarHidden: true,
                orientation: 'portrait'
              },
              backButtonHidden: true,
            })}>
              <View style={{height: DIMENSION_HEIGHT * 0.0625, width: DIMENSION_WIDTH * 0.1389, justifyContent: 'center'}}>
                <Text style={{fontFamily: fontPlatform(Platform.OS, 'Medium'), fontSize: normalizeFont(14), color: '#4A207C'}}>
                  N E X T
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default OnBoarding1;
