import React, { useState } from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../../components/Context';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid } from 'react-native'
import User from '../../assets/images/account/userglobal.png';
import firestore from '@react-native-firebase/firestore';

export const EditProfileScreen = ({navigation}) => {
  const globalContext = useContext(GlobalContext);
  const userroll = globalContext.userid;

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phno, setPhno] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')

  const EditUser = async () => {
    let user_data = await firestore().collection('users').doc(userroll).get();
    if (user_data._exists){
      let user_data_clone = user_data._data;
      if (name !== ''){
        user_data_clone.name = name;
      }
      if (address !== ''){
        user_data_clone.address = address;
      }
      if (gender !== ''){
        user_data_clone.gender = gender;
      }
      if (phno !== ''){
        user_data_clone.phone = phno;
      }
      if (email !== ''){
        user_data_clone.email = email;
      }     
      firestore()
        .collection('users')
        .doc(userroll)
        .set(user_data_clone)
        .then(() => {
          ToastAndroid.show("Profile Edited", ToastAndroid.SHORT);
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        });
      }else{
        ToastAndroid.show("An error occured. Try again later!", ToastAndroid.SHORT);
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
          EditUser();
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