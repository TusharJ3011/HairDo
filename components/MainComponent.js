import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appearance } from 'react-native';

// Screens
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { AccountScreen } from '../screens/AccountScreen/AccountScreen';
import { AboutScreen } from '../screens/AccountScreen/AboutScreen';
import { BookingScreen } from '../screens/AccountScreen/BookingScreen';
import { OfferScreen } from '../screens/OffersScreen/OfferScreen';
import { AvailOfferScreen } from '../screens/OffersScreen/AvailOfferScreen';
import { LoginScreen } from '../screens/LoginScreen/LoginScreen';
import { SignUpScreen } from '../screens/LoginScreen/SignUpScreen';
import { EditProfileScreen } from '../screens/AccountScreen/EditProfileScreen';
// import {BookingDetailsScreen} from '../screens/AcountScreen.BookingDetailsScreen'

export const MainContainer = () => {
    const MainStack = createStackNavigator();
    return (
        // <NavigationContainer>
        <MainStack.Navigator initialRouteName='Edit Profile'
        screenOptions={{
        presentation:'modal',
        // gestureEnabled:true,
        headerStyle:{
            backgroundColor:'white',
            borderBottomColor:'#1798c7',
            borderBottomWidth:3,
        },
        }}
        >
            <MainStack.Screen name="Login" component={LoginScreen} />
            <MainStack.Screen name="Sign Up" component={SignUpScreen} />
            <MainStack.Screen name="Edit Profile" component={EditProfileScreen} />
            <MainStack.Screen name="Home" component={HomeScreen} />
            <MainStack.Screen name="Account" component={AccountScreen} />
            <MainStack.Screen name="About" component={AboutScreen} />
            <MainStack.Screen name="Booking" component={BookingScreen} />
            {/* <MainStack.Screen name="Booking Details" component={BookingDetailsScreen} /> */}
            <MainStack.Screen name="Offers" component={OfferScreen} />
            <MainStack.Screen name="Avail Offer" component={AvailOfferScreen} />

        </MainStack.Navigator>
        // </NavigationContainer>
    );
}