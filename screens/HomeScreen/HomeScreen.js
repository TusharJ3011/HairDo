import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, ScrollView, Platform } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';


export const HomeScreen = () => {
    const Item = () => {
        return (
            <Pressable style={[styles.shopContainer, styles.boxShadow]}>
                <Image source={require("../../assets/images/home/shopglobal.png")} style={styles.shopImage}/>
                <View style={styles.shopInfoContainer}>
                    <View style={styles.shopInfoSubContainer}>
                        <Text style={styles.shopInfoTitle}>Barber Shop</Text>
                        <Text style={styles.shopInfoSubTitle}>Unisex, Pet</Text>
                    </View>
                    <View>
                        <Text style={styles.shopInfoRating}>3.5 ⭐</Text>
                    </View>
                </View>
            </Pressable>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Pressable style={styles.pressButton} 
                // onPress={()=>(navigation.navigate('OutOfStock'))}
                >
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgba(23, 152, 199, 1)', 'rgba(26, 245, 232, 0.31)']} style={styles.linearGradient}>
                        <Text style={styles.pressText}>Offers</Text>
                        <Image source={require("../../assets/images/home/offers.png")} style={styles.pressImage}></Image>
                    </LinearGradient>
                </Pressable>

                <Item />
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

    pressButton:{
        width: Dimensions.get("window").width -20,
        margin: 10,
        height: 100,
    },

    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

    pressText:{
        fontSize: 32,
        width: "40%",
        color: "#ffffff",
        fontWeight: "bold",
        padding: 10,
    },

    pressImage:{
        width: 70,
        height: 70,
        padding: 10,
        resizeMode:'contain',
        overflow:'hidden',
    },

    shopContainer:{
        backgroundColor: "white",
        margin: 10,
        borderRadius: 10,
    },

    boxShadow:{},

    shopImage:{
        width: Dimensions.get("window").width -20,
        height: 200,
        resizeMode: 'stretch',
        overflow:'hidden',
        margin: 0,
        padding: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    shopInfoContainer:{
        display:"flex",
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    shopInfoSubContainer:{
        margin: 0,
    },

    shopInfoTitle:{
        fontSize: 30,
        fontWeight: 'bold',
        margin: 0,
        color: 'black',
    },

    shopInfoSubTitle:{
        fontSize: 15,
        color: 'black',
    },

    shopInfoRating:{
        fontSize: 15,
        color: 'black',
        backgroundColor: '#83f285',
        borderRadius: 20,
        padding: 10,
        fontWeight: '500',
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
