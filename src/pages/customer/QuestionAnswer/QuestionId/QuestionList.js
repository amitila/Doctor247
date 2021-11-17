import React from 'react';
import QuestionCard from './QuestionCard';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'inline-block',
      '& > *': {
        margin: theme.spacing(1),
      },
      float: "none",
      marginTop: "",
    },
    paper: {
        backgroundColor: "#d0e7f4",
    },
    wordColor: {
        color: "black",
        textAlign: "center",
        fontSize: 20,
    }
  }));

export default function QuestionList(props) {
    const classes = useStyles();
 
    const {questions} = props;
    const elmQuestions = <Grid item xs={12} className={classes.root} >
                            <QuestionCard
                                key={questions.id} 
                                task={questions} 
                                onDelete={props.onDelete}
                                onSave={props.onSave}
                                onUpdateLike={props.onUpdateLike}
                            />
                        </Grid>;

    return (
        <div className={classes.paper}>
            {elmQuestions}
        </div>
    );

}