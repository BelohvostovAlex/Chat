const express = require('express');

const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

const rooms = new Map()

app.get('/rooms', function(req, res) {
    rooms.set()
    res.json(rooms)
})

io.on('connection', socket => {
    console.log('user connected', socket.id)

})

server.listen(8888, (err) => {
    if(err) {
        throw Error(err)
    }
    console.log('Server started')
})