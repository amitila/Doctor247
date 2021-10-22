import React from 'react';
import NotificationCard from './NotificationCard';
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

export default function NotificationList(props) {

    const classes = useStyles();

    const { notificationCards } = props;
    const elmCards = notificationCards.map((task, index) => {
        return <Grid item xs={12} className={classes.root} >
            <NotificationCard
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