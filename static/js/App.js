import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import AppContainer from './components/AppContainer';
import configureStore from './store/configureStore';
import 'bootstrap/scss/bootstrap.scss';

const store = configureStore();

ReactDOM.render(<Provider store={store}><AppContainer  /></Provider>, document.getElementById('root'));