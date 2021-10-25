// const io = require('socket.io')(3000);

// io.on('connection', socket => {
//     //console.log(socket.id);
//     socket.on('SIGN_UP_USER', username => {
//         console.log(username);
//     });
// });

const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})

const listUsers = [];

io.on("connection", (socket) => {

    socket.on('SIGN_UP_USER', user => {
        var isExist = listUsers.some(u => u.name === user.name);

        if(!isExist){
            socket.peerId = user.name;
            listUsers.push(user);
            console.log('HAS_NEW_USER: ' + user.name);
            console.log('length: ' + listUsers.length);
            //socket.broadcast.emit('HAS_NEW_USER', user);
            //socket.emit('LIST_ONLINE_USERS', listUsers);
            //io.emit('HAS_NEW_USER', user);
            io.emit('LIST_ONLINE_USERS', listUsers);
        }        
    });

    socket.on('GET_ONLINE_USERS', () => {
        io.emit('LIST_ONLINE_USERS', listUsers);
    });

    socket.on('END_CALL_FROM', username => {
        console.log('call end: ' + username);
        io.emit('END_CALL_TO', username);
    });

    socket.on('disconnect' , () => {
        const index = listUsers.findIndex(user => user.name === socket.peerId);
        if(index >= 0){
            listUsers.splice(index, 1);
            io.emit('HAS_DISCONNECTED', socket.peerId);
            console.log('index: ' + socket.peerId);
            console.log('socket.peerId: ' + socket.peerId);
            console.log('length: ' + listUsers.length);
        }
    })
})

server.listen(5000, () => console.log("server is running on port 5000"))
