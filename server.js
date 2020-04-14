const path = require('path');
const http = require('http');
const { Application } = require('egg');
const debug = require('debug')('app:server');
const port = require('./package.json').config.port || 9999;

// require('@babel/polyfill');
// require('@babel/register')({
//     extensions: ['.js', '.jsx'],
//     presets: [
//         "@babel/preset-env"
//     ],
//     plugins: [
//         "@babel/plugin-proposal-class-properties"
//     ]
// });

const start = +new Date();
// KoaApplication -> EggCore -> EggApplication
const app = new Application({
    baseDir: path.resolve('./')
});

const server = http.createServer(app.callback());
server.on('error', err => {
    // logger.error('server error', err);
    console.error('server error', err);
});

// log the error that promise had not catch
// https://nodejs.org/api/process.html#process_event_unhandledrejection
process.on('unhandledRejection', err => {
    // logger.warn('unhandledRejection error', err, { type: 'promise' });
    debug('unhandledRejection error', err);
});

app.ready(() => {
    server.listen(port);
    console.log(`[app] Application started successfully in ${+new Date() - start}ms, listening on port ${port}`);
});
