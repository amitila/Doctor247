import React from 'react';
import MRItem from './MRItem';
import { Grid } from '@material-ui/core'

export default function MRList(props) {

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
        return <MRItem 
                    key={task.id} 
                    index={index + 1} 
                    task={task} 
                    onDelete={props.onDelete}
                />
    });
    
    return (
        <>
            <table className="table table-borderd table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center" >Hồ sơ số</th>
                        <th className="text-center">Họ và tên</th>
                        <th className="text-center">Quan hệ</th>
                        <th className="text-center">Ngày khám bệnh</th>
                        <th className="text-center">Ngày trả kết quả</th>
                        <th className="text-center">Thông tin bệnh</th>
                        <th className="text-center">Tình trạng</th>
                        <th className="text-center">Tài liệu đính kèm</th>
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