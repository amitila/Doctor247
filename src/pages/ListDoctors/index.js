import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from './Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  grid: {
      float: "left",
  }
}));

export default function Doctors() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Container maxWidth="lg">
            <Grid container spacing={5}>
                <Grid item xs={12} sm={3}>
                    <Card />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card />
                </Grid>
            </Grid>
        </Container>
    </div>
  );
}
