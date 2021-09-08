import React from 'react'
import MyProfile from './MyProfile'
import { Container, Grid } from '@material-ui/core'

const index = () => {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={5}>
                <Grid item xs={12} sm={8}>
                    <Grid item>
                        <MyProfile />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Grid item>
                        
                    </Grid>
                </Grid>
            </Grid>
        </Container>            
    )
}

export default index
