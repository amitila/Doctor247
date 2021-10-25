import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 264,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function AddressForm() {
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
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Họ"
                        fullWidth
                        autoComplete="given-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Tên"
                        fullWidth
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="CMND/Căn cước"
                        fullWidth
                        autoComplete="given-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Giới tính *</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>Nam</MenuItem>
                            <MenuItem value={1}>Nữ</MenuItem>
                            <MenuItem value={2}>Khác</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label2">Chuyên khoa *</InputLabel>
                        <Select
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select2"
                            value={age}
                            required
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>Đa khoa</MenuItem>
                            <MenuItem value={0}>Tai Mũi Họng</MenuItem>  
                            <MenuItem value={2}>Khác</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label2">Tỉnh *</InputLabel>
                        <Select
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select2"
                            value={age}
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>Hồ Chí Minh</MenuItem>
                            <MenuItem value={1}>Hà Nội</MenuItem>
                            <MenuItem value={2}>Khác</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label3">Quận/Huyện *</InputLabel>
                        <Select
                            labelId="demo-simple-select-label3"
                            id="demo-simple-select3"
                            value={age}
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>Quận 1</MenuItem>
                            <MenuItem value={1}>Quận 2</MenuItem>
                            <MenuItem value={2}>Khác</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label4">Phường/Xã/Thị Trấn *</InputLabel>
                        <Select
                            labelId="demo-simple-select-label4"
                            id="demo-simple-select4"
                            fullWidth
                            value={age}
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>Phường 1</MenuItem>
                            <MenuItem value={1}>Phường 2</MenuItem>
                            <MenuItem value={2}>Khác</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="Số nhà, đường"
                        fullWidth
                        autoComplete="shipping address-level2"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}