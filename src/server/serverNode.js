import express from 'express';
import React from 'react';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server'
import { initStore } from '../store.js';
import clientHtml from '../../assets/client/index.html';
import cheerio from 'cheerio'
import { Provider } from 'react-redux';
import { renderRoutes, matchRoutes } from "react-router-config"
import { routes } from '../routes.js';
import { ServerStyleSheet } from 'styled-components'

const statsFileServer = path.resolve(process.cwd(), './assets/clientNode/loadable-stats.json');
const statsFileClient = path.resolve(process.cwd(), './assets/client/loadable-stats.json');
const app = express();

app.use('/assets/client/', express.static(path.resolve(process.cwd(), './assets/client/')));

app.get('*', async (req, res) => {
    const sheet = new ServerStyleSheet();
    const $ = cheerio.load(clientHtml);
    const extractorServer = new ChunkExtractor({ statsFile: statsFileServer, entrypoints: ['clientNode'] });
    const { default: App } = extractorServer.requireEntrypoint();

    const { url } = req;
    const context = {};
    const store = initStore();
    const appWithRouter = (
        <Provider store={store}>
            <StaticRouter location={ url } context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );


    store.runSagas().toPromise().then(() => {
        const extractorWeb = new ChunkExtractor({ statsFile: statsFileClient })
        const jsx = extractorWeb.collectChunks(appWithRouter);
        const preloadedState = store.getState();
        const html = renderToString(sheet.collectStyles(jsx));
        const getScriptTags = extractorWeb.getScriptTags();
        const styleTags = sheet.getStyleTags();
        const getLinkTags = extractorWeb.getLinkTags();
        $('head').append(styleTags);
        $('head').append(getLinkTags);
        $('head').append(`<script type="text/javascript">window.__PRELOADED_STATE__=JSON.parse('${JSON.stringify(preloadedState)}')</script>`);
        $('body').append(getScriptTags);
        $('#root').append(html);
        res.send($.html())
    });

    matchRoutes(routes, url).map((props) => {
        console.log("!!!---!!! props", props);
        props.route.getInitialProps && props.route.getInitialProps(store.dispatch);
    });

    store.stopSagas();
});

app.listen(3000, () => console.log('Demo app listening on port 3000'));
