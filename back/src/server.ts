import express from 'express';
import cors from 'cors';
import path from 'path';
import https from 'https';

import config from "./config/env.js";
import router from './router.js';
import logMiddleware from "./middlewares/log.middleware.js";

/**
 * The express app.
 * @type {Express}
 */
const app = express();

// Add the middlewares
app.use(cors({
    credentials: true,
    allowedHeaders: '*',
    exposedHeaders: '*'
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Add the router for the api
app.use('/api', logMiddleware("/api"), router);
// Add the router for the frontend
app.use('/', express.static(path.resolve('front'), {
    maxAge: 1000 * 60 * 60 * 3,
    etag: true,
    lastModified: true
}));
app.use((req, res) => {
    res.sendFile(path.resolve('front/index.html'));
});
if (config.protocol === 'http') {
    app.listen(config.port, () => {
        return console.log(`Express is listening at http://localhost:${config.port} (${config.env})`);
    });
} else {
    https.createServer({
        key: config.httpsKey,
        cert: config.httpsCert
    }, app).listen(config.port, () => {
        return console.log(`Express is listening at https://localhost:${config.port} (${config.env})`);
    });
}