import React from 'react';
import SpecialityCard from './SpecialityCard';
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
}));

export default function SpecialityList(props) {

    const classes = useStyles();

    const { specialities } = props;
    const elmCards = specialities.map((task, index) => {
        return <Grid item xs={12} sm={4} className={classes.root} >
            <SpecialityCard
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