import React from 'react'
// import MyProfile from './MyProfile'
import { Container, Grid } from '@material-ui/core'
// import ProfileCard from './ProfileCard'
import Main from './Main';

const Index = () => {
    const mark = true;
    return (
        <Container maxWidth="lg">
            <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                    <Grid item>
                        <Main mark={mark} />
                    </Grid>
                    <Grid item>
                       
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={0}>
                    <Grid item>
                        {/* <ProfileCard />
                        <ProfileCard />
                        <ProfileCard /> */}
                    </Grid>
                </Grid>
            </Grid>
        </Container>            
    )
}

export default Index
