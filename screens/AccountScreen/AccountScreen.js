import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, ScrollView, Platform } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../components/Context';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import {signOut } from '../../components/FirebaseAuth';


export const AccountScreen = ({navigation}) => {
    const globalContext = useContext(GlobalContext);
    let user = globalContext.userid;
    let temp = {_data:{name: '',
                email:"",
                phone:''}};
    const [userData, setUserData] = useState(temp);
    const getUserData = async() => {
        let user_data = await firestore().collection('users').doc(user).get();
        // console.log(user_data);
        if (user_data._exists){
            setUserData(user_data)
        }
    }

    useEffect(()=>{
        getUserData();
    }, [])

    const logout = () => {
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Pressable style={[styles.userContainer, styles.boxShadow]}>
                    <Image source={{uri:globalContext.userPic}} style={styles.userImage}/>
                    <View style={styles.userInfoContainer}>
                        <Text style={styles.userInfoTitle}>{userData._data.name}</Text>
                        <Text style={styles.userInfoSubTitle}>{userData._data.email}</Text>
                        <Text style={styles.userInfoSubTitle}>+91-{userData._data.phone}</Text>
                        <Pressable onPress={()=>{navigation.navigate('Edit Profile')}}><Text style={styles.userInfoLink}>Edit Profile</Text></Pressable>
                    </View>
                </Pressable>

                <View style={styles.multiButtonBox}>
                    <Pressable style={[styles.multiButtonContainer, styles.boxShadow]}
                    onPress={()=>{
                        if (userData._data.bookings.length !== 0){
                            navigation.navigate("Bookings")
                        }else{
                            navigation.navigate("No Screen", {text:'appointment', head:'Bookings'})
                        }
                    }}
                    >
                        <Image source={require("../../assets/images/icons/bookings.png")} style={styles.multiButtonImage}/>
                        <Text style={styles.multiButtonTitle}>Bookings</Text>
                    </Pressable>

                    <Pressable style={[styles.multiButtonContainer, styles.boxShadow]}
                    onPress={()=>{
                        navigation.navigate("Coming Soon")
                    }}
                    >
                        <Image source={require("../../assets/images/icons/settings.png")} style={styles.multiButtonImage}/>
                        <Text style={styles.multiButtonTitle}>Settings</Text>
                    </Pressable>

                    <Pressable style={[styles.multiButtonContainer, styles.boxShadow]}
                    onPress={()=>{navigation.navigate("About")}}
                    >
                        <Image source={require("../../assets/images/icons/about.png")} style={styles.multiButtonImage}/>
                        <Text style={styles.multiButtonTitle}>About</Text>
                    </Pressable>
                </View>

                <Pressable style={[styles.otherButtonContainer, styles.boxShadow]}
                onPress={()=>{
                    navigation.navigate("Coming Soon")
                }}
                >
                    <View style={styles.otherButtonSubContainer}>
                        <Image source={require("../../assets/images/icons/store.png")} style={styles.otherButtonImage}/>
                        <Text style={styles.otherButtonTitle}>Your Stores</Text>
                    </View>
                    <Image source={require("../../assets/images/icons/rightarrow.png")} style={styles.otherButtonImage2}/>
                </Pressable>

                <Pressable style={[styles.otherButtonContainer, styles.boxShadow]}
                onPress={()=>{
                    if (userData._data.shopid !== ""){
                        navigation.navigate("Schedule", {shop:userData._data.shopid})
                    }else{
                        navigation.navigate("No Screen", {text:'shops', head:'Schedule'})
                    }
                }}
                >
                    <View style={styles.otherButtonSubContainer}>
                        <Image source={require("../../assets/images/icons/schedule.png")} style={styles.otherButtonImage}/>
                        <Text style={styles.otherButtonTitle}>Your Schedule</Text>
                    </View>
                    <Image source={require("../../assets/images/icons/rightarrow.png")} style={styles.otherButtonImage2}/>
                </Pressable>

                <Pressable style={[styles.otherButtonContainer, styles.boxShadow]}
                onPress={()=>{logout();}}
                >
                    <View style={styles.otherButtonSubContainer}>
                        <Image source={require("../../assets/images/icons/logout.png")} style={styles.otherButtonImage}/>
                        <Text style={styles.otherButtonTitle}>Log Out</Text>
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

    userContainer:{
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

    userImage:{
        width: 70,
        height: 70,
        resizeMode: 'stretch',
        overflow:'hidden',
        margin: 0,
        padding: 0,
        borderRadius: 70,
    },

    userInfoContainer:{
        margin: 0,
    },

    userInfoTitle:{
        fontSize: 30,
        fontWeight: 'bold',
        margin: 0,
        color: 'black',
    },

    userInfoSubTitle:{
        fontSize: 15,
        color: 'black',
    },

    userInfoLink:{
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
        width: 30,
        height: 30,
        resizeMode: 'stretch',
        overflow:'hidden',
        margin: 0,
        padding: 0,
    },

    multiButtonTitle:{
        fontSize: 20,
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
        width: 30,
        height: 30,
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
        fontSize: 20,
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
