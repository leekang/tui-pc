var path = require('path')
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	cache: true,
	entry: {
		app: ['./server/app.jsx'],
		vendor:['react','react-dom','whatwg-fetch','es6-promise']
	},
	output: {
		path: path.resolve(__dirname, '../dist/static'),
		publicPath: 'static/',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		root: [path.resolve(__dirname, '../modules'),path.resolve(__dirname, '../'), path.resolve(__dirname, '../server'), path.resolve(__dirname, '../server/style')],
		alias: {
			'server': path.resolve(__dirname, '../server'),
			'tui': path.resolve(__dirname, '../'),
			'react': path.resolve('./node_modules/react'),
			'react-dom': path.resolve('./node_modules/react-dom')

		}
	},
	resolveLoader: {
		root: [path.join(__dirname, 'node_modules')]
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name:"vendor",
			minChunks: Infinity
		})
	],
	module: {
		loaders: [,
		{
			test: /\.json$/,
			loader: 'json'
		},
		{
			test: /\.(png|jpg|gif)$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: '[name].[ext]?[hash]'
			}
		},
		{
			test: /\.html/,
			loader: 'string',
		},
		{
			test: /\.(eot|woff|ttf|svg)$/,
			loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
		}]
	},
	sassLoader:{
		includePaths: [path.resolve(__dirname, "../modules"),path.resolve(__dirname, '../server')]
	},
	eslint: {
		formatter: require('eslint-friendly-formatter')
	}
}


