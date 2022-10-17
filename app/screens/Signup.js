import React,{useLayoutEffect, useState} from 'react';
import {
    SafeAreaView,ScrollView,
    StyleSheet,Text,Dimensions,
    TouchableOpacity,Keyboard,
} from 'react-native';
import { Colors, FontSizes } from '../helper/theme';
import { BtnSolid } from '../components/Buttons';
import DropDown from '../components/DropDown';
import Input from '../components/Input';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from 'react-native-paper';
import { signup } from '../api/auth';

const App = ({navigation}) => {

    const [name,setName] = useState('test');
    const [mail,setMail] = useState('user5@gmail.com');
    const [password, setPassword] = useState('test1234');
    const [confirm, setConfirm] = useState('test1234');
    const [loading, setloading] = useState(false);
    const [snackbar, setsnackbar] = useState(false);
    const [snackbarText, setsnackbarText] = useState('');

    const data = ['user','guide','lead-guide'];
    const [selected,setSelected] = useState();


    const signupClicked = async () => {
        Keyboard.dismiss();
        if (mail === '' || password === '' || confirm === '' || name === '') {
            setsnackbarText('Please Fill all the credentials');
            setsnackbar(true);
        }
        else {
            let credentials = {
                'name': name,
                'email': mail,
                'password': password,
                'passwordConfirm': confirm,
                'role': selected,
            };
            console.log(credentials);
            setloading(true);
            const res = await signup(credentials);
            if (res.status === 'success'){
                await AsyncStorage.setItem('@token',res.token);
                await AsyncStorage.setItem('@id',res.data.user.photo);
                await AsyncStorage.setItem('@name',res.data.user.name);
                await AsyncStorage.setItem('@email',res.data.user.email);
                setloading(false);
                navigation.navigate('NavMain', {screen: 'Home'});
            }
            else {
                setsnackbarText('Email Already registered, Try with different mail');
                setsnackbar(true);
                setloading(false);
            }
        }
    };


    return (
        <SafeAreaView style={{flex:1,backgroundColor:Colors.background,paddingHorizontal:20}}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Spinner
                visible={loading}
                textContent={'Please Wait...'}
                textStyle={{ color: '#FFF' }}
            />
            <Snackbar
                visible={snackbar}
                onDismiss={()=>setsnackbar(false)}
                style={{ width: Dimensions.get('window').width * 0.9 }}
                action={{
                label: 'Ok',
                }}>{snackbarText}</Snackbar>
            <Text style={styles.title}>Create New Account</Text>
            <Input
                text="Name"
                value={name}
                onTextchange={setName}
            />
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
            <Input
                text="Confirm"
                value={confirm}
                onTextchange={setConfirm}
                secureTextEntry = {true}
            />

            <DropDown
                data={data}
                lable="Select your role"
                selected={selected}
                setSelected={setSelected}
            />

            <BtnSolid text="Submit"  click={signupClicked} />
            <TouchableOpacity
            style={{ alignSelf:'center' }}
            onPress={()=>navigation.navigate('NavAuth', {screen: 'Login'})}>
            <Text style={styles.t1}>Already Have an Account</Text>
            <Text style={styles.t2}>Login Insted</Text>
            </TouchableOpacity>

            </ScrollView>
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
