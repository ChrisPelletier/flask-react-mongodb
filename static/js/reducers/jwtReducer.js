import initialState from './initialState';
import actionTypes from '../actions/actionTypes';

export default function jwt(state = initialState.jwt, action) {
    switch (action.type) {
        case actionTypes.GET_JWT:
            return action.jwt;
            break;
        case actionTypes.SET_JWT:
            return action.jwt;
            break;
        case actionTypes.REMOVE_JWT:
            return action.jwt;
            break;
        default:
            return state;
            break;
    }
}