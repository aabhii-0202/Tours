import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors, FontSizes } from '../helper/theme';
import moment from 'moment';


const App = ({navigation,item}) => {

    let name = '';
    let TourId = '';
    let booked = item.item.createdAt;
    if (item.item.tour){
        name = item.item.tour.name;
        TourId = item.item.tour._id;
    }
    return (
        <TouchableOpacity
        onPress={()=>
            navigation.navigate('NavMain', {
                screen:'BookingDetails',
                params: { bookingId: item.item._id, bookingDate: booked, tourId: TourId },
            })}
        style={styles.container}>
            <Text style={styles.t1}>{name}</Text>
            <View style={{ flexDirection: 'row', alignItems:'center'}}>
                <Text style={styles.t2}>Booked On</Text>
                <Text style={{...styles.t1, marginStart:8}}>{moment(booked).utc().format('DD-MM-YYYY')}</Text>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor:Colors.greyF3,
        paddingHorizontal:20,
        paddingVertical:8,
        marginHorizontal:10,
        marginBottom:20,
        borderRadius:8,
        borderWidth:0.5,
        borderColor: Colors.primary5,
        marginTop:10,
        alignSelf:'baseline',
    },
    t1:{
        fontFamily:'OpenSans-Bold',
        fontSize:FontSizes.h3,
        color:Colors.txtBlack,
    },
    t2:{
        fontFamily:'OpenSans-Regular',
        fontSize:FontSizes.p3,
        color:Colors.txtBlack,
    },
});


export default App;
