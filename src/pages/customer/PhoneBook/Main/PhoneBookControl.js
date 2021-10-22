import React from 'react';
import { Container, Grid } from '@material-ui/core';
import PhoneBookControlSearch from './PhoneBookControlSearch';
import PhoneBookControlSort from './PhoneBookControlSort';

export default function PhoneBookControl(props) {

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={10} >
                    <PhoneBookControlSearch 
                        onSearch={props.onSearch} 
                    />              
                </Grid>
                <Grid item xs={12} sm={2} >
                    <PhoneBookControlSort 
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
