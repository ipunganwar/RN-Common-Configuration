import React from 'react';
import {StyleSheet, View, Dimensions, Image, ActivityIndicator, Platform} from 'react-native';
import { Button, Text } from 'native-base';
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, modalStyle } from '../helpers/dimension'
import {Navigation} from 'react-native-navigation'
import { connect } from 'react-redux'

class LoadingLightBox extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigatorStyle = {
    screenBackgroundColor: 'rgba(18,10,28,0.55)',
    modalPresentationStyle: modalStyle(Platform),
  };

  isLoading () {
    if (this.props.login_loading) {
      return (
        <View style={{ marginBottom: '50%'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    } else {
      Navigation.dismissModal({
        animationType: 'none' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
      });
      this.props.transaksiBerhasilLightBox()
    }
  }

  render() {
    return (
      <View>
        { this.isLoading() }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('loading',state.LoginReducer)
  return {
    verif_password: state.LoginReducer.verif_password,
    login_loading: state.LoginReducer.loading
  }
}
export default connect(mapStateToProps, null)(LoadingLightBox)
