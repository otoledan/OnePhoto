import React, { Component } from 'react';
import { Alert, StatusBar, TouchableOpacity, View, Text, Image, FlatList, Dimensions, Platform } from 'react-native';
import { Header, StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Share, {ShareSheet, Button} from 'react-native-share';
import Realm from 'realm';

import {PhotoSchema, AlbumSchema, DogSchema, UserPrefSchema} from '../config/data'


let realm = new Realm({
  schema: [PhotoSchema, AlbumSchema, DogSchema, UserPrefSchema]
})



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
      realm: null
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

  removeDogs() {
    let dogs = realm.objects('Dog');
    let rexDogs = dogs.filtered('name = "Rex"');
    realm.write(() => {
      realm.delete(rexDogs);
    });

    this.setState({
      realm,
    })
  }

  componentWillMount() {
    realm.write(() => {    
    realm.delete(realm.objects('Photo'));

      realm.create('Photo', {
        date:     '2017-05-12',
        picture:  'https://image.freepik.com/free-photo/outdoors-green-freshness-deciduous-foliage-nature_1417-468.jpg',
        star:     false,
        albums:   [],
        location: [37.78820, -122.4320],
      });
      realm.create('Photo', {
        date:     '2017-05-11',
        picture:  'https://www.istockphoto.com/resources/images/PhotoFTLP/img_82250973.jpg',
        star:     false,
        albums:   [],
        location: [37.78825, -122.4325],
      });
      realm.create('Photo', {
        date:     '2017-05-10',
        picture:  'https://wtop.com/wp-content/uploads/2017/08/ThinkstockPhotos-470112710.jpg',
        star:     false,
        albums:   [],
        location: [37.78830, -122.433],
      });
      
      this.setState({
        realm,
      });
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
      return <Image style={{width: 31, height: 31, padding: 10}} source={require('../src/star.png')} />
    }

    else {
      return <Image style={{width: 31, height: 31, padding: 10}} source={require('../src/star_empty.png')} />
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
      return <Image style={{width: 30, height: 30, padding: 10}} source={require('../src/share-iphone.png')} />
    }

    else {
      return <Image style={{width: 30, height: 30, padding: 10}} source={require('../src/share-android.png')} />
    }
  }
  
  
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: (props) => <ImageHeader {...props} />,
  });
  
  render() {
    const info = this.state.realm
      ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Dog').length
      : 'Loading...';


    return (
        <View style={{ flex: 1, alignItems: 'center'}}>
         <StatusBar
          translucent={true}
        />
        <Text>{info}</Text>
        <TouchableOpacity onPress={this.removeDogs.bind(this)}>
          <Text> Remove </Text>
        </TouchableOpacity>
        <FlatList
          keyExtractor={item => item.date}
          numColumns={1}
          data={this.state.realm.objects('Photo')}
          renderItem={({item}) =>
          <View>
            <Text style={{color: 'black', backgroundColor:'transparent', fontSize: 25}} > {this.convertDate(item.date)} </Text> 
            <Image style={{width: width, height: width}} source={{uri: item.picture}} />
            <View style={{height: 40, flexDirection: 'row', paddingTop: 5, paddingHorizontal: 5, paddingBottom: 5}}>
            <TouchableOpacity onPress={() => this.starToggle(item.date)}>  
              {this.isStar(item.star)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.sharePhoto(item.picture)}>
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