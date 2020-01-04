import express from 'express';
import React from 'react';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server'
import { App } from '../shared_components/app';
import { store, runSagas, close } from '../store.js';
import clientHtml from '../../dist/client/index.html';
import cheerio from 'cheerio'
import { Provider } from 'react-redux';
import { renderRoutes, matchRoutes } from "react-router-config"
import { routes } from '../routes.js';

const statsFile = path.resolve(process.cwd(), './dist/server/loadable-stats.json');
const extractor = new ChunkExtractor({ statsFile });
const $ = cheerio.load(clientHtml);
const app = express();

app.use('/assets', express.static('../dist/client'));

app.get('*', async (req, res) => {
    const { url } = req;
    const context = {};
    const appWithRouter = (
        <Provider store={store}>
            <StaticRouter location={ url } context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );
    const jsx = extractor.collectChunks(appWithRouter);

    runSagas().toPromise().then(() => {
        const preloadedState = store.getState();
        const html = renderToString(jsx);
        console.log('preloadedState', preloadedState);
        console.log('trololo', html);
    });

    matchRoutes(routes, url).map((props) => {
        // Load the data for that route. Include match information
        // so route parameters can be passed through.
        console.log('props',props);
        props.route.getInitialProps && props.route.getInitialProps();
        console.log('send');
    });

    close();
});

app.listen(3000, () => console.log('Demo app listening on port 3000'));
