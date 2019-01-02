import React from 'react';
import {ScrollView, View, Text, FlatList, Platform} from 'react-native';
import NotificationListItem from '../components/notificationListItem'
import NotificationTopBar from '../components/notificationTopBar'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT } from '../helpers/dimension'
import { connect } from 'react-redux'
import {ReadAllNotification} from '../actions/profileAction'

class NotificationScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      notificationList: [{
        date: '2018-05-15',
        time: '07.00',
        text: 'Hi, Afifah Fatimah! Saldo Anda telah dikembalikan sebanyak Rp. 20.000,- dikarenakan menu yang Anda pesan tidak tersedia.'
      }, {
        date: '2018-05-15',
        time: '10.40',
        text: 'Hi, Afifah Fatimah! Saldo Anda telah dikembalikan sebanyak Rp. 15.000,- dikarenakan menu yang Anda pesan tidak tersedia.'
      }]
    }
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

  componentDidMount () {
    let lastNotif = JSON.parse(JSON.stringify(this.props.profile.notifikasi[0]))
    lastNotif = JSON.stringify(lastNotif)
    this.props.readAllNotification(this.props.token, lastNotif)
  }

  render() {
    return (
      <View style={{height: '100%', backgroundColor: '#F9F9F9'}}>
        <View style={{height: 60, top: -3, left: -9, width: DIMENSION_WIDTH + 19, elevation: 4, borderBottomWidth: .1, borderColor: '#c3b9ce'}}>
          <NotificationTopBar/>
        </View>
        <FlatList
          style={{paddingTop: DIMENSION_HEIGHT * 0.0391}}
          data={this.state.notificationList}
          renderItem={({item}) => <NotificationListItem item={item}/>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.Profile.pelangganProfile,
    token: state.TokenReducer.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readAllNotification: (token, lastNotification) => { dispatch(ReadAllNotification(token, lastNotification)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)
