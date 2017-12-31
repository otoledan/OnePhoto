import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'; // 1.0.0-beta.14

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import CameraScreen from '../screens/CameraScreen';
import PreviewScreen from '../screens/PreviewScreen';

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
        swipeEnabled: false,
        lazy: false,
        tabBarOptions: {
        inactiveTintColor: 'grey',
        activeTintColor: 'blue',
        showIcon: true,
        style: {
            backgroundColor: 'white'
        },
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
    Preview: {
        screen: PreviewScreen,
        navigationOptions: {
            header: null,
        }
    }
},{
    navigationOptions: {
    }
  });  

export default Root;