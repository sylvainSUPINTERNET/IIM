var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 4999;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    io.clients((error, clients) => {
        if (error) throw error;
        socket.emit('online_count', {clients: clients.length});
    });

    socket.broadcast.emit('NEW_CONNECTION_ALERT', {message: 'New connection detected'});


    //broadcast pas à la personne

    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });


    socket.on('disconnect', function () {
        io.clients((error, clients) => {
            if (error) throw error;
            socket.emit('online_count', {clients: clients.length});
        });

        socket.broadcast.emit('DISCONNECT_ALERT', {message: 'Someone has been disconnected'});


    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});
