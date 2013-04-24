var express = require('express');
var	path = require('path');
var	http = require('http');
var app = express();

app.configure(function () {
	app.set('port', process.env.PORT || 8080);
	app.set('domain', 'epuakhaw0143');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.static(path.join(__dirname, 'public')));
});


var server = http.createServer(app).listen(app.get('port'), app.get('domain') , function () {
	console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	socket.on('setorientation', function(data){
		io.sockets.emit('getorientation', data);
	});
});