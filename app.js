var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = 8080;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('A user connected');
    io.sockets.emit('news', {text: 'New user connected'});

    socket.on('disconnect', function () {
        console.log('A user disconnected');
        io.sockets.emit('news', {text: 'User disconnected'});
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});