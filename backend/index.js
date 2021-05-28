const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});
let port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

server.listen(port, () => {
    console.log(`running locally at http://localhost:${port}`);
});

io.on('connection', (socket) => {
    console.log(`user connected: ${socket.id}`)
    socket.on('message', (data) => {
        socket.broadcast.emit('message', data);
    });
});