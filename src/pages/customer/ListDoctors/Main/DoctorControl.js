import React from 'react';
import { Container, Grid } from '@material-ui/core';
import DoctorControlSearch from './DoctorControlSearch';
import DoctorControlSort from './DoctorControlSort';

export default function DoctorControl(props) {

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={10} >
                    <DoctorControlSearch 
                        onSearch={props.onSearch} 
                    />              
                </Grid>
                <Grid item xs={12} sm={2} >
                    <DoctorControlSort 
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
