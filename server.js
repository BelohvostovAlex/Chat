const express = require('express');

const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

app.use(express.json())
const rooms = new Map()

app.get('/rooms', function(req, res) {
    res.json(rooms)
})

app.post('/rooms', (req, res) => {
    const { roomId, userName} = req.body
    if(!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []],
        ]))
    }
    res.send()
})

io.on('connection', socket => {
    socket.on('ROOM:JOIN', (data) => {
        console.log(data)
    })
    console.log('user connected', socket.id)

})

server.listen(8888, (err) => {
    if(err) {
        throw Error(err)
    }
    console.log('Server started')
})