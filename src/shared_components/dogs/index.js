import React, { Component } from 'react';
import loadable from '@loadable/component';
import { RouteDataLoader } from '../load/index.js';

export const DogsComponent1 = loadable(() => import('./DogsPage.jsx'), { ssr: true });

export const DogsComponent = (props) => (
    <RouteDataLoader>
        <DogsComponent1 { ...props }/>
    </RouteDataLoader>
);