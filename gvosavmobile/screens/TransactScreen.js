import React, { Component, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  Button,
  TextInput,
  Alert,
  Image,
  ScrollView,
  NativeModules,
  Platform,
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

  const icons = {
    'up': require('../assets/Arrowhead-Up.png'),
    'down': require('../assets/Arrowhead-Down.png')
  };

  const [state, setState] = React.useState({
    animation1: new Animated.Value(50),
    expanded1: false,
    animation2: new Animated.Value(50),
    expanded2: false,
    animation3: new Animated.Value(50),
    expanded3: false,
    animation4: new Animated.Value(50),
    expanded4: false,
    animation5: new Animated.Value(50),
    expanded5: false,
    animation6: new Animated.Value(160),
    expanded6: true,
  });

  const toggle1 = () => {
    let initialValue = state.expanded1 ? state.maxHeight1 + state.minHeight1 : state.minHeight1;
    let finalValue = state.expanded1 ? state.minHeight1 - 10 : state.maxHeight1 + state.minHeight1;

    setState({
      ...state,
      expanded1: !state.expanded1
    });
    state.animation1.setValue(initialValue);
    Animated.spring(state.animation1, {
      toValue: finalValue
    }).start();
  };

  const toggle2 = () => {
    let initialValue = state.expanded2 ? state.maxHeight2 + state.minHeight2 : state.minHeight2;
    let finalValue = state.expanded2 ? state.minHeight2 - 10 : state.maxHeight2 + state.minHeight2;

    setState({
      ...state,
      expanded2: !state.expanded2
    });
    state.animation2.setValue(initialValue);
    Animated.spring(state.animation2, {
      toValue: finalValue
    }).start();
  };

  const toggle3 = () => {
    let initialValue = state.expanded3 ? state.maxHeight3 + state.minHeight3 : state.minHeight3;
    let finalValue = state.expanded3 ? state.minHeight3 - 10 : state.maxHeight3 + state.minHeight3;

    setState({
      ...state,
      expanded3: !state.expanded3
    });
    state.animation3.setValue(initialValue);
    Animated.spring(state.animation3, {
      toValue: finalValue
    }).start();
  };

  const toggle4 = () => {
    let initialValue = state.expanded4 ? state.maxHeight4 + state.minHeight4 : state.minHeight4;
    let finalValue = state.expanded4 ? state.minHeight4 - 10 : state.maxHeight4 + state.minHeight4;

    setState({
      ...state,
      expanded4: !state.expanded4
    });
    state.animation4.setValue(initialValue);
    Animated.spring(state.animation4, {
      toValue: finalValue
    }).start();
  };

  const toggle5 = () => {
    let initialValue = state.expanded5 ? state.maxHeight5 + state.minHeight5 : state.minHeight5;
    let finalValue = state.expanded5 ? state.minHeight5 - 10 : state.maxHeight5 + state.minHeight5;

    setState({
      ...state,
      expanded5: !state.expanded5
    });
    state.animation5.setValue(initialValue);
    Animated.spring(state.animation5, {
      toValue: finalValue
    }).start();
  };

  const toggle6 = () => {
    let initialValue = state.expanded6 ? state.maxHeight6 + state.minHeight6 : state.minHeight6;
    let finalValue = state.expanded6 ? state.minHeight6 - 10 : state.maxHeight6 + state.minHeight6;

    setState({
      ...state,
      expanded6: !state.expanded6
    });
    state.animation6.setValue(initialValue);
    Animated.spring(state.animation6, {
      toValue: finalValue
    }).start();
  };

  const setMinHeight1 = (event) => {
    setState({
      ...state,
      minHeight1: event.nativeEvent.layout.height
    });
  };

  const setMaxHeight1 = (event) => {
    setState({
      ...state,
      maxHeight1: event.nativeEvent.layout.height
    });
  };

  const setMinHeight2 = (event) => {
    setState({
      ...state,
      minHeight2: event.nativeEvent.layout.height
    });
  };

  const setMaxHeight2 = (event) => {
    setState({
      ...state,
      maxHeight2: event.nativeEvent.layout.height
    });
  };

  const setMinHeight3 = (event) => {
    setState({
      ...state,
      minHeight3: event.nativeEvent.layout.height
    });
  };

  const setMaxHeight3 = (event) => {
    setState({
      ...state,
      maxHeight3: event.nativeEvent.layout.height
    });
  };

  const setMinHeight4 = (event) => {
    setState({
      ...state,
      minHeight4: event.nativeEvent.layout.height
    });
  };

  const setMaxHeight4 = (event) => {
    setState({
      ...state,
      maxHeight4: event.nativeEvent.layout.height
    });
  };

  const setMinHeight5 = (event) => {
    setState({
      ...state,
      minHeight5: event.nativeEvent.layout.height
    });
  };

  const setMaxHeight5 = (event) => {
    setState({
      ...state,
      maxHeight5: event.nativeEvent.layout.height
    });
  };

  const setMinHeight6 = (event) => {
    setState({
      ...state,
      minHeight6: event.nativeEvent.layout.height
    });
  };

  const setMaxHeight6 = (event) => {
    setState({
      ...state,
      maxHeight6: event.nativeEvent.layout.height
    });
  };

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
    } else if(event.event == "assetReceived") {
      return(
      <ScrollView style={styles.cardWrapper}>
        <View style={styles.card}>
          <Text style={{fontSize: 18, fontWeight: 'bold',}}>{event.returnValues.message}</Text>
        </View>
        <View style={styles.card}>
          <Text style={{fontSize: 18, fontWeight: 'bold',}}><B>Asset Hash</B> : {event.returnValues._hashOfAsset}</Text>
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
    } else if(event.event == "someoneElseOwnsTheAsset") {
      return(
      <ScrollView style={styles.cardWrapper}>
        <View style={styles.card}>
          <Text style={{fontSize: 18, fontWeight: 'bold',}}>{event.returnValues.message}</Text>
        </View>
        <View style={styles.card}>
          <Text style={{fontSize: 18, fontWeight: 'bold',}}><B>Asset Hash</B> : {event.returnValues._hexAsset}</Text>
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
    } else {
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
      </ScrollView>);
    }

  };

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
      <View style = {styles.cards}>
          <Animated.View style={[styles.container, {height: state.animation1}]}>
            <View style={styles.modifiedCard}>
              <View style={styles.titleContainer} onLayout={setMinHeight1.bind(this)}>
                <Text style={styles.cardTitle}>Register Yourself</Text>
                <TouchableHighlight
                  style={styles.button}
                  onPress={toggle1.bind(this)}
                  underlayColor="#f1f1f1"
                >
                  {
                    state.expanded1 ? <Image style={styles.buttonImage} source={icons['up']}></Image> : <Image style={styles.buttonImage} source={icons['down']}></Image>
                  }
                </TouchableHighlight>
              </View>
              <View style={styles.body} onLayout={setMaxHeight1.bind(this)}>
                <TouchableOpacity style={styles.button} onPress={() => register()}>
                  <LinearGradient colors={['#FFA07A', '#FF6347']}style={styles.pay}>    
                    <Text style={[styles.text, {color: 'black'}]}>Register</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
          <View style = {styles.cards}>
            <Animated.View style={[styles.container, {height: state.animation2}]}>
              <View style={[styles.modifiedCard, {backgroundColor: '#242424'}]}>
                <View style={styles.titleContainer} onLayout={setMinHeight2.bind(this)}>
                  <Text style={[styles.cardTitle, {fontFamily: 'serif'}]}>Add Asset</Text>
                  <TouchableHighlight
                    style={styles.button}
                    onPress={toggle2.bind(this)}
                    underlayColor="#f1f1f1"
                  >
                    {
                      state.expanded2 ? <Image style={styles.buttonImage} source={icons['up']}></Image> : <Image style={styles.buttonImage} source={icons['down']}></Image>
                    }
                  </TouchableHighlight>
                </View>
                <View style={styles.body} onLayout={setMaxHeight2.bind(this)}>
                  <TouchableOpacity
                      onPress={chooseFile.bind(this)}
                      style={styles.button}
                  >
                      <LinearGradient colors={['#FFA07A', '#FF6347']}style={styles.pay}>    
                        <Text style={[styles.text, {color: 'black', fontFamily: 'serif'}]}>Add</Text>
                      </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </View>
        <View style = {styles.cards}>
            <Animated.View style={[styles.container, {height: state.animation3}]}>
              <View style={[styles.modifiedCard, {backgroundColor: '#242424'}]}>
                <View style={styles.titleContainer} onLayout={setMinHeight3.bind(this)}>
                  <Text style={[styles.cardTitle, {fontFamily: 'serif'}]}>Find Owner</Text>
                  <TouchableHighlight
                    style={styles.button}
                    onPress={toggle3.bind(this)}
                    underlayColor="#f1f1f1"
                  >
                    {
                      state.expanded3 ? <Image style={styles.buttonImage} source={icons['up']}></Image> : <Image style={styles.buttonImage} source={icons['down']}></Image>
                    }
                  </TouchableHighlight>
                </View>
                <View style={styles.body} onLayout={setMaxHeight3.bind(this)}>
                  <TextInput
                    placeholder="Insert Asset Hash"
                    placeholderTextColor="white"
                    underlineColorAndroid = "#FF6347"
                    style={{color: 'white', fontFamily: 'serif'}}
                    onChangeText = {text => setInfo({
                                              ...info,
                                              findAssetHash: text
                                            })
                                    }
                  />
                  <TouchableOpacity style={styles.button} onPress={() => findOwner()}>
                    <LinearGradient colors={['#FFA07A', '#FF6347']}style={styles.pay}>    
                      <Text style={[styles.text, {color: 'black', fontFamily: 'serif'}]}>Find</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </View>
          <View style = {styles.cards}>
            <Animated.View style={[styles.container, {height: state.animation4}]}>
              <View style={[styles.modifiedCard, {backgroundColor: '#242424'}]}>
                <View style={styles.titleContainer} onLayout={setMinHeight4.bind(this)}>
                  <Text style={[styles.cardTitle, {fontFamily: 'serif'}]}>View Balance</Text>
                  <TouchableHighlight
                    style={styles.button}
                    onPress={toggle4.bind(this)}
                    underlayColor="#f1f1f1"
                  >
                    {
                      state.expanded4 ? <Image style={styles.buttonImage} source={icons['up']}></Image> : <Image style={styles.buttonImage} source={icons['down']}></Image>
                    }
                  </TouchableHighlight>
                </View>
                <View style={styles.body} onLayout={setMaxHeight4.bind(this)}>
                  <TouchableOpacity style={styles.button} onPress={() => viewBalance()}>
                    <LinearGradient colors={['#FFA07A', '#FF6347']}style={styles.pay}>    
                      <Text style={[styles.text, {color: 'black', fontFamily: 'serif'}]}>View </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
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
