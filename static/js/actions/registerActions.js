import actionTypes from './actionTypes';
import constants from '../constants';
import 'whatwg-fetch';
import regexes from '../utilities/regexes';

export const fetchRegister = (email, retypePassword) => {
    return dispatch => {
        dispatch({
            type: actionTypes.FETCH_REGISTER
        });
        const HEADERS = {
            'Content-Type': 'application/json'
        }
        return fetch(constants.API_URL + '/user', {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({
                email,
                password: retypePassword
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error while registering user.");
            } else {
                return response.json();
            }
        })
        .then((responseData) => {
            console.log(responseData);
            dispatch({
                type: actionTypes.FETCH_REGISTER_SUCCESS,
                ...responseData
            });
            return responseData;
        })
        .catch((error) => {
            console.error(error);
            dispatch({
                type: actionTypes.FETCH_REGISTER_FAILURE,
                error: error.message
            });
            return Promise.reject(error.message);
        });
    }
};

export const updateEmail = (email) => {
    let emailError = email.length === 0 ?
        'Email is required' :
        !regexes.email.test(email) ?
        'Must enter a valid email address' :
        '';
    return dispatch => {
        dispatch({
            type: actionTypes.UPDATE_REGISTER_EMAIL,
            email,
            emailError
        });
    }
};

export const updatePassword = (password, retypePassword) => {
    let passwordError = password.length === 0 ?
        'Password is required' :
        '';
    let matchingPasswordError = retypePassword !== password && retypePassword.length ?
        'Must match the original password' :
        '';
    return dispatch => {
        dispatch({
            type: actionTypes.UPDATE_REGISTER_PASSWORD,
            password,
            passwordError,
            matchingPasswordError
        });
    }
}

export const updateRetypePassword = (retypePassword, password) => {
    let retypePasswordError = retypePassword.length === 0 ?
        'Password is required' :
        '';
    let matchingPasswordError = retypePassword !== password ?
        'Must match the original password' :
        '';
    return dispatch => {
        dispatch({
            type: actionTypes.UPDATE_REGISTER_RETYPE_PASSWORD,
            retypePassword,
            retypePasswordError,
            matchingPasswordError
        });
    }
}