import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { maxWidth } from '@mui/system';
import { useEffect } from 'react/cjs/react.development';

const useStylesRight = makeStyles((theme) => ({
    root: {
        textAlign: 'right',
    },
    container: {
        position: 'relative',
        marginBotton: '10px',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px 0',
        border: '2px solid #dedede',
        backgroundColor: '#d5f0ef',
        display: 'inline-block',
        maxWidth: '80%',
    },
    author: {
        textAlign: 'right',
        marginRight: '50px',
        marginBottom: '5px',
        color: '#a7a7a7',
    },
    avatar: {
        position: 'absolute',
        right: '5px',
        top: '5px'
    },
    date: {
        textAlign: 'right',
        marginRight: '50px',
        fontSize: '11px',
        color: '#a7a7a7',
    },
    msg: {
        marginRight: '50px',
        textAlign: 'right',
        marginBottom: '5px',
    }
}));

const useStylesLeft = makeStyles((theme) => ({
    root: {
        textAlign: 'left',
    },
    container: {
        position: 'relative',
        marginBotton: '10px',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px 0',
        border: '2px solid #dedede',
        backgroundColor: '#f1f1f1',
        display: 'inline-block',
        maxWidth: '80%',
    },
    author: {
        textAlign: 'left',
        marginLeft: '50px',
        marginBottom: '5px',
        color: '#a7a7a7',
    },
    avatar: {
        position: 'absolute',
        left: '5px',
        top: '5px'
    },
    date: {
        textAlign: 'left',
        marginLeft: '50px',
        fontSize: '11px',
        color: '#a7a7a7',
    },
    msg: {
        marginLeft: '50px',
        textAlign: 'left',
        marginBottom: '5px',
    }
}));



function Message({align, text, displayName, createdAt, photoURL}) {
    return (
        <div>
            {align==='left'?
                <MessageLeft text={text} displayName={displayName} createdAt={createdAt} photoURL={photoURL}/>
                :<MessageRight text={text} createdAt={createdAt} photoURL={photoURL}/>
            }
        </div>
    );
}

function MessageRight({text, createdAt, photoURL}) {
    const classes = useStylesRight();
      return (
        <div>
        <div className={classes.root}>
          <span className={classes.container}>
            <div className={classes.msg}>{text}</div>
            <div className={classes.date}>{createdAt}</div>
            <div className={classes.avatar}>
              <Avatar src={photoURL} style={{ width: '40px', height: '40px' }}>A</Avatar>
            </div>
          </span>
        </div>
        </div>
      );
  }
  
function MessageLeft({text, displayName, createdAt, photoURL}) {
    const classes = useStylesLeft();
    return (
        <div className={classes.root}>
            <span className={classes.container}>
                <div className={classes.author}>{displayName}</div>
                <div className={classes.msg}>{text}</div>
                <div className={classes.date}>{createdAt}</div>
                <div className={classes.avatar}>
                    <Avatar src={photoURL} style={{ width: '40px', height: '40px' }}>A</Avatar>
                </div>
            </span>
        </div>

    );
}

export default Message;