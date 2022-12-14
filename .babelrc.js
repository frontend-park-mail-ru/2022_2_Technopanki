const path = require('path');

module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
    plugins: [
        [
            '@babel/plugin-proposal-decorators',
            {
                decoratorsBeforeExport: true,
            },
        ],
        [
            '@babel/plugin-transform-react-jsx',
            {
                throwIfNamespace: false,
                runtime: 'automatic',
                importSource: path.resolve(__dirname, './Reacts'),
            },
        ],
    ],
};
