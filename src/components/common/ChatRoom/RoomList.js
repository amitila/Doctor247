import { Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../store/AppProvider';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import { useSelector } from "react-redux";
import { selectRole } from '../../../store/userSlice';
import APIService from '../../../utils/APIService';
import getToken from '../../../helpers/getToken';

const token = getToken();
const myImg = "https://img.flaticon.com/icons/png/512/149/149071.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    user: {
        margin: '5px',
        alignItems: 'center',
        display: 'flex',
        cursor: 'pointer'
    }
}));

export default function RoomList(props) {
    const { setSelectedRoomId, rooms, selectedUserId, userInfo } = useContext(AppContext);
    const role = useSelector(selectRole);

    const [chatUsersList, setChatUsersList] = useState([]);
    const [selectedUser, setSelectedUser] = useState({ name: '', avatarURL: null});

    useEffect(() => {
        if (chatUsersList.length > 0){
            setSelectedUser(chatUsersList.find(user => user.id.toString() === selectedUserId));
        }
        console.log('chatUsersList');
        console.log(chatUsersList);
    }, [chatUsersList]);

    useEffect(() => {
        if (role === 'CUSTOMER') {
            APIService.getAppointment(token, {}, (success, json) => {
                if (success && json.result) {
                    let list = [];
                    json.result.forEach(element => {
                        list.push(
                            {
                                id: element.doctor.id,
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
        else if (role === 'DOCTOR'){
            APIService.getDoctorAppointment(token, (success, json) => {
                if (success && json.result) {
                    let list = [];
                    json.result.forEach(element => {
                        list.push(
                            {
                                id: element.medicalRecord.customer.id,
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

    const classes = useStyles();

    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>Danh sách tin nhắn</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: 'block' }}>
                <Grid container spacing={3}>
                    {
                        rooms.map(room =>
                            <Grid item xs={12} className={classes.user} onClick={() => { setSelectedRoomId(room.id); console.log(room.id); }}>
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    variant="dot"
                                >
                                    <Avatar src={(selectedUser === null || selectedUser === undefined) ? myImg : ''} style={{ marginRight: '10px', width: '60px', height: '60px' }}></Avatar>
                                </StyledBadge>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <h6 style={{ textAlign: 'left' }}>{(chatUsersList.find(user => user.id.toString() === room.members.find(id => id !== userInfo.id.toString()))?.name)}</h6>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <h6 style={{ textAlign: 'left' }}>{room.description}</h6>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}