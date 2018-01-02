import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, Platform, Dimensions, Switch, Button} from 'react-native';

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={{paddingTop: Platform.OS === 'ios' ? (Dimensions.get('screen').height == 812 ? 35 : 28) : 10}}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}> Settings </Text>
        <ScrollView style={{paddingHorizontal: 15}}>
          <View style={{flexDirection:'row', alignItems: 'center' ,justifyContent:'space-between'}}>
            <Text>Notifications </Text>
            <Switch></Switch>
          </View>
          <View style={{flexDirection:'row', alignItems: 'center' ,justifyContent:'space-between', paddingLeft: 15, backgroundColor:'white', opacity: 0.5}}>  
            <Text>8:00 am</Text>
            <Button title='Change Time'/>
          </View>
          <View style={{flexDirection:'row', alignItems: 'center' ,justifyContent:'space-between'}}>  
            <Text>OverWrite Photos</Text>
            <Switch></Switch>
          </View>
          
        </ScrollView>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;