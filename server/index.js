const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const router = require('./router');

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

io.on('connection', socket =>{
    console.log('We have a new connection!!!!!!');

    socket.on('join',({name,room})=>{
        console.log(name,room);
    })

    socket.on('disconnect',()=>{
        console.log('A user had left!!!!!!!!!');
    })
})

server.listen(port,()=> console.log(`Server has started at ${port}`));