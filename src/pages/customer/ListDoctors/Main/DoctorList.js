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
    const [state, setState] = React.useState({
        filterName : '',
        filterPhone : '',
        filterSpecialist : -1, //all:-1, active:1, hide:0
        filterWorkplace: ''
    });

    const onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        props.onFilter(
            name === 'filterName' ? value : state.filterName,
            name === 'filterPhone' ? value : state.filterPhone,
            name === 'filterSpecialist' ? value : state.filterSpecialist,
            name === 'filterWorkplace' ? value : state.filterWorkplace
        )
        setState(prevState => ({...prevState, [name]: value}));
        console.log(state);
    }

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
            <table className="table table-borderd table-hover mt-15">
                <thead>
                    <tr>
                        <th className={classes.wordColor}>Tên bác sĩ</th>
                        <th className={classes.wordColor}>Số điện thoại</th>
                        <th className={classes.wordColor}>Chuyên khoa</th>
                        <th className={classes.wordColor}>Nơi làm việc</th>
                        
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="filterName"
                            placeholder="Nhập tên bác sĩ..."
                            onChange={onChange}
                        />
                    </td>
                    <td>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="filterPhone"
                            placeholder="Nhập số điện thoại..."
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
                            <option value="-1">All</option>
                            <option value="0">Hide</option>
                            <option value="1">Active</option>
                        </select>
                    </td>
                    <td>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="filterWorkplace"
                            placeholder="Nhập nơi làm việc..."
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