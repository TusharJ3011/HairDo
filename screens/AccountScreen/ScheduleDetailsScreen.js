import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import { _signIn } from '../../components/FirebaseAuth';

export const ScheduleDetailsScreen = ({route, navigation}) => {
    const data = route.params;
    console.log(data);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: data.date,
        });
    }, []);

    const Item = ({dataItem, ind}) => {
        return (
            <View style={[styles.serviceContainer, styles.boxShadow]}>
                <View style={styles.serviceInfoContainer}>
                    <View style={styles.serviceInfoSubContainer}>
                        <Text style={styles.serviceTitle}>{dataItem.name}</Text>
                    </View>
                </View>
                <View style={styles.serviceImageContainer}>
                    <Text style={styles.serviceTitle}>₹ {dataItem.price}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={[styles.shopContainer]}>
                    <View style={styles.shopInfoContainer}>
                        <Text style={styles.shopInfoTitle}>{data.name}</Text>
                        <Text style={styles.shopInfoSubTitle}>+91-{data.phone}</Text>
                        <Text style={styles.shopInfoSubTitle}>₹ {data.price}</Text>
                    </View>
                </View>
                <Text style={styles.servicesHead}>Services:</Text>

                {data.services.map((item, index)=>{
                    return(
                        <Item dataItem={item} key={index}/>
                    );
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

    shopContainer:{
        width: Dimensions.get("window").width -20,
        backgroundColor: "white",
        margin: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: 20,
    },

    shopInfoContainer:{
    },

    shopInfoTitle:{
        fontSize: 30,
        fontWeight: 'bold',
        margin: 0,
        paddingBottom: 0,
        color: 'black',
    },

    shopInfoSubTitle:{
        fontSize: 20,
        paddingVertical: 5,
        color: 'black',
    },

    servicesHead:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        margin: 10,
    },

    serviceContainer:{
        width: Dimensions.get("window").width -20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        paddingLeft: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },

    serviceInfoContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 10,
    },

    serviceInfoSubContainer:{},

    serviceTitle:{
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },

    servicePrice:{
        fontSize: 15,
        color: 'black'
    },

    serviceButton:{
        padding: 5,
        borderRadius: 50,
        alignItems: 'center',
    },

    serviceButtonText:{
        color: 'white',
    },

    serviceImageContainer:{
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    serviceImage:{
        width: 100,
        height: 100,
        resizeMode: 'stretch',
        overflow:'hidden',
        margin: 0,
        padding: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },

    boxShadow:{},

    checkoutButton:{
        width: Dimensions.get("window").width -20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#743b8a',
        marginBottom: 10,
        borderRadius: 10,
    },

    checkoutButtonText:{
        fontSize: 20,
        fontWeight: 'bold',
    },

    netPriceContainer:{
        width: Dimensions.get("window").width -20,
        padding: 5,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 5,
    },

    netPriceContainerText:{
        fontSize: 20,
        fontWeight: 'bold',
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
