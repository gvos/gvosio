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
    
    const geo = () => {

      console.log("in Geolocation: 3");

      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      const success = (pos) => {
        var crd = pos.coords;

        console.log('Your current position is:');
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);
        // console.log(`More or less ${crd.accuracy} meters.`);
        console.log(JSON.stringify(crd, null, 2));
        setState({
          ...state,
          latitude: crd.latitude,
          longitude: crd.longitude
        });
        location.latitude = crd.latitude;
        location.longitude = crd.longitude;

      }

      const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      Geolocation.getCurrentPosition(success, error, options);

    }
    await requestPermissions();
  }

  const videoRecorder = useRef(null);
  
  function startRecorder () {
    if (videoRecorder && videoRecorder.current) {
      videoRecorder.current.open({ maxLength: 30 }, async(data) => {
        console.log('captured data', data);
        console.log("stored latitude: ", state.latitude);
        console.log("stored longitude: ", state.longitude);
        const latitude = state.latitude;
        const longitude = state.longitude;
        const uri = data.uri;
        const codec = "mp4";
        const type = `video/${codec}`;
        const info = new FormData();
        info.append("video", {
          name: `${location.latitude}-${location.longitude}`,
          type,
          uri
        });
        // info.append("co-ordinates", {
        //   latitude: latitude,
        //   longitude: longitude
        // })

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
