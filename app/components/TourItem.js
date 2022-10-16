import React, { useLayoutEffect, useEffect, useState } from 'react';

import {
    StyleSheet,Image,
    Text,View,
    TouchableOpacity,Dimensions,
} from 'react-native';
import { Colors, FontSizes } from '../helper/theme';


const App = ({navigation, item}) => {

    return (
        <View style={styles.container}>
            <Image
                style={{
                    height:'30%',
                    width:'100%',
                    borderTopLeftRadius:4,
                    borderTopRightRadius:4,
                }}
                resizeMode="stretch"
                source={require('../assets/images/tour-1-1.jpg')}
            />
            <View style={{
                position:'absolute',
                right:10,
                top:180,
            }}>
                <Text style={styles.t6}>The Sea Explorer</Text>
            </View>
            <View style={{
                paddingHorizontal:20,
                paddingVertical:20,
            }}>
                <Text style={styles.t1}>Medium 7-Day Tour</Text>
                <Text style={styles.t2}>Exploring the jaw-dropping US east coast by foot and by boat</Text>
                <View style={styles.v1}>
                    <Text style={styles.t3}>Miami, USA</Text>
                    <Text style={styles.t3}>June 2021</Text>
                </View>
                <View style={styles.v1}>
                    <Text style={styles.t3}>4 stops</Text>
                    <Text style={styles.t3}>15 people</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',
            justifyContent:'space-between',
            backgroundColor:Colors.greyE8,
            borderBottomLeftRadius:4,
            borderBottomRightRadius:4,
            }}>
                <View style={{
                paddingHorizontal:20,
                paddingVertical:20,
            }}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.t4}>₹497</Text>
                        <Text style={styles.t5}>per person</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.t4}>4.3</Text>
                        <Text style={styles.t5}>rating(7)</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('NavMain', {screen:'TourDetails'})}
                style={styles.btn}>
                    <Text style={{
                        fontFamily:'OpenSans-SemiBold',
                        color:Colors.white,
                        fontSize:FontSizes.h4,
                    }}>Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    t1:{
        fontFamily:'OpenSans-SemiBold',
        fontSize:FontSizes.h4,
        color:Colors.txtBlack,
        marginTop:8,
    },
    t2:{
        fontFamily:'OpenSans-Regular',
        fontSize:FontSizes.p2,
        color:Colors.grey8C,
        marginTop:12,
        maxWidth:250,
    },
    t3:{
        fontFamily:'OpenSans-Italic',
        fontSize:FontSizes.p2,
        color:Colors.grey8C,
        marginTop:12,
    },
    t4:{
        fontFamily:'OpenSans-SemiBold',
        fontSize:FontSizes.p2,
        color:Colors.txtBlack,
        marginTop:8,
    },
    t5:{
        fontFamily:'OpenSans-Regular',
        fontSize:FontSizes.p2,
        color:Colors.grey8C,
        marginTop:8,
        marginStart:4,
    },
    t6:{
        fontFamily:'OpenSans-Bold',
        fontSize:FontSizes.h3,
        color:Colors.white,
        paddingHorizontal:10,
        paddingVertical:5,
        backgroundColor:Colors.primary1,
        textAlign:'right',
    },
    v1:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,
    },
    btn:{
        backgroundColor:Colors.primary1,
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginEnd:20,
    },
    container:{
        alignSelf:'center',
        marginHorizontal:10,
        borderRadius:4,
        backgroundColor:Colors.greyF3,
        width: Dimensions.get('window').width * 0.8,
    },
});


export default App;