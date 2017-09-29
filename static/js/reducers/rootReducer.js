import { combineReducers } from 'redux';
import user from './userReducer';
import jwt from './jwtReducer';
import login from './loginReducer';
import register from './registerReducer';
import header from './headerReducer';

const rootReducer = combineReducers({
    jwt,
    login,
    user,
    register,
    header
});

export default rootReducer;