import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'

export default class NotificationTopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  backButtonClicked () {
    Navigation.handleDeepLink({
      link: "back"
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchableContainer} onPress={() => this.backButtonClicked()}>
          <Image
            style={styles.leftButton}
            source={require('../assets/backIcon.png')}
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>
          NOTIFIKASI
        </Text>
        <TouchableOpacity style={styles.touchableContainer}>
          <Image
            style={styles.rightButton}
            source={require('../assets/backIcon.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginVertical: DIMENSION_HEIGHT * 0.0078,
    justifyContent: 'flex-start',
    height: 70,
    width: '100%',
    marginLeft: '6.27%', marginRight: '3%'
  },
  touchableContainer: {
    justifyContent: 'center'
  },
  leftButton: {
    width: DIMENSION_WIDTH * 0.05,
    height: DIMENSION_HEIGHT * 0.0171
  },
  titleText: {
    alignSelf: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    fontSize: normalizeFont(15),
    letterSpacing: 1,
    lineHeight: 18,
    fontFamily: fontPlatform(Platform.OS, 'SemiBold'),
    color: '#262628',
    marginRight: 'auto',
    paddingRight: DIMENSION_WIDTH * 0.0555,
    marginLeft: 'auto'
  },
  rightButton: {
    marginRight: DIMENSION_WIDTH * 0.055,
    alignSelf: 'center',
    opacity: 0
  }
});
