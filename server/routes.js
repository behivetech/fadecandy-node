'use strict';

import path from 'path';

/* global app */

import config from '../config/server';

const router = module.exports = require('express').Router();
// const config = app.get('config');

// router.use('/health', require('./health'));

// if (config.client.base.inMaintenance) {
//     router.get('*', (req, res) => {
//         res.status(503);
//         res.render('maintenance', {
//           config
//         });
//     });

// } else {
    router.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../src/index.html') );
    });

// }
