import React, { useEffect, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import { AppContext } from '../../store/AppProvider';
import { makeStyles } from '@material-ui/core';
import userImg from '../../assets/user.png';
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
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    fromVideo: {
        position: 'absolute',
        top: '69px',
        left: '16px',
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
    return (
        <div className={classes.customer} onClick={props.callVideo}>
            <div className={classes.info}>
                <img className={classes.infoImg} src={userImg} width="40px" height="40px" alt=""></img>
                <div width="100">
                    <h4 className={classes.infoName} >{props.username}</h4>
                    <small>Đang Online</small>
                </div>
            </div>
        </div>
    );
}

export default function VideoCallComponent(props) {
    const { role } = props;

    const { peer, listOnlineUsers, setListOnlineUsers, callingUserId, setCallingUserId, userInfo, socket, openStream, playStream, closeStream, currentCall, myPeerId } = useContext(AppContext);

    const [isCallSend, setIsCallSend] = useState(false);
    const [isCallAccept, setIsCallAccept] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const [isCallBusy, setIsCallBusy] = useState(false);
    const [waitingUserId, setWaitingUserId] = useState(0);
    const [waitingPeerId, setWaitingPeerId] = useState('');
    const [currentCallSend, setCurrentCallSend] = useState(null);

    const classes = useStyles();

    socket.on('LIST_ONLINE_USERS', listUsers => {
        setListOnlineUsers(listUsers);;
    });

    socket.on('HAS_NEW_USER', user => {
        setListOnlineUsers(listOnlineUsers.concat([user]));
    });

    socket.on('ACCEPT_CALL', userId => {
        if (callingUserId === userId) {
            setIsCallAccept(true);
        }
    });

    socket.on('END_CALL_FROM', (fromId, toId) => {
        if (fromId === callingUserId) {
            setCallingUserId(0);
            setIsCalling(false);
        }
    });

    socket.on('CALL', (fromId, toId) => {
        if (toId === userInfo.id) {
            if (isCalling) {
                socket.emit('USER_BUSY', toId);
            }
            else {
                setWaitingUserId(fromId);
            }
        }
    });

    socket.on('USER_BUSY', userId => {
        if (userId === callingUserId && isCallSend) {
            setCallingUserId(0);
            console.log('user busy');
            setIsCallSend(false);
            setIsCallBusy(true);
        }
    });

    socket.on('HAS_DISCONNECTED', userId => {
        const index = listOnlineUsers.findIndex(user => user.id === userId);
        if (index >= 0) {
            setListOnlineUsers(listOnlineUsers.filter(user => user.id !== userId));
        }
        if (userId === callingUserId) {
            setCallingUserId(0);
        }
    });

    // get param when open new window
    const location = useLocation();
    useEffect(() => {
        socket.emit('GET_ONLINE_USERS');
        openStream()
            .then(stream => {
                playStream('localStream', stream);
            });
        //const query = new URLSearchParams(useLocation().search);
        console.log('location');
        console.log(location);
    }, []);

    useEffect(() => {
        if (isCallBusy) {
            console.log('Người dùng đang bận.');
            setIsCallBusy(false);
        }
    }, [isCallBusy]);

    useEffect(() => {
        if (isCallSend && isCallAccept && callingUserId > 0 && waitingPeerId !== '') {
            openStream()
                .then(stream => {
                    playStream('localStream', stream);
                    const call = peer.call(waitingPeerId, stream);
                    call.on('stream', (remoteStream) => {
                        playStream('remoteStream', remoteStream);
                    });
                    setIsCalling(true);
                    setCurrentCallSend(call);
                    setWaitingPeerId('');
                });
            setIsCallSend(false);
            setIsCallAccept(false);
        }
        else if (!isCallSend && isCallAccept && callingUserId > 0 && currentCall !== null) {
            openStream()
                .then(stream => {
                    playStream('localStream', stream);
                    currentCall.answer(stream);
                    currentCall.on('stream', (remoteStream) => {
                        playStream('remoteStream', remoteStream);
                    });
                    setIsCalling(true);
                });
            setIsCallAccept(false);
        }
        else if (!isCallSend && !isCallAccept && callingUserId === 0 && waitingUserId === 0) {
            closeStream('remoteStream');
            console.log('call end');
        }
    }, [isCallSend, isCallAccept, callingUserId, currentCall, waitingPeerId, waitingUserId]);

    const handleAnswerCall = () => {
        socket.emit('ACCEPT_CALL', userInfo.id);
        setIsCallAccept(true);
        setCallingUserId(waitingUserId);
        setWaitingUserId(0);
    }
    const handleCancelCall = () => {
        socket.emit('END_CALL_FROM', userInfo.id, callingUserId);
        setWaitingUserId(0);
    }
    const handleEndCall = () => {
        socket.emit('END_CALL_FROM', userInfo.id, callingUserId);
        setIsCalling(false);
        setCallingUserId(0);
        setIsCallAccept(false);
    }

    const handleCallStart = (toPeerId, toId, toName) => {
        if (callingUserId > 0) {
            alert("Bạn đang ở trong cuộc gọi.");
            return;
        }
        setWaitingPeerId(toPeerId);
        setCallingUserId(toId);
        socket.emit('CALL', userInfo.id, toId);
        setIsCallSend(true);
    }

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
                        {callingUserId > 0 ?
                            <Button onClick={handleEndCall} variant="contained" color="secondary">Kết thúc cuộc gọi</Button>
                            : null
                        }
                        {waitingUserId > 0 ?
                            <span>
                                <Button onClick={handleAnswerCall} variant="contained" color="primary">Trả lời</Button>
                                <Button onClick={handleCancelCall} variant="contained" color="secondary">Từ chối</Button>
                            </span>
                            : null
                        }
                        <Button
                            variant="contained"
                            onClick={() => {
                                console.log({
                                    isCallSend, isCallAccept, callingUserId, currentCall, waitingPeerId, waitingUserId
                                });
                                console.log(listOnlineUsers);
                            }}>
                            Check
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    {
                        role === "DOCTOR" ?
                            <Paper className={classes.userPaper}>
                                <Button onClick={() => { console.log(listOnlineUsers) }}>Danh sách người dùng online</Button>
                                {listOnlineUsers.map((user) => (
                                    user.id !== userInfo.id ?
                                        <UserDiv username={user.name} peerId={user.peerId} callVideo={() => handleCallStart(user.peerId, user.id, user.name)} />
                                        : null
                                ))}
                            </Paper>
                            : null
                    }
                </Grid>
            </Grid>
        </div>
    );
}
