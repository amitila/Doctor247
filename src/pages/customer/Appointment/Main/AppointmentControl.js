import React from 'react';
import { Container, Grid } from '@material-ui/core';
import AppointmentControlSearch from './AppointmentControlSearch';
import AppointmentControlSort from './AppointmentControlSort';

export default function AppointmentControl(props) {

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={10} >
                    <AppointmentControlSearch onSearch={props.onSearch} />           
                </Grid>
                <Grid item xs={12} sm={2} >
                    <AppointmentControlSort 
                        onSort={props.onSort}
                        sortBy={props.sortBy}
                        sortValue={props.sortValue}
                    />
                </Grid>
                <br /><br /><br />
            </Grid>
        </Container>       
    );
}