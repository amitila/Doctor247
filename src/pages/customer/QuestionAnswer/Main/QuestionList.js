import React from 'react';
import QuestionCard from './QuestionCard';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery, useTheme } from '@material-ui/core';

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
    const [state, setState] = React.useState({
        filterTitle : '',
        filterContent : '',
        filterSpecialist : ''
    });

    const onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        props.onFilter(
            name === 'filterTitle' ? value : state.filterTitle,
            name === 'filterContent' ? value : state.filterContent,
            name === 'filterSpecialist' ? value : state.filterSpecialist
        )
        setState(prevState => ({...prevState, [name]: value}));
        console.log(state);
    }
 
    const {questions, specialized} = props;
    const elmQuestions = questions.map((task, index) => {
        return <Grid item xs={12} className={classes.root} >
                    <QuestionCard
                        key={task.id} 
                        index={index + 1} 
                        task={task} 
                        onUpdateStatus={props.onUpdateStatus}
                        onDelete={props.onDelete}
                        onUpdate={props.onUpdate}
                        onSave={props.onSave}
                        onUpdateLike={props.onUpdateLike}
                    />
                </Grid>
    });

    //Breakpoints
	const theme = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    // const tablet = useMediaQuery(theme.breakpoints.up('md'));

    const temp = elmQuestions.reverse();
    const temp1 = temp;
    const temp2 = temp;
    const temp3 = temp;
    const l = elmQuestions.length;

    return (
        <div className={classes.paper}>
            <table className="table table-borderd table-hover mt-15">
                <thead>
                    <tr>
                        <th className={classes.wordColor}>Tiêu đề (tên bệnh)</th>
                        <th className={classes.wordColor}>Mô tả (triệu chứng)</th>
                        <th className={classes.wordColor}>Chuyên khoa</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="filterTitle"
                            placeholder="Tiêu đề câu hỏi..."
                            onChange={onChange}
                        />
                    </td>
                    <td>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="filterContent"
                            placeholder="Mô tả bệnh..."
                            onChange={onChange}
                        />
                    </td>
                    <td>
                        <select 
                            className="form-control"
                            name="filterSpecialist"
                            placeholder="Nhập chuyên khoa..."
                            onChange={onChange}
                        >
                            <option value={''}>Tất cả</option>
                            {
                                specialized?.map(item => {
                                    return <option value={item.name}>{item.name}</option>
                                })
                            }
                        </select>
                    </td>
                </tr>
                </tbody>
            </table>  
            <Container maxWidth="lg">
                {
                    mobile ?
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} >
                                {temp1}
                            </Grid>
                        </Grid>
                    :
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={l === 1 ? 8: (l === 2 ? 6 : 4)}>
                                {/* {elmQuestions.reverse()} */}
                                {temp1.map((item, index) => {
                                    return index % 3 === 0 ? item : ""
                                })}
                            </Grid>
                            <Grid item xs={12} sm={l === 2 ? 6 : 4}>
                                {/* {elmQuestions.reverse()} */}
                                {temp2.map((item, index) => {
                                    return index % 3 === 1 ? item : ""
                                })}
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                {/* {elmQuestions.reverse()} */}
                                {temp3.map((item, index) => {
                                    return index % 3 === 2 ? item : ""
                                })}
                            </Grid>
                        </Grid>   
                }
            </Container>          
        </div>
    );

}