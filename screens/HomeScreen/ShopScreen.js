import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import { _signIn } from '../../components/FirebaseAuth';

export const ShopScreen = ({route, navigation}) => {
    // let user = '20ucs211';
    let temp = {name: '',
                rating:"",
                address:'',
                gendertype: '',
                services:[]};
    // const [userData, setUserData] = useState(temp);
    const [shopData, setShopData] = useState(temp);
    const [serviceList, setServiceList] = useState([]);
    const [priceList, setPriceList] = useState([]);
    const [netPrice, setNetPrice] = useState(0);
    const [cardData, setCardData] = useState([]);

    const getShopData = async() => {
        const shop_data = await firestore().collection('shop').doc(route.params?.shopid).get();
        if (shop_data._exists){
            let gendertype = '';
            if (shop_data._data.type[0]){
                gendertype += "Men, ";
            }
            if (shop_data._data.type[1]){
                gendertype += "Women, ";
            }
            if (shop_data._data.type[2]){
                gendertype += "Pet, ";
            }
            gendertype = gendertype.slice(0, -2)
            shop_data._data.gendertype = gendertype;
            let temp_list = []
            for (var i=0; i<shop_data._data.services.length; i++){
                temp_list.push(["#1798C7", "Add"]);
            }
            setCardData(temp_list);
            setShopData(shop_data._data);

            navigation.setOptions({
                headerTitle: shop_data._data.name,
            });
        }
    }

    useEffect(()=>{
        getShopData();
    }, []);

    const changeForCheckout = (service, price) => {
        var serviceListClone = serviceList;
        var priceListClone = priceList;
        var index = serviceListClone.indexOf(service);
        if (index === -1){
            serviceListClone.push(service)
            priceListClone.push(price);
            setServiceList(serviceListClone);
            setPriceList(priceListClone);
            setNetPrice(netPrice+price);
        } else {
            serviceListClone.splice(index, 1);
            priceListClone.splice(index, 1)
            setServiceList(serviceListClone)
            setPriceList(priceListClone);
            setNetPrice(netPrice - price);
        }
    }

    const Item = ({data, ind}) => {
        const onButtonPress = () => {
            var tempCardData = cardData;
            if (tempCardData[ind][0] === '#1798C7'){
                tempCardData[ind][0] = 'red';
            }else{
                tempCardData[ind][0] = '#1798C7';
            }
            if (tempCardData[ind][1] === 'Add'){
                tempCardData[ind][1] = 'Remove';
            }else{
                tempCardData[ind][1] = 'Add';
            }
            setCardData(tempCardData);
            changeForCheckout(data.name, parseInt(data.price));
        };

        return (
            <View style={[styles.serviceContainer, styles.boxShadow]}>
                <View style={styles.serviceInfoContainer}>
                    <View style={styles.serviceInfoSubContainer}>
                        <Text style={styles.serviceTitle}>{data.name}</Text>
                        <Text style={styles.servicePrice}>Rs. {data.price}</Text>
                    </View>
                    <Pressable style={[styles.serviceButton, {backgroundColor: cardData[ind][0]}]}
                    onPress={()=>{onButtonPress();}}
                    >
                        <Text style={styles.serviceButtonText}>{cardData[ind][1]}</Text>
                    </Pressable>
                </View>
                <View style={styles.serviceImageContainer}>
                    <Image source={require("../../assets/images/home/shopglobal.png")} style={styles.serviceImage}/>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={[styles.shopContainer]}>
                    <View style={styles.shopInfoContainer}>
                        <Text style={styles.shopInfoTitle}>{shopData.name}</Text>
                        <Text style={styles.shopInfoSubTitle}>{shopData.gendertype}</Text>
                        <Text style={styles.shopInfoSubTitle}>{shopData.address}</Text>
                    </View>
                    <View style={styles.shopInfoRatingContainer}>
                        <Text style={styles.shopInfoRatingText}>{shopData.rating} ⭐</Text>
                    </View>
                </View>

                {shopData.services.map((item, index)=>{
                    return(
                        <Item data={item} ind={index} key={index}/>
                    );
                })}
                {/* <Item /> */}
            </ScrollView>
            {/* {serviceList.map((item, index)=>{
                return(<Text style={{color:'black'}}>{item} - {priceList[index]}</Text>)
            })}
            <Text style={{color:'black'}}>{netPrice}</Text> */}
            <View style={styles.netPriceContainer}>
                <Text style={styles.netPriceContainerText}>₹ {netPrice}</Text>
            </View>
            <Pressable style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Make a Appointment</Text>
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

    shopInfoRatingContainer:{
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: '#83f285',
        height: 30,
        borderRadius: 20,
    },

    shopInfoRatingText:{
        fontSize: 15,
        color: 'black',
        fontWeight: '500',
    },

    shopInfoTitle:{
        fontSize: 30,
        fontWeight: 'bold',
        margin: 0,
        paddingBottom: 15,
        color: 'black',
    },

    shopInfoSubTitle:{
        fontSize: 15,
        paddingVertical: 5,
        color: '#777777',
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

    serviceImageContainer:{},

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
