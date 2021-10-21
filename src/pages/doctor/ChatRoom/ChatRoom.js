import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function ChatRoom(props) {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={8} md={8}>
                    <Paper className={classes.paper}>
                        <ChatWindow />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Paper className={classes.paper}>
                        <Sidebar />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

