import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Logo from '../../assets/images/auth/logo.png';
import Google from '../../assets/images/auth/google.png';

export const LoginScreen = () => {

  const signInFn = () => {

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