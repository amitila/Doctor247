import { Container, Grid } from '@material-ui/core';
import React from 'react';
import Main from './Main';

export default function Index() {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Grid item>
                        <Main />                    
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid item>

                    </Grid>
                </Grid>
            </Grid>
        </Container>            
    )
}


