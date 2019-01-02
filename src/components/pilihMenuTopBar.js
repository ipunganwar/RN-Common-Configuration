import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'


export default class PilihMenuTopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      searchText: '',
      placeholderText: '    Cari makanan di sini..'
    }
  }

  backButtonClicked () {
    Navigation.handleDeepLink({
      link: "back"
    })
  }

  searchButtonClicked () {
    this.setState({
      isSearch: true
    })
  }

  xButtonClicked() {
    this.setState({
      isSearch: false,
      searchText: ''
    })
    Navigation.handleDeepLink({
      link: "searchMenu",
      payload: ''
    })
  }

  handleSearchInput (text) {
    this.setState({
      searchText: text
    })
    Navigation.handleDeepLink({
      link: "searchMenu",
      payload: text
    })
  }

  handleKeyPress () {
    Navigation.handleDeepLink({
      link: "searchMenu",
      payload: this.state.searchText
    })
  }

  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 'auto', marginBottom: 'auto', marginLeft: '6.27%', marginRight: '3%'}}>
        {this.state.isSearch ? (
          <View style={styles.container}>
            <Image
              style={{width: DIMENSION_WIDTH * 0.05, height: DIMENSION_HEIGHT * 0.0281, marginTop: 'auto', marginBottom: 'auto'}}
              source={require('../assets/searchIcon.png')}
            />
            <TextInput
              selectionColor='#4A207C'
              value={this.state.searchText}
              onChangeText={(text) => this.handleSearchInput(text)}
              onSubmitEditing={() => this.handleKeyPress()}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder={this.state.placeholderText}
              style={{flex: 1, marginLeft: DIMENSION_WIDTH * 0.0389, marginRight: DIMENSION_WIDTH * 0.0806, borderBottomWidth: 0, fontFamily: fontPlatform(Platform.OS, 'LightItalic'), fontSize: normalizeFont(12) }}
            />
            <TouchableOpacity
            onPress={() => this.xButtonClicked()}
            style={styles.rightButton}>
              <Image
                style={{width: DIMENSION_WIDTH * 0.0417, height: DIMENSION_HEIGHT * 0.0234}}
                source={require('../assets/xIcon.png')}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.container}>
            <TouchableOpacity style={styles.touchableContainer} onPress={() => this.backButtonClicked()}>
              <Image
                style={styles.leftButton}
                source={require('../assets/backIcon.png')}
              />
            </TouchableOpacity>
            <Text style={styles.titleText}>
              {this.props.title.toUpperCase()}
            </Text>
            {this.props.title === 'TOTAL PEMBAYARAN' ? (<View></View>) : (<TouchableOpacity style={styles.touchableContainer} onPress={() => this.searchButtonClicked()}>
              <Image
                style={styles.rightButton}
                source={require('../assets/searchIcon.png')}
              />
            </TouchableOpacity>)}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS == 'ios' ? 'white' : 'transparent',
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'flex-start',
    height: 70,
    width: '100%'
  },
  touchableContainer: {
    justifyContent: 'center'
  },
  leftButton: {
    width: DIMENSION_WIDTH * 0.0487,
    height: DIMENSION_HEIGHT * 0.0172
  },
  titleText: {
    alignSelf: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    fontSize: normalizeFont(15),
    letterSpacing: 1,
    lineHeight: 18,
    fontFamily: fontPlatform(Platform.OS, 'SemiBold'),
    color: '#262628'
  },
  rightButton: {
    marginRight: DIMENSION_WIDTH * 0.0556,
    alignSelf: 'center',
    width: DIMENSION_WIDTH * 0.05, 
    height: DIMENSION_HEIGHT * 0.0281
  }
});
