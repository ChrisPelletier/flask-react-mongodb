import initialState from './initialState';
import actionTypes from '../actions/actionTypes';

export default function user(state = initialState.user, action) {
    switch (action.type) {
        case actionTypes.FETCH_USER:
            state = {...state, fetchingUser: true};
            console.log('FETCH_USER action');
            return state;
            break;
        case actionTypes.FETCH_USER_SUCCESS:
            state = {...state, user: action.user, fetchingUser: false};
            console.log('FETCH_USER_SUCCESS action');
            return newState;
            break;
        case actionTypes.FETCH_USER_FAILURE:
            state = {...state, fetchingUser: false, fetchUserError: action.error};
            console.log('FETCH_USER_FAILURE action');
            return state;
            break;
        default:
            return state;
            break;
    }
}