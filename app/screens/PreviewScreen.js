import React, { Component } from 'react';
import { CameraRoll, Dimensions, StyleSheet, TouchableOpacity, Image, View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Camera from 'react-native-camera';


class PreviewScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
          photos: null
        }
      }

    _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 1,
            assetType: 'All',
          })
          .then(r => {
            this.setState({ photos: r.edges });
          })
          .catch((err) => {
             //Error Loading Images
          });
        };
  
  render() {
    let picture;
    try {
        picture = this.props.navigation.state.params.picture;
    } catch (err) {}
    return (
        <View >
            <Image 
                    style={{height: 300, width:300,  margin: 40 }}
                    source={{uri: picture}}
                    />
            <View style={{flexDirection: 'row', flex: 1}}>
                <Image 
                    style={{height: 100, width:100, tintColor: 'black',  margin: 40 }}
                    source={require('../src/redo.png')}
                    />
                <Image 
                    style={{height: 94, width:94, tintColor: 'black',  margin: 40 }}
                    source={require('../src/check.png')}
                />
                </View>
        </View>
    )}
}

export default PreviewScreen;