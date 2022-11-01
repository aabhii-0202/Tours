import React, {useLayoutEffect,useEffect,useState} from 'react';

import {
    SafeAreaView,ScrollView,
    StyleSheet,Image,
    Text, TextInput, View, Keyboard,
TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import { Colors, FontSizes } from '../helper/theme';
import { BtnSolid } from '../components/Buttons';


const App = ({navigation,item}) => {


    return (
        <SafeAreaView style={{flex:1,backgroundColor:Colors.background}}>
        <ScrollView style={{paddingHorizontal:24}}>
        <Text>Hi</Text>
        </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({

});


export default App;
