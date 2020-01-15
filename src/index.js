import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer from './reducers/reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas';
import { logger } from 'redux-logger';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger)
)
sagaMiddleware.run(rootSaga);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

