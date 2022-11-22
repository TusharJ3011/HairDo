import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, ScrollView, Platform } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';


export const BookingScreen = ({route, navigation}) => {
    let booking_data = []
    route.params?.data.map((item)=>{
        var itemTemp = item;
        var bookDate = new Date(item.date.seconds*1000);
        console.log(bookDate);
        var bookDateStr = bookDate.getDate() + "-" + bookDate.getMonth() + "-" + bookDate.getFullYear() + " at " + bookDate.getHours() + ":" + bookDate.getMinutes();
        console.log(bookDateStr);
        itemTemp.date = bookDateStr;
        booking_data.push(itemTemp)
    });
    console.log(booking_data);

    return (
        <View style={styles.container}>
            <ScrollView>
                {booking_data.map((item)=>{
                return(<Pressable style={[styles.otherButtonContainer, styles.boxShadow]} key={item.shopname+item.shopid}>
                    <View style={styles.otherButtonSubContainer}>
                        <Image source={require("../../assets/images/account/userglobal.png")} style={styles.otherButtonImage}/>
                        <View>
                            <Text style={styles.otherButtonTitle}>{item.shopname}</Text>
                            <Text style={styles.otherButtonSubTitle}>{item.date}</Text>
                        </View>
                    </View>
                    <Image source={require("../../assets/images/account/userglobal.png")} style={styles.otherButtonImage}/>
                </Pressable>)   
                })}         
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        display: 'flex',
        height: "100%",
        alignItems: 'center',
    },

    boxShadow:{},

    otherButtonContainer:{
        backgroundColor: "white",
        width: Dimensions.get("window").width -20,
        margin: 10,
        padding: 20,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    otherButtonSubContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    otherButtonImage:{
        width: 70,
        height: 70,
        resizeMode: 'stretch',
        overflow:'hidden',
        margin: 0,
        padding: 0,
        borderRadius: 70,
    },

    otherButtonTitle:{
        fontSize: 25,
        fontWeight: '700',
        margin: 0,
        marginLeft: 10,
        color: 'black',
    },

    otherButtonSubTitle:{
        fontSize: 15,
        margin: 0,
        marginLeft: 10,
        color: '#999999',
    },
});

const generateBoxShadowStyle = (xOffset, yOffset, shadowColorIos, shadowOpacity, shadowRadius, elevation, shadowColorAndroid,) => {
    if (Platform.OS === 'ios') {
      styles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOffset: {width: xOffset, height: yOffset},
        shadowOpacity,
        shadowRadius,
      };
    } else if (Platform.OS === 'android') {
      styles.boxShadow = {
        elevation: elevation,
        shadowColor: shadowColorAndroid,
      };
    }
  };

  generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717');
