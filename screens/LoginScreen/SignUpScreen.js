import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, ToastAndroid } from 'react-native';
import { useContext } from 'react';
import { GlobalContext } from '../../components/Context';
import User from '../../assets/images/account/userglobal.png';
import firestore from '@react-native-firebase/firestore';

export const SignUpScreen = ({route, navigation}) => {
  const globalContext = useContext(GlobalContext);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phno, setPhno] = useState('')
  const [gender, setGender] = useState('')
  // const [accType, setAccType] = useState('')
  const [address, setAddress] = useState('')

  const data = route.params;
  // setName(data.info.user.name);
  // setPhoto(data.info.user.photo);
  // setEmail(data.info.user.email);

  const signUpUser = () => {
    if (name !== '' && address !== '' && gender !== '' && phno !== '' && email !== ''){
      firestore()
        .collection('users')
        .doc(data.roll)
        .set({
          bookings:[],
          offers:[],
          email:email,
          gender:gender,
          name: name,
          phone: phno,
          roll: data.roll,
          address: address,
          shopid: '',
        })
        .then(() => {
          ToastAndroid.show("User successfully Signed Up", ToastAndroid.SHORT);
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        });
    }else{
      ToastAndroid.show("Please fill the form!", ToastAndroid.SHORT);
    }
  }


  return (
    <View style={styles.container}>
      <Image source={{uri:globalContext.userPic}} style={styles.userPic} />
      <View style={styles.subContainer}>
        <TextInput
          autoCapitalize='true'
          autoFocus
          onChangeText={(e) => setName(e)}
          placeholder='Name'
          style={styles.inpBox}
          keyboardType="default"
        />
        <TextInput
          autoFocus
          onChangeText={(e) => setEmail(e)}
          placeholder='Email'
          style={styles.inpBox}
          keyboardType="email-address"
        />
        <TextInput
          autoFocus
          onChangeText={(e) => setPhno(e)}
          placeholder='Phone Number'
          style={styles.inpBox}
          keyboardType="number-pad"
        />
        <TextInput
          autoFocus
          onChangeText={(e) => setGender(e)}
          placeholder='Gender'
          style={styles.inpBox}
          keyboardType="default"
        />
        {/* <TextInput
          autoFocus
          onChangeText={(e) => setAccType(e)}
          placeholder='Account Type'
          style={styles.inpBox}
          keyboardType="default"
        /> */}
        <TextInput
          autoFocus
          onChangeText={(e) => setAddress(e)}
          placeholder='Address'
          style={styles.inpBox}
          keyboardType="default"
          multiline
        />
      </View>
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={()=>{
          signUpUser();
        }}
      >
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingTop: 20,
  },
  userPic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  subContainer: {
    width: '100%',
  },
  inpBox: {
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 4,
  },
  saveBtn: {
    backgroundColor: '#1798C7',
    width: '100%',
    marginTop: 20,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  saveText: {
    color: 'white'
  }
})