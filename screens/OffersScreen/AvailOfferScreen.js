import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, ScrollView, Platform, ImageBackground, ToastAndroid} from 'react-native';
import { useContext, useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import Clipboard from '@react-native-community/clipboard';
import Images from '../../components/Images';

const image = require('../../assets/images/offers/img1.jpg')

export const AvailOfferScreen = ({route, navigation}) => {
    var data = route.params?.data;
    var offercode = data.code1 + "" + data.code2 + "" +  data.code3 + "" +  data.code4
    // console.log(offercode);
    const copyToClipboard = () => {
        Clipboard.setString(offercode);
        if (Platform.OS === 'android'){
            ToastAndroid.show("Offer Code copied", ToastAndroid.SHORT);
        }
    }
    var expiryDate = new Date(data.expiry.seconds*1000);
    var expiryDateStr = expiryDate.getDate() + "/" + expiryDate.getMonth() + "/" + expiryDate.getFullYear();

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <ImageBackground source={Images[data.img]} resizeMode="stretch" overflow='hidden'  style={styles.cardSakshaat} imageStyle={{ borderRadius: 10}}>
                    <View style={styles.cardLogo}></View>
                    <View style={styles.cardCode}>
                        <Text style={styles.offerSubCodeText}>{data.code1}</Text>
                        <Text style={styles.offerSubCodeText}>{data.code2}</Text>
                        <Text style={styles.offerSubCodeText}>{data.code3}</Text>
                        <Text style={styles.offerSubCodeText}>{data.code4}</Text>
                    </View>
                    <View style={styles.cardDetails}>
                        <View style={styles.cardSubDetails}>
                            <Text style={styles.cardDetailsHead}>Offer Holder</Text>
                            <Text style={styles.cardDetailsText}>TUSHAR JAIN</Text>
                        </View>
                        <View style={styles.cardSubDetails}>
                            <Text style={styles.cardDetailsHead}>Expires</Text>
                            <Text style={styles.cardDetailsText}>{expiryDateStr}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>

            <ScrollView>
                <View style={styles.otherContainer}>
                    <Text style={styles.offerTitle}>{data.title}</Text> 
                    <View>
                        <Text style={styles.tcHead}>Terms and Conditions:</Text>
                        <Text>{data.tandc}</Text>
                    </View>
                </View>                           
            </ScrollView>

            <Pressable style={styles.copyButton}
            onPress={()=>(copyToClipboard())}>
                <Text style={styles.copyText}>Copy Offer Code</Text>
            </Pressable>
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

    cardContainer:{
        backgroundColor: '#dddddd',
        width: '100%',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor:'#1798C7',
    },

    cardSakshaat:{
        width: Dimensions.get("window").width -50,
        padding: 0,
        height: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    cardCode:{
        display: 'flex',
        width: Dimensions.get("window").width -100,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    offerSubCodeText:{
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',

    },

    cardDetails:{
        display: 'flex',
        width: Dimensions.get("window").width -80,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    cardSubDetails:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent:'flex-start'
    },

    cardDetailsHead:{
        color: '#bbbbbb',
        fontSize: 15,
        marginBottom: 5,
    },

    cardDetailsText:{
        color: 'white',
        fontSize: 15,
        marginBottom: 5,
    },

    otherContainer:{
        width: Dimensions.get("window").width -50,
        padding: 0,
        paddingTop: 40,
    }, 
    
    offerTitle:{
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 10,
    },

    tcHead:{
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },

    copyButton:{
        width: Dimensions.get("window").width -100,
        height: 50,
        backgroundColor: '#1798C7',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },

    copyText:{
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    }
});
