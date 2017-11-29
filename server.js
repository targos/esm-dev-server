'use strict';

const express = require('express');
const serve = require('./src/serve');

const app = express();

app.use(async (req, res, next) => {
    try {
        await serve(req, res, next);
    } catch (e) {
        next(e);
    }
});

app.listen(8080);
