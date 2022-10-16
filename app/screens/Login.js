import React,{useLayoutEffect, useState} from 'react';
import {
    SafeAreaView,ScrollView,
    StyleSheet,Text, View,
    TouchableOpacity,
} from 'react-native';
import { Colors, FontSizes } from '../helper/theme';
import { BtnSolid } from '../components/Buttons';
import Input from '../components/Input';

const App = ({navigation}) => {

    const [mail,setMail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <SafeAreaView style={{flex:1,backgroundColor:Colors.background,paddingHorizontal:20}}>
            <Text style={styles.title}>Please Login</Text>
            <View style={{justifyContent:'center'}}>
            <Input
                text="Email"
                value={mail}
                onTextchange={setMail}
            />
            <Input
                text="Password"
                value={password}
                onTextchange={setPassword}
                secureTextEntry = {true}
            />
            <BtnSolid text="Submit" click={()=>navigation.navigate('NavMain', {screen: 'Home'})} />
            </View>


        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    title:{
        color:Colors.primary1,
        fontSize:FontSizes.h,
        alignSelf:'center',
        marginVertical:40,
        fontFamily:'OpenSans-Bold',
    },
});

export default App;