import React from 'react';
import AppointmentItem from './AppointmentItem';
import { Grid } from '@material-ui/core'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AppointmentList(props) {

    // const onChange = (event) => {
    //     let target = event.target;
    //     let name = target.name;
    //     let value = target.value;
    //     props.onFilter(
    //         name === 'filterName' ? value : state.filterName,
    //         name === 'filterStatus' ? value : state.filterStatus
    //     )
    //     setState(prevState => ({...prevState, [name]: value}));
    //     console.log(state);
    // }
 
    const {appointments, onStatus} = props;
    const elmTasks = appointments.map((task, index) => {
        return <AppointmentItem 
                    index={index + 1} 
                    task={task} 
                    onDelete={props.onDelete}
                />
    });
    
    return (
        <>
            <Box sx={{ minWidth: 150 }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
                    <InputLabel id="demo-simple-select-label">Tình trạng lịch khám</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={status}
                        label="Tình trạng"
                        onChange={(event)=>onStatus(event.target.value)}
                    >
                        <MenuItem value='WAITING_PAYMENT'>Chờ thanh toán</MenuItem>
                        <MenuItem value='PENDING'>Chờ khám</MenuItem>
                        <MenuItem value='DOING'>Đang khám</MenuItem>
                        <MenuItem value='DONE'>Hoàn thành</MenuItem>
                        <MenuItem value='DOCTOR_CANCEL'>Bác sĩ từ chối</MenuItem>
                        <MenuItem value='CUSTOMER_CANCEL'>Tôi đã hủy</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={11}>
                    {elmTasks}
                </Grid>
                <Grid item xs={12} sm={1}>
                    
                </Grid>
            </Grid>
        </>
    );

}