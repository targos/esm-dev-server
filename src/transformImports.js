'use strict';

const debug = require('debug')('esm-dev-server:transformImports');
const {relative, sep} = require('path');
const resolve = require('resolve').sync;

const regSep = sep === '\\' ? /\\/g : /\//g;

function transformImports(basedir, { types: t }) {
    return {
        visitor: {
            ImportDeclaration(path) {
                debug('ImportDeclaration');
                const source = path.node.source;
                replacePath(source);
            },
            ExportDeclaration(path) {
                debug('ExportDeclaration');
                const source = path.node.source;
                if (source) {
                    replacePath(source);
                }
            }
        }
    };

    function replacePath(source) {
        const moduleSpecifier = source.value;
        debug('module specifier:', moduleSpecifier);
        try {
            const resolved = resolve(moduleSpecifier, {basedir, extensions: ['.mjs', '.js']});
            debug('resolved:', resolved);
            const relativePath = relative(basedir, resolved).replace(regSep, '/');
            debug('relative', relativePath);
            source.value = ('./' + relativePath);
        } catch (e) {
            debug(e.message);
        }
    }
}

module.exports = transformImports;
