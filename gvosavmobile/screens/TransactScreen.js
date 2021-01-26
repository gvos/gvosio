import React, { Component, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  Button,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import md5 from 'md5';

import {userInfo} from './SignInScreen.js';
import '../global.js';

const localIPaddress;

const TransactScreen = ({navigation}) => {

  const [dialog, showDialog] = React.useState({

    registerMe : false,
    addAsset : false,
    findOwner : false,
    getBalance : false,
    sendAssetHash : false,
    sendAssetAddress : false,
    receiveAsset : false,

  });

  const [info, setInfo] = React.useState({

    addAssetHash : '',
    findAssetHash : '',
    sendAssetHash : '',
    sendTo : '',

  });  

  const register = () => {
    fetch(`http://${localIPaddress}:3001/contracts/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        person: userInfo.address
      })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log("Register Response : ", JSON.stringify(json, null, 2));
      showAlert(json.event.args[0], json.event.args[2]);
    })
    .catch(error => {
      console.log(error)
    })
  }

  const addAsset = (assetHash) => {
    fetch(`http://${localIPaddress}:3001/contracts/addAsset`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        person: userInfo.address,
        hash: assetHash
      })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log("Add Asset Response : ", JSON.stringify(json, null, 2));
      showAlert(json.event.args[3], json.event.args[1]);
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  const findOwner = () => {
    fetch(`http://${localIPaddress}:3001/contracts/findOwner`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        person: userInfo.address,
        hash: info.findAssetHash
      })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log("Find Owner Response : ", JSON.stringify(json, null, 2));
      showAlert("The owner of this asset is ", json.event.args[0]);
    })
    .catch(error => {
      console.log(error)
    })
  }

  const sendAsset = () => {
    fetch(`http://${localIPaddress}:3001/contracts/sendAsset`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        person: userInfo.address,
        to: info.sendTo,
        hash: info.sendAssetHash
      })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log("Send Asset Response : ", JSON.stringify(json, null, 2));
      showAlert("You have sent the asset to ", json.event.args[1]);
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  const viewBalance = () => {
    fetch(`http://${localIPaddress}:3001/contracts/viewBalance`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        person: userInfo.address
      })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log("View Balance Response : ", JSON.stringify(json, null, 2));
      showAlert("Your balance is ", json.event.args[1]);
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  const receiveAsset = () => {
    fetch(`http://${localIPaddress}:3001/contracts/receiveAsset`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        person: userInfo.address
      })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log("Receive Asset Response : ", JSON.stringify(json, null, 2));
      showAlert("You are now the owner of asset ", json.event.args[1]);
    })
    .catch(error => {
      console.log(error)
    })
  }  

  return();

};

export default TransactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  wrapper: {},

  card: {
    marginTop: 10,
    height: 90,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 5,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 10,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#FF6347',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  button: {
    width: '50%',
    height: 40,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center'
  },
  pay: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    padding: 10,
    margin: 15,
    height: 40,
    width: 80,
    left: 80,
    alignItems: 'center'
  },
  parent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },  
});
