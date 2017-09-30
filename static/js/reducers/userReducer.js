import initialState from './initialState';
import actionTypes from '../actions/actionTypes';

export default function user(state = initialState.user, action) {
    switch (action.type) {
        case actionTypes.FETCH_USER:
            state = {...state, fetchingUser: true};
            return state;
            break;
        case actionTypes.FETCH_USER_SUCCESS:
            console.log('FETCH_USER_SUCCESS action');
            return {...state, user: action.user, fetchingUser: false};
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