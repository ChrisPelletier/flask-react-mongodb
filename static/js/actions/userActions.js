import actionTypes from './actionTypes';

export const fetchUser = (jwt) => {
    return {
        type: actionTypes.FETCH_USER,
        jwt
    }
}

export const fetchUserSuccess = (user) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        user
    }
}

export const fetchUserError = (error) => {
    return {
        type: actionTypes.FETCH_USER_ERROR,
        error
    }
}