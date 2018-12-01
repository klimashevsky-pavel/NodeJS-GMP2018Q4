const path = require('path');
const nodeExternals = require('webpack-node-externals');
const SRC_PATH = path.resolve(__dirname, './src');
const NODE_MODULES_PATH = path.resolve(__dirname, './node_modules');

module.exports = {
    entry: './src/app.ts',
    target: 'node',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
        ]
    },
    externals: [nodeExternals()],
    resolve: { 
        modules: [SRC_PATH, NODE_MODULES_PATH],
        extensions: ['*', '.js', '.ts']
    }
};
