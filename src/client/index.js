import React, { Component } from "react";
import { render, hydrate } from 'react-dom';
import { createBrowserHistory } from 'history';
import { loadableReady } from '@loadable/component';
import { Provider } from 'react-redux';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../modules/rootSaga';
import { BrowserRouter } from 'react-router-dom';
import App from '../shared_components/app';
import rootReducer from '../modules/rootReducer';
import { initStore } from '../store';

const store = initStore(true);

store.runSagas()

loadableReady(() => {
    const root = document.getElementById('root');

    render(
        <Provider store={ store }>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        root
    );
})