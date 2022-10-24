import React from 'react';
import { View } from 'react-native';
import { Colors } from '../helper/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';


const App = ({num}) => {

    return (
        <View style={{
            flexDirection:'row',
            marginVertical:12,
        }}>
        <AntDesign name="star" size={20} color={ num > 1 ? Colors.primary1 : Colors.grey8C } />
        <AntDesign name="star" size={20} color={ num > 2 ? Colors.primary1 : Colors.grey8C } />
        <AntDesign name="star" size={20} color={ num > 3 ? Colors.primary1 : Colors.grey8C } />
        <AntDesign name="star" size={20} color={ num > 4 ? Colors.primary1 : Colors.grey8C } />
        <AntDesign name="star" size={20} color={ num > 5 ? Colors.primary1 : Colors.grey8C } />
        </View>

    );
};

export default App;
