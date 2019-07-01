const path = require('path');
const nodeExternals = require('webpack-node-externals');

const common = {
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
}

module.exports = [
    {
        entry: path.join(__dirname, 'app.js'),
        output: {
            path: path.join(__dirname, "dist"),
            filename: 'bundle.js',
            publicPath: '/'
        },
        externals: nodeExternals(),
        ...common
    }
]