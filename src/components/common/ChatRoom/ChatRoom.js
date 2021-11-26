
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../store/AppProvider';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import { useSelector } from "react-redux";
import { selectRole } from '../../../store/userSlice';
import APIService from '../../../utils/APIService';
import getToken from '../../../helpers/getToken';

const token = getToken();

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
    const { selectedUserId, selectedRoom } = useContext(AppContext);

    const role = useSelector(selectRole);

    const [chatUsersList, setChatUsersList] = useState([]);
    const [selectedUser, setSelectedUser] = useState({ name: '', avatarURL: null });

    useEffect(() => {
        if (chatUsersList.length > 0) {
            let temp = chatUsersList.find(user => user.id.toString() === selectedUserId);
            if (temp !== undefined){
                setSelectedUser(temp);
            }
        }
    }, [chatUsersList, selectedRoom]);

    useEffect(() => {
        if (role === 'CUSTOMER') {
            APIService.getAppointment(token, {}, (success, json) => {
                if (success && json.result) {
                    let list = [];
                    json.result.forEach(element => {
                        list.push(
                            {
                                id: element.doctor.userId,
                                name: element.doctor.firstName + " " + element.doctor.lastName,
                                gender: element.doctor.gender,
                                avatarURL: element.doctor.avatarURL,
                            }
                        );
                    });
                    setChatUsersList(list);
                }
            });
        }
        else if (role === 'DOCTOR') {
            APIService.getDoctorAppointment(token, (success, json) => {
                if (success && json.result) {
                    let list = [];
                    json.result.forEach(element => {
                        list.push(
                            {
                                id: element.medicalRecord.customer.userId,
                                name: element.medicalRecord.customer.firstName + " " + element.medicalRecord.customer.lastName,
                                gender: element.medicalRecord.customer.gender,
                                avatarURL: element.medicalRecord.customer.avatarURL,
                            }
                        );
                    });
                    setChatUsersList(list);
                }
            });
        }
    }, [role]);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={8} md={8}>
                    <Paper className={classes.paper}>
                        <ChatWindow selectedUser={selectedUser} chatUsersList={chatUsersList} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Paper className={classes.paper}>
                        <Sidebar selectedUser={selectedUser} chatUsersList={chatUsersList} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

