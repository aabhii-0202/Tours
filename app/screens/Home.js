import React, {useLayoutEffect,useEffect,useState} from 'react';

import {
    StyleSheet,FlatList,
    Text, View,
    TouchableOpacity,
} from 'react-native';
import { Colors, FontSizes } from '../helper/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TourItem from '../components/TourItem';

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
            <TouchableOpacity onPress={()=>navigation.navigate('NavAuth', {screen: 'Signup'})}
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

    const [itemList, setItemList] = useState([
        1, 2, 3,
    ]);

    return (
        <View style={{flex:1,backgroundColor:Colors.primary6}}>
        <FlatList
            horizontal
            data={itemList}
            renderItem={item => {
                return (
                    <TourItem navigation={navigation} item={item}/>
                );
            }}/>
        </View>
    );
};

export default App;
