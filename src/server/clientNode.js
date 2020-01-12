import React, { Component } from "react";
import { render, hydrate } from 'react-dom';
import { createBrowserHistory } from 'history';
import { loadableReady } from '@loadable/component';
import { Provider } from 'react-redux';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
export { default } from '../shared_components/app';