import React, {useLayoutEffect,useEffect,useState} from 'react';
import {
    SafeAreaView,ScrollView,
    StyleSheet,Image,Dimensions,
    Text, View,
    TouchableOpacity,
} from 'react-native';
import { Colors, FontSizes } from '../helper/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Input from '../components/Input';
import { BtnSolid } from '../components/Buttons';
import { getMe, updateDetails, updatePhoto, updatePassword } from '../api/user';
import Spinner from 'react-native-loading-spinner-overlay';
import { Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';


const App = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () =>
                <View style={{alignSelf:'center',marginStart:0}}>
                    <Text style={{ fontSize: FontSizes.h2, color: Colors.grey8C, fontFamily: 'OpenSans-SemiBold', alignSelf: 'center', textAlign: 'center' }}>
                        Profile</Text>
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
    const nav = useNavigation();

    useEffect(()=>{
        async function getMydata() {
            const res = await getMe();
            if (res.status === 'success'){
                const data = res.data.data;
                setName(data.name);
                setMail(data.email);
                setid(data._id);
                setloading(false);
            }
            else {
                setloading(false);
                nav.reset({
                        index: 0,
                        routes: [{name: 'NavAuth'}],
                });
            }
        }
        getMydata();
    },[nav, navigation]);

    const updateData = async () => {
        setloading(true);
        if (name === '' || mail === ''){
            setsnackbarText('Name and email must be present');
            setsnackbar(true);
            setloading(false);
        }
        else {
            const credentials = {
                'name': name,
                'email': mail,
            };
            const res = await updateDetails(credentials);
            if (res.status && res.status === 'success'){
                setName(res.data.user.name);
                setMail(res.data.user.email);
            }
            else {
                setName('');
                setMail('');
            }
            setloading(false);
        }
    };

    const updatePass = async () => {
        setloading(true);
        if (currentpass === '' || newPass === '' || confirmNewPass === ''){
            setsnackbarText('Enter passwords');
            setsnackbar(true);
            setloading(false);
        }
        else {
            const credentials = {
                'paswordCurrent':  currentpass,
                'password': newPass,
                'passwordConfirm': confirmNewPass,
            };

            const res = await updatePassword(credentials);
            if (res.status === 'success'){
                console.log(res.token);
                await AsyncStorage.setItem('@token',res.token);
                setloading(false);
                setsnackbarText('Password Reset Successfully');
                setsnackbar(true);
            }

            console.log(res);
            setloading(false);
        }
    };

    const [loading, setloading] = useState(true);
    const [snackbar, setsnackbar] = useState(false);
    const [snackbarText, setsnackbarText] = useState('');

    const [name,setName] = useState('');
    const [mail,setMail] = useState('');
    const [id, setid] = useState('');

    const [currentpass, setcurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmNewPass, setConfirmNewPass] = useState('');

    return (
        <SafeAreaView style={{flex:1,backgroundColor:Colors.background}}>
        <ScrollView style={{paddingHorizontal:24}}>
        <Spinner
            visible={loading}
            textContent={'Please Wait...'}
            textStyle={{ color: '#FFF' }}
        />
        <Text style={styles.title}>Your Account Settings</Text>
        <View>
            <Image style={{
                height:150,
                width:150,
                borderRadius:200,
                alignSelf:'center',
                marginTop:20,
            }}
                source={require('../assets/images/avatar.png')}/>
            {/* <TouchableOpacity
            style={{
                position:'absolute',
                bottom:0, right:100,

            }}
            >
                <AntDesign name="edit" size={30} color={Colors.primary1}/>
            </TouchableOpacity> */}
        </View>
        <Input
            text="Id:"
            value={id}
            onTextchange={setMail}
            noinput={true}
        />
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

        <BtnSolid text="Update Profile" click={updateData}/>
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
        <BtnSolid text="Update Password" click={updatePass}/>
        <View style={{height:20}}/>
        </ScrollView>
        <Snackbar
                visible={snackbar}
                onDismiss={()=>setsnackbar(false)}
                style={{ width: Dimensions.get('window').width - 15 }}
                action={{
                label: 'Ok',
            }}>{snackbarText}</Snackbar>
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
 },
});


export default App;
