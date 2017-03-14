'use strict';

module.exports = exports = {};

exports.nickCommand = function nickCommand(message, socket) {
  socket.username = message.split(' ').slice(1).join(' ').trim();
  socket.write(`I am now calling you ${socket.username}\n`);
};

exports.dmCommand = function dmCommand(message, sockets) {
  let toUsername = message.split(' ')[1];
  let content = message.split(' ').slice(2).join(' ').trim();
  sockets.forEach( s => {
    if(s.username === toUsername)
      s.write(s.username + ':' + content);

  });
};

exports.usersCommand = function usersCommand(userArray, socket){
  userArray.forEach( s => {
    socket.write(s.username + '\n');
  });
};

exports.trollCommand = function trollCommand(message, users) {
  let content = message.split(' ').slice(1).join(' ').trim();
  users.forEach(s => {
    for (var i=0; i < 10; i++){
      s.write(content + '\n');
    }
  });
};

exports.banCommand = function banCommand(message, users){
  let toUsername = message.split(' ')[1].trim();
  users.forEach((s,index) => {
    if(s.username === toUsername)
      s.end(`${s.username} has been removed`);
    users.splice(index,1);
  });
};
