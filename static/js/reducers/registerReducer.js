import initialState from './initialState';
import actionTypes from '../actions/actionTypes';

export default function register(state = initialState.register, action) {
    switch(action.type) {
        case actionTypes.FETCH_REGISTER:
            return state;
            break;
        case actionTypes.FETCH_REGISTER_SUCCESS:
            console.log(action);
            return {...state, registerError: ''};
            break;
        case actionTypes.FETCH_REGISTER_FAILURE:
            console.log(action);
            return {...state, registerError: action.error};
            break;
        case actionTypes.UPDATE_REGISTER_EMAIL:
            return {
                ...state, 
                email: action.email, 
                emailError: action.emailError
            };
            break;
        case actionTypes.UPDATE_REGISTER_PASSWORD:
            return {
                ...state, 
                password: action.password, 
                passwordError: action.passwordError,
                matchingPasswordError: action.matchingPasswordError
            };
            break;
        case actionTypes.UPDATE_REGISTER_RETYPE_PASSWORD:
            return {
                ...state, 
                retypePassword: action.retypePassword, 
                retypePasswordError: action.retypePasswordError,
                matchingPasswordError: action.matchingPasswordError
            };
        default:
            return state;
            break;
    }
}