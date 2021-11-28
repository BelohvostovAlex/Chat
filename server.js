const express = require('express');

const app = express();

const rooms = {
    'rooms': [],
    'messages': ['Hello'],
}

app.get('/rooms', function(req, res) {
    console.log('hello')
    res.json(rooms)
})

app.listen(8888)