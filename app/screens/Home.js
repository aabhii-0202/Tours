import React, {useLayoutEffect,useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    FlatList,
    Text, View,Dimensions,
    TouchableOpacity,
} from 'react-native';
import { Colors, FontSizes } from '../helper/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TourItem from '../components/TourItem';
import BookingItems from '../components/BookingItems';
import { getAllTour } from '../api/tours';
import { getMyBookings } from '../api/booking';
import Spinner from 'react-native-loading-spinner-overlay';
import { Snackbar } from 'react-native-paper';

const App = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () =>
                <View style={{alignSelf:'center',marginStart:0}}>
                    <Text style={{ fontSize: FontSizes.h2, color: Colors.grey8C, fontFamily: 'OpenSans-SemiBold', alignSelf: 'center', textAlign: 'center' }}>
                        All Tours</Text>
                </View>,
            headerRight: () => <HeaderRightButton navigation={navigation} />,
            headerLeft: () => <HeaderLeftButton navigation={navigation} />,
        });
    }, [navigation]);

    const HeaderLeftButton = ({ navigation }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('NavMain',{screen:'Profile'})} style={{
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
                <Ionicons name="person" size={20} color={Colors.primary1} />
            </TouchableOpacity>
        );
    };

    const HeaderRightButton = ({ navigation }) => {
        return (
            <TouchableOpacity onPress={ async ()=>{
                await AsyncStorage.setItem('@token','');
                await AsyncStorage.setItem('@_id','');
                navigation.navigate('NavAuth', {screen: 'Login'});
            }}
            style={{
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
            }}>
                <MaterialCommunityIcons name="logout" size={20} color={Colors.primary1} />
            </TouchableOpacity>
        );
    };

    useEffect(()=>{
        async function getAll() {
            const res = await getAllTour();
            if (res.status === 'success' && res.data.data.length > 0){
                setItemList(res.data.data);
                setloading(false);
            } else {
                setsnackbarText('Something went wrong!');
                setsnackbar(true);
                setloading(false);
            }
        }
        getAll();

        async function getBookings() {
            const userId = await AsyncStorage.getItem('@_id');
            const bookings = await getMyBookings(userId);
            if (bookings.status === 'success'){
                setMyBookings(bookings.data.data);
            }
        }
        getBookings();
    },[myBookings,itemList]);

    const [loading, setloading] = useState(true);
    const [snackbar, setsnackbar] = useState(false);
    const [snackbarText, setsnackbarText] = useState('');
    const [itemList, setItemList] = useState([]);
    const [myBookings, setMyBookings] = useState([]);

    return (
        <View style={{flex:1,backgroundColor:Colors.primary6}}>
            <Spinner
                visible={loading}
                textContent={'Please Wait...'}
                textStyle={{ color: '#FFF' }}
            />
        { itemList && itemList.length > 0 ?
            <Text style={{
                fontFamily:'OpenSans-SemiBold',
                fontSize:FontSizes.h,
                color:Colors.txtBlack,
                marginTop:20,
                marginStart:20,
            }}>Available Tours ({itemList.length})</Text> : null}
        <FlatList
            horizontal
            data={itemList}
            renderItem={item => {
                return (
                    <TourItem navigation={navigation} item={item}/>
                );
            }}/>
        { myBookings && myBookings.length > 0 ?
            <Text style={{
                fontFamily:'OpenSans-SemiBold',
                fontSize:FontSizes.h,
                color:Colors.txtBlack,
                marginTop:20,
                marginBottom:8,
                marginStart:20,
            }}>My Bookings ({myBookings.length})</Text> : null}
            <FlatList
                horizontal
                data={myBookings}
                renderItem={item => {
                    return (
                        <BookingItems navigation={navigation} item={item}/>
                    );
                }}/>
            <Snackbar
                visible={snackbar}
                onDismiss={()=>setsnackbar(false)}
                style={{ width: Dimensions.get('window').width - 15 }}
                action={{
                label: 'Ok',
            }}>{snackbarText}</Snackbar>
        </View>
    );
};

export default App;
