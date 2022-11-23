import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, ScrollView, Platform } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';


export const OpenSourceLibrariesScreen = ({navigation}) => {
    const depends = require("../../package.json").dependencies;
    let data = [];
    Object.entries(depends).map(([k, v]) => {
        data.push({ title: k, ver: v });
    });

    return (
        <View style={styles.container}>
            <ScrollView>
                {data.map((item, index)=>{
                return(<Pressable style={[styles.otherButtonContainer, styles.boxShadow]} key={index}>
                    <View style={styles.otherButtonSubContainer}>
                        <Image source={require("../../assets/images/icons/openlib_item.png")} style={styles.otherButtonImage}/>
                        <View>
                            <Text style={styles.openTitle}>{item.title}</Text>
                            <Text style={styles.openSubTitle}>{item.ver}</Text>
                        </View>
                    </View>
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
        width: 50,
        height: 50,
        resizeMode: 'stretch',
        overflow:'hidden',
        margin: 0,
        padding: 0,
    },

    otherButtonImage2:{
        width: 15,
        height: 15,
        resizeMode: 'stretch',
        overflow:'hidden',
        margin: 0,
        padding: 0,
    },

    openTitle:{
        fontSize: 15,
        fontWeight: '700',
        margin: 0,
        marginLeft: 10,
        color: 'black',
    },

    openSubTitle:{
        fontSize: 15,
        margin: 0,
        marginTop: 5,
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
