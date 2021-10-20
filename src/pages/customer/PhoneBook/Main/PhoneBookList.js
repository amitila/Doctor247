import React from 'react';
import PhoneBookCard from './PhoneBookCard';
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
        return <Grid item xs={12} sm={4} className={classes.root} >
            <PhoneBookCard
                // key={task.id}
                index={index + 1}
                task={task}
            />
        </Grid>
    });

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
            {elmCards} 
        </div>
    );

}