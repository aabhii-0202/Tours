import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React from 'react';

import {
    StyleSheet,Text, TouchableOpacity, View,Platform,Linking,
} from 'react-native';
import { Colors, FontSizes } from '../helper/theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';


const App = ({coordinates}) => {

    return (
        <View style={styles.container}>
        <Text style={styles.text}>See Location On Map</Text>
        <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
            latitude: coordinates[1],
            longitude: coordinates[0],
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        }}
         />
         <TouchableOpacity
         onPress={()=>{
            const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
            const latLng = `${coordinates[1]},${coordinates[0]}`;
            const label = 'Custom Label';
            const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`,
            });
            Linking.openURL(url);
         }}
         style={{
            backgroundColor:Colors.primary6,
            height:60,width:60,justifyContent:'center',
            paddingHorizontal:12,
            paddingVertical:12,
            alignItems:'center',
            borderRadius:40,
            position:'absolute',
            bottom: 20,right:20,
            borderWidth:1,
            borderColor:Colors.primary1,
        }}>
            <FontAwesome5 name="map-marker" size={30} color={Colors.primary1}/>
         </TouchableOpacity>
    </View>
    );
};

// api key: AIzaSyD6Jxu6S5mptyHRX8oplE98_S2AWbzXYCs
const styles = StyleSheet.create({
    container: {
        marginVertical:20,
        height:400,
        width:'100%',
        alignSelf:'center',
      },
      map: {
        height: 330,
        width:'100%',
        alignSelf:'center',
      },
      text: {
        fontFamily:'OpenSans-Bold',
        fontSize:FontSizes.h,
        color:Colors.primary1,
        marginTop:30,
        marginBottom:10,
        marginStart:20,
      },
});


export default App;
