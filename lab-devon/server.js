'use strict';
const net = require('net');
const server = net.createServer();
const parseMessage = require('./lib/parse-message.js');

let sockets = [];

server.on('connection', function(socket){
  console.log('A Client Connected!');
  socket.write('Hey! Welcome to Wack Chat');
  socket.username = `user_${Math.floor(Math.random()*100)}`;
  sockets.push(socket);

  socket.on('data', function(buffer){
    let message = buffer.toString();

    if(message.startsWith('/nick'))
      return parseMessage.nickCommand(message,socket);

    if(message.startsWith('/dm'))
      return parseMessage.dmCommand(message,sockets);

    if(message.startsWith('/users'))
      return parseMessage.usersCommand(sockets, socket);

    if(message.startsWith('/troll'))
      return parseMessage.trollCommand(message,sockets);

    if(message.startsWith('/ban'))
      return parseMessage.banCommand(message, sockets);

  });

  socket.on('close', function(){
    console.log('a client left the chatroom');
    sockets.forEach(function(s, index){
      if(s === socket)
        sockets.splice(index,1);
    });
  });
});

server.listen(3000, function(){
  console.log('Server is up!');
});
