const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
	'app': './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
	contentBase: './dist'
    },
    plugins: [
	new CleanWebpackPlugin(['dist']),
	new HtmlWebpackPlugin({
	    title: 'Breakout',
	    template: 'index.html'
	}),
	new CopyWebpackPlugin([
	    {
		from: path.resolve(__dirname, 'assets', '**', '*'),
		to: path.resolve(__dirname, 'dist')
	    }
	])
    ],
    output: {
	filename: '[name].bundle.js',
	path: path.resolve(__dirname, 'dist')
    },
    devServer: {
	contentBase: path.resolve(__dirname, 'dist'),
    }
};
