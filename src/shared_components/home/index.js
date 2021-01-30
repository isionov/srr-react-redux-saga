import React, { Component } from 'react';
import { RouteDataLoader } from '../load/index.js';
import loadable from '@loadable/component';

export const HomeComponent1 = loadable(() => import('./HomePage.jsx'));

export const HomeComponent = (props) => (
    <RouteDataLoader>
        <HomeComponent1 { ...props }/>
    </RouteDataLoader>
);