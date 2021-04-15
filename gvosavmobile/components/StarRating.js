import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const StarRating = (props) => {

    // This array will contain our star tags. We will include this
    // array between the view tag.
    let stars = [];
    // Loop 5 times
    for (var i = 1; i <= 5; i++) {
        // set the path to filled stars
        let name = 'ios-star';
        // If ratings is lower, set the path to unfilled stars

        if (i > props.ratings) {
            name = 'ios-star-outline';
        }

        stars.push((<Ionicons name={name} size={15} style={styles.star} key={i} />));
    }

    return (
        <View style={ styles.container }>
            { stars }
            <Text style={styles.text}>({props.reviews})</Text>
        </View>
    );
    
}

export default StarRating;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	star: {
		color: '#FF8C00'
	},
    text: {
        fontSize: 12,
        marginLeft: 5,
        color: '#444',
    },
    /*---------------------------*/
    cardWrapper: {
        marginTop: 50,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 8,
    },
    closeButton: {
        position: "absolute",
        top: 35,
        left: '5%',
        height: closeButtonSize,
        width: closeButtonSize,
        borderRadius: Math.floor(closeButtonSize / 3),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#c4c5c4",
        opacity: 0.7,
        zIndex: 5,
    },
    tickButton: {
        position: "absolute",
        top: 35,
        left: '85%',
        height: closeButtonSize,
        width: closeButtonSize,
        borderRadius: Math.floor(closeButtonSize / 3),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#c4c5c4",
        opacity: 0.7,
        zIndex: 5,
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
    sliderContainer: {
        height: 200,
        width: '90%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
    },
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