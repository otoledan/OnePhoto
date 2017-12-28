import React, { Component } from 'react';
import { DatePickerIOS ,TouchableOpacity, TouchableHighlight, StyleSheet, View, Text, Button, Image } from 'react-native';
import { Header, StackNavigator, TabNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import CameraScreen from '../screens/CameraScreen';

const ImageHeader = props => (
    <View>
        <View style={{
            paddingTop: 22,
            paddingHorizontal: 15,
            paddingBottom: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#fff'
        }}>
            <TouchableOpacity style={{zIndex: 3}}>
                <Image style={{height: 30, width: 30}} source={require('../src/calendar-alt.png')}  />
            </TouchableOpacity>
            <Image
                style={{height: 40, width: 130}} source={require('../src/1Photo_Words.png')}
            />
            <TouchableOpacity >
                <Image style={{height: 35, width: 30}} source={require('../src/images.png')}  />
            </TouchableOpacity>
        </View>
    </View>
);

const Tabs = TabNavigator({
	Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor, focused }) => (
                <Image 
                    style={{height: 22, width: 22, tintColor: tintColor}}
                    source={require('../src/home.png')}
                />
            ),
        }
    )},
    Camera: {
        screen: CameraScreen,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor, focused }) => (
                <Image 
                    style={{height: 27, width:27, tintColor: tintColor }}
                    source={require('../src/camera.png')}
                />
            )
        }
    )},
    Map: {
        screen: MapScreen,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor, focused }) => (
                <Image 
                    style={{height: 22, width: 22, tintColor: tintColor}}
                    source={require('../src/map.png')}
                />
            )
        }
    )}
}, {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
        tabBarOptions: {
        inactiveTintColor: 'grey',
        tabBarOptions: {
            labelStyle: {
              fontSize: 12,
            },
            tabStyle: {
              width: 100,    
            },
            style: {
              backgroundColor: 'blue',
            },
          }   
    } 
});

const Root = StackNavigator({
    Tabs: {
        screen: Tabs,
    }, 
},{
    navigationOptions: {
    }
  });  

export default Root;