const glob = require("glob").sync;
const path = require("path");
const webpack = require("webpack");
const ManifestPlugin = require("webpack-assets-manifest");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function Bundle() {
  const plugin = require("./_config/plugins.json");
  const prod = process.env.NODE_ENV === "production";

  const alias = {
    Src: path.resolve(__dirname, "_src"),
  };

  const plugins = [
    new ManifestPlugin({
      output: path.join(__dirname, "_src", "cache-manifest.json"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/main.css?cb=[chunkhash]",
      chunkFilename: "main.css?cb=[contenthash]",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: path.resolve(
        __dirname,
        "_src",
        "_site",
        "_includes",
        "_partials",
        "scripts.njk"
      ),
      template: path.resolve(__dirname, "_templates", "scripts.njk"),
      chunks: ["common"],
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: path.resolve(
        __dirname,
        "_src",
        "_site",
        "_includes",
        "_partials",
        "preload-styles.njk"
      ),
      template: path.resolve(__dirname, "_templates", "preload-styles.njk"),
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: path.resolve(
        __dirname,
        "_src",
        "_site",
        "_includes",
        "_partials",
        "styles.njk"
      ),
      template: path.resolve(__dirname, "_templates", "styles.njk"),
    }),
    new SpriteLoaderPlugin({ plainSprite: true }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    // new BundleAnalyzerPlugin()
  ];

  return {
    cache: false,

    devtool: !prod ? "source-map" : "eval",

    entry: {
      common: path.resolve(__dirname, "_src/scripts/main.ts"),
      main: path.resolve(__dirname, "_src/styles/tailwind.css"),
      sprite: glob('./_src/icons/*.svg'),
    },

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].bundle.js?cb=[chunkhash]",
      chunkFilename: "js/[id].chunk.js?cb=[chunkhash]",
      publicPath: "/",
    },

    mode: prod ? "production" : "development",

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ["ts-loader"],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: "/",
              },
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                url: false,
              },
            },
            { loader: "postcss-loader" },
          ],
        },

        {
          test: /\.svg$/,
          include: path.resolve(__dirname, '_src/icons'),
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                extract: true,
                spriteFilename: 'icons/sprite.svg'
              },
            },
            {
              loader: 'svgo-loader',
              options: plugin.svgo
            },
          ],
        },
      ],
    },

    optimization: {
      minimizer: prod
        ? [new TerserPlugin(plugin.uglify)]
        : [
            new TerserPlugin({
              terserOptions: {
                minimize: false,
                warnings: false,
                mangle: false,
              },
            }),
          ],
    },

    plugins,

    resolve: {
      alias,
      extensions: [".ts", ".js"],
    },
  };
}

module.exports = Bundle();
