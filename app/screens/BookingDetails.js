import React, {useLayoutEffect,useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    SafeAreaView,ScrollView,
    StyleSheet,Image,Dimensions,
    Text, TextInput, View, Keyboard,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { Colors, FontSizes } from '../helper/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { getSpecificTour } from '../api/tours';
import { deleteBooking } from '../api/booking';
import { rateTour } from '../api/rating';
import Spinner from 'react-native-loading-spinner-overlay';
import { Snackbar } from 'react-native-paper';
import moment from 'moment';
import Stars from '../components/Stars';
import { BtnSolid } from '../components/Buttons';
import Map from '../components/Map';
import Entypo from 'react-native-vector-icons/Entypo';


const App = ({route, navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () =>
                <View style={{alignSelf:'center',marginStart:0}}>
                    <Text style={{ fontSize: FontSizes.h2, color: Colors.grey8C, fontFamily: 'OpenSans-SemiBold', alignSelf: 'center', textAlign: 'center' }}>
                        Booking Details</Text>
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

    const [Data, setData] = useState({});
    const [loading, setloading] = useState(true);
    const [snackbar, setsnackbar] = useState(false);
    const [snackbarText, setsnackbarText] = useState('');
    const [loginAgain, setLoginAgain] = useState(false);
    const [difficulty, setdifficulty] = useState('Easy');
    const [loc, setloc] = useState(null);

    useEffect(()=>{
        async function getAll() {
            const res = await getSpecificTour(route.params.tourId);
            if (res.status === 'success'){
                setData(res.data.data);
                let d = res.data.data.difficulty;
                setdifficulty(d.charAt(0).toUpperCase() + d.slice(1));
                setloc(res.data.data.startLocation.description);
                setloading(false);
            } else {
                setsnackbarText('Something went wrong! Please Login Again');
                setsnackbar(true);
                setLoginAgain(true);
                setloading(false);
            }
        }
        getAll();
    },[difficulty, route.params.tourId]);

    const LoginAgain = () => {
        return (
        <View>
            <Text style={{...styles.title, alignSelf:'center',maxWidth:Dimensions.get('window').width * 0.8, textAlign: 'center'}}>
                We think that your are not logged in.</Text>
            <TouchableOpacity
            onPress={()=>navigation.navigate('NavAuth', {screen: 'Login'})}
            style={{
                paddingHorizontal:16,
                paddingVertical:8,
                borderRadius:8,
                borderWidth:1,
                borderColor:Colors.primary1,
                width:'50%',
                alignSelf:'center',
                marginTop:100,
            }}>
                <Text style={{
                    fontFamily:'OpenSans-SemiBold',
                    fontSize:FontSizes.h4,
                    color:Colors.txtBlack,
                    alignSelf:'center',
                }}>Go to Login Page</Text>
            </TouchableOpacity>
        </View>
        );
    };

    const cancel = async () => {
        setloading(true);
        await deleteBooking(route.params.bookingId);
        setloading(false);
        setsnackbarText('Cancellation successful.');
            setsnackbar(true);
            setTimeout(() => {
                navigation.pop();
            }, 2000);

    };

    const RateOrCancel = () => {
        const [num,setNum] = useState(0);
        const size = 50;
        const [review, setReview] = useState('');
        const TourIsOver = false;
        return (
            !TourIsOver ?
                <View style={{
                    marginHorizontal:24,
                    marginBottom:20,
                }}>
                    <BtnSolid text="Cancel" click={cancel}/>
                </View>
                :
                <View style={{marginHorizontal: 24,marginBottom:20}}>
                <Text style={styles.title}>Rate The Tour</Text>
                <View style={{
                    flexDirection:'row',
                    marginVertical:12,
                }}>
                <TouchableOpacity onPress={()=>setNum(1)}>
                    <AntDesign name="star" size={size} color={ num >= 1 ? Colors.primary1 : Colors.grey8C } />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setNum(2)}>
                    <AntDesign name="star" size={size} color={ num >= 2 ? Colors.primary1 : Colors.grey8C } />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setNum(3)}>
                    <AntDesign name="star" size={size} color={ num >= 3 ? Colors.primary1 : Colors.grey8C } />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setNum(4)}>
                    <AntDesign name="star" size={size} color={ num >= 4 ? Colors.primary1 : Colors.grey8C } />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setNum(5)}>
                    <AntDesign name="star" size={size} color={ num >= 5 ? Colors.primary1 : Colors.grey8C } />
                </TouchableOpacity>
                </View>
                <Text style={styles.title}>Write Your Review</Text>
                <TextInput
                    style={styles.reviews}
                    value={review}
                    placeholder="Write Review Here"
                    multiline
                    onChangeText={setReview}
                />
                <BtnSolid text="Submit" click={ async ()=>{
                    setloading(true);
                    if (num === 0) {
                        setsnackbarText('Please Give Rating');
                        setsnackbar(true);
                        setloading(false);
                    }
                    else if (review === ''){
                        setsnackbarText('Please Write Review');
                        setsnackbar(true);
                        setloading(false);
                    }
                    else {
                        const data = {
                            'review': review,
                            'rating': num,
                        };
                        const res = await rateTour(data, route.params.tourId);
                        console.log(res);
                        if (res.status === 'success'){
                            setloading(false);
                        }
                        else {
                            setsnackbarText('Unable to rate now try again later');
                            setsnackbar(true);
                            setloading(false);
                        }
                    }


                }}/>
                </View>
        );
    };

    return (
        <SafeAreaView style={{flex:1,backgroundColor:Colors.background}}>
         <Spinner
            visible={loading}
            textContent={'Please Wait...'}
            textStyle={{ color: '#FFF' }}
        />
        {
            loginAgain ? LoginAgain() :
            <ScrollView>
            <Image
                style={{
                    height:250,
                    width:'100%',
                }}
                resizeMode="stretch"
                source={require('../assets/images/tour-1-1.jpg')}
            />
            <View style={{marginHorizontal:24}}>
                <Text style={styles.title}>QUICK FACTS</Text>
                <View style={{ flexDirection: 'row', marginTop:10, alignItems:'center'}}>
                    <AntDesign name="calendar" size={20} color={Colors.primary1} />
                    <FlatList
                        data={Data.startDates}
                        renderItem = {({item, index}) => {
                            return (
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={styles.t1}>Upcoming Tour {index + 1}:</Text>
                                    <Text style={styles.t2}>{moment(item).utc().format('DD-MM-YYYY')}</Text>
                                </View>
                            );
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row', marginTop:10, alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{ flexDirection: 'row'}}>
                    <Feather name="trending-up" size={20} color={Colors.primary1} />
                    <Text style={styles.t1}>Difficulty:</Text>
                    </View>
                    <Text style={styles.t2}>{difficulty}</Text>
                </View>
                {loc ? <View style={{ flexDirection: 'row', marginTop:10, alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{ flexDirection: 'row'}}>
                    <Entypo name="location" size={20} color={Colors.primary1} />
                    <Text style={styles.t1}>Location:</Text>
                    </View>
                    <Text style={styles.t2}>{loc}</Text>
                </View> : null}
                <View style={{ flexDirection: 'row', marginTop:10, alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{ flexDirection: 'row'}}>
                    <AntDesign name="clockcircle" size={20} color={Colors.primary1} />
                    <Text style={styles.t1}>Duration:</Text>
                    </View>
                    <Text style={styles.t2}>{Data.duration}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop:10, alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{ flexDirection: 'row'}}>
                    <Ionicons name="person" size={20} color={Colors.primary1} />
                    <Text style={styles.t1}>Participants:</Text>
                    </View>
                    <Text style={styles.t2}>Max {Data.maxGroupSize}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop:10, alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{ flexDirection: 'row'}}>
                    <AntDesign name="star" size={20} color={Colors.primary1} />
                    <Text style={styles.t1}>Ratings:</Text>
                    </View>
                    <Text style={styles.t2}>{Data.ratingsAverage} / 5</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop:10, alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{ flexDirection: 'row',marginStart:4}}>
                    <FontAwesome name="rupee" size={20} color={Colors.primary1} />
                    <Text style={styles.t1}> Price:</Text>
                    </View>
                    <Text style={styles.t2}>{Data.price}</Text>
                </View>
                <Text style={styles.title}>About {Data.name}</Text>
                <Text style={styles.desc}>{Data.summary}</Text>
                <Text style={styles.desc}>{Data.description}</Text>
                {Data.guides && Data.guides.length > 0 ? <Text style={styles.title}>Your Tour Guides</Text> : null}
                <FlatList
                    data={Data.guides}
                    horizontal
                    renderItem = {({item})=>{
                        let role = item.role;
                        role = role.charAt(0).toUpperCase() + role.slice(1);
                        return (
                            <View style={{marginTop:20,marginHorizontal:20,}}>
                                <Image
                                    style={{
                                        borderRadius:40,
                                        height:40,
                                        width:40,
                                        alignSelf:'center',
                                    }}
                                    source={require('../assets/images/avatar.png')}
                                />
                                <Text style={{...styles.t1,marginStart:0,marginTop:8}}>{role}</Text>
                                <Text style={{...styles.t1,marginStart:0,marginTop:8}}>{item.name}</Text>
                            </View>
                        );
                    }}
                />
            </View>
            {
                Data.startLocation &&
                Data.startLocation.coordinates &&
                Data.startLocation.coordinates.length === 2
                ?
                    <Map navigation={navigation} coordinates={Data.startLocation.coordinates}/> : null
            }
            <Text style={{
                ...styles.title,marginTop:0,
                position:'absolute',
                paddingHorizontal:12,
                paddingVertical:6,
                backgroundColor:Colors.primary1,
                top:230, right:10,
                color:Colors.white,
            }}>{Data.name}</Text>
            <RateOrCancel/>
            </ScrollView>
        }
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
        marginTop:30,
    },
    t1: {
        fontFamily:'OpenSans-SemiBold',
        fontSize:FontSizes.p1,
        color:Colors.grey8C,
        marginStart:40,
    },
    t2: {
        fontFamily:'OpenSans-Regular',
        fontSize:FontSizes.p1,
        color:Colors.primary1,
        marginEnd:20,
    },
    desc: {
        fontFamily:'OpenSans-Regular',
        fontSize:FontSizes.p1,
        color:Colors.grey8C,
        marginTop:20,
        textAlign:'justify',
    },
    reviews:{
        fontFamily:'OpenSans-Regular',
        fontSize:FontSizes.p1,
        backgroundColor:Colors.primary6,
        borderRadius:4,marginTop:8,
        height:150,
        textAlignVertical: 'top',
        paddingHorizontal:20,
        paddingVertical:12,
        color:Colors.txtBlack,
    },
});


export default App;
