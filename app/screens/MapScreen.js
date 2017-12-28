import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14

const ImageHeader = props => (
  <View>
      <View style={{
          paddingTop: 28,
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
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: (props) => <ImageHeader {...props} />,
  });
    
  render() {
      return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Map Screen</Text>
            </View>
      )
    }
}

export default MapScreen;