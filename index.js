var express = require('express');
var fs = require('fs');
var multer = require('multer')({dest: './uploads/'});

var config = JSON.parse(fs.readFileSync('./config.json'));
var app = express();
var PORT = 3000;

var http = require('http').createServer(app);
var io = require('socket.io')(http);

var birds = require("./birds.js");
var file = require('./file.js');
var User = require('./user.js');

app.set('views', './views');
app.set('view engine', 'jade');

app.use(multer);
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('bower_components'));
app.use('/birds', birds);

app.get('/', function(req, res) {
	res.render('index', {title: "Chat Application", message: "Wellcome to chat room"})
});

app.post('/upload', file);

var usernames = {};

io.on('connection', function(socket) {


	io.emit('connected');

	console.log("a user connected");

	socket.on('register', function(user) {
		User.register(socket.id);
		socket.username = user.nickname;
		socket.avatar = user.avatar;
		socket.join('registered user');
		socket.broadcast.to('registered user').emit('register', socket.username);
	});

	socket.on('disconnect', function() {
		socket.broadcast.to('registered user').emit('user left', socket.username);
	});

	socket.on('message', function(msg) {
		if (!User.isRegistered(socket.id))
			return;

		socket.broadcast.to('registered user').emit('message', {
			message: msg,
			nickname: socket.username,
			avatar: socket.avatar
		});
	});

	socket.on('typing', function() {
		if (!User.isRegistered(socket.id))
			return;

		socket.broadcast.to('registered user').emit('typing', socket.username);
	});
});

app.use(function(req, res) {
	res.status(404);
	res.render("404", {title: "Page not found"});
});

http.listen(config.PORT, function() {
	console.log("Listening on localhost:" + config.PORT);
});