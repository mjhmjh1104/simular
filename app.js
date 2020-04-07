var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/app/:num', function (req, res) {
  res.render('app' + req.params.num);
});

var ports = [];
io.on('connection', function (socket) {
  ports.push(socket.request.connection.remoteAddress);
  console.log(ports);
  io.emit('changeCnt', ports.filter(function (item, pos) {
    return ports.indexOf(item) == pos;
  }).length);
  socket.on('disconnect', function () {
    ports = ports.splice(ports.indexOf(socket.request.connection.remoteAddress), 1);
    console.log(ports);
    io.emit('changeCnt', ports.length);
  });
})

http.listen(process.env.PORT || 3000, function () {
  console.log('Server On');
})
