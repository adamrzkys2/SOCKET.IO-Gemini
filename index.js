const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', async (socket) => {
    socket.on('chat message',async (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
        const {AI} = require("./gemini.js")
        await AI(msg)
        .then(async (response)=>{
            await io.emit("reply", response);
        })
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

