import React from 'react';
// import TextField from '@material-ui/core/TextField';
import DrHeader from './../../../layouts/doctor/DrHeader';
// import { MenuItem, Select } from '@material-ui/core';
// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';
import Checkout from './../test/Checkout';
import TestActive from './../test/TestActive';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));



export default function Test() {
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date('1985-01-12T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    

    return (
        <div>
            <div>
                <DrHeader />
            </div>
            <div>
                <TestActive />
            </div>
            <div>
                <form className="Profile" noValidate autoComplete="off">
                    {/* <div>
                        <TextField
                            id="standard-helperText"
                            label="Họ"
                            helperText=""
                        />
                        <TextField
                            id="standard-helperText"
                            label="Tên"
                            helperText=""
                        />
                    </div>
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Name</MenuItem>
                                <MenuItem value={20}>Nữ</MenuItem>
                                <MenuItem value={30}>Khác</MenuItem>
                            </Select>
                        </FormControl>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid justifyContent="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Ngày sinh"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div> */}
                    <div>
                        <Checkout/>
                    </div>

                </form>
            </div>

        </div>
    );
}
