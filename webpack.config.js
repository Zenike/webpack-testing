const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
	entry: {
		integrator: './assets/js/monjquery.js',
		progra: './assets/js/yannik.js',
		lessFrontoffice: './assets/less/style.less',
	},
	output: {
		filename: './assets/js-output/bundle-[name].js',
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ['css-loader?-url', 'postcss-loader', 'less-loader']
				}),
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("./assets/css/style.css"),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
			minChunks: 2,
		}),
	]
}
