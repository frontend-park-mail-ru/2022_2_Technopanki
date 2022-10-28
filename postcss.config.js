module.exports = {
    plugins: [
        require('autoprefixer'), // prefixes styles
        require('css-mqpacker'), // compresses media queries
        require('cssnano')({
            preset: [
                'default',
                {
                    discardComments: {
                        removeAll: true,
                    },
                },
            ],
        }), // minifies the original styles
    ],
    postcssOptions: {
        parser: 'postcss-js',
    },
};
