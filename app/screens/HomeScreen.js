import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Button, Image } from 'react-native';
import { Header, StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import DatePicker from 'react-native-datepicker'

var self = null;

var ImageHeader = props => (
  <View>
      <View style={{
          paddingTop: 22,
          paddingHorizontal: 15,
          paddingBottom: 4,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#fff'
      }}>
          <TouchableOpacity onPress={() => self.refs.a.onPressDate()} style={{zIndex: 3}}>
              <Image style={{height: 30, width: 30}} source={require('../src/calendar-alt.png')}  />
          </TouchableOpacity>
          <Image
              style={{height: 40, width: 130}} source={require('../src/1Photo_Words.png')}
          />
          <TouchableOpacity >
              <Image style={{height: 30, width: 30}} source={require('../src/images.png')}  />
          </TouchableOpacity>
      </View>
  </View>
);

class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {date:"2016-05-15"}
    self = this;
  }

  DayPicker() {
    DatePicker.onPressDate();
  }
  
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: (props) => <ImageHeader {...props} />,
  });
  
  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <DatePicker style={{position: 'absolute', top: -100}}
          ref='a'
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2000-01-01"
          maxDate="2020-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
      />
        <Text>{this.state.date}</Text>
      </View>
    )}
}

export default HomeScreen;