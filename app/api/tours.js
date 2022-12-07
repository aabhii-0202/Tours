import API from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getAllTours = async () => {
    return await API({
        method: 'GET',
        url: '/tours/',
    })
    .then(result => {return result.data;})
    .catch(err => {return err;});
};

export const getAllTour = async () => {
    return await axios.get('http://3.110.208.160:3000/api/v1/tours/')
    .then(result => {return result.data;})
    .catch(err => {return err;});
};

export const getSpecificTour = async (tourId) => {
    return await API({
        method: 'GET',
        url: `/tours/${tourId}`,
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + await AsyncStorage.getItem('@token'),
        },
    })
    .then(result => {return result.data;})
    .catch(err => {return err;});
};
