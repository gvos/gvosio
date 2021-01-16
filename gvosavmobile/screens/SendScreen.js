import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  Button,
  Alert,
  TextInput,
  Image
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import md5 from 'md5';

/*
*   userInfo is a variable which is mentioned in the SignInScreen.js and stores the basic information
*   of the user that has logged in.
*/
import {userInfo} from './SignInScreen.js';
import Users from '../model/users';
import '../global.js';

//  source is the location of the selected images, that needs to be sent.
const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";
const localIPaddress;

const SendScreen = () => {

  return();

};

export default SendScreen;

const styles = StyleSheet.create({
   container: {
      paddingTop: 23,
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   sendButton: {
      backgroundColor: '#7a42f4',
      borderRadius: 10,
      padding: 10,
      margin: 30,
      height: 40,
      width: 80,
      alignItems: 'center',
   },
   sendButtonText:{
      color: 'white'
   },
   MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   TextInputStyle:{
      textAlign: 'center',
      height: 60,
      width: '93%',
      color: 'white',
      fontSize: 20
   },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '60%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }   
});
