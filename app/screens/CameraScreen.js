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
          justifyContent: 'center',
          backgroundColor: '#fff'
      }}>
          <Image
              style={{height: 40, width: 130}} source={require('../src/1Photo_Words.png')}
          />
      </View>
  </View>
);

class CameraScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: (props) => <ImageHeader {...props} />,
  });
  
  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Camera Screen</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Details')}
          title="Go to details"
        />
      </View>
    )}
}

export default CameraScreen;