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
  

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      showAlert('Road Sign Detected!', 'Slippery Road');
      console.log("hi!");
    }, 15000);
  }, []);

  const loader = () => {
    console.log("loader");
    showAlert('Fetching data', "Detecting road signs...");
  }

  const takePicture = async () => {
    getLocation();
    if (cameraRef.current) {
      var source;
      const options = { quality: 0.5, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options).then(x => {
        source = x.uri;
        CameraRoll.save(x.uri, {type: 'photo', album: 'GVOS'});
        console.log("saving to gallery: ", x);
      });
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        console.log("picture source", source);
        
        const codec = "jpeg";
        const type = `image/${codec}`;
        const info = new FormData();
        info.append("image", {
          name: `${location.latitude}-${location.longitude}`,
          type,
          source
         });
        console.log("localIPaddress: ", localIPaddress);
        loader();
        try {
          await fetch(`${localIPaddress}/image`, {
            method: "POST",
          })
          .then((response) => {
            console.log("GOT RESPONSE", response);
          },
          (error) => {
            console.error("GOT ERROR", error);
          })
          .catch((error) => {
            console.error("AXIOS ERROR", error);
          });
        } catch(e) {
          console.log("Error while capturing image: ", e);
        }
      }
    }
  };

  const recordVideo = async () => {
    getLocation();
    if (cameraRef.current) {
      try {
        const videoRecordPromise = cameraRef.current.recordAsync();
        if (videoRecordPromise) {
          setIsVideoRecording(true);
          const data = await videoRecordPromise;
          const uri = data.uri;
          if (uri) {
            setIsPreview(true);
            console.log("video source", uri);
            setVideoSource(uri);
            
            const codec = "mp4";
            const type = `video/${codec}`;
            let info = new FormData();
            // info.append("video", {
            //   name: `${location.latitude}-${location.longitude}`,
            //   type,
            //   uri
            // });

            info = JSON.stringify({
                "video": {
                    "name": `${location.latitude}-${location.longitude}`,
                    "type": "video/mp4",
                    "uri": uri
                }
            })

            console.log("info: ", info);

            // const y = info["_parts"][0];
            // info.append("video", {
            //   name: `${location.latitude}-${location.longitude}`,
            //   type,
            //   uri: Platform.OS === 'android' ? `file:///${uri}` : uri
            // });
            // console.log("info: ", JSON.stringify(y, null, 2));
            var x = JSON.stringify(info);
            // info.append("video", {
            //   name: `${location.latitude}-${location.longitude}`,
            //   type,
            //   uri: uri
            // });
            // try {
            //     const res = await fetch(localIPaddress, {
            //       method: "post",
            //       body: info
            //     });
            //   } catch (e) {
            //     console.error(e);
            //   }
            // axios.post(localIPaddress, info, {
            //   headers: {
            //     Accept: 'application/json',
            //     'Content-Type': 'multipart/form-data; boundary=some_string',
            //   }
            // })
            axios.post(`${localIPaddress}/video`, info, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
            })
            .then((response) => {
              console.log("GOT RESPONSE", response);
            },
            (error) => {
              console.error("GOT ERROR", error);
            })
            .catch((error) => {
              console.error("AXIOS ERROR", error);
            })
            /*
            try {
              // axios.post(localIPaddress, info, {
              //   headers: {
              //     // Accept: 'application/json',
              //     'Content-Type': 'multipart/form-data'
              //   }
              // })
              // .catch(error => {
              //     throw error;
              // });
                // .then(
                // (response) => {
                // console.log(response)
                // },
                // (error) => {
                // console.error("server error", error);
                // })
                // .catch((error) => {
                // console.error("internet error", error);
                // })
              await fetch(`${localIPaddress}/`, {
              // await fetch(`${localIPaddress}/video`, {
                method: "post",
                body: info
              });
            } catch(e) {
              console.log("Error while capturing video: ", e);
            }
            */
          }
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const stopVideoRecording = () => {
    if (cameraRef.current) {
      setIsPreview(false);
      setIsVideoRecording(false);
      cameraRef.current.stopRecording();
    }
  };
};

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
    setVideoSource(null);
  };

  const fetchSign = async () => {
    loader();
    await cameraRef.current.resumePreview();
    setIsPreview(false);
    setVideoSource(null);
  };

  const renderCancelPreviewButton = () => (
    <View>
    <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
      <Icon name="close" size={25} />
    </TouchableOpacity>
    <TouchableOpacity onPress={fetchSign} style={styles.tickButton}>
      <Icon name="checkmark-sharp" size={25} />
    </TouchableOpacity>
    </View>
  );
  
  const renderVideoPlayer = () => (
    <Video
      source={{ uri: videoSource }}
      shouldPlay={true}
      style={styles.media}
    />
  );

  const renderVideoRecordIndicator = () => (
    <View style={styles.recordIndicatorContainer}>
      <View style={styles.recordDot} />
      <Text style={styles.recordTitle}>{"Recording..."}</Text>
    </View>
  );

  const renderCaptureControl = () => (
    <View style={styles.control}>
      <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
        <Icon name="sync" size={45} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!isCameraReady}
        onLongPress={recordVideo}
        onPressOut={stopVideoRecording}
        onPress={takePicture}
        style={styles.capture}
      />
    </View>
  );

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        flashMode={Camera.Constants.FlashMode.off}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log("camera error", error);
        }}
      />
      <View style={styles.container}>
        {isVideoRecording && renderVideoRecordIndicator()}
        {videoSource && renderVideoPlayer()}
        {isPreview && renderCancelPreviewButton()}
        {!videoSource && !isPreview && renderCaptureControl()}
      </View>
    </SafeAreaView>
  );
}

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