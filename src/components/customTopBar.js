import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Platform
} from 'react-native';
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation';
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'

class CustomTopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  notificationButtonClicked() {
    let callerScreenId = ''
    if(this.props.title === 'PROFIL') {
      callerScreenId = 'ProfilScreen'
    } else if (this.props.title === 'BERANDA') {
      callerScreenId = 'BerandaScreen'
    } else if (this.props.title === 'TRANSAKSI') {
      callerScreenId = 'TransaksiScreen'
    }
    Navigation.handleDeepLink({
      link: callerScreenId
    })
  }

  notifCounter(notifArray) {
    let returned = 0
    for (var i = 0; i < notifArray.length; i++) {
      if (returned > 9) {
        break;
      } else {
        if(notifArray[i].baca == "false") {
          returned++
        }
      }
    }
    return returned
  }

  render() {
    let countNotifikasi = 0
    let profile = this.props.pelangganProfile.pelangganProfile
    if (profile.notifikasi) {
      countNotifikasi = this.notifCounter(profile.notifikasi)
    }
    if (countNotifikasi > 9) {
      countNotifikasi = '9+'
    }
    return (
      <View style={Platform.OS == 'ios' ? [styles.container, styles.shadow] : styles.container}>
        <Image
          resizeMode='stretch'
          style={styles.leftButton}
          source={require('../assets/logo_top.png')}
        />
        <Text style={styles.titleText}>
          {this.props.title}
        </Text>
        <TouchableOpacity onPress={ () => this.notificationButtonClicked()}
        style={styles.rightButton}>
          <Image
            style={{width: DIMENSION_WIDTH * 0.0555, height: DIMENSION_HEIGHT * 0.0312}}
            source={this.props.title == 'PROFIL' ? require('../assets/pengaturan.png') : require('../assets/notificationIcon.png')}
          />
          {this.props.title != 'PROFIL' && countNotifikasi != 0 ? (
            <View style={[styles.IconBadge]}>
              <Text style={{marginBottom: 2, color:'#FFFFFF', fontSize: normalizeFont(typeof countNotifikasi == 'string' ? 6 : 7), fontFamily: fontPlatform(Platform.OS, 'SemiBold')}}>{countNotifikasi}</Text>
            </View>
            ) :
            (
              <View></View>
            )
          }
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pelangganProfile: state.Profile,
  }
}

export default connect(mapStateToProps, null)(CustomTopBar)

const styles = StyleSheet.create({
  IconBadge: {
    position: 'absolute',
    top: 1,
    right: 1,
    width: 10,
    height: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD377F',
  },
  container: {
    flex: 1,
    backgroundColor: Platform.OS == 'ios' ? 'white' : 'transparent',
    flexDirection: 'row',
    marginVertical: DIMENSION_HEIGHT * 0.0078,
    justifyContent: 'space-between',
    height: 70,
    width: '100%',
  },
  shadow: {
    shadowOffset: {width: 4, height: 2}, 
    shadowOpacity: 1, 
    shadowRadius: 5, 
    shadowColor: '#C3B9CE', 
    backgroundColor: '#FFF', 
    elevation: 9
  },
  leftButton: {
    alignSelf: 'center',
    width: DIMENSION_WIDTH * 0.0892,
    height: DIMENSION_HEIGHT * 0.0454,
    marginLeft: '6.27%',
  },
  titleText: {
    alignSelf: 'center',
    fontSize: normalizeFont(15),
    letterSpacing: 1,
    lineHeight: 18,
    fontFamily: fontPlatform(Platform.OS, 'SemiBold'),
    color: '#262628',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  rightButton: {
    marginRight: '8%',
    alignSelf: 'center'
  }
});
