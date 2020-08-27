const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "production",
    entry: "./src/main.js",
    output: {
        path: __dirname,
        filename: "main.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            base: {
                target: "_top"
            },
            inject: false,
            cache: false,
            filename: "Sidebar.html",
            template: "src/index.ejs"
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css"
        }),
        {
            apply(compiler) {
                compiler.hooks.emit.tap("Concept Compilation", function (compilation) {
                    // The compilation.deleteAsset method was not available for some reason,
                    // this behavior is copied from the following source
                    // https://github.com/webpack/webpack/blob/28e11c3f263f6303f701c4bebe483bd7e034f91b/lib/Compilation.js#L2868
                    delete compilation.assets["main.js"]
                });
            }
        }
    ],
};
