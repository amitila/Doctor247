import React from 'react';
import QuestionCard from './QuestionCard';
import { Container, Grid } from '@material-ui/core';
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
        backgroundColor: "#00ccff",
    },
  }));

export default function QuestionList(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        filterName : '',
        filterStatus : -1 //all:-1, active:1, hide:0
    });

    const onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        props.onFilter(
            name === 'filterName' ? value : state.filterName,
            name === 'filterStatus' ? value : state.filterStatus
        )
        setState(prevState => ({...prevState, [name]: value}));
        console.log(state);
    }
 
    const {questions} = props;
    const elmQuestions = questions.map((task, index) => {
        return <Grid item xs={12} className={classes.root} >
                    <QuestionCard
                        key={task.id} 
                        index={index + 1} 
                        task={task} 
                        onUpdateStatus={props.onUpdateStatus}
                        onDelete={props.onDelete}
                        onUpdate={props.onUpdate}
                    />
                </Grid>
    });

    return (
        <div className={classes.paper}>
            <table className="table table-borderd table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center" >Mã số</th>
                        <th className="text-center">Tiêu đề</th>
                        <th className="text-center">Nội dung</th>
                        <th className="text-center">Ảnh minh họa</th>
                        <th className="text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="filterName"
                            //value={state.filterName}
                            onChange={onChange}
                        />
                    </td>
                    <td>
                        <select 
                            className="form-control"
                            name="filterStatus"
                            //value={state.filterStatus}
                            onChange={onChange}
                        >
                            <option value="-1">All</option>
                            <option value="0">Hide</option>
                            <option value="1">Active</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>  
            <Container maxWidth="lg">
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={4}>
                        {/* {elmQuestions.reverse()} */}
                        {elmQuestions.reverse().map((item, index) => {
                            return index % 3 === 0 ? item : ""
                        })}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {/* {elmQuestions.reverse()} */}
                        {elmQuestions.reverse().map((item, index) => {
                            return index % 3 === 1 ? item : ""
                        })}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {/* {elmQuestions.reverse()} */}
                        {elmQuestions.reverse().map((item, index) => {
                            return index % 3 === 2 ? item : ""
                        })}
                    </Grid>
                </Grid>
            </Container>          
        </div>
    );

}