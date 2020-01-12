import { createBrowserHistory } from 'history';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { rootSaga } from './modules/rootSaga';
import rootReducer from './modules/rootReducer';


// Если спользовать библиотеку connected-react-router (react-router-redux), которая связывает redux и history
// const history = createBrowserHistory();

export const initStore = (client) => {
    const sagaMiddleware = createSagaMiddleware();
    let preloadedState = {};
    if(client) {
        preloadedState = window.__PRELOADED_STATE__;
    }
    // const preloadedState = {};
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(sagaMiddleware)
        ),
    );

    store.stopSagas = () => store.dispatch(END);
    store.runSagas = () => sagaMiddleware.run(rootSaga);

    return store;
}