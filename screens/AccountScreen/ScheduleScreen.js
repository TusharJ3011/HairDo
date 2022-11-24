import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, ScrollView, Platform } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';


export const ScheduleScreen = ({route, navigation}) => {
    let shopid = route.params?.shop;
    const [data, setData] = useState([]);
    const getData = async() => {
        let date = new Date();
        let dateStr = ('0'+date.getDate()).slice(-2) + "-" + (date.getMonth()+1) + '-' + date.getFullYear();
        console.log(dateStr);
        // dateStr = '25-11-2022'
        let schedule_data = await firestore().collection('schedule').doc(shopid).get();
        if (schedule_data._exists){
            let scheduleData = []
            if(schedule_data._data[dateStr] !== undefined){
                Object.entries(schedule_data._data[dateStr]).map(([k,v]) => {
                    scheduleData.push([(k+":"+'00'), v])  
                });
            }

            setData(scheduleData);
            // console.log(scheduleData);
        }
    }

    useEffect(()=>{
        getData();
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                {data.map((item)=>{
                return(
                <Pressable style={[styles.otherButtonContainer, styles.boxShadow]} key={item.shopname+item.shopid}
                onPress={()=>{
                    navigation.navigate("Schedule Details", {name:item[1].name, phone:item[1].phone, price:item[1].price, services:item[1].services, time:item[0]})
                }}
                >
                    <View style={styles.otherButtonSubContainer}>
                        <View>
                            <Text style={styles.otherButtonTitle}>{item[0]}</Text>
                            <Text style={styles.otherButtonSubTitle}>{item[1].name}</Text>
                        </View>
                    </View>
                    <Image source={require("../../assets/images/icons/rightarrow.png")} style={styles.otherButtonImage2}/>
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

    otherButtonImage2:{
        width: 15,
        height: 15,
        resizeMode: 'stretch',
        overflow:'hidden',
        margin: 0,
        padding: 0,
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
