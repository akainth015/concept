const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const shell = require("shelljs");

module.exports = {
    mode: "production",
    entry: "./src/main.js",
    externals: {
        moment: "moment"
    },
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
                    delete compilation.assets["main.js"];
                    delete compilation.assets["styles.css"];
                });
            }
        },
        {
            apply: compiler => {
                if (process.env.AUTO_CLASP_PUSH) {
                    compiler.hooks.done.tap("Clasp Push", function () {
                        shell.exec(`clasp push`, {
                            silent: true
                        });
                        console.log(`Pushed to apps script at ${new Date().toLocaleTimeString()}`);
                    });
                }
            }
        }
    ],
};
