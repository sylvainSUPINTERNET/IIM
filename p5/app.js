var express = require("express");
var bodyParser = require('body-parser');
var app = express();
app.set("views", __dirname + '/views');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
var port = 3000;
var server = app.listen(port);
var io = require('socket.io')(server);
console.log('Express started on port ' + port);


app.get("/", function(req, res){
    res.render('index');
});

io.on('connection', function (socket) {
    //console.log('a user connected');
    socket.on('drawing', function (data) {
        socket.broadcast.emit('news', data);
        //console.log(data);
    });
});