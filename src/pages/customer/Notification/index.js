import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Main from './Main';

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
            <Grid container spacing={1}>           
                <Grid item xs={12} sm={8}>
                    <Main />
                </Grid>
            </Grid>
        </Container>
    </div>
  );
}
