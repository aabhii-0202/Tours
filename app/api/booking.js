import API from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const createBooking = async (credentials) => {
    return await API({
        method: 'POST',
        url: '/booking/',
        data: credentials,
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + await AsyncStorage.getItem('@token'),
        },
    })
    .then(result => {return result.data;})
    .catch(err => {return err;});
};

export const getMyBookings = async (userId) => {
    return await API({
        method: 'GET',
        url: '/booking/',
        params: { user: userId } ,
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + await AsyncStorage.getItem('@token'),
        },
    })
    .then(result => {return result.data;})
    .catch(err => {return err;});
};
