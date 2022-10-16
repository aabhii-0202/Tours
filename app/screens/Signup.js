import React,{useLayoutEffect, useState} from 'react';
import {
    SafeAreaView,ScrollView,
    StyleSheet,Text, View,
    TouchableOpacity,
} from 'react-native';
import { Colors, FontSizes } from '../helper/theme';
import { BtnSolid } from '../components/Buttons';
import DropDown from '../components/DropDown';
import Input from '../components/Input';

const App = ({navigation}) => {

    const [name,setName] = useState('');
    const [mail,setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const data = ['user','guide','lead-guide'];
    const [selected,setSelected] = useState();


    return (
        <SafeAreaView style={{flex:1,backgroundColor:Colors.background,paddingHorizontal:20}}>
            <ScrollView showsVerticalScrollIndicator={false}>
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

            <BtnSolid text="Submit"  click={()=>navigation.navigate('NavMain', {screen: 'Home'})} />
            <TouchableOpacity onPress={()=>navigation.navigate('NavAuth', {screen: 'Login'})}>
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
