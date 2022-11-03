import React from 'react';
import { StyleSheet,Text, TextInput, View } from 'react-native';
import { Colors, FontSizes } from '../helper/theme';


const App = (props) => {
    let inputEnabled = true;
    try {
        inputEnabled = !props.noinput;
    }
    catch (e) {
        inputEnabled = true;
    }
    return (
        <View style={{marginTop:15}}>
            <Text style={props.textStyle ? props.textStyle : styles.text}>{props.text}</Text>
            { inputEnabled ?
            <TextInput
                style={props.inputStyle ? props.inputStyle : styles.inputbox}
                value={props.value}
                onChangeText={props.onTextchange}
                keyboardType={props.type !== null ? props.type : 'default'}
                secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
            /> :
            <Text style={props.inputStyle ? props.inputStyle : styles.inputbox}>{props.value}</Text>
            }
        </View>
    );
};


const styles = StyleSheet.create({
    inputbox:{
        paddingHorizontal:12,
        paddingVertical:18,
        borderRadius:10,
        borderColor:Colors.border,
        borderWidth:1,
        marginTop:8,
        color:Colors.txtBlack,
        fontFamily:'OpenSans-SemiBold',
        fontSize:FontSizes.h1,
        textAlignVertical:'center',
    },
    text:{
        fontFamily:'OpenSans-SemiBold',
        fontSize:FontSizes.h4,
        color:Colors.grey8C,
    },
});


export default App;
