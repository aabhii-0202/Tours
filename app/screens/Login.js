import React, {useLayoutEffect,useEffect,useState} from 'react';

import {
    SafeAreaView,ScrollView,
    StyleSheet,Image,
    Text, TextInput, View,
    TouchableOpacity,
} from 'react-native';
// import { Colors, FontSizes } from 'app/helper/theme';


const App = ({navigation}) => {


    return (
        <SafeAreaView style={{flex:1}}>
        <ScrollView style={{paddingHorizontal:24}}>
        <Text style={{
            fontSize:50,
        }}>Login Screen</Text>
        </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({

});


export default App;
