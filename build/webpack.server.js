var path = require('path');
var serverConf = {
	contentBase: path.resolve(__dirname, '../server'),
	progress:false,
	devtool: 'eval-source-map',
	hot: true,
	inline: true,
	proxy: {},
	stats: {
		colors: true
	}
}
var proxyPaths = [
	'getCurrentUser',
	'logout',
	'user',
	'dept',
	'message',
	'meeting',
	'upload',
	'uploadID',
	'form',
];
proxyPaths.forEach(function(v){
	serverConf.proxy['/'+v+"*"] ={
		target: '',
		changeOrigin: true
	}
})



module.exports = serverConf;

