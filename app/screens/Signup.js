import React,{useLayoutEffect, useState} from 'react';
import {
    SafeAreaView,ScrollView,
    StyleSheet,Text, View,
    TouchableOpacity,
} from 'react-native';
import { Colors, FontSizes } from '../helper/theme';
import { BtnSolid } from '../components/Buttons';
import DropDown from '../components/DropDown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../components/Input';

const App = ({navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () =>
                <View style={{alignSelf:'center',marginStart:0}}>
                    <Text style={{ fontSize: FontSizes.h2, color: Colors.grey8C, fontFamily: 'OpenSans-SemiBold', alignSelf: 'center', textAlign: 'center' }}>
                        Signup</Text>
                </View>,
            headerRight: () => null,
            headerLeft: () => <HeaderLeftButton navigation={navigation} />,
        });
    }, [navigation]);

    const HeaderLeftButton = ({ navigation }) => {
        return (
            <TouchableOpacity onPress={() => navigation.pop()} style={{
                    backgroundColor: '#ffffff',
                    height: 40,
                    width: 40,
                    margin: 20,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: Colors.primary1,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 3,
                    paddingLeft: 0,
                }}>
                <Ionicons name="chevron-back" size={20} color={Colors.greyA7} />
            </TouchableOpacity>
        );
    };

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

            <BtnSolid text="Submit" />

            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    title:{
        color:Colors.primary1,
        fontSize:FontSizes.h,
        alignSelf:'center',
        marginTop:20,
        fontFamily:'OpenSans-Bold',
    },
});


export default App;
