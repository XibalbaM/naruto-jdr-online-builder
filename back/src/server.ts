import express from 'express';
import cors from 'cors';
import path from 'path';

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
app.use(express.urlencoded({ extended: true }));

// Add the router for the api
app.use('/api', logMiddleware("/api"), router);
// Add the router for the frontend
app.use('/', express.static(path.resolve('front')));
app.use((req, res) => {
    res.sendFile(path.resolve('front/index.html'));
});

app.listen(config.port, () => {
    return console.log(`Express is listening at http://localhost:${config.port} (${config.env})`);
});