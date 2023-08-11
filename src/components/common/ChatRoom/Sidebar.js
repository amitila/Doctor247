import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import RoomList from './RoomList';

const SidebarStyled = styled.div`
    color: white;
    height: 80vh;
`;

function Sidebar(props) {
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