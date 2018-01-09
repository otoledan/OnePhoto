import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image, FlatList, Dimensions, Platform, StyleSheet } from 'react-native';
import Share from 'react-native-share';
import Realm from 'realm';
import { NavigationAction } from 'react-navigation'
import {PhotoSchema, AlbumSchema, UserPrefSchema} from '../config/data'
import WelcomeScreen from './WelcomeScreen';
var RNFS = require('react-native-fs');


let realm = new Realm({
  schema: [PhotoSchema, AlbumSchema, UserPrefSchema]
})


var self = null;
var {width} = Dimensions.get('window');

class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      realm: null,
      latitude: null,
      longitude: null,
      error: null
    }
    self = this;
  }

  starToggle(day) {
    let photos = realm.objects('Photo');
    let singlePhoto = photos.filtered('date = $0', day);
    realm.write(() => {
      singlePhoto[0].star = !singlePhoto[0].star;
    });

    this.setState({
      realm
    })
  }

  componentWillMount() {      
      this.setState({
        realm,
      });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 300000 },
    );
  }

  convertDate(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();

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
      return <Image style={styles.star} source={require('../src/star.png')} />
    }

    else {
      return <Image style={styles.star} source={require('../src/star_empty.png')} />
    }
  }

  sharePhoto(url, date) {
    RNFS.readFile(url, 'base64')
      .then((success) => {
      console.log('FILE Read!');

      console.log(success);
      
      Share.open({
        title: "Check out this photo!",
        message: date,
        url:  "data:image/png;base64,".concat(success),
        subject: "Share Link" //  for email
      });
      
    })
      .catch((err) => {
      console.log(err.message);
    });

    
  }

  renderShareButton() {
    if (Platform.OS == 'ios') {
      return <Image style={styles.shareButton} source={require('../src/share-iphone.png')} />
    }

    else {
      return <Image style={styles.shareButton} source={require('../src/share-android.png')} />
    }
  }
  
  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center'}}>
        <WelcomeScreen pagekey={"uniquekey"} title={"categort title"} description={"topic description"}/>
        <FlatList
          keyExtractor={item => item.date}
          numColumns={1}
          data={this.state.realm.objects('Photo').sorted('date', true)}
          renderItem={({item}) =>
          <View>
            <Text style={styles.date}> {this.convertDate(item.date)} </Text> 
            <Image style={{width: width, height: width}} source={{uri: item.picture}} />
            <View style={styles.bottomPane}>
            <TouchableOpacity onPress={() => this.starToggle(item.date)}>  
              {this.isStar(item.star)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.sharePhoto(item.picture, this.convertDate(item.date))}>
              {this.renderShareButton()}
            </TouchableOpacity>
            </View>
          </View>
          }
        />
      </View>
    )}
}

const styles = StyleSheet.create({
  shareButton: {
    width: 30, 
    height: 30, 
    padding: 10
  },
  star: {
    width: 31, 
    height: 31, 
    padding: 10
  },
  date: {
    color: 'black', 
    backgroundColor:'transparent', 
    fontSize: 25
  },
  bottomPane: {
    height: 40, 
    flexDirection: 'row', 
    paddingTop: 5, 
    paddingHorizontal: 5, 
    paddingBottom: 5
  }
})

export default HomeScreen;