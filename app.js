/**
 * Created by twatson on 9/3/14.
 */

var express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require("path");

var ss = require('socket.io-stream');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();

var exec = require("child_process").exec;
var spawn = require("child_process").spawn;

router.get('/', function (req, res) {
	res.render("index");
});

app.use(router);



server.listen(3000);


io.on("connection", function(socket){

	//ss(socket).on("/models/ls", function(stream, data){

	//});
	socket.on("/models/ls", function(data){
		var ls = exec('ls -lh '+data, function(err, stdout, stderr){
			socket.emit("/models/ls", stdout);
		});
	});

	//socket.emit("/models/ls", "somedata" );
});
