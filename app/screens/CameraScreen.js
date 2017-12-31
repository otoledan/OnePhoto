import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Platform, Dimensions, StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native';
import Camera from 'react-native-camera';

const ImageHeader = props => (
  <View>
      <View style={{
          paddingTop: Platform.OS === 'ios' ? (Dimensions.get('screen').height == 812 ? 35 : 28) : 10,
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
    const options = {
      aspect: 'fit',
      playSoundOnCapture: false,
    };

    this.camera.aspect = 'fit';
    this.camera.playSoundOnCapture = 'false'
    //options.location = ...
    
    this.camera.capture({metadata: options})
      .then((data) => this.props.navigation.navigate('Preview', {picture: data.path}))
      .catch(err => console.error(err))

  }
  
  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Camera style={{height: 100}}
          playSoundOnCapture={false}
          ref={(cam) => {
            this.camera = cam;
          }}
	        onBarCodeRead={this.onBarCodeRead.bind(this)}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <TouchableOpacity onPress={this.takePicture.bind(this)}>
            <Image style={styles.capture}  source={require('../src/camera.png')}/>
          </TouchableOpacity>
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
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: Dimensions.get('screen').width - 50,
  height: Dimensions.get('screen').width - 50,
  borderRadius: 20
},
capture: {
  zIndex: 1,
  flex: 0,
  height: 50,
  width: 50,
  backgroundColor: 'transparent',
  tintColor: '#fff',
  borderRadius: 5,
  color: '#000',
  padding: 10,
  margin: 10
}
});

export default CameraScreen;