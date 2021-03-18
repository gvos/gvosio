import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  PermissionsAndroid
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import axios from "axios";

const localIPaddress = `http://${LOCAL_IP1}:3000`;
// const localIPaddress = `http://10.0.0.2:3000`;
let location = {
  latitude: 0,
  longitude: 0
};

const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

export default function CaptureScreen() {

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [videoSource, setVideoSource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const cameraRef = useRef();
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
      // await axios.get(localIPaddress, (res) => console.log("Axios: ", res), (err) => console.error("ERR: ", err));
    })();
  }, []);

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    );
  }

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
        accuracy: "high",
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

};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: "absolute",
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 3),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4c5c4",
    opacity: 0.7,
    zIndex: 5,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: "68%",
    height: 1,
    backgroundColor: "black",
  },
  control: {
    position: "absolute",
    flexDirection: "row",
    bottom: 38,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    backgroundColor: "#f5f6f5",
    borderRadius: 5,
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  recordIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5,
  },
  text: {
    color: "#fff",
  },
});