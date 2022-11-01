import API from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const createBooking = async (credentials) => {
    // console.log(`/tours/${tourId}`);
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

export const getAllBooking = async () => {
    // console.log(`/tours/${tourId}`);
    return await API({
        method: 'GET',
        url: '/booking/',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + await AsyncStorage.getItem('@token'),
        },
    })
    .then(result => {return result.data;})
    .catch(err => {return err;});
};
