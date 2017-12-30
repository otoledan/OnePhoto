import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image, View, Text, Button, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import MapView from 'react-native-maps';
import Realm from 'realm';


import {PhotoSchema, AlbumSchema, DogSchema, UserPrefSchema} from '../config/data'

console.disableYellowBox = true;

let realm = new Realm({
  schema: [PhotoSchema, AlbumSchema, DogSchema, UserPrefSchema]
})


const ImageHeader = props => (
  <View>
      <View style={{
          paddingTop: Platform.OS === 'ios' ? 28 : 10,
          paddingHorizontal: 15,
          paddingBottom: 4,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#fff'
      }}>
          <TouchableOpacity style={{zIndex: 3}}>
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

class MapScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
          realm: null,
          showImage: false,
          image: null,
          day: null
        }
    }
    
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: (props) => <ImageHeader {...props} />,
  });

  componentWillMount() {
    this.setState({
      realm,
    });
  }

    closePhoto() {
        this.setState({
            showImage: false,
            image: null,
            day: null
        })
    }

    openPhoto(marker) {
        this.setState({
            showImage: true,
            day: marker.date,
            image: marker.picture,
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
    
  render() {
      return (
                <View style={styles.container}>
                {this.state.showImage && <TouchableWithoutFeedback onPress={() => this.closePhoto()}>
                    <View style={{position: 'absolute', top: 0, bottom : 0, left: 0, right: 0, zIndex: 1, flex:1, justifyContent: 'center', alignItems: 'center',}}>
                        <View style={{opacity: 0.8, backgroundColor: 'black', height:Dimensions.get('window').height, width:Dimensions.get('window').width, position:'absolute', top:0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',}}>
                        </View>
                        <TouchableWithoutFeedback style={{zIndex:2}}>
                            <View>
                                <Text style={{fontSize: 35, fontWeight: 'bold', padding: 15, backgroundColor: 'transparent', color: 'white'}}> {this.convertDate(this.state.day)} </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={{zIndex: 2}}>
                            <Image style={{borderRadius:10 ,opacity: 1.0, height: Dimensions.get('screen').width-50, width: Dimensions.get('screen').width-50}} source={{uri: this.state.image}}/>
                        </TouchableWithoutFeedback>
                    </View> 
                </TouchableWithoutFeedback>
                }
                <MapView style={styles.map}
                    ref='map'
                    initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                    }}
                >
                {this.state.realm.objects('Photo').map(marker => (
                    <MapView.Marker
                    onPress={this.openPhoto.bind(this, marker)}
                        key={marker.date}
                        coordinate={
                            new MapView.AnimatedRegion({
                            latitude:  marker.location[0],
                            longitude: marker.location[1]
                        })}
                    />
                  ))}
                </MapView>
            </View>
      )
    }
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });
  

export default MapScreen;