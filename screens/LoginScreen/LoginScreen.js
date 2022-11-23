import React from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../../components/Context';
import { Image, StyleSheet, Text, TouchableOpacity, View, Platform, ToastAndroid } from 'react-native'
import Logo from '../../assets/images/auth/logo.png';
import Google from '../../assets/images/auth/google.png';
import { _signIn, signOut } from '../../components/FirebaseAuth';
import firestore from '@react-native-firebase/firestore';

export const LoginScreen = ({navigation}) => {
  const globalContext = useContext(GlobalContext);

  const signInFn = async () => {
    await signOut();
    const result = await _signIn();
    // console.log(result);
    if (result.success){
      if (Platform.OS === 'android'){
        ToastAndroid.show("Login Successful", ToastAndroid.SHORT);
      }
      globalContext.setIsLogged(true);
      globalContext.setUsername(result.info.user.name);
      globalContext.setUserid(result.roll);
      let user_data = await firestore().collection('users').doc(result.roll).get();
      // if (user_data._exists){
      //   navigation.reset({
      //     index: 0,
      //     routes: [{name: 'Home'}],
      //   });
      // }else{
      //   navigation.navigate('Sign Up', {info:result.info, roll:result.roll})
      // }
      navigation.navigate('Home');
    }else{
      if (Platform.OS === 'android'){
        ToastAndroid.show(result.reason, ToastAndroid.SHORT);
      }
      globalContext.setIsLogged(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>HairDo</Text>
      <TouchableOpacity
        style={styles.signBtn}
        onPress={() => {
          signInFn()
        }}
      >
        <Image source={Google} style={styles.google} />
        <Text style={styles.btnText}>SignUp/ Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  logo: {
    width: '50%',
    height: '12%'
  },
  title: {
    fontSize: 36,
    fontWeight: '500',
    color: 'black'
  },
  google: {
    width: 30,
    height: 30
  },
  signBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 170,
    backgroundColor: '#225599',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 6
  },
  btnText: {
    color: '#FFFFFF',
  }
})