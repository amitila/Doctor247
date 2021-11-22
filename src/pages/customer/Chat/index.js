import { Container, Grid } from '@material-ui/core'
import React from 'react'
import ChatRoom from '../../../components/common/ChatRoom/ChatRoom'

export default function Index() {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                    <Grid item>
                        <ChatRoom />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Grid item>
                       
                    </Grid>
                </Grid>
            </Grid>
        </Container>            
    )
}


