import React from 'react';
import { withStyles, createStyleSheet } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
// import Helmet from 'react-helmet';
import { routes } from '../../routes';
import { renderRoutes } from "react-router-config"

const App = () => (
    <div>
        {/* <Helmet
            htmlAttributes={{ lang: 'en', amp: undefined }} // amp takes no value
            titleTemplate="%s | Universal React POC "
            titleAttributes={{ itemprop: 'name', lang: 'en' }}
            meta={[
                { name: 'description', content: 'Server side rendering example' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            ]}
        /> */}
        <Switch>
            { renderRoutes(routes) }
        </Switch>
    </div>
);
export default App;
