import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { renderRoutes } from "react-router-config"

const Root = ({ route }) => {
    console.log('route!!!',route)
    return (
        <div>
            <div>Коренной ты мой!!!</div>
            { renderRoutes(route.routes) }
        </div>
    )
};

export default Root;
