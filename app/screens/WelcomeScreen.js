import React, { Component, PropTypes } from "react";
import {
  AsyncStorage,
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  Button
} from "react-native";
import DatePicker from 'react-native-datepicker'
import Reactotron from 'reactotron-react-native'

Reactotron
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalVisible1: false,
      yes: true,
      no: false,
      time: '8:00 am'
    };
  }

  componentDidMount() {
    AsyncStorage.getItem(this.props.pagekey, (err, result) => {
      if (err) {
      } else {
        if (result == null) {
            this.enableIntro();
          console.log("null value recieved", result);
          AsyncStorage.setItem(this.props.pagekey, JSON.stringify({"value":"true"}), (err,result) => {
            console.log("error",err,"result",result);
            });
        } else {
        }
      }
    });
    
    }

    enableIntro() {
        this.setState({
            modalVisible: true,
            modalVisible1: false
        })
    }

  setDisable(isYes) {
        if (isYes) {
            this.setState({
                yes: true,
                no: false,
            })
        }

        else {
            this.setState({
                yes: false,
                no: true,
            })
        }
}

  setModalVisible() {
    this.setState({
        modalVisible: false,
        modalVisible1: true });
  }

  setModalVisible1() {
    this.setState({
        modalVisible: false,
        modalVisible1: false });
  }
  
  render() {
    return (
      <View>
        <Modal
        style={{zIndex: 2}}
          animationType={"slide"}
          transparent={true}
          style={styles.ftreContainer}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <Image style={{position: 'absolute', height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, top: 0, left: 0, right: 0, bottom: 0}} source={require('../src/background.jpg')}/>

          <View style={[styles.linearGradient, {flex: 3, justifyContent: 'center', alignItems: 'center'}]}>
            <View style={styles.linearGradient}>
                <Image style={{height: 68, width: 228, margin: 30}}source={require('../src/1Photo.png')}/>
            </View>

            <View style={[styles.linearGradient, {flex: 1}]}>
                <Text style={{color: 'white', fontSize: 30, fontWeight: '200', fontStyle: 'oblique'}}> "Remember Every Day" </Text>
            </View>

            
            
            <View style={[styles.linearGradient, {flex: 1}]}>

              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible();
                }}
              >
                 <Text style={{fontSize: 30, color: 'white'}}> Lets Get Started </Text>

              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
            style={{zIndex: 5}}
          animationType={"slide"}
          transparent={true}
          style={styles.ftreContainer}
          visible={this.state.modalVisible1}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
         <Image style={{position: 'absolute', height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, top: 0, left: 0, right: 0, bottom: 0}} source={require('../src/background.jpg')}/>

          <View style={[styles.linearGradient, {flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
            <View style={styles.linearGradient}>
                <Image style={{height: 45, width: 152}}source={require('../src/1Photo.png')}/>
            </View>

            <View style={[styles.linearGradient, {flex: 4, justifyContent: 'space-between'}]}>
                <Text style={{color: 'white', fontSize: 30, fontWeight: '200', textAlign: 'center'}}>What time would you like to take your daily photo?</Text>
                <DatePicker
                ref='date'
        style={{width: 0, height: 0, position:'absolute', top: -1000}}
        date={this.state.time}
        mode="time"
        placeholder="select time"
        format={'h:mm a'}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        hideText={true}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(time) => {this.setState({time: time})}}
      />
                <Button title={this.state.time} onPress={() => this.refs.date.onPressDate()} />
                <Text style={{color: 'white', fontSize: 30, fontWeight: '200', textAlign: 'center'}}>Would you like to keep discarded daily photos in your {Platform.OS === 'ios' ? 'camera roll' : 'gallery'}?</Text>
                
                <View style={{flexDirection: 'row'}}>
                    <Button title='Yes' onPress={() => this.setDisable(true)} color={this.state.yes ? '#1993FB' : 'grey'}/>
                    <Button title='No' onPress={() => this.setDisable(false)} color={this.state.no ? '#1993FB' : 'grey'}/>
                </View>

                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize: 20, width: Dimensions.get('screen').width - 100, textAlign: 'center', color: 'white', fontWeight: '200'}}>Change settings by tapping on the gear icon</Text>
                    <Image style={{height: 45, width: 45, tintColor: '#1993FB'}}source={require('../src/settings.png')}/>
                </View>

                
            </View>

            
            
            <View style={[styles.linearGradient, {flex: 1}]}>
              <TouchableOpacity style={{backgroundColor: 'transparent'}}
                onPress={() => {
                  this.setModalVisible1();
                }}
              >
                <Text style={{fontSize: 30, color: 'white'}}>I'm Ready!</Text>
              </TouchableOpacity>
          </View>
          </View>
        </Modal>

        

      </View>
    );
  }
}

const styles = StyleSheet.create({
    linearGradient: {
        paddingTop: Platform.OS === 'ios' ? (Dimensions.get('screen').height == 812 ? 35 : 28) : 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ftreContainer:{
            backgroundColor:'black',
            marginTop:70,
            marginBottom:40,
            marginLeft:20,
            marginRight:20,
            borderRadius:20,
            borderWidth:4,
            borderColor:'red'
        },
        ftreTitle:{
            color:'white',
            fontWeight:'bold',
            fontSize:20,
            textAlign:'center',
            margin:10,	
        },
        ftreDescription:{
            color:'white',
            fontSize:15,
            marginRight:20,
            marginLeft:20
        },
        ftreCloseIcon:{
            alignSelf:'flex-end',
            flex:0.5,
            marginRight:10
        },
        ftreTitleContainer:{
            flex:1,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center'
        },
        ftreDescriptionContainer:{
            flex:6.5
        },
        ftreExitContainer:{
            flex:2,
            justifyContent:'flex-start',
            alignItems:'center',
        },
        ftreExitButtonContainer:{
            width:200,
            height:40,
            backgroundColor:'red',
            borderRadius:10,
            justifyContent:'center',
        },
        ftreExitButtonText:{
            color:'white',
            fontSize:20,
            fontWeight:'bold',
            textAlign:'center'
        }
    });