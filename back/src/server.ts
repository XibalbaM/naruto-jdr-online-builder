import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import config from "./config/config.js";
import router from './router.js';
import logMiddleware from "./middlewares/log.middleware.js";

/**
 * The express app.
 * @type {Express}
 */
const app = express();

// Add the middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.enable('trust proxy');

// Add the router for the api
app.use('/api', logMiddleware("/api"), router);
// Add a simple page for status
app.use('/api/status', (req, res) => res.sendStatus(200));
// Add the router for the frontend
app.use('/', express.static(path.resolve('front'), config.env === 'production' ? {
    maxAge: 1000 * 60 * 60 * 3,
    etag: true,
    lastModified: true
} : {}));
app.use((req, res) => {
    res.sendFile(path.resolve('front/index.html'));
});
app.listen(config.port, () => {
    return console.log(`Express is listening at http://localhost:${config.port} (${config.env})`);
});