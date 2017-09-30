import actionTypes from './actionTypes';
import constants from '../constants';
import 'whatwg-fetch';

export const fetchUser = (jwt) => {
    return dispatch => {
        let thereWasAnError = false;
        dispatch({
            type: actionTypes.FETCH_USER
        })
        return fetch(constants.API_URL + '/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        })
        .then(response => {
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
        .then(responseData => {
            dispatch({ 
                type: actionTypes.FETCH_USER_SUCCESS,
                user: responseData,
                fetchigUserError: null
            });
            localStorage.setItem('user', JSON.stringify(responseData));
            return responseData;
        })
        .catch(error => {
            dispatch({
                type: actionTypes.FETCH_USER_FAILURE,
                fetchigUserError: error.message
            });
            return Promise.reject(error.message);
        });
    };
}
