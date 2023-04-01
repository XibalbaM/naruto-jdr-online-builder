import express from 'express';
import cors from 'cors';

import config from "./config/env.js";
import router from './router.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(config.port, () => {
    return console.log(`Express is listening at http://localhost:${config.port} (${config.env})`);
});