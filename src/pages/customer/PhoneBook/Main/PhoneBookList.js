import React from 'react';
import PhoneBookCard from './PhoneBookCard';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
      float: "left",
    },
}));

export default function PhoneBookList(props) {

    const classes = useStyles();
    const [state, setState] = React.useState({
        filterName : '',
        filterPhoneNumber : '',
    });

    const onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        props.onFilter(
            name === 'filterName' ? value : state.filterName,
            name === 'filterPhoneNumber' ? value : state.filterPhoneNumber
        )
        setState(prevState => ({...prevState, [name]: value}));
        console.log(state);
    }

    const { phoneBookCards } = props;
    const elmCards = phoneBookCards.map((task, index) => {
        return <Grid item xs={12} className={classes.root} >
            <PhoneBookCard
                // key={task.id}
                index={index + 1}
                task={task}
            />
        </Grid>
    });

    //Breakpoints
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

    const temp = elmCards.reverse();
    const temp1 = temp;
    const temp2 = temp;
    const temp3 = temp;
    const l = elmCards.length;

    return (
        <div>
            <table className="table table-borderd table-hover mt-15">
                <thead>
                    <tr>
                        <th className={classes.wordColor}>Bệnh viện</th>
                        <th className={classes.wordColor}>Số điện thoại</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="filterName"
                            placeholder="Nhập tên bệnh viện..."
                            onChange={onChange}
                        />
                    </td>
                    <td>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="filterPhoneNumber"
                            placeholder="Nhập số điện thoại..."
                            onChange={onChange}
                        />
                    </td>
                </tr>
                </tbody>
            </table>  
            <Container maxWidth="lg">
                {
                    isMatch ?
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={4} >
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