import { combineReducers } from 'redux';
import user from './userReducer';
import jwt from './jwtReducer';
import login from './loginReducer';

const rootReducer = combineReducers({
    jwt,
    login,
    user
});

export default rootReducer;