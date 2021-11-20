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

const listOnlineUsers = [];
const listCallingUserIds = [];

io.on("connection", (socket) => {

    socket.on('SIGN_UP_USER', user => {
        var isExist = listOnlineUsers.some(u => u.id === user.id);

        if(!isExist){
            socket.peerId = user.peerId;
            listOnlineUsers.push(user);
            io.emit('LIST_ONLINE_USERS', listOnlineUsers);
            
            console.log('HAS_NEW_USER: ' + user.name);
            console.log('users_length: ' + listOnlineUsers.length);
            //socket.broadcast.emit('HAS_NEW_USER', user);
            //socket.emit('LIST_ONLINE_USERS', listOnlineUsers);
            //io.emit('HAS_NEW_USER', user);
        }        
    });

    socket.on('GET_ONLINE_USERS', () => {
        io.emit('LIST_ONLINE_USERS', listOnlineUsers);
    });

    socket.on('END_CALL_FROM', (fromId, toId) => {
        io.emit('END_CALL_FROM', fromId, toId);
        const indexFrom = listCallingUserIds.findIndex(id => id === fromId);
        const indexTo = listCallingUserIds.findIndex(id => id === toId);
        if(indexFrom >= 0){
            listCallingUserIds.splice(indexFrom, 1);
        }
        if(indexTo >= 0){
            listCallingUserIds.splice(indexTo, 1);
        }
    });

    socket.on('CALL', (fromId, toId) => {
        const indexFrom = listCallingUserIds.findIndex(id => id === fromId);
        const indexTo = listCallingUserIds.findIndex(id => id === toId);
        if (indexFrom < 0){
            listCallingUserIds.push(fromId);
        }
        if (indexTo < 0){
            listCallingUserIds.push(toId);
            io.emit('CALL', fromId, toId);
        }
        else {
            io.emit('END_CALL_FROM', toId, fromId);
            listCallingUserIds.splice(indexFrom, 1);
        }
        console.log('listCallingUserIds: ');
        console.log(listCallingUserIds);
    });
    
    socket.on('ACCEPT_CALL', userId => {
        io.emit('ACCEPT_CALL', userId);
    });

    socket.on('GET_CALLING_USERS', toId => {
        io.emit('GET_CALLING_USERS', toId, listCallingUserIds);
    }); 

    socket.on('disconnect' , () => {
        const index = listOnlineUsers.findIndex(user => user.peerId === socket.peerId);
        const user = listOnlineUsers.find(x => x.peerId === socket.peerId);
        if(index >= 0){
            listOnlineUsers.splice(index, 1);
            io.emit('HAS_DISCONNECTED', user.id);
            console.log('HAS_DISCONNECTED: ' + user.id);
            //console.log('socket.peerId: ' + socket.peerId);
            console.log('length: ' + listOnlineUsers.length);
        }
    });
})

server.listen(5000, () => console.log("server is running on port 5000"));
