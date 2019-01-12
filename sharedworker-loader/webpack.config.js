// webpack.config.js
let webpack = require('webpack');
const path = require("path");
const srcDir = path.resolve(process.cwd(), "src");

module.exports = {
    entry: {
        magicIO: path.resolve(srcDir, "entry")
    },
    output: {
        filename: "dist/magicIO.js",
        library: "magicIO",
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
        modules: ["node_modules"]
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader"
                }
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'sharedworker-loader' }
            }
            
        ]
    }
};
