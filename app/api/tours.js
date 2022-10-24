import API from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllTour = async () => {
    return await API({
        method: 'GET',
        url: '/tours/',
    })
    .then(result => {return result.data;})
    .catch(err => {return err;});
};

export const getSpecificTour = async (tourId) => {
    // console.log(`/tours/${tourId}`);
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
