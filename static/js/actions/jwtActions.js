import actionTypes from './actionTypes';

export const getJwt = () => {
    return {
        type: actionTypes.GET_JWT,
        jwt: localStorage.getItem('jwt') || null
    };
}

export const setJwt = (jwt) => {
    localStorage.setItem('jwt', jwt);
    return {
        type: actionTypes.SET_JWT,
        jwt: jwt
    }
}

export const removeJwt = () => {
    localStorage.removeItem('jwt');
    return {
        type: actionTypes.REMOVE_JWT,
        jwt: null
    }
}