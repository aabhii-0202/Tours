import API from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getMe = async () => {
    return await API({
        method: 'GET',
        url: '/users/me',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + await AsyncStorage.getItem('@token'),
        },
    })
    .then(result => {return result.data;})
    .catch(err => {return err;});
};

export const updateMe = async (credentials) => {
    console.log(credentials);
    return await API({
        method: 'PATCH',
        url: '/users/updateMe',
        data: credentials,
        headers: {
            'Content-Type': 'multipart/form-data',
            'authorization': 'Bearer ' + await AsyncStorage.getItem('@token'),
        },
    })
    .then(result => {return result.data;})
    .catch(err => {return err;});
};

export const updatePassword = async (credentials) => {
    console.log(credentials);
    return await API({
        method: 'PATCH',
        url: '/users/updateMyPassword',
        data: credentials,
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + await AsyncStorage.getItem('@token'),
        },
    })
    .then(result => {return result.data;})
    .catch(err => {return err;});
};
