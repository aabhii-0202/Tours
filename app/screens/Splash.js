import React, {useLayoutEffect,useEffect,useState} from 'react';

import {
    SafeAreaView,ScrollView,
    Text, TextInput, View,
    StyleSheet,Image,
    TouchableOpacity,
} from 'react-native';

import {Colors, FontSizes} from '../helper/theme';

const App = ({navigation}) => {


    return (
        <SafeAreaView style={{flex:1}}>
        <ScrollView style={{paddingHorizontal:24}}>
        <TouchableOpacity onPress={()=>navigation.navigate('NavMain', {screen: 'Home'})}>
            <Text style={{
                fontSize:FontSizes.h,
            }}>Splash Screen</Text>
        </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
    );
};


export default App;
