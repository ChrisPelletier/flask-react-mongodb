import { combineReducers } from 'redux';
import user from './userReducer';
import jwt from './jwtReducer';
import login from './loginReducer';
import register from './registerReducer';

const rootReducer = combineReducers({
    jwt,
    login,
    user,
    register
});

export default rootReducer;