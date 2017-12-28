import React, { Component } from 'react';
import { Alert, StatusBar, TouchableOpacity, View, Text, Image, FlatList, Dimensions, Platform } from 'react-native';
import { Header, StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import DatePicker from 'react-native-datepicker'
import Share, {ShareSheet, Button} from 'react-native-share';

import {photos} from '../config/data'

var self = null;
var {width} = Dimensions.get('window');

var ImageHeader = props => (
  <View>
      <View style={{
          paddingTop: 28,
          paddingHorizontal: 15,
          paddingBottom: 4,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#fff'
      }}>
          <TouchableOpacity onPress={() => console.log('ok')}>
            <Image style={{height: 38, width: 38}} source={require('../src/settings.png')}  />
          </TouchableOpacity>
          <Image
              style={{height: 40, width: 130}} source={require('../src/1Photo_Words.png')}
          />
          <TouchableOpacity >
              <Image style={{height: 38, width: 38}} source={require('../src/images.png')}  />
          </TouchableOpacity>
      </View>
  </View>
);

class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      date: '2016-05-15',
      data: null,
      size: 3
    }
    self = this;
  }

  componentWillMount() {
    this.setState({
      data : photos
    })
  }

  convertDate(date) {
    var month = date.substring(5,7);
    var day = date.substring(8,10);
    var year = date.substring(0,4);

    month = Number.parseInt(month);

    switch(month) {
      case 1: 
        month = 'January'
        break;
      case 2: 
        month = 'Febuary'
        break;
      case 3: 
        month = 'March'
        break;
      case 4: 
        month = 'April'
        break;
      case 5: 
        month = 'May'
        break;
      case 6: 
        month = 'June'
        break;
      case 7: 
        month = 'July'
        break;
      case 8: 
        month = 'August'
        break;
      case 9: 
        month = 'September'
        break;
      case 10: 
        month = 'October'
        break;
      case 11: 
        month = 'November'
        break;
      case 12: 
        month = 'December'
        break;
    }

    return month + ' ' + day + ', ' + year;
  }

  isStar(star) {
    if (star) {
      return <Image style={{width: 30, height: 30}} source={require('../src/star.png')} />
    }

    else {
      return <Image style={{width: 30, height: 30}} source={require('../src/star_empty.png')} />
    }
  }

  sharePhoto(url) {
    Share.open({
      title: "React Native",
      message: "Hola mundo",
      url: url,
      subject: "Share Link" //  for email
    });
  }

  renderShareButton() {
    if (Platform.OS == 'ios') {
      return <Image style={{width: 30, height: 30}} source={require('../src/share-iphone.png')} />
    }

    else {
      return <Image style={{width: 30, height: 30}} source={require('../src/share-android.png')} />
    }
  }
  
  
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: (props) => <ImageHeader {...props} />,
  });
  
  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center'}}>
         <StatusBar
          translucent={true}
        />
        <FlatList
          keyExtractor={item => item.Date1}
          numColumns={1}
          data={this.state.data}
          renderItem={({item}) =>
          <View>
            <Text style={{color: 'black', backgroundColor:'transparent', fontSize: 25}} > {this.convertDate(item.Date1)} </Text> 
            <Image style={{width: width, height: width}} source={{uri: item.Picture}} />
            <View style={{height: 40, flexDirection: 'row', paddingTop: 5, paddingHorizontal: 5, paddingBottom: 5}}>
            <TouchableOpacity onPress={() => this.sharePhoto(item.Picture)}>  
              {this.isStar(item.Star)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.sharePhoto(item.Picture)}>
              {this.renderShareButton()}
            </TouchableOpacity>
            </View>
          </View>
          }
        />
      </View>
    )}
}

export default HomeScreen;