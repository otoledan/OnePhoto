import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Camera from 'react-native-camera';


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

  onBarCodeRead(e) {
    console.log(
        "Barcode Found!",
        "Type: " + e.type + "\nData: " + e.data
    );
  }
  
  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
  
  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
	        onBarCodeRead={this.onBarCodeRead.bind(this)}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    )}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  flexDirection: 'row',
},
preview: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: 300,
  height: 300
},
capture: {
  flex: 0,
  backgroundColor: '#fff',
  borderRadius: 5,
  color: '#000',
  padding: 10,
  margin: 40
}
});

export default CameraScreen;