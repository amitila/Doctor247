import React, { useEffect, useRef, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import { io } from "socket.io-client";
import { DoctorContext } from '../Home/DoctorProvider';
import { makeStyles } from '@material-ui/core';
import userImg from '../../../assets/user.png';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    customer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        background: '#dfede4',
        cursor: 'pointer',
        '&:hover': {
            background: "#e0ffe9",
            color: '#004d40'
         },
    },
    info: {
        display: 'flex',
        alignItems: 'center',
    },
    infoImg: {
        borderRadius: '50%',
        marginRight: '1rem',
    },
    infoName: {
        fontSize: '.8rem',
        fontWeight: '600',
        color: '#222',
    },
    callButton: {
        float: 'right'
    },
    root: {
        flexGrow: 1,
    },
    videoPaper: {
        position: 'relative',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '930px',
        height: '600px'
    },
    userPaper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    fromVideo: {
        position: 'absolute',
        top: '465px',
        left: '715px',
        border: '5px solid #3f51b5',
        width: '200px',
        height: '117px',
    },
    toVideo: {
        border: '5px solid #3f51b5',
        background: '#878c9c',
        width: '900px',
        height: '510px',
    }
}));

function UserDiv(props) {
    const classes = useStyles();
    return(
        <div className={classes.customer} onClick={props.callVideo}>
            <div className={classes.info}>
                <img className={classes.infoImg} src={userImg} width="40px" height="40px" alt=""></img>
                <div width="100">
                    <h4 className={classes.infoName} >{props.username}</h4>
                    <small>Online</small>
                </div>
            </div>
        </div>
    );
}

export default function VideoCall(props) {
    const {username, peer, isCalling, setIsCalling} = useContext(DoctorContext);

    const myPeerId = useRef('');

    const [listOnlineUsers, setListOnlineUsers] = useState([]);

    const [callingUser, setCallingUser] = useState('');

    const socket = io('http://localhost:5000/');

    const classes = useStyles();

    useState(() => {
        socket.emit('GET_ONLINE_USERS');
    },[]);

    socket.on('LIST_ONLINE_USERS', listUsers => {
        setListOnlineUsers(listUsers);
    });

    socket.on('HAS_NEW_USER', user => {
        console.log('has new user ');
        setListOnlineUsers(listOnlineUsers.concat([user]));
    });

    socket.on('END_CALL_TO', usernameTo => {
        if(usernameTo === callingUser){
            setIsCalling(false);
            setCallingUser('');
        }
        console.log(usernameTo);
    });

    socket.on('HAS_DISCONNECTED', id => {
        const index = listOnlineUsers.findIndex(user => user.name === id);
        if(index >= 0){
            setListOnlineUsers(listOnlineUsers.filter(user => user.name !== id));
        }
    });

    const openStream = () => {
        const config = {audio: true, video: true};
        return navigator.mediaDevices.getUserMedia(config);
    }

    const playStream = (idVideoTag, stream) => {
        const video = document.getElementById(idVideoTag);
        video.srcObject = stream;
        video.play();
    }

    const location = useLocation();
    useEffect(() => {
        peer.on('open', (id) => {
            console.log(id);
            myPeerId.current = id;
            socket.emit('SIGN_UP_USER', {name: username, id: myPeerId.current});
        });
        openStream()
        .then(stream => {
            playStream('localStream', stream);
        });
        //const query = new URLSearchParams(useLocation().search);

        console.log(location);
    }, []);

    const handleEndCall = () => {
        if(isCalling){
            setIsCalling(false);
            setCallingUser('');
            socket.emit('END_CALL_FROM', username);
        }
    }

    const handleCallVideoClick = (toId, toName) => {
        if(isCalling){
            return;
        }
        setIsCalling(true);
        setCallingUser(toName);
        openStream()
        .then(stream => {
            playStream('localStream', stream);
            const call = peer.call(toId, stream);
            call.on('stream', (remoteStream) => {
                playStream('remoteStream', remoteStream);
            });
        });
    }
    
    peer.on('call', (call) => {
        setIsCalling(true);
        console.log('answer');
        openStream()
        .then(stream => {            
            call.answer(stream);
            playStream('localStream', stream);
            call.on('stream', (remoteStream) => {
                playStream('remoteStream', remoteStream);
            });
        })
    });

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12}>
                    <Paper className={classes.videoPaper}>
                        <h1>Video Call</h1>
                        <video id="remoteStream" className={classes.toVideo} controls> </video>
                        <br /><br />
                        <video id="localStream" className={classes.fromVideo} controls autoPlay> </video>
                        <br /><br />
                        {isCalling?
                            <Button onClick={handleEndCall} variant="contained" color="secondary">Kết thúc</Button>
                            :null
                        }
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Paper className={classes.userPaper}>
                        <Button onClick={() => {console.log(listOnlineUsers)}}>Danh sách người dùng</Button>
                        {listOnlineUsers.map((user) => (
                            user.name!==username?
                            <UserDiv username={user.name} peerId={user.id} callVideo={() => handleCallVideoClick(user.id, user.name)}/>
                            :null
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
