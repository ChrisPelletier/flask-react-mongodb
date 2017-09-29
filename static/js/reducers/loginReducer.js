import initialState from './initialState';
import actionTypes from '../actions/actionTypes';

export default function login(state = initialState.login, action) {
    switch (action.type) {
        case actionTypes.FETCH_LOGIN:
            return state;
            break;
        case actionTypes.FETCH_LOGIN_SUCCESS:
            return {...state, error: ''};
            break;
        case actionTypes.FETCH_LOGIN_ERROR:
            return {...state, loginError: action.error};
            break;
        case actionTypes.UPDATE_LOGIN_EMAIL:
            return {...state, email: action.email, emailError: action.error};
            break;
        case actionTypes.UPDATE_LOGIN_PASSWORD:
            return {...state, password: action.password, passwordError: action.error};
            break;
        default:
            return state;
            break;
    }
}