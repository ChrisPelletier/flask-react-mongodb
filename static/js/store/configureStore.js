import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const middleware = applyMiddleware(thunk, createLogger());

export default () => {
    return createStore(rootReducer, middleware);
}