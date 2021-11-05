import React from 'react';
import { Container, Grid } from '@material-ui/core';
import ServiceControlSearch from './ServiceControlSearch';
import ServiceControlSort from './ServiceControlSort';

export default function ServiceControl(props) {

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={10} >
                    <ServiceControlSearch 
                        onSearch={props.onSearch} 
                    />              
                </Grid>
                <Grid item xs={12} sm={2} >
                    <ServiceControlSort 
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
