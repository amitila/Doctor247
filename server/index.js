const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const cors = require("cors")

const port = process.env.PORT || 5000

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.use(cors());

const listOnlineUsers = [];
const listCallingUserIds = [];

io.on("connection", (socket) => {

    socket.on('SIGN_UP_USER', user => {
        var isExist = listOnlineUsers.some(u => u.id === user.id);

        if (!isExist) {
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
        const indexFrom = listCallingUserIds.indexOf(fromId);
        if (indexFrom > -1) {
            listCallingUserIds.splice(indexFrom, 1);
        }

        const indexTo = listCallingUserIds.indexOf(toId);
        if (indexTo > -1) {
            listCallingUserIds.splice(indexTo, 1);
        }
    });

    socket.on('CALL', (fromId, toId) => {
        console.log('listCallingUserIds: ');
        console.log(listCallingUserIds);
        console.log('listOnlineUsers');
        console.log(listOnlineUsers);
        const indexFrom = listCallingUserIds.findIndex(id => id === fromId);
        const indexTo = listCallingUserIds.findIndex(id => id === toId);
        if (indexFrom < 0) {
            listCallingUserIds.push(fromId);
        }
        if (indexTo < 0) {
            listCallingUserIds.push(toId);
            io.emit('CALL', fromId, toId);
        }
        else {
            io.emit('END_CALL_FROM', toId, fromId);
            listCallingUserIds.splice(indexFrom, 1);
        }
    });

    socket.on('ACCEPT_CALL', userId => {
        io.emit('ACCEPT_CALL', userId);
    });

    socket.on('GET_CALLING_USERS', toId => {
        io.emit('GET_CALLING_USERS', toId, listCallingUserIds);
    });

    socket.on('disconnect', () => {
        const index = listOnlineUsers.findIndex(user => user.peerId === socket.peerId);
        const user = listOnlineUsers.find(x => x.peerId === socket.peerId);
        if (index > -1) {
            listOnlineUsers.splice(index, 1);
            io.emit('HAS_DISCONNECTED', user.id);
            console.log('HAS_DISCONNECTED: ' + user.id);
            //console.log('socket.peerId: ' + socket.peerId);
            console.log('online user length: ' + listOnlineUsers.length);
            console.log('calling user length: ' + listCallingUserIds.length);
        }
    });
})

server.listen(port, () => console.log(`server is running on port ${port}`));
// https://socket-server-doctor247.herokuapp.com/