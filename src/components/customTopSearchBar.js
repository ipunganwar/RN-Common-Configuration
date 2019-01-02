import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  TextInput,
} from 'react-native';
import {Badge} from 'native-base'
import { Navigation } from 'react-native-navigation';
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'

export default class CustomTopSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      searchText: '',
      placeholderText: '    Cari kantin di sini..'
    };
  }

  searchButtonClicked() {
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
      link: "searchKantin",
      payload: ''
    })
  }

  handleSearchInput (text) {
    this.setState({
      searchText: text
    })
    Navigation.handleDeepLink({
      link: "searchKantin",
      payload: text
    })
  }

  handleKeyPress () {
    Navigation.handleDeepLink({
      link: "searchKantin",
      payload: this.state.searchText
    })
  }

  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 'auto', marginBottom: 'auto'}}>
        {this.state.isSearch ? (
          <View style={Platform.OS == 'ios' ? [styles.container, styles.shadow] : styles.container}>
            <Image
              resizeMode='stretch'
              style={{width: DIMENSION_WIDTH * 0.055, height: DIMENSION_HEIGHT * 0.0281, marginTop: 'auto', marginBottom: 'auto', marginLeft: '6.27%'}}
              source={require('../assets/searchIcon.png')}
            />
            <TextInput
              selectionColor='#4A207C'
              value={this.state.searchText}
              onChangeText={(text) => this.handleSearchInput(text)}
              onSubmitEditing={() => this.handleKeyPress()}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder={this.state.placeholderText}
              style={{flex: 1, marginLeft: DIMENSION_WIDTH * 0.0388, marginRight: DIMENSION_HEIGHT * 0.0805, borderBottomWidth: 0, fontFamily: fontPlatform(Platform.OS, 'LightItalic'), fontSize: normalizeFont(12) }}
            />
            <TouchableOpacity
            onPress={() => this.xButtonClicked()}
            style={styles.rightButton}>
              <Image
                style={{width: DIMENSION_WIDTH * 0.0416, height: DIMENSION_HEIGHT * 0.0234}}
                source={require('../assets/xIcon.png')}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={Platform.OS == 'ios' ? [styles.container, styles.shadow] : styles.container}>
            <Image
              resizeMode='stretch'
              style={styles.leftButton}
              source={require('../assets/logo_top.png')}
            />
            <Text style={styles.titleText}>
              {this.props.title}
            </Text>
            <TouchableOpacity onPress={ () => this.searchButtonClicked()}
            style={styles.rightButton}>
              <Image
                resizeMode='stretch'
                style={{width: DIMENSION_WIDTH * 0.055, height: DIMENSION_HEIGHT * 0.0281, marginTop: 'auto', marginBottom: 'auto'}}
                source={require('../assets/searchIcon.png')}
              />
            </TouchableOpacity>
          </View>
      )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Platform.OS == 'ios' ? 'white' : 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70
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
    marginRight: DIMENSION_WIDTH * 0.0556,
    alignSelf: 'center',
    marginRight: '8%',
  }
});
