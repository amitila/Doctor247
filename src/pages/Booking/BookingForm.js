import { makeStyles, TextareaAutosize, TextField } from '@material-ui/core'
import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Typography from '@material-ui/core/Typography';
import { DropzoneArea } from 'material-ui-dropzone';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
    textSize: {
        width: '100%',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: '100%',
        margin: "auto",
        border: "#303F9F solid 5px",
        borderRadius: 5,
        padding: '10px',
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'orange',
    },
    title: {
        textAlign: "center",
    },
    dropzone: {
        heigh: "5px",
    }
}));

const bookingTime = [
    { title: '7h30 - 8h', time: "sáng" },
    { title: '8h30 - 9h', time: "sáng" },
    { title: '9h30 - 10h', time: "sáng" },
    { title: '10h30 - 11h', time: "sáng" },
    { title: '11h30 - 11h30', time: "sáng" },
    { title: '11h30 - 12h', time: "sáng" },
    { title: '13h - 13h30', time: "chiều" },
    { title: "13h30 - 14h", time: "chiều" },
    { title: '14h - 14h30', time: "chiều" },
    { title: '14h30 - 15h', time: "chiều" },
    { title: '15h - 15h30', time: "chiều" },
    { title: '15h30 - 16h', time: "chiều" },
    { title: '16h - 16h30', time: "chiều" },
    { title: "16h30 - 17h", time: "chiều" },
  ];

const BookingForm = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState('female');
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className={classes.paper} >
            <form className={classes.form} noValidate>
                <Typography variant="h6" className={classes.title} >
                    Đặt ký lịch khám 
                </Typography>

                <FormControl>
                    <FormLabel component="legend" >Bạn đặt lịch cho ai</FormLabel>
                    <RadioGroup>
                        <FormControlLabel value="me" control={<Radio />} label="Đặt cho bản thân" />
                        <FormControlLabel value="people" control={<Radio />} label="Đặt cho người thân" />
                    </RadioGroup>
                </FormControl>

                <TextField
                    className={classes.textField}
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Họ và tên bệnh nhân"
                    name="name"
                />

                <Grid container spacing={5}>
                    <Grid item xs={12} sm={3} className={classes.info}>
                        <Grid item >
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Giới tính</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                    <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                                    <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                    <FormControlLabel value="other" control={<Radio />} label="Khác" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={9} className={classes.info}>
                        <Grid item >
                            <TextField
                                className={classes.textField}
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Số điện thoại"
                                name="phone"
                            />

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justifyContent="space-around">
                                    <KeyboardDatePicker
                                        placeholder="Chọn ngày khám"
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Chọn ngày khám"
                                        format="dd/MM/yyyy"
                                        value={selectedDate}
                                        minDate={new Date()}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    <Autocomplete
                                        id="book-time"
                                        options={bookingTime}
                                        getOptionLabel={(option) => option.title}
                                        style={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Khung giờ khám" variant="standard" />}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                </Grid>

                <TextareaAutosize
                    className={classes.textSize}
                    minRows={5}
                    placeholder="Lý do đăng ký khám (gồm triệu chứng, thuốc đang dùng, tiền sử bệnh án,...)"
                >

                </TextareaAutosize>

                <Typography>Hình ảnh đính kèm (nếu có)</Typography>
                <DropzoneArea
                    className={classes.dropzone}
                    filesLimit={5}
                    acceptedFiles={['image/*']}
                    dropzoneText={"Kéo ảnh thả vào hay nhấp vào để tải ảnh lên"}
                    onChange={(files) => console.log('Files:', files)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Xác nhận đặt lịch khám
                </Button>
            </form>

        </div>
    )
}

export default BookingForm;
