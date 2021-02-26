var app = require('express')();
var path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const config = require('./config/config');

//Routes for Bootstrap
app.get('/bootstrap.min.css', (req,res) => {
  res.sendFile(path.join(__dirname, '/bootstrap.min.css'));
})

app.get('/bootstrap.min.js', (req,res) => {
  res.sendFile(path.join(__dirname, '/bootstrap.min.js'));
})

//Set up default route to serve static HTML
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

//add jQuery for client side
app.get('/jquery', (req,res) => {
  res.sendFile(path.join(__dirname, '/jquery.min.js'));
});


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
})

console.log('Server listening on port ' + config.port);
http.listen(config.port);
