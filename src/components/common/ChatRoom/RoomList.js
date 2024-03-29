import { Typography } from 'antd';
import React, { useContext } from 'react';
import { AppContext } from '../../../store/AppProvider';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import getToken from '../../../helpers/getToken';

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
        cursor: 'pointer',
        '&:hover': {
            background: "#80cbc8",
        },
    }
}));

export default function RoomList(props) {
    const classes = useStyles();
    const { setSelectedRoomId, rooms, userInfo } = useContext(AppContext);
    const { selectedUser, chatUsersList } = props;

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
                <Grid container spacing={3} style={{maxHeight: '400px', overflow: 'auto'}} >
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
                                    <Avatar src={(selectedUser === null || selectedUser === undefined) ? myImg : selectedUser.avatarURL} style={{ marginRight: '10px', width: '60px', height: '60px' }}></Avatar>
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