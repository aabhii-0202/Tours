import React, {useLayoutEffect,useEffect,useState} from 'react';

import {
    SafeAreaView,ScrollView,
    StyleSheet,Image,
    Text, TextInput, View,
    TouchableOpacity,
} from 'react-native';
import { Colors, FontSizes } from '../helper/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../components/Input';
import { BtnSolid } from '../components/Buttons';


const App = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () =>
                <View style={{alignSelf:'center',marginStart:0}}>
                    <Text style={{ fontSize: FontSizes.h2, color: Colors.grey8C, fontFamily: 'OpenSans-SemiBold', alignSelf: 'center', textAlign: 'center' }}>
                        Profile</Text>
                </View>,
            headerRight: () => <HeaderRightButton navigation={navigation} />,
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
                <Ionicons name="chevron-back" size={20} color={Colors.primary1} />
            </TouchableOpacity>
        );
    };

    const HeaderRightButton = ({ navigation }) => {
        return (
            <TouchableOpacity style={{
                flexDirection:'row',
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
                <Ionicons name="star" size={20} color={Colors.primary1} />
            </TouchableOpacity>
        );
    };

    const [name,setName] = useState('Abhishek');
    const [mail,setMail] = useState('abhisehksingh1911a5@gmail.com');

    const [currentpass, setcurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmNewPass, setConfirmNewPass] = useState(''); 

    return (
        <SafeAreaView style={{flex:1,backgroundColor:Colors.background}}>
        <ScrollView style={{paddingHorizontal:24}}>
        <Text style={styles.title}>Your Account Settings</Text>
        <Image style={{
            height:150,
            width:150,
            borderRadius:200,
            alignSelf:'center',
            marginTop:20,
        }}
            source={require('../assets/images/avatar.png')}/>
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

        <BtnSolid text="Update Profile" />
        <View style={{height:1,backgroundColor:Colors.grey8C, marginVertical:40}}/>
        <Text style={styles.title}>Password Change</Text>
        <Input
            text="Current Password"
            value={currentpass}
            onTextchange={setcurrentPass}
            secureTextEntry = {true}
        />
        <Input
            text="New Password"
            value={newPass}
            onTextchange={setNewPass}
            secureTextEntry = {true}
        />
        <Input
            text="Confirm Password"
            value={confirmNewPass}
            onTextchange={setConfirmNewPass}
            secureTextEntry = {true}
        />
        <BtnSolid text="Update Password" />
        <View style={{height:20}}/>
        </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
 title:{
    fontFamily:'OpenSans-Bold',
    fontSize:FontSizes.h,
    color:Colors.primary1,
    marginTop:20,
    alignSelf:'center',
 }
});


export default App;
