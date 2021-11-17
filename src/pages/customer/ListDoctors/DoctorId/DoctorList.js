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
}));

export default function DoctorList(props) {

    const classes = useStyles();
    const { doctorcards } = props;
    const elmCards = doctorcards.id === 1? <Grid item xs={12} sm={12} className={classes.root} >
                                                <DoctorCard
                                                    key={doctorcards.id}
                                                    task={doctorcards}
                                                />
                                            </Grid> :<Grid item xs={12} sm={8} className={classes.root} >
                                                <DoctorCard
                                                    key={doctorcards.id}
                                                    task={doctorcards}
                                                />
                                            </Grid>;        
    return (
        <div>
            {elmCards} 
        </div>
    );

}