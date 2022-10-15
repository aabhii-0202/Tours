import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { FontSizes, Colors } from 'App/helper/theme';

export const BtnSolid = (props) => {
    return (
        <TouchableOpacity disabled={props.disabled} style={{ ...styles.btnPrimarySolid, backgroundColor: props.disabled ? '#D1C9CC' : Colors.primary1, ...props.style, }} onPress={props.click}>
                <Text style={{ color: 'white', fontSize: FontSizes.h3, alignSelf: 'center', fontFamily: 'OpenSans-SemiBold',...props.textColor }}>{props.text}</Text>
        </TouchableOpacity>
    );
};

export const BtnLink = (props) => {
    return (
        <TouchableOpacity style={styles.linkPrimary} onPress={props.click}>
            <Text style={{ color: '#BF5F7D', fontSize: FontSizes.h3, alignSelf: 'center', fontFamily: 'OpenSans-SemiBold', ...props.textColor }}>{props.text}</Text>
        </TouchableOpacity>
    );
};

export const BtnOnbording = (props) => {
    return (
        <TouchableOpacity style={styles.onbording} onPress={props.click}>
            <Text style={{ color: '#FFFFFF', fontSize: FontSizes.h3, alignSelf: 'center', fontFamily: 'OpenSans-SemiBold', ...props.textColor }}>{props.text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnPrimarySolid: {
        backgroundColor:'#BF5F7D',
        width: '90%',
        height: 40,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        margin:5,
        alignSelf:'center',
    },
    linkPrimary: {
        backgroundColor: '#FFF',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    onbording:{
        backgroundColor: '#FFF',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        opacity:0.5,
        paddingVertical:8,
    },
});
