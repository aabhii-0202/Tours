import API from './api';

export const login = async (credentials) => {
    return await API({
        method: 'POST',
        url: '/users/login',
        data: credentials,
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(result => {return result.data;})
    .catch((err) => {return err;});
};

export const signup = async (credentials) => {
    return await API({
        method: 'POST',
        url: '/users/signup',
        data: credentials,
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((result) => { return result.data; })
    .catch(err => { return err; });
};
