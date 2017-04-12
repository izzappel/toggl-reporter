const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		app: ['webpack/hot/dev-server', './app/javascripts/entry.js']
	},
	output: {
		path:  path.join(__dirname, '/app/public/built'),
		filename: 'bundle.js',
		publicPath: 'http://localhost:8080/built/'
	},
	devServer: {
		contentBase: path.join(__dirname, '/app/public'),
		publicPath: 'http://localhost:8080/built'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015'],
				},
			},
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
				loader: 'url-loader?limit=10000',
			},
			{
				test: /\.(eot|ttf|wav|mp3)$/,
				loader: 'file-loader',
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
			},
		],
	},
  target: 'node',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	]
};