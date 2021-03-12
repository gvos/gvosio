import React, { useRef } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
  PermissionsAndroid
} from 'react-native'
import VideoRecorder from 'react-native-beautiful-video-recorder'

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { LOCAL_IP1, LOCAL_IP2 } from '@env';
import Geolocation from 'react-native-geolocation-service';

const localIPaddress = `http://${LOCAL_IP1}:3000`;
let location = {
  latitude: 0,
  longitude: 0
};

const VideoScreen = () => {

};

export default VideoScreen;