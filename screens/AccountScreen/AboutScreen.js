import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, ScrollView, Platform } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';


export const AboutScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Pressable style={[styles.appContainer, styles.boxShadow]}>
                    <Image source={require("../../assets/images/auth/logo.png")} style={styles.appImage}/>
                    <View style={styles.appInfoContainer}>
                        <Text style={styles.appInfoTitle}>HairDo</Text>
                        <Text style={styles.appInfoSubTitle}>0.0.1 v1</Text>
                        <Text style={styles.appInfoSubTitle}>23rd November 2022</Text>
                        <Text style={styles.appInfoSubTitle}>GNU General Public Use License v3</Text>
                    </View>
                </Pressable>

                <View style={styles.multiButtonBox}>
                    <Pressable style={[styles.multiButtonContainer, styles.boxShadow]}
                    onPress={()=>{
                        navigation.navigate("Coming Soon")
                    }}
                    >
                        <Image source={require("../../assets/images/icons/terms.png")} style={styles.multiButtonImage}/>
                        <Text style={styles.multiButtonTitle}>Terms and</Text>
                        <Text style={styles.multiButtonTitle}>Conditions</Text>
                    </Pressable>

                    <Pressable style={[styles.multiButtonContainer, styles.boxShadow]}
                    onPress={()=>{
                        navigation.navigate("Coming Soon")
                    }}
                    >
                        <Image source={require("../../assets/images/icons/privacy.png")} style={styles.multiButtonImage}/>
                        <Text style={styles.multiButtonTitle}>Privacy</Text>
                        <Text style={styles.multiButtonTitle}>Policy</Text>
                    </Pressable>

                    <Pressable style={[styles.multiButtonContainer, styles.boxShadow]}
                    onPress={()=>{
                        navigation.navigate('Developers');
                    }}
                    >
                        <Image source={require("../../assets/images/icons/developers.png")} style={styles.multiButtonImage}/>
                        <Text style={styles.multiButtonTitle}>Developers</Text>
                    </Pressable>
                </View>

                <Pressable style={[styles.otherButtonContainer, styles.boxShadow]}
                onPress={()=>{
                    navigation.navigate("Coming Soon")
                }}
                >
                    <View style={styles.otherButtonSubContainer}>
                        <Image source={require("../../assets/images/icons/feedback.png")} style={styles.otherButtonImage}/>
                        <Text style={styles.otherButtonTitle}>Send Feedback</Text>
                    </View>
                    <Image source={require("../../assets/images/icons/rightarrow.png")} style={styles.otherButtonImage2}/>
                </Pressable>

                <Pressable style={[styles.otherButtonContainer, styles.boxShadow]}
                onPress={()=>{
                    navigation.navigate('OpenSource')
                }}
                >
                    <View style={styles.otherButtonSubContainer}>
                        <Image source={require("../../assets/images/icons/openlib.png")} style={styles.otherButtonImage}/>
                        <Text style={styles.otherButtonTitle}>Open Source Libraries</Text>
                    </View>
                    <Image source={require("../../assets/images/icons/rightarrow.png")} style={styles.otherButtonImage2}/>
                </Pressable>

                <Pressable style={[styles.otherButtonContainer, styles.boxShadow]}
                onPress={()=>{
                    navigation.navigate("Coming Soon")
                }}
                >
                    <View style={styles.otherButtonSubContainer}>
                        <Image source={require("../../assets/images/icons/license.png")} style={styles.otherButtonImage}/>
                        <Text style={styles.otherButtonTitle}>Licenses and Registrations</Text>
                    </View>
                    <Image source={require("../../assets/images/icons/rightarrow.png")} style={styles.otherButtonImage2}/>
                </Pressable>
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

    appContainer:{
        backgroundColor: "white",
        width: Dimensions.get("window").width -20,
        margin: 10,
        padding: 20,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    appImage:{
        width: 90,
        height: 70,
        resizeMode: 'stretch',
        overflow:'hidden',
        margin: 0,
        padding: 0,
    },

    appInfoContainer:{
        margin: 0,
    },

    appInfoTitle:{
        fontSize: 30,
        fontWeight: 'bold',
        margin: 0,
        color: 'black',
    },

    appInfoSubTitle:{
        fontSize: 15,
        color: 'black',
    },

    appInfoLink:{
        fontSize: 15,
        color: 'blue',
        marginTop: 10,
        textDecorationLine: 'underline',
    },

    multiButtonBox:{
        display: 'flex',
        flexDirection: 'row'
    },
    
    multiButtonContainer:{
        backgroundColor: "white",
        width: (Dimensions.get("window").width -60)/3,
        margin: 10,
        padding: 20,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    multiButtonImage:{
        width: 50,
        height: 50,
        resizeMode: 'stretch',
        overflow:'hidden',
        margin: 0,
        padding: 0,
    },

    multiButtonTitle:{
        fontSize: 15,
        fontWeight: '500',
        marginTop: 10,
        color: 'black',
    },

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
        borderRadius: 70,
    },

    otherButtonTitle:{
        fontSize: 15,
        fontWeight: '500',
        margin: 0,
        marginLeft: 10,
        color: 'black',
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
