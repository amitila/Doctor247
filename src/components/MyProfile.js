import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AssignmentIndOutlinedIcon from "@material-ui/icons/AssignmentIndOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));

export default function AutoGrid() {
    const classes = useStyles();
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <AssignmentIndOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Thông tin cá nhân
                            </Typography>
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant="standard"
                                    required
                                    fullWidth
                                    id="familyName"
                                    label="Họ và tên"
                                    name="familyName"
                                    autoComplete="faname"
                                />
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Giới tính</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender" value={value} onChange={handleChange}>
                                        <FormControlLabel value="Nữ" control={<Radio />} label="Female" />
                                        <FormControlLabel value="Nam" control={<Radio />} label="Male" />
                                        <FormControlLabel value="Khác" control={<Radio />} label="Other" />
                                    </RadioGroup>
                                </FormControl>
                                <TextField
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    defaultValue="2017-05-24"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mật khẩu"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
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
                        </Paper>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Container>
        </div>
    );
}
