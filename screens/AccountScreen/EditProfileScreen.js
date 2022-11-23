import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import User from '../../assets/images/account/userglobal.png';

export const EditProfileScreen = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phno, setPhno] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')

  return (
    <View style={styles.container}>
      <Image source={User} style={styles.userPic} />
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