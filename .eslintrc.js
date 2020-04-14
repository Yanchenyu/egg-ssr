const path = require('path');

module.exports = {
    env: {
        browser: true,
        node: true,
        commonjs: true,
        amd: true,
        es6: true
    },
    root: true,
    parser: 'babel-eslint',
    rules: {
        // disable some rules temporarily
        'no-empty-function': 0,
        'promise/no-native': 0,
        'react/forbid-component-props': 0,
        'react/jsx-key': 0,
        'react/jsx-handler-names': 0,
        'react/jsx-max-props-per-line': 0,
        'react/jsx-first-prop-new-line': 0,
        'react/jsx-closing-tag-location': 0,
        'react/self-closing-comp': 0,
        'react/forbid-dom-props': 0,
        'semi': [2, 'always']
    }
};
