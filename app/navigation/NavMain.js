import React from 'react';
import {StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../screens/Splash';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Profile from '../screens/Profile';

const Stack = createStackNavigator();

export default function App() {

    return (
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerTitleAlign: 'center', headerShadowVisible: false, headerStyle: { height: 70 } }}>
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: true }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    leftButton: {
        backgroundColor: '#ffffff',
        height: 40,
        width: 40,
        paddingLeft: 10,
        margin: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    header: {
        // fontSize: FontSizes.h2,
        fontFamily: 'OpenSans-SemiBold',
        // color: Colors.grey8C,
        // marginLeft: 50,
    },
});
