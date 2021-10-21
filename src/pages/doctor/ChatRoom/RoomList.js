import { Typography } from 'antd';
import React, { useContext, useMemo } from 'react';
import { DoctorContext } from '../DoctorProvider';
import useFirestore from '../../../firebase/useFirestore';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import { useEffect } from 'react/cjs/react.development';


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
    const { user, setIsVideoCallVisible, setIsAddRoomVisible, setSelectedRoomId, rooms } = useContext(DoctorContext);

    const classes = useStyles();

    // const roomsCondition = useMemo(() => {
    //     return {
    //         fieldName: 'members',
    //         operator: 'array-contains',
    //         compareValue: user.id
    //     }
    // }, [user.id]);

    // const rooms = useFirestore("rooms", roomsCondition);

    useEffect(() => {
        console.log('rooms');
        console.log(rooms);
    }, [rooms]);

    const rooms2 = [
        {
            description: 'Online 5 phút trước',
            name: 'Dũng',
            id: '123',
            members: [1],
        },
        {
            description: 'Online 12 phút trước',
            name: 'Hùng',
            id: '123456',
            members: [1],
        },
        {
            description: 'Online 22 phút trước',
            name: 'Nam',
            id: '123456',
            members: [1],
        },
        {
            description: 'Online 35 phút trước',
            name: 'Hà',
            id: '123456',
            members: [1],
        },
    ];

    // const handleAddRoom = () => {
    //     setIsAddRoomVisible(true);
    // }
    // const handleShowVideoCall = () => {
    //     setIsVideoCallVisible(true);
    // }

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
                                    <Avatar src={room.avatarURL} style={{ marginRight: '10px', width: '60px', height: '60px' }}>A</Avatar>
                                </StyledBadge>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <h4 style={{ textAlign: 'left' }}>{room.name}</h4>
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