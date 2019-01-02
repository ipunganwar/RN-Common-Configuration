import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Button } from 'native-base'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { SetCurrentActiveDate, SetCurrentActiveIstirahatTab, SetActiveDate, SetTanggalPenetapanMenu } from '../actions/calendarPesan'
import { width as DIMENSION_WIDTH, height as DIMENSION_HEIGHT, normalizeFont, fontPlatform } from '../helpers/dimension'

class CustomHeaderPesan extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeDate: props.calendarPesan.activeDate.slice(1, 6),
      currentActiveDate: props.calendarPesan.currentActiveDate,
      currentActiveIstirahatTab: props.calendarPesan.currentActiveIstirahatTab,
      currentTanggalPenetapanMenu: '',
    }
  }

  componentWillMount () {
    // if (!this.state.activeDate[this.props.currentActiveDate].active) {
    // this.changeCalendarPosition(this.props.calendarPesan.currentActiveDate)
    // }
  }

  setCurrentActiveDateToday (dates) {
    return dates === true
  }

  componentWillReceiveProps(nextProps) {
    let activeDate = nextProps.calendarPesan.activeDate.slice(1, 6)
    this.setState({
      activeDate: activeDate,
    })

  }

  changeIstirahatTabs(num) {
    // this.props.triggerChangeIstirahatTab(num)
    this.props.setCurrentActiveIstirahatTab(num)
    this.setState({
      currentActiveIstirahatTab: num
    })
  }

  changeActiveDate(num) {
    this.props.setCurrentActiveDate(num)
    this.setState({
      currentActiveDate: num
    })
    // this.props.triggerChangeActiveDate(num)
  }

  showNotifLightBoxSemuaLibur (semuaLibur) {
    if (semuaLibur) {
      Navigation.showLightBox({
        screen: 'NotificationLightBox',
        passProps: {
          icon: 'Warning',
          title: 'Tidak Beroperasi',
          text: 'Anda belum dapat melakukan pesanan untuk 5 hari ke depan'
        },
        style: {
          tapBackgroundToDismiss: true,
          backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
          backgroundColor: "rgba(18,10,28,0.55)" // tint color for the background, you can specify alpha here (optional)
        },
      })
    } else {
      Navigation.showLightBox({
        screen: 'NotificationLightBox',
        passProps: {
          icon: 'Warning',
          title: 'Tidak Beroperasi',
          text: 'Silahkan coba di hari yang lain',
          flagging: 'Pesan Screen'
        },
        style: {
          tapBackgroundToDismiss: true,
          backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
          backgroundColor: "rgba(18,10,28,0.55)" // tint color for the background, you can specify alpha here (optional)
        },
      })
    }
  }

  changeCalendarPosition(i) {
    this.props.setTanggalPenetapanMenu(i)


    if (!this.state.activeDate[i].active) {
      let j = i
      let arrayDistanceWithI = []
      while (j < 5){
        if (this.state.activeDate[j].active) {
          this.showNotifLightBoxSemuaLibur(false)
          this.changeCalendarPosition(j)
          break
        }
        if (j == 4) {
          j = 0
        } else {
          j++
        }
        if(j == i) {
          this.showNotifLightBoxSemuaLibur(true)
          this.props.switchToBeranda()
          break;
        }
      }
    } else {
      this.changeActiveDate(i)
      // if(i - 2 > 0) {
      //   while(i - 2 != 0) {
      //     this.moveArrayLeft()
      //     i--
      //   }
      // } else {
      //   while(i - 2 != 0) {
      //     this.moveArrayRight()
      //     i++
      //   }
      // }
      this.props.setCurrentActiveDate(i)
    }

  }

  moveArrayLeft() {
    let newArr = this.state.activeDate
    let temp = newArr[0]
    newArr.shift()
    newArr.push(temp)
    this.props.setActiveDate(newArr)
    this.setState({
      activeDate: newArr
    })
  }

  moveArrayRight() {
    let newArr = this.state.activeDate
    let temp = newArr[4]
    newArr.pop()
    newArr.unshift(temp)
    this.props.setActiveDate(newArr)
    this.setState({
      activeDate: newArr
    })
  }

  render () {
    const tai = Navigation.getCurrentlyVisibleScreenId().then( tes => {
      if(!this.state.activeDate[this.state.currentActiveDate].active && tes.screenId === 'screenInstanceID4') {
        if(this.state.activeDate.length == this.state.currentActiveDate - 1) {
          this.changeCalendarPosition(this.state.currentActiveDate+1)
        } else {
          this.changeCalendarPosition(0)
        }
      }
    })


    return (
      <View style={styles.headerContainer}>
        <View style={styles.calendarContainer}>
          {this.state.activeDate.map((data, index) =>
            (this.state.currentActiveDate === index) ? (
              <View key={index} style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: normalizeFont(11), color: '#000', fontFamily: fontPlatform(Platform.OS, 'Medium')}}>
                  {data.month}
                </Text>
                <Button style={{backgroundColor: '#4A207C', borderRadius: (DIMENSION_WIDTH * 0.0944 / 2), marginVertical: DIMENSION_HEIGHT * 0.0078, width: DIMENSION_WIDTH * 0.0944, height: DIMENSION_WIDTH * 0.0944, justifyContent: 'center', marginRight: 'auto', marginLeft: 'auto'}} onPress={() => this.changeCalendarPosition(index)}>
                  <Text style={{fontSize: normalizeFont(15), color: '#FFF', fontFamily: fontPlatform(Platform.OS, 'Regular')}}>{data.date}</Text>
                </Button>
                <Text style={{fontSize: normalizeFont(10), color: '#000', fontFamily: fontPlatform(Platform.OS, 'Bold')}}>
                  {data.day}
                </Text>
              </View>
            ) :
            (
              <View key={index} style={{alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: normalizeFont(11), color: 'transparent', fontFamily: fontPlatform(Platform.OS, 'Medium')}}>
                  {data.month}
                </Text>
                <Button transparent style={{width: DIMENSION_WIDTH * 0.0944, height: DIMENSION_WIDTH * 0.0944, marginVertical: DIMENSION_HEIGHT * 0.0078, justifyContent: 'center', marginRight: 'auto', marginLeft: 'auto'}} onPress={() => this.changeCalendarPosition(index)}>
                  <Text style={{fontSize: normalizeFont(15), color: '#373A3D', fontFamily: fontPlatform(Platform.OS, 'Medium')}}>{data.date}</Text>
                </Button>
                <Text style={{fontSize: normalizeFont(10), color: '#373A3D', fontFamily: fontPlatform(Platform.OS, 'Bold')}}>
                  {data.day}
                </Text>
              </View>
            )
          )}
        </View>
        <View style={styles.dividerLine}>
        </View>
        <View style={styles.istirahatTabContainer}>
          <View>
            <Button onPress={() => this.changeIstirahatTabs(0)} transparent={this.props.calendarPesan.currentActiveIstirahatTab == 0 ? false : true} style={this.props.calendarPesan.currentActiveIstirahatTab == 0 ? styles.istirahatTabActive : styles.istirahatTab}>
              <Text style={this.props.calendarPesan.currentActiveIstirahatTab == 0 ? styles.istirahatTabActiveText : styles.istirahatTabText}>
                Istirahat 1
              </Text>
            </Button>
          </View>
          <View>
            <Button onPress={() => this.changeIstirahatTabs(1)} transparent={this.props.calendarPesan.currentActiveIstirahatTab == 1 ? false : true} style={this.props.calendarPesan.currentActiveIstirahatTab == 1 ? styles.istirahatTabActive : styles.istirahatTab}>
              <Text style={this.props.calendarPesan.currentActiveIstirahatTab == 1 ? styles.istirahatTabActiveText : styles.istirahatTabText}>
                Istirahat 2
              </Text>
            </Button>
          </View>
          <View>
            <Button onPress={() => this.changeIstirahatTabs(2)} transparent={this.props.calendarPesan.currentActiveIstirahatTab == 2 ? false : true} style={this.props.calendarPesan.currentActiveIstirahatTab == 2 ? styles.istirahatTabActive : styles.istirahatTab}>
              <Text style={this.props.calendarPesan.currentActiveIstirahatTab == 2 ? styles.istirahatTabActiveText : styles.istirahatTabText}>
                Istirahat 3
              </Text>
            </Button>
          </View>
        </View>
        <View style={styles.dividerLine}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  istirahatTab: {
    borderRadius: 15.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: DIMENSION_WIDTH * 0.2583,
    height: DIMENSION_HEIGHT * 0.0484,
  },
  istirahatTabText: {
    color: '#373A3D',
    fontSize: normalizeFont(13),
    fontFamily: fontPlatform(Platform.OS, 'Regular'),
  },
  istirahatTabActive: {
    borderRadius: 15.5,
    backgroundColor: '#4A207C',
    width: DIMENSION_WIDTH * 0.2583,
    height: DIMENSION_HEIGHT * 0.0484,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2},
    shadowColor: '#C3B9CE',
    elevation: 4
  },
  istirahatTabActiveText: {
    color: '#FFFFFF',
    fontSize: normalizeFont(13),
    fontFamily: fontPlatform(Platform.OS, 'Regular'),
  },
  dividerLine: {
    marginTop: DIMENSION_HEIGHT * 0.0125,
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1
  },
  headerContainer: {
  },
  istirahatTabContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0156,
    marginBottom: DIMENSION_HEIGHT * 0.0046,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: DIMENSION_WIDTH * 0.0453,
    marginRight: DIMENSION_WIDTH * 0.0453
  },
  calendarContainer: {
    marginTop: DIMENSION_HEIGHT * 0.0265,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: DIMENSION_WIDTH * 0.8853,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});

const mapStateToProps = (state) => {
  return {
    calendarPesan: state.CalendarPesan,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentActiveDate: (newCurrentActiveDate) => dispatch(SetCurrentActiveDate(newCurrentActiveDate)),
    setCurrentActiveIstirahatTab: (newCurrentActiveIstirahatTab) => dispatch(SetCurrentActiveIstirahatTab(newCurrentActiveIstirahatTab)),
    setActiveDate: (newActiveDate) => dispatch(SetActiveDate(newActiveDate)),
    setTanggalPenetapanMenu: (activeTanggalPenetapanMenu) => dispatch(SetTanggalPenetapanMenu(activeTanggalPenetapanMenu)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeaderPesan);
