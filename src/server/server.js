import express from 'express';
import React from 'react';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server'
// import App from '../shared_components/app';
import { initStore } from '../store.js';
import clientHtml from '../../assets/client/index.html';
import cheerio from 'cheerio'
import { Provider } from 'react-redux';
import { renderRoutes, matchRoutes } from "react-router-config"
import { routes } from '../routes.js';

const statsFileServer = path.resolve(process.cwd(), './assets/server/loadable-stats.json');
const statsFileClient = path.resolve(process.cwd(), './assets/client/loadable-stats.json');
// const extractorClient = new ChunkExtractor({ statsFile: statsFileClient });
const $ = cheerio.load(clientHtml);
const app = express();
console.log("LOADABLE100", path.resolve(process.cwd(), './assets/server/loadable-stats.json'));
// console.log("LOADABLE2", extractorClient.requireEntrypoint('main'));

app.use('/assets/client/', express.static(path.resolve(process.cwd(), './assets/client/')));

app.get('*', async (req, res) => {
    const extractorServer = new ChunkExtractor({ statsFile: statsFileServer });
    const { default: App } = extractorServer.requireEntrypoint();

    // const getScriptTags = extractorWeb.getScriptTags();
    // const getScriptTagsServer = extractorServer.getScriptTags();
    // const getScriptElements = extractorWeb.getScriptElements();
    // const getLinkTags = extractorWeb.getLinkTags();
    // // const collectChunks = extractorServer.collectChunks();
    // // console.log("LOADABLE0", App);
    // console.log("LOADABLE1", getScriptTags);
    // console.log("LOADABLE1Server", getScriptTagsServer);
    // console.log("LOADABLE2", getScriptElements);
    // console.log("LOADABLE3", getLinkTags);
    // console.log("LOADABLE4", collectChunks);

    const { url } = req;
    const context = {};
    const store = initStore();
    console.log('URL!!!', url);
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
        const getScriptTags = extractorWeb.getScriptTags();
        const getScriptTagsS = extractorServer.getScriptTags();
        console.log("LOADABLE1", getScriptTags);
        console.log("LOADABLE12", getScriptTagsS);
        const preloadedState = store.getState();
        const html = renderToString(jsx);
        // const getScriptTags = extractorWeb.getScriptTags();
        // console.log("LOADABLE1", getScriptTags);
        // const getScriptTags = extractorWeb.getScriptTags();
        // const getScriptTagsServer = extractorServer.getScriptTags();
        // const getScriptElements = extractorWeb.getScriptElements();
        // const getLinkTags = extractorWeb.getLinkTags();
        // const collectChunks = extractorServer.collectChunks();
        // console.log("LOADABLE0", App);
        // console.log("LOADABLE1", getScriptTags);
        // console.log("LOADABLE1Server", getScriptTagsServer);
        // console.log("LOADABLE2", getScriptElements);
        // console.log("LOADABLE3", getLinkTags);
        console.log('HTML',html);
        // $('head').append(getLinkTags);
        $('head').append(`<script>window.__PRELOADED_STATE__=JSON.parse(${JSON.stringify(preloadedState)})</script>`);
        // $('body').append(getScriptTags);
        $('#root').append(html);
        res.send($.html())
    });

    matchRoutes(routes, url).map((props) => {
        props.route.getInitialProps && props.route.getInitialProps(store.dispatch);
    });

    store.stopSagas();
});

app.listen(3000, () => console.log('Demo app listening on port 3000'));
