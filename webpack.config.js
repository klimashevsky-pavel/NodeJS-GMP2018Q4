const path = require('path');
const nodeExternals = require('webpack-node-externals');
const SRC_PATH = path.resolve(__dirname, './src');
const NODE_MODULES_PATH = path.resolve(__dirname, './node_modules');

module.exports = {
    entry: './src/index.ts',
    target: 'node',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    node: {
        __dirname: true
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
