import actionTypes from './actionTypes';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getJwt = () => {
    return {
        type: actionTypes.GET_JWT,
        jwt: cookies.get('jwt') || ''
    };
}

export const setJwt = (jwt) => {
    cookies.set('jwt', jwt);
    return {
        type: actionTypes.SET_JWT,
        jwt: jwt
    }
}

export const removeJwt = () => {
    cookies.remove('jwt');
    return {
        type: actionTypes.REMOVE_JWT,
        jwt: ''
    }
}