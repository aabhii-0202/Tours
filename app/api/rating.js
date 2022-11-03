import API from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const rateTour = async (credentials, tourid) => {
    return await API({
        method: 'POST',
        url: `/tours/${tourid}/reviews`,
        data:credentials,
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + await AsyncStorage.getItem('@token'),
        },
    })
    .then(result => {return result.data;})
    .catch(err => {return err;});
};
