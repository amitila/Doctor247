import React from 'react';
import DoctorCard from './DoctorCard';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
      float: "left",
    },
    grid: {
        
    }
  }));

export default function DoctorList(props) {

    const classes = useStyles();

    const { doctorcards } = props;
    const elmCards = doctorcards.map((task, index) => {
        return <Grid item xs={12} sm={4} className={classes.root} >
            <DoctorCard
                key={task.id}
                index={index + 1}
                task={task}
            />
        </Grid>
    });

    return (
        <div>
            {elmCards} 
        </div>
    );

}