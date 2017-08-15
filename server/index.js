const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const socket = require('socket.io');

// Connect to mongoDB
const config = require('./config/mongo');
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log('Connected to database', config.database);
});

// Server setup
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Routes
const users = require('./routes/users');
const debates = require('./routes/debates');
app.use('/users', users);
app.use('/debates', debates);

app.get('*', (req, res) => {
  res.send('hello');
});

// Start server
const server = app.listen(port, () => {
  console.log('Server started on port ', port);
});

// Start socket listerner for spectators
var io = socket(server);
spectator = io.of('/spectator');
pro = io.of('/for');
against = io.of('/against');
let spectatorCount = 0;
let forCount = 0;
let againstCount = 0;

spectator.on('connection', (socket) => {
  console.log('New spectator connected:', ++spectatorCount, socket.id);
  
  socket.on('disconnect', () => {
    console.log('spectator disconnected', --spectatorCount);
  });
  
  socket.on('chat', (data) => {
    console.log(`Received message: ${data.message} from ${data.username}`);
    spectator.emit('chat', data);
  });
});

pro.on('connection', (socket) => {
  console.log('New spectator connected:', ++forCount, socket.id);
  
  socket.on('disconnect', () => {
    console.log('spectator disconnected', --forCount);
  });
  
  socket.on('chat', (data) => {
    console.log(`Received message: ${data.message} from ${data.username}`);
    pro.emit('chat', data);
  });
});

against.on('connection', (socket) => {
  console.log('New spectator connected:', ++againstCount, socket.id);
  
  socket.on('disconnect', () => {
    console.log('spectator disconnected', --againstCount);
  });
  
  socket.on('chat', (data) => {
    console.log(`Received message: ${data.message} from ${data.username}`);
    against.emit('chat', data);
  });
});




