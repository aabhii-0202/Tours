import React, {useLayoutEffect,useEffect,useState} from 'react';

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
import Spinner from 'react-native-loading-spinner-overlay';
import { Snackbar } from 'react-native-paper';
import moment from 'moment';
import Stars from '../components/Stars';


const App = ({route, navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () =>
                <View style={{alignSelf:'center',marginStart:0}}>
                    <Text style={{ fontSize: FontSizes.h2, color: Colors.grey8C, fontFamily: 'OpenSans-SemiBold', alignSelf: 'center', textAlign: 'center' }}>
                        Tour Details</Text>
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


    useEffect(()=>{
        async function getAll() {
            const res = await getSpecificTour(route.params.tourId);
            if (res.status === 'success'){
                setData(res.data.data);
                let d = res.data.data.difficulty;
                setdifficulty(d.charAt(0).toUpperCase() + d.slice(1));
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

                {Data.guides.length > 0 ? <Text style={styles.title}>Your Tour Guides</Text> : null}
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
                {Data.reviews.length > 0 ? <Text style={styles.title}>Reviews</Text> : null }
                <FlatList
                    data={Data.reviews}
                    horizontal
                    renderItem = {({item}) => {
                        let date = item.createdAt;
                        date = moment(date).utc().format('DD-MM-YYYY');
                        return (
                            <View style={{
                                marginEnd:20,
                                borderWidth:1,
                                borderColor:Colors.primary4,
                                borderRadius:8,
                                paddingHorizontal:18,
                                paddingVertical:8,
                                marginTop:20,
                                justifyContent:'space-between',
                            }}>
                                <View>
                                    <Text style={{
                                        fontFamily:'OpenSans-SemiBold',
                                        fontSize:FontSizes.h3,
                                        color:Colors.primary1,
                                    }}>{date}</Text>
                                    <Text style={{
                                        fontFamily:'OpenSans-Regular',
                                        fontSize:FontSizes.p1,
                                        color:Colors.txtBlack,
                                        maxWidth: Dimensions.get('window').width * 0.5,
                                        marginTop:10,
                                    }}>{item.review}</Text>
                                </View>
                                <Stars num={item.rating}/>
                            </View>
                        );
                    }}
                />
            </View>
            <View style={{height:50}}/>
            <Text style={{
                ...styles.title,marginTop:0,
                position:'absolute',
                paddingHorizontal:12,
                paddingVertical:6,
                backgroundColor:Colors.primary1,
                top:230, right:10,
                color:Colors.white,
            }}>{Data.name}</Text>
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
    }
});


export default App;
