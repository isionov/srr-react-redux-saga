import { createBrowserHistory } from 'history';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { rootSaga } from './modules/rootSaga';
import rootReducer from './modules/rootReducer';

const sagaMiddleware = createSagaMiddleware();

// Если спользовать библиотеку connected-react-router (react-router-redux), которая связывает redux и history
// const history = createBrowserHistory();
const preloadedState = {};
export const store = createStore(
    rootReducer,
    preloadedState,
    compose(
        applyMiddleware(sagaMiddleware),
        // window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
);

export const runSagas = () => sagaMiddleware.run(rootSaga);

export const sendAction = action => {
    console.log(1, action);
    store.dispatch(action)
    console.log(2);
};

export const close = () => store.dispatch(END);
