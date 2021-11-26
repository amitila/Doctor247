import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import RoomList from './RoomList';

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

const SidebarStyled = styled.div`
    color: white;
    height: 80vh;
`;

function Sidebar(props) {
    const classes = useStyles();

    return (
        <SidebarStyled>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <RoomList selectedUser={props.selectedUser} chatUsersList={props.chatUsersList}/>
                </Grid>
            </Grid>
        </SidebarStyled>
    );
}

export default Sidebar;