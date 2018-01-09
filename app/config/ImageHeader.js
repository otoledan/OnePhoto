import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, Platform, Dimensions, Switch, Button, TouchableOpacity, Image} from 'react-native';

class ImageHeader extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={{
      paddingTop: Platform.OS === 'ios' ? (Dimensions.get('screen').height == 812 ? 35 : 28) : 10,
      paddingHorizontal: 15,
      paddingBottom: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#fff'
  }}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>
        <Image style={{height: 38, width: 38}} source={require('../src/settings.png')}  />
      </TouchableOpacity>
      <Image
          style={{height: 40, width: 130}} source={require('../src/1Photo_Words.png')}
      />
      <TouchableOpacity >
          <Image style={{height: 38, width: 38}} source={require('../src/images.png')}  />
      </TouchableOpacity>
  </View>
    );
  }
}

ImageHeader.propTypes = {
  navigation: PropTypes.object
};

export default ImageHeader;