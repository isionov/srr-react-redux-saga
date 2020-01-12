import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from '../../routes.js';
import { renderRoutes } from "react-router-config"
import { CatsComponent } from '../cats';
const App = () => {
    return (
        <div>
            <CatsComponent />
            <div>Страница APP</div>
            { renderRoutes(routes) }
        </div>
    )
};

export default App;
