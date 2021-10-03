import React from 'react';
import AppointmentItem from './AppointmentItem';
import { Grid } from '@material-ui/core'

export default function AppointmentList(props) {

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
 
    const {appointments} = props;
    const elmTasks = appointments.map((task, index) => {
        return <AppointmentItem 
                    key={task.id} 
                    index={index + 1} 
                    task={task} 
                    onUpdateStatus={props.onUpdateStatus}
                    onDelete={props.onDelete}
                    onUpdate={props.onUpdate}
                />
    });
    
    return (
        <>
            <table className="table table-borderd table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center" >Mã số</th>
                        <th className="text-center">Bệnh nhân</th>
                        <th className="text-center">Ngày</th>
                        <th className="text-center">Thời gian</th>
                        <th className="text-center">Bác sĩ</th>
                        <th className="text-center">Triệu chứng</th>
                        <th className="text-center">Hình ảnh</th>
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
            <Grid container spacing={5}>
                <Grid item xs={12} sm={10}>
                    {elmTasks}
                </Grid>
                <Grid item xs={12} sm={2}>
                   
                </Grid>
            </Grid>
        </>
    );

}