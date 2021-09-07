import { Container, Grid } from '@material-ui/core'
import React from 'react'
import BookingForm from './BookingForm'


const index = () => {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                    <Grid item>
                        <BookingForm />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid item>
                        
                    </Grid>
                </Grid>
            </Grid>
        </Container>            
    )
}

export default index
