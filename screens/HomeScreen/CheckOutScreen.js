import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, ScrollView, Platform } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import { Dropdown } from 'react-native-element-dropdown';
import moment from 'moment';

export const CheckOutScreen = ({ route, navigation }) => {
  const data = route.params;
  // console.log(data);

  // useEffect(()=>{
  //     navigation.setOptions({
  //         headerTitle: data.shopname,
  //     });
  // }, []);

  const Item = ({ dataItem, ind }) => {
    return (
      <View style={[styles.serviceContainer, styles.boxShadow]}>
        <View style={styles.serviceInfoContainer}>
          <View style={styles.serviceInfoSubContainer}>
            <Text style={styles.serviceTitle}>Haircut</Text>
          </View>
        </View>
        <View style={styles.serviceImageContainer}>
          <Text style={styles.serviceTitle}>₹ 500</Text>
        </View>
      </View>
    )
  }

  const data_hour = [
    { label: '10:00', value: '1' },
    { label: '11:00', value: '2' },
    { label: '12:00', value: '3' },
    { label: '13:00', value: '4' },
    { label: '14:00', value: '5' },
    { label: '15:00', value: '6' },
  ];

  const [hour, setHour] = useState(null);
  const [date, setDate] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const dateList = []

  for (let i = 0; i <= 7; i += 1) {
    let date = moment().add(i, 'd').format('DD-MM-YYYY');
    dateList.push({ label: date, value: (i + 1).toString() })
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={[styles.shopContainer]}>
          <View style={styles.shopInfoContainer}>
            <Text style={styles.shopInfoTitle}>Style Era</Text>
            <Text style={styles.shopInfoSubTitle}>₹ 500</Text>
          </View>
        </View>
        <Text style={styles.servicesHead}>Services:</Text>

        {/* {data.services.map((item, index)=>{
                    return(
                        <Item dataItem={item} key={index}/>
                    );
                })} */}
        <Item />
        <Item />
        <Dropdown
          style={[styles.dropdown, isFocus]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data_hour}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Hour' : 'Select Hour'}
          searchPlaceholder="Search..."
          value={hour}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.hour);
            setIsFocus(false);
          }}
        />

        <Dropdown
          style={[styles.dropdown, isFocus]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dateList}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Date' : 'Select Date'}
          searchPlaceholder="Search..."
          value={date}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.date);
            setIsFocus(false);
          }}
        />

        <Pressable
          style={styles.cta}
        >
          <Text style={styles.checkoutButtonText}>Make a Appointment</Text>
        </Pressable>

      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    height: "100%",
    alignItems: 'center',
  },

  shopContainer: {
    width: Dimensions.get("window").width - 20,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 20,
  },

  shopInfoContainer: {
  },

  shopInfoTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 0,
    paddingBottom: 0,
    color: 'black',
  },

  shopInfoSubTitle: {
    fontSize: 20,
    paddingVertical: 5,
    color: 'black',
  },

  servicesHead: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    margin: 10,
  },

  serviceContainer: {
    width: Dimensions.get("window").width - 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },

  serviceInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 10,
  },

  serviceInfoSubContainer: {},

  serviceTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  servicePrice: {
    fontSize: 15,
    color: 'black'
  },

  serviceButton: {
    padding: 5,
    borderRadius: 50,
    alignItems: 'center',
  },

  serviceButtonText: {
    color: 'white',
  },

  serviceImageContainer: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  serviceImage: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  boxShadow: {},

  checkoutButton: {
    width: Dimensions.get("window").width - 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#743b8a',
    marginBottom: 10,
    borderRadius: 10,
  },

  checkoutButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  netPriceContainer: {
    width: Dimensions.get("window").width - 20,
    padding: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 5,
  },

  netPriceContainerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 30,
    marginHorizontal: 10,
    marginBottom: 2
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  cta: {
    width: Dimensions.get("window").width - 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#743b8a',
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 60,
  },
  checkoutButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

const generateBoxShadowStyle = (xOffset, yOffset, shadowColorIos, shadowOpacity, shadowRadius, elevation, shadowColorAndroid,) => {
  if (Platform.OS === 'ios') {
    styles.boxShadow = {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
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