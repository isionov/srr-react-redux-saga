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
import { App } from '../shared_components/app';
import rootReducer from '../modules/rootReducer';
import { store, runSagas } from '../store';

// const theme = createMuiTheme({
//     palette: {
//         primary: purple,
//         secondary: green,
//     },
//     status: {
//         danger: 'orange',
//     },
// });

runSagas();

// const sagaMiddleware = createSagaMiddleware();

// Если спользовать библиотеку connected-react-router (react-router-redux), которая связывает redux и history
const history = createBrowserHistory();

// const store = createStore(
//     rootReducer,
//     preloadedState,
//     compose(
//         applyMiddleware(sagaMiddleware),
//         window.devToolsExtension ? window.devToolsExtension() : f => f,
//     ),
// );

// sagaMiddleware.run(rootSaga);

class Main extends Component {
    render(){
        return (
            <BrowserRouter>
                <App { ...this.props } />
            </BrowserRouter>
        );
    }
}

loadableReady(() => {
    const root = document.getElementById('root');
    hydrate(
        // <ThemeProvider theme={theme}>
            <Provider store={ store }>
                <Main />
            </Provider>,
        // </ThemeProvider>,
        root
    );
})