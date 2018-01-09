import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation'; // 1.0.0-beta.14

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import CameraScreen from '../screens/CameraScreen';
import PreviewScreen from '../screens/PreviewScreen';
import SideMenu from './SideMenu';
import ImageHeader from './ImageHeader';


const Tabs = TabNavigator({
	Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor, focused }) => (
                <Image 
                    style={[styles.icon, {tintColor: tintColor}]}
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
                    style={[styles.icon, {tintColor: tintColor}]}
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
                    style={[styles.icon, {tintColor: tintColor}]}
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
        header: (props) => <ImageHeader {...props} />,
    }
  });  

  const DrawerNav = DrawerNavigator({
    Root: {
        screen: Root
    },
}, {
    contentComponent: SideMenu,
    drawerWidth: 300,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  });

const styles = StyleSheet.create({
    icon: {
            height: 22, 
            width: 22, 
    }
  });

export default DrawerNav;