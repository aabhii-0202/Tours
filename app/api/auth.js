import API from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (credentials) => {
    return await API({
        method: 'POST',
        url: '/users/login',
        data: credentials,
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((result) => { return result.data; })
    .catch(err => { return err; });
};
