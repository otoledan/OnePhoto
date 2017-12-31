import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Platform, Dimensions, StyleSheet, TouchableOpacity, Image, View, Text, Vibration } from 'react-native';
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

  constructor(props){
    super(props)
    this.state = {
      flash: false,
      flashConstant: 'Camera.constants.FlashMode.off',
      frontFacing: false,
      frontFacingConstant: 'back'
    }
    self = this;

    this.swapCameras = this.swapCameras.bind(this);
    this.takePicture = this.takePicture.bind(this);

  }

  flash() {
    if (this.state.flash) {
      this.setState({
        frontFacingConstant: 'Camera.constants.FlashMode.off',
        frontFacing: false
      })
    }

    else {
      this.setState({
        frontFacingConstant: 'Camera.constants.FlashMode.on',
        frontFacing: true
      })
    }
  }

  swapCameras() {
    if (this.state.frontFacing) {
      this.setState({
        frontFacingConstant: 'back',
        frontFacing: false
      })
    }

    else {
      this.setState({
        frontFacingConstant: 'front',
        frontFacing: true
      })
    }
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
          type={this.state.frontFacingConstant}
          fixOrientation={false}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end', padding: 5, marginHorizontal: 5}}>
                <TouchableOpacity onPress={this.swapCameras}>
                  <Image style={styles.swap}  source={require('../src/swap_cameras.png')}/>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity onPress={this.takePicture}>
                <Image style={styles.capture}  source={require('../src/camera.png')}/>
              </TouchableOpacity>
            </View>
            </View>

            
          </View>
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
},
capture: {
  flex: 0,
  zIndex: 1,
  height: 50,
  width: 50,
  backgroundColor: 'transparent',
  tintColor: '#fff',
  borderRadius: 5,
  padding: 10,
  margin: 10
},
flash: {
  zIndex: 1,
  flex: 0,
  height: 30,
  width: 30,
  backgroundColor: 'transparent',
  tintColor: '#fff',
  margin: 5
},
swap: {
  zIndex: 1,
  flex: 0,
  height: 45,
  width: 45,
  backgroundColor: 'transparent',
  tintColor: '#fff',
  paddingBottom: 5,
  paddingHorizontal: 5
}
});

export default CameraScreen;