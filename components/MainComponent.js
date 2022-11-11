import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appearance } from 'react-native';

// Screens
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { AccountScreen } from '../screens/AccountScreen/AccountScreen';
import { AboutScreen } from '../screens/AccountScreen/AboutScreen';
import { BookingScreen } from '../screens/AccountScreen/BookingScreen';

const MainStack = createStackNavigator();
const MainContainer = () => {
    return(
        <NavigationContainer>
            <MainStack.Navigator initialRouteName='home'
            screenOptions={{
            presentation:'modal',
            // gestureEnabled:true,
            headerStyle:{
                backgroundColor:'white',
                borderBottomColor:'#1798c7',
                borderBottomWidth:3,
            },
            }}>
                {/* <MainStack.Screen name="HomeMain" component={HomeScreen} options={{
                    headerShown:true,
                    headerTitle:"Rajeev Iron Traders",
                    headerTitleStyle:{
                        color:"#1798c7",
                        fontSize: 28,
                    }
                }}/> */}
                <MainStack.Screen name="home" component={HomeScreen}/>
                <MainStack.Screen name="account" component={AccountScreen}/>
                <MainStack.Screen name="about" component={AboutScreen}/>
                <MainStack.Screen name="booking" component={BookingScreen}/>
            </MainStack.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;