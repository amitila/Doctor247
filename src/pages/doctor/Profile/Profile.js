import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import Grid from '@material-ui/core/Grid';
import APIService from '../../../utils/APIService';

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

const axios = require("axios");

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    paper: {
        width: "80%",
        maxHeight: 435
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));


function ClinicRegistrationDialogRaw(props) {
    const classes = useStyles();
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = React.useState(valueProp);
    const radioGroupRef = React.useRef(null);

    React.useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancelClinic = () => {
        onClose();
    };

    const handleRegistClinic = () => {
        onClose();
    };

    const [openClinicTypes, setOpenClinicTypes] = React.useState(false);
    const [openProvinces, setOpenProvinces] = React.useState(false);
    const [openDistricts, setOpenDistricts] = React.useState(false);
    const [openWards, setOpenWards] = React.useState(false);
    const [clinicTypeSelect, setClinicTypeSelect] = React.useState(0);
    const [provinceSelect, setProvinceSelect] = React.useState(0);
    const [districtSelect, setDistrictSelect] = React.useState(0);
    const [wardSelect, setWardSelect] = React.useState(0);
    const [clinicTypes, setClinicTypes] = React.useState([]);
    const [provinces, setProvinces] = React.useState([]);
    const [districts, setDistricts] = React.useState([]);
    const [wards, setWards] = React.useState([]);

    const handleChangeClinicType = (event) => {
        setClinicTypeSelect(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeProvince = (event) => {
        setProvinceSelect(event.target.value);
        console.log(event.target.value);
    };
    const handleChangeDistrict = (event) => {
        setDistrictSelect(event.target.value);
        console.log(event.target.value);
    };
    const handleChangeWard = (event) => {
        setWardSelect(event.target.value);
        console.log(event.target.value);
    };

    const handleCloseClinicTypes = () => {
        setOpenClinicTypes(false);
    };
    const handleCloseProvinces = () => {
        setOpenProvinces(false);
    };
    const handleCloseDistricts = () => {
        setOpenDistricts(false);
    };
    const handleCloseWards = () => {
        setOpenWards(false);
    };
    const handleOpenClinicTypes = () => {
        setOpenClinicTypes(true);
    }
    const handleOpenProvinces = () => {
        setOpenProvinces(true);
    };
    const handleOpenDistricts = () => {
        setOpenDistricts(true);
    };
    const handleOpenWards = () => {
        setOpenWards(true);
    };

    useEffect(() => {
        // Make a request for a user with a given ID
        axios
            .get("https://provinces.open-api.vn/api/?depth=3")
            .then(function (response) {
                console.log("response+start");
                console.log(response);
                setProvinces(response.data);
                console.log("response+end");
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

        setClinicTypes([
            {
                code: 1,
                name: 'Bệnh viện'
            },
            {
                code: 2,
                name: 'Phòng khám tư nhân'
            }
        ])
    }, []);

    useEffect(() => {
        if (provinceSelect > 0) {
            setDistricts(provinces.find(element => element.code === provinceSelect).districts);
        }
        else {
            setDistricts([]);
        }
    }, [provinceSelect]);

    useEffect(() => {
        if (districtSelect > 0) {
            setWards(districts.find(element => element.code === districtSelect).wards);
        }
        else {
            setWards([]);
        }
    }, [districtSelect]);

    return (
        <Dialog
            maxWidth="md"
            onEntering={handleEntering}
            aria-labelledby="confirmation-dialog-title"
            open={open}
            {...other}
        >
            <DialogTitle id="confirmation-dialog-title">Đăng ký phòng khám</DialogTitle>
            <DialogContent dividers style={{overflowX: 'hidden'}}>
                <FormControl className={classes.formControl} fullWidth style={{marginLeft: 0}}>
                    <InputLabel id="demo-controlled-open-select-label">
                        Loại
                    </InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openClinicTypes}
                        value={clinicTypeSelect}
                        onClose={handleCloseClinicTypes}
                        onOpen={handleOpenClinicTypes}
                        onChange={handleChangeClinicType}
                    >
                        <MenuItem value={0}>
                            <em>Loại phòng khám</em>
                        </MenuItem>
                        {
                            clinicTypes.map(clinicType =>
                                <MenuItem value={clinicType.code}>{clinicType.name}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
                <br />
                <TextField
                    id="filled-full-width"
                    label={clinicTypeSelect===2?"Tên phòng khám":"Tên bệnh viện"}
                    placeholder=""
                    helperText=""
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true
                    }}
                    variant="standard"
                />

                <FormControl className={classes.formControl} fullWidth style={{marginLeft: 0}}>
                    <InputLabel id="demo-controlled-open-select-label">
                        Tỉnh / Thành Phố
                    </InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openProvinces}
                        value={provinceSelect}
                        onClose={handleCloseProvinces}
                        onOpen={handleOpenProvinces}
                        onChange={handleChangeProvince}
                    >
                        <MenuItem value={0}>
                            <em>Chọn tỉnh / thành phố</em>
                        </MenuItem>
                        {provinces.map((province) => (
                            <MenuItem value={province.code}>{province.name}</MenuItem>
                        ))}
                        {/* {
                operation.map(o => <MenuItem value={o.id}>{o.address}</MenuItem>)
              } */}
                    </Select>
                </FormControl>
                <br />

                <FormControl className={classes.formControl} fullWidth style={{marginLeft: 0}}>
                    <InputLabel id="demo-controlled-open-select-label">
                        Quận / Huyện
                    </InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openDistricts}
                        value={districtSelect}
                        onClose={handleCloseDistricts}
                        onOpen={handleOpenDistricts}
                        onChange={handleChangeDistrict}
                    >
                        <MenuItem value={0}>
                            <em>Chọn quận / huyện</em>
                        </MenuItem>
                        {districts.map((district) => (
                            <MenuItem value={district.code}>{district.name}</MenuItem>
                        ))}
                        {/* {
                operation.map(o => <MenuItem value={o.id}>{o.address}</MenuItem>)
              } */}
                    </Select>
                </FormControl>
                <br />

                <FormControl className={classes.formControl} fullWidth style={{marginLeft: 0}}>
                    <InputLabel id="demo-controlled-open-select-label">
                        Phường / Xã / Thị Trấn
                    </InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openWards}
                        value={wardSelect}
                        onClose={handleCloseWards}
                        onOpen={handleOpenWards}
                        onChange={handleChangeWard}
                    >
                        <MenuItem value={0}>
                            <em>Chọn phường / xã / thị trấn</em>
                        </MenuItem>
                        {wards.map((ward) => (
                            <MenuItem value={ward.code}>{ward.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />

                <TextField
                    id="filled-full-width"
                    label="Số nhà, đường"
                    placeholder="số nhà, đường"
                    helperText=""
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true
                    }}
                    variant="standard"
                />
                <TextField
                    id="filled-full-width"
                    label="Điện thoại"
                    placeholder=""
                    helperText=""
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true
                    }}
                    variant="standard"
                />
                {/* <TextField
                    id="filled-full-width"
                    label="Thời gian làm việc"
                    placeholder=""
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true
                    }}
                    variant="standard"
                />
                <TextField
                    id="filled-full-width"
                    label="Ngày bắt đầu hoạt động"
                    placeholder=""
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true
                    }}
                    variant="standard"
                /> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleRegistClinic} color="primary" variant="outlined">
                    Đăng ký
                </Button>
                <Button
                    autoFocus
                    onClick={handleCancelClinic}
                    color="secondary"
                    variant="outlined"
                >
                    Huỷ
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ClinicRegistrationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired
};

function Profile(props) {
    const classes = useStyles();
    const [openClinicForm, setOpenClinicForm] = React.useState(false);
    const handleClickOpenClinicForm = () => {
        setOpenClinicForm(true);
    };
    const handleCloseClinicForm = () => {
        setOpenClinicForm(false);
    };

    const [fullname, setFullname] = useState('');
    const [dob, setDob] = useState('');
    const [sex, setSex] = useState('');
    const [position, setPosition] = useState('');
    const [workAbout, setWorkAbout] = useState('');
    const [workAt, setWorkAt] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');

    const [workHistory, setWorkHistory] = useState([]);

    const [values, setValues] = useState({
        fullname: '',
        dob: '',
        sex: '',
        position: '',
        workAbout: '',
        workAt: '',
        email: '',
        phone: '',
        note: ''
    });

    const token = localStorage.getItem("token_doctor247");

    useEffect(() => {
        APIService.getDoctorProfile(token, (success, json) => {
            if (success && json.result) {
                const workHistoryList = json.result.doctor.workHistory;
                setWorkHistory(workHistoryList);
                setValues({
                    fullname: json.result.doctor.firstName + " " + json.result.doctor.lastName,
                    dob: json.result.doctor.birthday.substring(0, 10),
                    sex: json.result.doctor.gender === "MALE" ? "Nam" : "Nữ",
                    position: workHistoryList.length > 0 ? workHistoryList[workHistoryList.length - 1].jobPosition.title : '',
                    workAbout: json.result.doctor.specialized.name,
                    workAt: workHistoryList.length > 0 ? workHistoryList[workHistoryList.length - 1].workplace.name : '',
                    email: json.result.email,
                    phone: '',
                    note: ''
                });
            }
        });
    }, []);

    useEffect(() => {
        console.log('workHistory');
        console.log(workHistory);
    }, [workHistory]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpenEditInfo = () => {
        setOpen(true);
        setFullname(values.fullname);
        setDob(values.dob);
        setSex(values.sex);
        setPosition(values.position);
        setWorkAbout(values.workAbout);
        setWorkAt(values.workAt);
        setEmail(values.email);
        setPhone(values.phone);
        setNote(values.note);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({
            fullname: fullname,
            dob: dob,
            sex: sex,
            position: position,
            workAbout: workAbout,
            workAt: workAt,
            email: email,
            phone: phone,
            note: note
        });
    }

    return (
        <React.Fragment>
            <div>
                <ClinicRegistrationDialogRaw
                    classes={{
                        paper: classes.paper
                    }}
                    id="ringtone-menu"
                    keepMounted
                    open={openClinicForm}
                    onClose={handleCloseClinicForm}
                />
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <DialogTitle id="alert-dialog-title">
                            <h4>Thông tin cơ bản</h4>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField onChange={(e) => setFullname(e.target.value)} required id="fullname" fullWidth label="Họ tên" defaultValue={fullname} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField onChange={(e) => setDob(e.target.value)} required id="dob" fullWidth label="Ngày sinh" defaultValue={dob} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField onChange={(e) => setSex(e.target.value)} required id="sex" fullWidth label="Giới tính" defaultValue={sex} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField onChange={(e) => setPosition(e.target.value)} required id="position" fullWidth label="Chức vụ" defaultValue={position} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField onChange={(e) => setWorkAbout(e.target.value)} required id="workAbout" fullWidth label="Chuyên khoa" defaultValue={workAbout} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField onChange={(e) => setWorkAt(e.target.value)} required id="workAt" fullWidth label="Nơi làm việc" defaultValue={workAt} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField onChange={(e) => setEmail(e.target.value)} required id="email" fullWidth label="Email" defaultValue={email} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField onChange={(e) => setPhone(e.target.value)} required id="phone" fullWidth label="SDT" defaultValue={phone} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField onChange={(e) => setNote(e.target.value)} id="note" fullWidth label="Ghi chú" defaultValue={note} />
                                    </Grid>
                                </Grid>
                            </DialogContentText>

                        </DialogContent>
                        <DialogActions>
                            <Button type="submit" variant="contained" color="primary" onClick={handleClose}>Xác nhận</Button>
                            <Button onClick={handleClose} autoFocus>
                                Huỷ
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <div className="row">
                    <div className="col-md-12 mt-1">
                        {/* BaseInfo */}
                        <div className="card mb-3 content">

                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-9">
                                        <h1 m-3 pt-3>Thông tin cơ bản</h1>
                                    </div>
                                    <div className="col-md-3">
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Họ tên</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.fullname}</h5>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Ngày sinh</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.dob}</h5>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Giới tính</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.sex}</h5>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Chức vụ</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.position}</h5>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Chuyên khoa</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.workAbout}</h5>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Nơi làm việc</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.workAt}</h5>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Email</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.email}</h5>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>SDT</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.phone}</h5>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Ghi chú</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.note}</h5>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-3">
                                        <Button variant="outlined" fullWidth onClick={handleClickOpenEditInfo}>Sửa</Button>
                                    </div>
                                    <div className="col-md-6">
                                        <Button variant="outlined" fullWidth onClick={handleClickOpenClinicForm}>Đăng ký phòng khám</Button>
                                    </div>
                                    <div className="col-md-3">
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* History */}
                        <div className="card mb-3 content">
                            <h1 className="m-3">Lịch sử công tác</h1>
                            <div className="card-body">
                                {
                                    workHistory.map((item) =>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <h5>{"Từ " + item.from.substring(0, 10)}</h5>
                                                <h5>{"Đến " + item.to.substring(0, 10)}</h5>
                                            </div>
                                            <div className="col-md-9 text-secondary">
                                                <h5>{item.workplace.name}</h5>
                                            </div>
                                        </div>
                                    )
                                }
                                {/* <div className="row">
                                    <div className="col-md-3">
                                        <h5>2010 - 2014</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>BV Nhân Dân</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>2015 - 2021</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>BV Nhi Đồng</h5>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Profile;