import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import SelectProvince from './../../components/SelectProvince.js';
import UploadAvatar from "../../components/UploadAvatar.js";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    rowgender: {
        marginTop: "5px",
    }
}));

export default function AutoGrid() {
    const classes = useStyles();
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {/* Upload avatar into profile */}
                        <UploadAvatar />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            Thông tin cá nhân
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="standard"
                                required
                                fullWidth
                                id="fullName"
                                label="Họ và tên"
                                name="fullName"
                                autoComplete="fullname"
                            />
                            <Grid container spacing={2} className={classes.rowgender} >
                                <Grid item xs={5}>
                                    <FormControl className={classes.gender} component="fieldset">
                                        <FormLabel component="legend">Giới tính</FormLabel>
                                        <RadioGroup row aria-label="gender" name="gender" value={value} onChange={handleChange}>
                                            <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                                            <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                            <FormControlLabel value="other" control={<Radio />} label="Khác" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField
                                        id="date"
                                        label="Ngày sinh"
                                        type="date"
                                        format={'DD/MM/YYYY'}
                                        defaultValue="1890-10-01"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={8}>
                                    <TextField
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        id="bhyt"
                                        label="Mã BHYT (nếu có)"
                                        name="bhyt"
                                        autoComplete="bhyt"
                                        autoFocus
                                    />
                                    <TextField
                                        variant="standard"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="numphone"
                                        label="Số điện thoại"
                                        name="numphone"
                                        autoComplete="numphone"
                                        autoFocus
                                    />
                                    <TextField
                                        variant="standard"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Địa chỉ email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                   
                                    
                                </Grid>
                            </Grid>
                            {/* Select province where living */}
                            <SelectProvince /> 
                            <TextField
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                name="address"
                                label="Địa chỉ cụ thể"
                                type="address"
                                id="address"
                                autoComplete="current-address"
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Lưu thay đổi
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}


