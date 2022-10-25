import React from 'react';
import {StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Signup from '../screens/Signup';
import Login from '../screens/Login';

const Stack = createStackNavigator();

export default function App() {

    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerTitleAlign: 'center', headerShadowVisible: false, headerStyle: { height: 70 } }}>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

