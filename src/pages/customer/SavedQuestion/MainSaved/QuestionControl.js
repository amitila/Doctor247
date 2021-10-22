import React from 'react';
import { Container, Grid } from '@material-ui/core';
import QuestionControlSearch from './QuestionControlSearch';
import QuestionControlSort from './QuestionControlSort';

export default function QuestionControl(props) {

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={10} >
                    <QuestionControlSearch 
                        onSearch={props.onSearch} 
                    />              
                </Grid>
                <Grid item xs={12} sm={2} >
                    <QuestionControlSort 
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
