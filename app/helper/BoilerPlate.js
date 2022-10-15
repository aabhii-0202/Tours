import React,{useLayoutEffect} from 'react';
import {
    SafeAreaView,ScrollView,
    StyleSheet,Image,
    Text, TextInput, View, Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import { Colors, FontSizes } from 'App/helper/theme';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const App = ({navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () =>
                <View style={{alignSelf:'center',marginStart:0}}>
                    <Text style={{ fontSize: FontSizes.h2, color: Colors.grey8C, fontFamily: 'OpenSans-SemiBold', alignSelf: 'center', textAlign: 'center' }}>
                        Title</Text>
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
                <Ionicons name="chevron-back" size={20} color={Colors.greyA7} />
            </TouchableOpacity>
        );
    };

    const HeaderRightButton = ({ navigation }) => {
        return (
            <TouchableOpacity style={{
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
                <MaterialCommunityIcons name="headset" size={20} color={Colors.primary1} />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{flex:1,backgroundColor:Colors.background,paddingHorizontal:20}}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text>HI</Text>
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({

});


export default App;
