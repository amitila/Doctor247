import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import APIService from '../../../utils/APIService';

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    paper: {
        width: "80%",
        maxHeight: 435
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    editIcon: {
        fontSize: '25px',
        marginLeft: '10px',
        cursor: 'pointer',
        '&:hover': {
            color: '#004d40'
         },
    },
    formControl: {
        minWidth: 120,
    },
}));
// get date from ymd
function getDateTimeFromYMD(yyyyMMdd) {
    const date = new Date();
    date.setFullYear(yyyyMMdd.substring(0,4));
    date.setMonth(parseInt(yyyyMMdd.substring(5,7)) - 1);
    date.setDate(yyyyMMdd.substring(8,10));
    return date;
}

function Row(props) {
    const { removeThis, oldText, getText, index } = props;
    const [text, setText] = useState('');
    useEffect(() => {
        setText(oldText);
    }, []);
    useEffect(() => {
        getText(index, text);
    }, [text]);
    return (<Grid container xs={12} style={{marginTop: 14}}>
        <Grid item xs={10}>
            <TextField 
                multiline
                required
                fullWidth
                onChange={(e) => { setText(e.target.value) }} 
                value={text}
                 />
        </Grid>
        <Grid item xs={2}>
            <Button variant="outlined" color="secondary" style={{marginLeft: "15%"}} onClick={removeThis}>-</Button>
        </Grid>
    </Grid>);
}

function Notification(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <React.Fragment>
            <div>
                <div className="row">
                    <div className="col-md-12 mt-1">
                        {/* BaseInfo */}
                        <div className="card mb-3 content">

                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-9">
                                        <h1 m-3 pt-3>Không có thông báo nào!</h1>
                                    </div>
                                    <div className="col-md-3">
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Notification;