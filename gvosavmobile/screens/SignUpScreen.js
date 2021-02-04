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

  return();

};

export default SignUpScreen;