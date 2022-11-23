import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appearance } from 'react-native';
import { useContext } from 'react';
import { GlobalContext } from './Context';

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
import { ScheduleScreen } from '../screens/AccountScreen/ScheduleScreen';
import { ComingSoonScreen } from '../screens/GlobalScreen/ComingSoonScreen';
import { NoShopScreen } from '../screens/AccountScreen/NoShopScreen';
import Header from './Header';
// import {BookingDetailsScreen} from '../screens/AcountScreen.BookingDetailsScreen'

export const MainContainer = () => {
    const globalContext = useContext(GlobalContext);
    let initialR = '';
    // console.log(globalContext.isLogged);
    globalContext.isLogged ? initialR='Home' : initialR='Login';
    // initialR = 'Account';
    const MainStack = createStackNavigator();
    return (
        // <NavigationContainer>
        <MainStack.Navigator initialRouteName={initialR}
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
            <MainStack.Screen name="Login" component={LoginScreen} options={{
                headerShown:false,
            }}/>
            <MainStack.Screen name="Sign Up" component={SignUpScreen} />
            <MainStack.Screen name="Edit Profile" component={EditProfileScreen} />
            <MainStack.Screen name="Home" component={HomeScreen}  options={{
                headerTitle: () => <Header title={"HairDo"} />
            }} />
            <MainStack.Screen name="Account" component={AccountScreen} />
            <MainStack.Screen name="About" component={AboutScreen} />
            <MainStack.Screen name="Bookings" component={BookingScreen} />
            <MainStack.Screen name="Schedule" component={ScheduleScreen} />
            {/* <MainStack.Screen name="Booking Details" component={BookingDetailsScreen} /> */}
            <MainStack.Screen name="Offers" component={OfferScreen} />
            <MainStack.Screen name="Avail Offer" component={AvailOfferScreen} />
            <MainStack.Screen name="Coming Soon" component={ComingSoonScreen} />
            <MainStack.Screen name="No Shop" component={NoShopScreen} options={{
                headerTitle:'Schedule',
            }} />

        </MainStack.Navigator>
        // </NavigationContainer>
    );
}