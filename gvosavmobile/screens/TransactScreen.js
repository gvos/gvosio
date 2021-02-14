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
import { LOCAL_IP } from '@env';

import {userInfo} from './SignInScreen.js';
import '../global.js';

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
    fetch(`http://${LOCAL_IP}:3001/contracts/register`, {
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
      setModalVisible(!modalVisible);
      console.log("Register Response : ", JSON.stringify(json, null, 2));
      showAlert(json.event.args[0], json.event.args[2]);
    })
    .catch(error => {
      console.log(error)
    })
  }

  const addAsset = (assetHash) => {
    fetch(`http://${LOCAL_IP}:3001/contracts/addAsset`, {
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
      setModalVisible(!modalVisible);
      console.log("Add Asset Response : ", JSON.stringify(json, null, 2));
      showAlert(json.event.args[3], json.event.args[1]);
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  const findOwner = () => {
    fetch(`http://${LOCAL_IP}:3001/contracts/findOwner`, {
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
      setModalVisible(!modalVisible);
      console.log("Find Owner Response : ", JSON.stringify(json, null, 2));
      showAlert("The owner of this asset is ", json.event.args[0]);
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  const sendAsset = () => {
    fetch(`http://${LOCAL_IP}:3001/contracts/sendAsset`, {
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
      setModalVisible(!modalVisible);
      console.log("Send Asset Response : ", JSON.stringify(json, null, 2));
      showAlert("You have sent the asset to ", json.event.args[1]);
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  const viewBalance = () => {
    fetch(`http://${LOCAL_IP}:3001/contracts/viewBalance`, {
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
      setModalVisible(!modalVisible);
      console.log("View Balance Response : ", JSON.stringify(json, null, 2));
      showAlert("Your balance is ", json.event.args[1]);
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  const receiveAsset = () => {
    fetch(`http://${LOCAL_IP}:3001/contracts/receiveAsset`, {
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
      setModalVisible(!modalVisible);
      console.log("Receive Asset Response : ", JSON.stringify(json, null, 2));
      showAlert("You are now the owner of asset ", json.event.args[1]);
    })
    .catch(error => {
      console.log(error)
    })
  }  

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    );
  }

  const renderEvent = (event) => {

    if(event.event == "alreadyRegistered" || event.event == "successfulRegistration"){
      return(
        <ScrollView style={styles.cardWrapper}>
          <View style={styles.card}>
            <Text style={{fontSize: 18, fontWeight: 'bold',}}>{event.returnValues.message}</Text>
          </View>
          <View style={styles.card}>
            <Text><B>Transaction Hash</B> : {event.transactionHash}</Text>
          </View>
          <View style={styles.card}>
            <Text><B>Block Hash</B> : {event.blockHash}</Text>
          </View>
          <View style={styles.card}>
            <Text><B>Block Number</B> : {event.blockNumber}</Text>
          </View>
          <View style={styles.card}>
            <Text><B>Contract Address</B> : {event.address}</Text>
          </View>
        </ScrollView>  
      );
    } else if(event.event == "assetSent") {
      return(
      <ScrollView style={styles.cardWrapper}>
        <View style={styles.card}>
          <Text style={{fontSize: 18, fontWeight: 'bold',}}>{event.returnValues.message}</Text>
        </View>
        <View style={styles.card}>
          <Text style={{fontSize: 18, fontWeight: 'bold',}}><B>Asset Hash</B> : {event.returnValues.hexOfAsset}</Text>
        </View>
        <View style={styles.card}>
          <Text style={{fontSize: 18, fontWeight: 'bold',}}><B>Receiver</B> : {event.returnValues.receiver}</Text>
        </View>
        <View style={styles.card}>
          <Text><B>Transaction Hash</B> : {event.transactionHash}</Text>
        </View>
        <View style={styles.card}>
          <Text><B>Block Hash</B> : {event.blockHash}</Text>
        </View>
        <View style={styles.card}>
          <Text><B>Block Number</B> : {event.blockNumber}</Text>
        </View>
        <View style={styles.card}>
          <Text><B>Contract Address</B> : {event.address}</Text>
        </View>
      </ScrollView>  
      );
    } else if(event.event == "addedAsset") {
      return(
      <ScrollView style={styles.cardWrapper}>
        <View style={styles.card}>
          <Text style={{fontSize: 18, fontWeight: 'bold',}}>{event.returnValues.message}</Text>
        </View>
        <View style = {styles.card}>
          <Text style={{fontSize: 18, fontWeight: 'bold',}}><B>Asset Hash</B> : {event.returnValues._hexAsset}</Text>
        </View>        
        <View style={styles.card}>
          <Text><B>Transaction Hash</B> : {event.transactionHash}</Text>
        </View>
        <View style={styles.card}>
          <Text><B>Block Hash</B> : {event.blockHash}</Text>
        </View>
        <View style={styles.card}>
          <Text><B>Block Number</B> : {event.blockNumber}</Text>
        </View>
        <View style={styles.card}>
          <Text><B>Contract Address</B> : {event.address}</Text>
        </View>
      </ScrollView>
      );    
    } else if(event.event == "viewingBalance"){
      return(
      <ScrollView style={styles.cardWrapper}>
        <View style = {styles.card}>
          <Text style={{fontSize: 18, fontWeight: 'bold',}}><B>Balance</B> : {event.returnValues.balance}</Text>
        </View>        
        <View style={styles.card}>
          <Text><B>Transaction Hash</B> : {event.transactionHash}</Text>
        </View>
        <View style={styles.card}>
          <Text><B>Block Hash</B> : {event.blockHash}</Text>
        </View>
        <View style={styles.card}>
          <Text><B>Block Number</B> : {event.blockNumber}</Text>
        </View>
        <View style={styles.card}>
          <Text><B>Contract Address</B> : {event.address}</Text>
        </View>
      </ScrollView>);  
    } else if(event.event == "foundOwner") {
      return(
      <ScrollView style={styles.cardWrapper}>
        <View style={styles.card}>
          <Text style={{fontSize: 18, fontWeight: 'bold',}}><B>Found Owner</B></Text>
        </View>
        <View style={styles.card}>
          <Text style={{fontSize: 18, fontWeight: 'bold',}}><B>Asset Hash</B> : {event.returnValues._hashOfAsset}</Text>
        </View>
        <View style={styles.card}>
          <Text style={{fontSize: 18, fontWeight: 'bold',}}><B>Owner</B> : {event.returnValues.owner}</Text>
        </View>
        <View style={styles.card}>
          <Text><B>Transaction Hash</B> : {event.transactionHash}</Text>
        </View>
        <View style={styles.card}>
          <Text><B>Block Hash</B> : {event.blockHash}</Text>
        </View>
        <View style={styles.card}>
          <Text><B>Block Number</B> : {event.blockNumber}</Text>
        </View>
        <View style={styles.card}>
          <Text><B>Contract Address</B> : {event.address}</Text>
        </View>
      </ScrollView>); 
    }

  chooseFile = async () => {
    let options = {title: "Select a File"};
    let source = '';
    let assetHash = '';
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        assetHash = md5(response.data);
        setInfo({
          ...info,
          addAssetHash : assetHash
        });
        console.log("hash : ", info.addAssetHash);
        console.log("Asset hash : ", assetHash);
        addAsset(assetHash);
        // showAlert('Your Asset Hash (md5)', assetHash);
        // await SendAsset(person, contract, assetHash);
      }
    });
  };

  const [modalVisible, setModalVisible] = React.useState(false);

  return(

    <View style = {styles.cardWrapper}>
        <View style={styles.card}>
            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Register Yourself</Text>
                  <TouchableOpacity style={styles.button} onPress={() => register()}>
                    <LinearGradient colors={['#FFA07A', '#FF6347']}style={styles.pay}>    
                      <Text style={[styles.text, {color: 'black'}]}>Register</Text>
                    </LinearGradient>
                  </TouchableOpacity>
            </View>
        </View>
        <View style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Add Asset</Text>
                <TouchableOpacity
                    onPress={chooseFile.bind(this)}
                    style={styles.button}
                >
                    <LinearGradient colors={['#FFA07A', '#FF6347']}style={styles.pay}>    
                      <Text style={[styles.text, {color: 'black'}]}>Add</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.card}>
            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Find Owner</Text>
                <View style={styles.parent}>
                  <DialogInput isDialogVisible={dialog.findOwner}
                    title={"Find Owner"}
                    message={"Get Owner's address from the Asset Hash"}
                    hintInput ={"Insert Asset Hash"}
                    submitInput={ 
                      (inputText) => {setInfo({
                                      ...info,
                                      findAssetHash : inputText
                                      });
                                      showDialog({
                                        ...dialog,
                                        findOwner : false
                                      })
                                    } 
                    }                    
                    closeDialog={ () => {
                      showDialog({
                        ...dialog,
                        findOwner : false
                      })
                    }}>
                  </DialogInput>
                  <TouchableOpacity style={styles.button} onPress={() => showDialog({
                    ...dialog,
                    findOwner : true})
                  }>
                    <LinearGradient colors={['#FFA07A', '#FF6347']}style={styles.button}>    
                      <Text style={[styles.text, {color: 'black'}]}>Enter Hash</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => findOwner()}>
                    <LinearGradient colors={['#FFA07A', '#FF6347']}style={styles.button}>    
                      <Text style={[styles.text, {color: 'black'}]}>Find</Text>
                    </LinearGradient>
                  </TouchableOpacity>                
                </View>                
            </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>View Your Balance</Text>
                  <TouchableOpacity style={styles.button} onPress={() => viewBalance()}>
                    <LinearGradient colors={['#FFA07A', '#FF6347']}style={styles.pay}>    
                      <Text style={[styles.text, {color: 'black'}]}>View</Text>
                    </LinearGradient>
                  </TouchableOpacity>
          </View>
        </View>        
        <View style={styles.card}>
            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Send Asset</Text>
                <View style={styles.parent}>
                  <DialogInput isDialogVisible={dialog.sendAssetHash}
                    title={"Hash of Asset"}
                    message={"Transfer the ownership of your Asset"}
                    hintInput ={"Insert Asset Hash"}
                    submitInput={ 
                      (inputText) => {
                        setInfo({
                          ...info,
                          sendAssetHash : inputText
                        });
                        showDialog({
                          ...dialog,
                          sendAssetHash : false
                        });
                      } 
                    }                    
                    closeDialog={ () => {
                      showDialog({
                        ...dialog,
                        sendAssetHash : false
                      })
                    }}>
                  </DialogInput>
                  <TouchableOpacity style={styles.button} onPress={() => showDialog({
                    ...dialog,
                    sendAssetHash : true
                  })}>
                    <LinearGradient colors={['#FFA07A', '#FF6347']}style={styles.button}>    
                      <Text style={[styles.text, {color: 'black'}]}>Enter Hash</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <DialogInput isDialogVisible={dialog.sendAssetAddress}
                    title={"Address"}
                    message={"Transfer the ownership of your Asset"}
                    hintInput ={"Insert Recipient's Address"}
                    submitInput={ 
                      (inputText) => {
                        setInfo({
                          ...info,
                          sendTo : inputText
                        })
                      } 
                    }                    
                    closeDialog={ () => {
                      showDialog({
                        ...dialog,
                        sendAssetAddress : false
                      })
                    }}>
                  </DialogInput>
                  <TouchableOpacity style={styles.button} 
                    onPress={() => {showDialog({
                      ...dialog,
                      sendAssetAddress : true
                    });
                    sendAsset();
                  }}>
                    <LinearGradient colors={['#FFA07A', '#FF6347']}style={styles.button}>    
                      <Text style={[styles.text, {color: 'black'}]}>Enter Address</Text>
                    </LinearGradient>
                  </TouchableOpacity>                  
                  <TouchableOpacity style={styles.button} onPress={() => sendAsset()}>
                    <LinearGradient colors={['#FFA07A', '#FF6347']}style={styles.button}>    
                      <Text style={[styles.text, {color: 'black'}]}>Send</Text>
                    </LinearGradient>
                  </TouchableOpacity>                
                </View>
            </View>
        </View>
        <View style={styles.card}>
            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Receive Asset</Text>
                  <TouchableOpacity style={styles.button} onPress={() => receiveAsset()}>
                    <LinearGradient colors={['#FFA07A', '#FF6347']}style={styles.pay}>    
                      <Text style={[styles.text, {color: 'black'}]}>Receive</Text>
                    </LinearGradient>
                  </TouchableOpacity> 
            </View>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
              <View style={styles.modalView}>
              {
                event ? renderEvent(event) : null
              }
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>
              </View>
          </Modal>
        </View>
    </View>

  );

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
