const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    // console.log(socket.id)

    socket.on('join_room', (data) => {
        socket.join(data)
        // console.log(`User with id ${socket.id} joined room : ${data.room}`)
        // console.log(`${data.user} joined room : ${data.room}`)
    })

    socket.on('send_message', (data) => {
        // console.log(data)
        io.emit('receive_message', { ...data, id: socket.id })
        // socket.emit('receive_message', data);
    })

    socket.on('disconnect', () => {
        console.log("User disconnected", socket.id)
    })
})

const port = 6969;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})