import { Container, Grid } from '@material-ui/core'
import React from 'react'
// import BookingForm from './BookingForm'
import Main from './Main';

export default function Index() {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                    <Grid item>
                        <Main />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Grid item>
                        {/* <BookingForm /> */}
                    </Grid>
                </Grid>
            </Grid>
        </Container>            
    )
}


