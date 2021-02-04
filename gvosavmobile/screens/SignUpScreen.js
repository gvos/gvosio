import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  NativeModules,
  Platform
} from 'react-native';
import * as Realm from 'realm';
import Loader from './Components/Loader';

const userSchema = {
  name: 'users',
  primaryKey: 'address',
  properties: {
    emailID: 'string',
    password: 'string',
    address: 'string',
    pin: 'string',
  }
};

const SignUpScreen = (props) => {

  const [userEmail, setUserEmail] = useState('');
  const [userKey, setUserKey] = useState('');
  const [userPin1, setUserPin1] = useState('');
  const [userPin2, setUserPin2] = useState('');
  const [pinConfirmation, setPin] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const emailInputRef = createRef();
  const keyInputRef = createRef();
  const pinInputRef = createRef();
  const confirmPinInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();

  const confirmUserPin = async () => {
    if(userPin1 != userPin2){
      setPin({
        ...pinConfirmation,
        pinConfirmation: false
      });
      console.log("Your pin does not match!");
      console.log(`Expected: ${userPin1}, Got: ${userPin2}`);
      Alert.alert(
        `Warning`,
        `Your Pin does not match!`,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
      );
    }
    else {
      setPin({
        ...pinConfirmation,
        pinConfirmation: true
      });
      console.log("Your pin matches!");
    }
  };

  const handleSubmitButton = async () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userKey) {
      alert('Please fill your Private Key');
      return;
    }
    if (!pinConfirmation) {
      alert('Please fill your Pin correctly');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    // if(userPin1.toString().length != 6) {
    //   alert('PIN should comprise of 6 digits only!')
    //   console.log("You didn't enter 6 digit PIN: ", userPin1);
    //   return;
    // }
    // console.log("user pin: ", userPin1);

    Realm.open({schema: [userSchema]})
    .then(async(realm) => {
      realm.write(() => {
        const newUser = realm.create('users', {
          emailID: userEmail,
          password: userPassword,
          address: userAddress,
          pin: userPin1,
        });
      });
      setIsRegistraionSuccess(true);
      let user = realm.objects('users');
      console.log("Users : ", JSON.stringify(user, null, 2)); 
      await trial();
    })
    .catch(error => {
      setIsRegistraionSuccess(false);
      console.log("here! ", isRegistraionSuccess);
      console.log("Error while getting user's data! ", error);
    });

  };

  if (isRegistraionSuccess) {

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/map_marker.png')}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        />
        <Text style={styles.successTextStyle}>
          Registration Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

   return (
    <View style={{flex: 1, backgroundColor: '#333333'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/logo_gvos.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#FF6347',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});