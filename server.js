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
    socket.on('ROOM:JOIN', ({roomId, userName}) => {
        socket.join(roomId)
        rooms.get(roomId).get('users').set(socket.id, userName)
        const users = rooms.get(roomId).get('users').values()
        io.in(roomId).emit('ROOM:JOINED', [...users])
    })
    socket.on('ROOM:NEW_MESSAGE', ({roomId, userName, text, date}) => {
        const obj = {
            userName,
            text,
            date
         }
        rooms.get(roomId).get('messages').push(obj)
        io.in(roomId).emit('ROOM:NEW_MESSAGE', obj)
        console.log(rooms)
    })
    socket.on('disconnect', () => {
        rooms.forEach((value, index) => {
            if(value.get('users').delete(socket.id)) {
                const users = rooms.get(index).get('users').values()
                io.in(index).emit('ROOM:SET_USERS', [...users])
            }
        })
    })
})



server.listen(8888, (err) => {
    if(err) {
        throw Error(err)
    }
    console.log('Server started')
})