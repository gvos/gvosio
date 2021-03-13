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

  const getLocation = async () => {

    console.log("in Geolocation: 1");

    const requestPermissions = async() => {
      console.log("in Geolocation: 1.1");
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization("whenInUse");
        if(auth === "granted") {
           // do something if granted...
           geo();
        }
      }

      if (Platform.OS === 'android') {
        console.log("in Geolocation: 1.2");
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if ("granted" === PermissionsAndroid.RESULTS.GRANTED) {
          // do something if granted...
          console.log("in Geolocation: 2");
          geo();
        }
      }
    }
  }

};

export default VideoScreen;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
  },
  btnCapture: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 25
  }
});
