import actionTypes from './actionTypes';
import constants from '../constants';
import 'whatwg-fetch';
import regexes from '../utilities/regexes';

export const fetchLogin = (email, password) => {
    return dipatch => {
        dipatch({ 
            type: actionTypes.FETCH_LOGIN
        });
        return fetch(constants.API_URL + '/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then((response) => {
            if (!response.ok) {
                if(response.status === 401) {
                    throw new Error("Unable to find matching email and password.");
                } else {
                    throw new Error("Error while logging user in.");
                }
            } else {
                return response.json();
            }
        })
        .then((responseData) => {
            dipatch({ 
                type: actionTypes.FETCH_LOGIN_SUCCESS,
                jwt: responseData.jwt
            });
            return responseData;
        })
        .catch((error) => {
            dipatch({
                type: actionTypes.FETCH_LOGIN_ERROR,
                error: error.message
            });
            return error;
        });
    }
}

export const updateEmail = (email) => {
    let emailError = email.length === 0 ?
        'Email is required' :
        !regexes.email.test(email) ?
        'Must enter a valid email address' :
        '';
    return dispatch => {
        dispatch({
            type: actionTypes.UPDATE_LOGIN_EMAIL,
            email,
            error: emailError
        });
    };
}

export const updatePassword = (password) => {
    let passwordError = password.length === 0 ?
        'Password is required' :
        '';
    return dispatch => {
        dispatch({
            type: actionTypes.UPDATE_LOGIN_PASSWORD,
            password,
            error: passwordError
        });
    }
}