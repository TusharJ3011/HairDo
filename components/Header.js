import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useContext } from 'react';
import { GlobalContext } from './Context';

export default function Header({ title }) {
    const globalContext = useContext(GlobalContext);

  const { colors } = useTheme()

  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View>
        <Text style={[styles.headerText, { color: colors.text }]}>{title}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Account")
        }}
      >
        <Image source={{uri:globalContext.userPic}} style={styles.accImage}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    // width: Dimensions.get('screen').width,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },

  accImage:{
    width: 40,
    height: 40,
    resizeMode: 'stretch',
    overflow:'hidden',
    margin: 0,
    padding: 0,
    borderRadius: 70,
},
})