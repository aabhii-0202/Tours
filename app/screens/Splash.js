import React, {useLayoutEffect,useEffect,useState, useRef} from 'react';

import {
    SafeAreaView, View,
    StyleSheet,Animated,
} from 'react-native';

import {Colors, FontSizes} from '../helper/theme';
import {useNavigation} from '@react-navigation/native';

const App = ({navigation}) => {

    const progress = useRef(new Animated.Value(0.5)).current;
    const scale = useRef(new Animated.Value(1)).current;
    const nav = useNavigation();

    useEffect(()=>{
        Animated.loop(
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(progress, {toValue: 1, useNativeDriver: true}),
                    Animated.timing(progress, {toValue: 0.5, useNativeDriver: true}),
                ]),
                Animated.sequence([
                    Animated.timing(scale, {toValue: 1.5, useNativeDriver: true}),
                    Animated.timing(scale, {toValue: 1, useNativeDriver: true}),
                ]),
            ]),
        ).start();
        setTimeout(() => {
            nav.reset({
                index: 0,
                routes: [{name: 'NavMain'}],
        });
        }, 1500);
    },[nav, progress, scale]);

    const SIZE = 100.0;

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View
            style={[
                styles.square,
                {
                    borderRadius: progress.interpolate({
                        inputRange: [0.5, 1],
                        outputRange: [SIZE / 4, SIZE / 2],
                    }),
                    opacity: progress,
                    transform: [
                        { scale },
                        { rotate: '45deg'
                        //     progress.interpolate({
                        //     inputRange: [1, 2],
                        //     outputRange: [ Math.PI, 2 * Math.PI],
                        // }),
                        },
                    ],
                },
            ]}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent:'center',
    },
    square: {
        width:100,
        height:100,
        backgroundColor: Colors.primary1,
        borderRadius:16,
    },
});

export default App;
