const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'jslib.js'
    },
    watch: true,
    watchOptions: {
        poll: false,
        ignored: ['node_modules']
    },
    module: {
        rules: [
            {
                test: [/\.js$/],
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },

    resolve: {
        extensions: ['.js']
    }
};