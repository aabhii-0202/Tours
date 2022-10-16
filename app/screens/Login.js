import React,{useLayoutEffect, useState} from 'react';
import {
    SafeAreaView,ScrollView,
    StyleSheet,Text, View,Keyboard,
    TouchableOpacity,
} from 'react-native';
import { Colors, FontSizes } from '../helper/theme';
import { BtnSolid } from '../components/Buttons';
import Input from '../components/Input';
import { login } from '../api/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = ({navigation}) => {

    const [mail,setMail] = useState('guide@gmail.com');
    const [password, setPassword] = useState('test1234');
    const [loading, setloading] = useState(true);

    const loginClick = async () => {
        Keyboard.dismiss()
        if (mail === '' || password === '') {

        }
        else {
            let credentials = {
                'email': mail,
                'password': password,
            };
            setloading(true)
            const res = await login(credentials);
            setloading(false);
            if (res.status === 'success'){
                await AsyncStorage.setItem('@token',res.token);
                await AsyncStorage.setItem('@id',res.data.user.photo);
                await AsyncStorage.setItem('@name',res.data.user.name);
                navigation.navigate('NavMain', {screen: 'Home'});
            }
            else {
                
            }
        }
    };

    return (
        <SafeAreaView style={{flex:1,backgroundColor:Colors.background,paddingHorizontal:20}}>
            <Spinner
                visible={loading}
                textContent={'Please Wait...'}
                textStyle={{ color: '#FFF' }}
            />
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
            <BtnSolid text="Submit" click={loginClick} />
            <TouchableOpacity onPress={()=>navigation.navigate('NavAuth', {screen: 'Signup'})}>
            <Text style={styles.t1}>Don't Have an Account</Text>
            <Text style={styles.t2}>Create New Insted</Text>
            </TouchableOpacity>
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
    t1:{
        color:Colors.primary4,
        fontSize:FontSizes.p3,
        alignSelf:'center',
        marginTop:20,
        fontFamily:'OpenSans-SemiBold',
    },
    t2:{
        color:Colors.primary1,
        fontSize:FontSizes.p1,
        alignSelf:'center',
        fontFamily:'OpenSans-Bold',
        marginBottom:40,
    },
});

export default App;
