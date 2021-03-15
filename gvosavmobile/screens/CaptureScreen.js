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

export default function CaptureScreen() {};