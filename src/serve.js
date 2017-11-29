'use strict';

const debug = require('debug')('esm-dev-server:serve');
const fs = require('fs');
const path = require('path');
const util = require('util');
const babel = require('@babel/core');
const transformFile = util.promisify(babel.transformFile);

const transformImports = require('./transformImports');

const root = path.resolve(process.argv[2] || process.cwd());

async function serve(req, res) {
    const reqPath = req.path;
    if (reqPath === '/') {
        return res.sendFile('index.html', {root});
    }
    debug('request:', reqPath)
    const resolved = path.resolve(root, '.' + reqPath);
    debug('resolved:', resolved);
    const transformed = await transformFile(resolved, {
        plugins: [transformImports(path.dirname(resolved), babel)]
    });

    return res.set('Content-Type', 'application/javascript').end(transformed.code);
}

module.exports = serve;
