import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, ScrollView, Platform } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import { GlobalContext } from '../../components/Context';


export const OfferScreen = ({navigation}) => {
    const globalContext = useContext(GlobalContext);
    let user = globalContext.userid;
    const [offerList, setOfferList] = useState([]);
    // const [shopList, setShopList] = useState([]);

    const getOfferData = async() => {
        var offer_list = []
        let user_data = await firestore().collection('users').doc(user).get();
        // console.log(user_data);
        if (user_data._exists){
            offer_list = user_data._data.offers;
        }
        // console.log(offer_list);
        setOfferList(offer_list)
    }

    useEffect(()=>{
        getOfferData();
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                {offerList.map((item, index)=>{
                    return(
                        <Pressable style={[styles.otherButtonContainer, styles.boxShadow]} key={index}
                        onPress={()=>{navigation.navigate("Avail Offer", {data:item})}}
                        >
                            <View style={styles.otherButtonSubContainer}>
                                <Image source={require("../../assets/images/icons/offer.png")} style={styles.otherButtonImage}/>
                                <View>
                                    <Text style={styles.otherButtonTitle}>{item.title.slice(0, 30)}{item.title.length > 30 ? "..." : ""}</Text>
                                </View>
                            </View>
                            <Image source={require("../../assets/images/icons/rightarrow.png")} style={styles.otherButtonImage2}/>
                        </Pressable>
                );})}
                            
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

    otherButtonTitle:{
        fontSize: 15,
        fontWeight: '700',
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
