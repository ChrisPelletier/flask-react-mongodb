import initialState from './initialState';
import actionTypes from '../actions/actionTypes';

export default function header(state = initialState.header, action) {
    switch (action.type) {
        case actionTypes.TOGGLE_MENU:
            return {...state, menuIsOpen: !state.menuIsOpen};
            break;
        default:
            return state;
            break;
    }
}