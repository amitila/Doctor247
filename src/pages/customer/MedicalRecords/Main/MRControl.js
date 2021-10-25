import React from 'react';
import { Container, Grid } from '@material-ui/core';
import MRControlSearch from './MRControlSearch';
import MRControlSort from './MRControlSort';

export default function MRControl(props) {

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={10} >
                    <MRControlSearch onSearch={props.onSearch} />        
                </Grid>
                <Grid item xs={12} sm={2} >
                    <MRControlSort 
                        onSort={props.onSort}
                        sortBy={props.sortBy}
                        sortValue={props.sortValue}
                    />
                </Grid>
                <br /><br /><br /><br />
            </Grid>
        </Container>     
    );
}