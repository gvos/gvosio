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
  TextInput,
  Alert,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {userInfo} from './SignInScreen.js';
import '../global.js';
import Users from '../model/users';

const localIPaddress;

const ReceiveScreen = ({navigation}) => {

/*  state is a React-Hook we are using here. state stores and manages all the
*   information we would need to update the balance and view the image.
*   state.message is the location of the image that we have received.
*   state.show is a boolean value which is initially set to false, because
*   the image has not been paid and hence cannot be viewed.
*/

  const [state, setState] = React.useState({

    sender: RECEIVE[userInfo.name].sender,
    receiver: userInfo.name,
    balance: BALANCE[userInfo.name],
    message: RECEIVE[userInfo.name].message,
    paid: RECEIVE[userInfo.name].paid,
    show: false,

  });

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    );
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

/*  handlePayment manages the payment and takes care that the image is
*   being viewed when the payment was successful.
*   By default, the receiver will have to pay 5 units from his balance
*   to be able to view the image. This 5 unit will be updated to the
*   sender's account.
*/
  const handlePayment = (sender, receiver) => {
    console.log('Button Clicked!');
    console.log(RECEIVE[userInfo.name].message);
    console.log(state);
    console.log(RECEIVE);
    // This if statement takes care that the image is only paid for once.
    if(state.balance - 5 >= 0 && state.paid < 0){
      console.log('In here!');
      // 5 units added to sender's balance.
      BALANCE[sender] += 5;
      // 5 units deducted from the receiver's balance, if he wishes to view the image.
      BALANCE[receiver] -= 5;
      console.log(RECEIVE[userInfo.name].message);
      setState({
        ...state,
        balance: BALANCE[receiver],
        message: RECEIVE[userInfo.name].message,
        paid: 1,
        show: true,
      });
      userInfo.balance = state.balance;
    }
    navigation.push('Profile', BALANCE[userInfo.name]);
    console.log(state);
    console.log(BALANCE);
  }
/*
        To add background image!
      <Image style= { styles.backgroundImage }
        source={require('../assets/banners/dark6.jpg')}
      >
      </Image>
*/

  return(

    <View style = {styles.cardWrapper}>
        <View style={styles.card}>
            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Message count</Text>
                {
                  state.paid != 0 ? ( <Text> You have a new message! </Text> )
                  : ( <Text> You have no new message! </Text> )
                }
            </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardDetails}>
              If you have a message, then click on Pay to pay $5 to view the message!
            </Text>
            <TouchableOpacity
               style = {styles.pay}
               onPress={() => receiveAsset()}
               >
               <Text style = {styles.sendButtonText}> Pay </Text>
            </TouchableOpacity>
          </View>
        </View>
          <View style={styles.carD}>
            {
              state.show ?
              (
                <Image source={{ uri: state.message }}
                    style={{
                        width: 350,
                        height: 300,
                        alignSelf: 'center',
                        resizeMode: 'stretch',
                    }}
                />
              )
              : null
            }
          </View>
    </View>

  );

};

export default ReceiveScreen;

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

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  backgroundImage:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.9
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#fdeae7' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#de4f35',
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    marginTop: 10,
    height: 100,
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
  cardDetails: {
    fontSize: 14,
    color: '#444',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
    borderRadius: 10
  },
  pay: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    padding: 10,
    margin: 15,
    height: 40,
    width: 80,
    alignSelf: 'center',
    alignItems: 'center'
  },
  textSign: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  containeR: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carD: {
    height: 300,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
