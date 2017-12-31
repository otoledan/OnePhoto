import React, { Component } from 'react';
import { CameraRoll, Dimensions, StyleSheet, TouchableOpacity, Image, View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Camera from 'react-native-camera';
import Realm from 'realm';
import {PhotoSchema, AlbumSchema, UserPrefSchema} from '../config/data'


var RNFS = require('react-native-fs');

let realm = new Realm({
    schema: [PhotoSchema, AlbumSchema, UserPrefSchema]
  })

class PreviewScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
          photos: null,
          realm: null,
        }
      }

    retakePhoto() {        
        let path;
        try {
            path = this.props.navigation.state.params.picture;
        } catch (err) {}

        return RNFS.unlink(path)
        .then(() => {
        console.log('FILE DELETED');
        this.props.navigation.navigate('Camera');
        })
        // `unlink` will throw an error, if the item to unlink does not exist
        .catch((err) => {
        console.log(err.message);
        });
        
    }

    keepPhoto() {
        var current = new Date();
        var currentDay = new Date()

        
        currentDay.setHours(0,0,0,0);

        let photos = realm.objects('Photo');
        let singlePhoto = photos.filtered('date = $0', currentDay);
        alert(singlePhoto)

        let path;
        try {
            path = this.props.navigation.state.params.picture;
        } catch (err) {}

        if (typeof singlePhoto[0] === "undefined") {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    realm.write(() => {
                        realm.create('Photo', {
                            date:       currentDay,
                            picture:    path,
                            star:       false,
                            albums:     [AlbumSchema],
                            location:   [parseFloat(position.coords.latitude),parseFloat(position.coords.longitude)]
                        })
                    });
    
                    this.setState({
                        realm
                    });
                    
                    this.props.navigation.goBack();
                },
                (error) => console.log(error),
                { enableHighAccuracy: false, timeout: 20000, maximumAge: 300000 },
            )
        }

        else {
            let oldpath = singlePhoto[0].picture;

            RNFS.unlink(oldpath)
            .then(() => {
            console.log('FILE DELETED');
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .then(() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        realm.write(() => {
                            singlePhoto[0].picture = path;
                            singlePhoto[0].location = [parseFloat(position.coords.latitude),parseFloat(position.coords.longitude)];
                        });
        
                        this.setState({
                            realm
                        });
                        
                        this.props.navigation.goBack();
                    },
                    (error) => console.log(error),
                    { enableHighAccuracy: false, timeout: 20000, maximumAge: 300000 },
                )
            }) 
            .catch((err) => {
                console.log(err.message);
            }); 
        }
    }
        
  
  render() {
    let picture;
    try {
        picture = this.props.navigation.state.params.picture;
    } catch (err) {}
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image 
                    style={{borderRadius: 10, height: 300, width: 300}}
                    source={{uri: picture}}
                    />
            <View style={{flexDirection: 'row', padding: 20}}>
            <TouchableOpacity onPress={this.retakePhoto.bind(this)}>
                <Image 
                    style={{height: 100, width:100, tintColor: 'black', margin: 30}}
                    source={require('../src/redo.png')}
                    />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.keepPhoto.bind(this)}>
                <Image 
                    style={{height: 94, width:94, tintColor: 'black', margin: 30}}
                    source={require('../src/check.png')}
                />
            </TouchableOpacity>
                </View>
        </View>
    )}
}

export default PreviewScreen;