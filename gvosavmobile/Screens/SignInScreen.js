import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import '../global.js';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../components/context';

import Users from '../model/users';

let userInfo = {
    name : '',
    email : '',
    address : '',
};

const localIPaddress = "192.168.43.61"//"192.168.1.4";

const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

    const { signIn } = React.useContext(AuthContext);

    const getNotes = React.useCallback(() => {
        fetch(`http://${localIPaddress}:3001/contracts`)
        .then((response) => response.json())
        .then((json) => {
            console.log("response : ", JSON.stringify(json, null, 2));
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }
