import React, { useContext, useEffect, useState } from 'react';
import '../Profile/Profile.css';
import { Grid } from '@material-ui/core';
import { AppContext } from '../../../store/AppProvider';

import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import APIService from '../../../utils/APIService';
import getToken from '../../../helpers/getToken';
import { useSnackbar } from 'notistack';

const token = getToken();

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    smallAvatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    largeAvatar: {
        width: theme.spacing(16),
        height: theme.spacing(16),
    },
    editIcon: {
        fontSize: '25px',
        marginLeft: '10px',
        '&:hover': {
            color: '#004d40'
         },
    }
}));

function getDay(datetime) {
    const dt = new Date(datetime.substring(0, 10));
    const dayCode = dt.getDay();
    let result = datetime.substring(10,16) + " " + dt.getDate() + "/" + (dt.getMonth()+1) + "/" + dt.getFullYear() + "";
    switch (dayCode) {
        case 0:
            result += "(Chủ nhật)";
            break;
        case 1:
            result += "(Thứ hai)";
            break;
        case 2:
            result += "(Thứ ba)";
            break;
        case 3:
            result += "(Thứ tư)";
            break;
        case 4:
            result += "(Thứ năm)";
            break;
        case 5:
            result += "(Thứ sáu)";
            break;
        case 6:
            result += "(Thứ bảy)";
            break;
        default:
            result = "error";
            break;
    }
    return result;
}

function getStatus(status){
    if(status === "DONE"){
        return "Đã khám";
    }
    else if(status === "PENDING"){
        return "Chưa khám";
    }
    else if(status === "DOING"){
        return "Đang khám";
    }
}

function createMedicalRecords(appointments){
    let pendingList = [];
    let doneList = [];
    appointments.forEach(element => {
        const data = {
            aid: element.id,
            id: element.medicalRecord.id,
            od: parseInt(element.day.substring(0,16).replaceAll('-','').replaceAll('T','').replaceAll(':','')),
            date: getDay(element.day.replace('T',' ')),
            status: element.status,
            note: element.medicalRecord.note,
            name: element.medicalRecord.customer.firstName + ' ' + element.medicalRecord.customer.lastName,
            customer: {
                id: element.medicalRecord.customer.id,
                name: element.medicalRecord.customer.firstName + ' ' + element.medicalRecord.customer.lastName,
                address: element.medicalRecord.customer.address,
                avatarURL: element.medicalRecord.customer.avatarURL,
                dob: element.medicalRecord.customer.birthday,
                phone: element.medicalRecord.customer.contactPhoneNumber,
                gender: element.medicalRecord.customer.gender
            },
            medicalRecord: {
                id: element.medicalRecord.id,
                status: element.medicalRecord.status,
                images: element.medicalRecord.images,
                diagnostic: element.medicalRecord.diagnostic,
                symptom: element.medicalRecord.symptom,
                note: element.medicalRecord.note,
                cost: element.medicalRecord.medicalExpense
            },
            history: null,
            doctorId: element.doctorId,
            clinic: element.workplace.name,
            height: element.medicalRecord.height,
            weight: element.medicalRecord.weight,
            bodyTemperature: element.medicalRecord.bodyTemperature,
            bloodPressure: element.medicalRecord.bloodPressure,
            heartBeat: element.medicalRecord.heartBeat,
            bloodGroup: element.medicalRecord.bloodGroup,
        }
        if (element.status === 'DONE') {
            doneList.push(data);
        }
        else{
            pendingList.push(data);
        }
    });
    pendingList.sort(function (a, b) {
        return a.od - b.od;
    });
    doneList.sort(function (a, b) {
        return b.od - a.od;
    });
    return {pendingList, doneList};
}

function Row(props) {
    const { setContentId } = props;
    const { row, setAppointmentSelect } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickDetail = () => {
        setAppointmentSelect(row);
        setContentId(ContentCode.DETAIL);
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    {(row.history===null)?null:<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>}
                </TableCell>
                <TableCell >{row.id}</TableCell>
                <TableCell >{row.name}</TableCell>
                <TableCell >{row.date}</TableCell>
                <TableCell >{getStatus(row.status)}</TableCell>
                <TableCell >{row.note}</TableCell>
                <TableCell> 
                    <Button variant="outlined" color="primary" onClick={handleClickDetail}>Chi tiết</Button>
                </TableCell>
            </TableRow>
            {(row.history===null)?null:
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Tiền sử bệnh án
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Thời gian</TableCell>
                                        <TableCell>Người khám</TableCell>
                                        <TableCell align="right">Kết quả</TableCell>
                                        <TableCell align="right">Ghi chú</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.result}</TableCell>
                                            <TableCell align="right">
                                                {historyRow.price}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>}
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                result: PropTypes.string.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        note: PropTypes.string.isRequired,
    }).isRequired,
};

function MedicalRecordList(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Grid container xs={12} sm={12} spacing={3}>
                    <Grid item xs={8} sm={8} md={8}>
                        <h3>Danh sách bệnh án</h3>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell width="10%">Mã hồ sơ</TableCell>
                            <TableCell width="15%">Tên bệnh nhân</TableCell>
                            <TableCell width="20%">Thời gian khám</TableCell>
                            <TableCell width="15%">Trạng thái</TableCell>
                            <TableCell width="20%">Ghi chú</TableCell>
                            <TableCell width="20%"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.appointmentList.pendingList.map((data) => (
                            <Row key={data.aid} row={data} setContentId={props.setContentId} setAppointmentSelect={props.setAppointmentSelect}/>
                        ))}
                        {props.appointmentList.doneList.map((data) => (
                            <Row key={data.aid} row={data} setContentId={props.setContentId} setAppointmentSelect={props.setAppointmentSelect}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Tên bệnh nhân"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Ngày khám"
                        defaultValue="2021-09-13"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Ghi chú"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Huỷ
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

function MedicalRecordDetail(props) {
    const { appointmentSelect, setAppointmentJson } = props;
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const defaultAvatarUrl = "https://banner2.cleanpng.com/20180326/wuq/kisspng-social-media-avatar-photography-digital-media-clip-profile-5ab915ee900719.55262584152207921459.jpg";

    const [doctorName, setDoctorName] = useState('');
    const [patientHeight, setPatientHeight] = useState('');
    const [patientWeight, setPatientWeight] = useState('');
    const [patientBodyTemperature, setPatientBodyTemperature] = useState('');
    const [patientBloodPressure, setPatientBloodPressure] = useState('');
    const [patientHeartbeat, setPatientHeartbeat] = useState('');
    const [patientBloodGroup, setPatientBloodGroup] = useState('');
    const [diagnosticResult, setDiagnosticResult] = useState('');
    const [note, setNote] = useState('');
    const [expense, setExpense] = useState(0);

    const [patientHeight2, setPatientHeight2] = useState(appointmentSelect.height===null? '' : appointmentSelect.height + '');
    const [patientWeight2, setPatientWeight2] = useState(appointmentSelect.weight===null? '' : appointmentSelect.weight + '');
    const [patientBodyTemperature2, setPatientBodyTemperature2] = useState(appointmentSelect.bodyTemperature===null? '' : appointmentSelect.bodyTemperature + '');
    const [patientBloodPressure2, setPatientBloodPressure2] = useState(appointmentSelect.bloodPressure===null ? '' : appointmentSelect.bloodPressure + '');
    const [patientHeartbeat2, setPatientHeartbeat2] = useState(appointmentSelect.heartBeat===null ? '' : appointmentSelect.heartBeat + '');
    const [patientBloodGroup2, setPatientBloodGroup2] = useState(appointmentSelect.bloodGroup===null ? '' : appointmentSelect.bloodGroup + '');
    const [diagnosticResult2, setDiagnosticResult2] = useState(appointmentSelect.medicalRecord.diagnostic.join(', ') + '');
    const [note2, setNote2] = useState(appointmentSelect.medicalRecord.note===null ? '' : appointmentSelect.medicalRecord.note + '');
    const [medicalStatus, setMedicalStatus] = useState(appointmentSelect.status);
    const [isEditBodyStats, setIsEditBodyStats] = useState(false);
    const [fileList, setFileList] = React.useState([]);

    const [imgList, setImgList] = useState([
        'http://www.boclinic.vn/wp-content/uploads/2017/05/5-meo-dep-bo-cang-thang-keo-dai-giup-ban-tre-khoe-moi-ngay-1.jpg',
        'https://goldenhealthcarevn.com/wp-content/uploads/2018/12/stressed-businessman-300x200.jpeg',
    ]);
    // const [imgList, setImgList] = useState([
    //     'https://vinmec-prod.s3.amazonaws.com/images/20190301_035714_660235_an_khong_ngon_do_gan.max-800x800.jpg',
    //     'https://www.tapchiyhoccotruyen.com/wp-content/uploads/2021/05/image4-115.jpg',
    //     'https://normagut.com/wp-content/uploads/2021/02/vi-tri-dau-bung-o-ben-trai-hoac-ben-phai.jpg',
    // ]);
    
    useEffect(() => {
        if (!isEditBodyStats) {
            APIService.getDoctorAppointment(token, (success, json) => {
                if (success && json.result) {
                    setAppointmentJson(json.result);
                }
            });}
    }, [isEditBodyStats]);

    useEffect(() => {
        APIService.getDoctorListPublic({}, (success, json) => {
            if (success && json.result) {
                json.result.map(data => {
                    if(data.doctor.id === appointmentSelect.doctorId){
                        setDoctorName("Bác sĩ " + data.doctor.firstName + " " + data.doctor.lastName);
                    }
                })
            }
        });
    }, []);

    const handleEditBodyStats = () => {
        if(medicalStatus !== 'DONE'){
            setIsEditBodyStats(true);
        }
        else{
            enqueueSnackbar('Hồ sơ này đã khám xong!', { variant: 'error'});
        }
    }
    
    const handleClose = () => {
        setIsEditBodyStats(false);
    };

    const handleConfirm = () => {
        const data = {
            height: patientHeight,
            weight: patientWeight,
            bodyTemperature: patientBodyTemperature,
            bloodPressure: patientBloodPressure,
            heartBeat: patientHeartbeat,
            bloodGroup: patientBloodGroup,
            diagnostic: [diagnosticResult],
            note: note,
            medicalExpense: expense,
            files: fileList
        }
        if (patientHeight.length === 0
            || patientWeight.length === 0
            || patientBodyTemperature.length === 0
            || patientBloodPressure.length === 0
            || patientHeartbeat.length === 0
            || patientBloodGroup.length === 0
            || diagnosticResult.length === 0) {
            enqueueSnackbar('Vui lòng nhập đủ thông tin!', { variant: 'error' });
            return;
        }
        else if (expense <= 0) {
            enqueueSnackbar('Chi phí khám phải lớn hơn 0!', { variant: 'error' });
            return;
        }
        if (window.confirm('Bạn chắc chắn đã nhập xong chứ?')){
            APIService.putDoctorAppointmentById(
                token,
                appointmentSelect.aid,
                'DOING',
                (success, json) => {
                    if (success && json.result) {
                        APIService.putDoctorMedicalRecordById(
                            token,
                            appointmentSelect.medicalRecord.id,
                            data,
                            (success, json) => {
                                if (success && json.result) {
                                    setPatientHeight2(patientHeight);
                                    setPatientWeight2(patientWeight);
                                    setPatientBodyTemperature2(patientBodyTemperature);
                                    setPatientBloodPressure2(patientBloodPressure);
                                    setPatientHeartbeat2(patientHeartbeat);
                                    setPatientBloodGroup2(patientBloodGroup);
                                    setDiagnosticResult2(diagnosticResult);
                                    setNote2(note);
                                    enqueueSnackbar('Đã khám xong!', { variant: 'success'});
                                    setIsEditBodyStats(false);
                                    APIService.putDoctorAppointmentById(
                                        token,
                                        appointmentSelect.aid,
                                        'DONE',
                                        (success, json) => {
                                            if (success && json.result) {
                                                setMedicalStatus('DONE');
                                            }
                                        }
                                    );
                                }
                                else {
                                    console.log(json);
                                }
                            });
                    }
                }
            );
        }

    }

    const handleChangeFiles = (e) => {
        const files = e.target.files;
        let fl = [];

        for (let i of Object.keys(files)) {
            fl.push(files[i]);
        }
        setFileList(fl);
    }

    return(
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid container item xs={12} sm={12} md={4}>
                    <Paper style={{backgroundColor: '#cef5f2'}}>
                        <h3>Thông tin bệnh nhân</h3>
                        <Grid container xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <Avatar
                                    className={classes.largeAvatar}
                                    alt="Remy Sharp"
                                    src={appointmentSelect.customer.avatarURL===null?defaultAvatarUrl:appointmentSelect.customer.avatarURL}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                style={{marginTop: "20px"}}
                                    id="standard-read-only-input"
                                    label="Giới tính"
                                    defaultValue={appointmentSelect.customer.gender==="MALE"?"Nam":"Nữ"}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                style={{marginTop: "20px"}}
                                    id="standard-read-only-input"
                                    label="Ngày sinh"
                                    defaultValue={appointmentSelect.customer.dob.substring(0,10)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} style={{marginLeft: '10px'}}>
                                <TextField
                                    id="standard-read-only-input"
                                    label="Họ tên"
                                    fullWidth
                                    defaultValue={appointmentSelect.customer.name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} style={{marginLeft: '10px'}}>
                                <TextField
                                    id="standard-read-only-input"
                                    label="SĐT"
                                    fullWidth
                                    defaultValue={appointmentSelect.customer.phone}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    style={{ marginTop: "20px" }}
                                    id="standard-read-only-input"
                                    label="Địa chỉ"
                                    defaultValue={appointmentSelect.customer.address}
                                    multiline
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    style={{ marginTop: "20px" }}
                                    id="standard-read-only-input"
                                    label="Ghi chú của bệnh nhân"
                                    defaultValue="Không"
                                    multiline
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <br />
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={12} md={8}>
                    <Paper style={{marginTop: "20px"}}>
                        <h3>Thông tin đăng ký khám</h3>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-input"
                                label="Thời gian đăng ký"
                                defaultValue={appointmentSelect.date}
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-input"
                                label="Địa điểm khám"
                                defaultValue={appointmentSelect.clinic}
                                multiline
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-input"
                                label="Lý do khám"
                                defaultValue={appointmentSelect.medicalRecord.symptom.join(", ")}
                                multiline
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <br/><br/>
                    </Paper>

                    <Paper >
                        <h3>Tình trạng</h3>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-input"
                                label="Tình trạng"
                                defaultValue={getStatus(appointmentSelect.status)}
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                label="Khám bởi"
                                value={doctorName}
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                label="Kết quả chẩn đoán"
                                value={diagnosticResult2}
                                multiline
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                label="Ghi chú của bác sĩ"
                                value={note2}
                                multiline
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <br/><br/>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                    <Paper style={{marginTop: "20px"}}>
                        <span style={{display: 'inline-block'}}><h3>Các chỉ số cơ thể</h3></span>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-height"
                                label="Chiều cao"
                                value={patientHeight2}
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-weight"
                                label="Cân nặng"
                                value={patientWeight2}
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-bodyTemperature"
                                label="Thân nhiệt"
                                value={patientBodyTemperature2}
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-bloodPressure"
                                label="Huyết áp"
                                value={patientBloodPressure2}
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-heartBeat"
                                label="Nhịp tim"
                                value={patientHeartbeat2}
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-bloodGroup"
                                label="Nhóm máu"
                                value={patientBloodGroup2}
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Paper>

                    <Button style={{marginTop: "25px"}} variant="outlined" color="primary" fullWidth onClick={handleEditBodyStats}>
                        Nhập hồ sơ
                        <i className={["fas fa-pencil-alt", classes.editIcon].join(' ')} ></i>
                    </Button>
                        
                </Grid>

                <Grid item xs={12} sm={12} md={8}>
                    <Paper style={{marginTop: "20px"}}>
                        <h3>Một số hình ảnh</h3>
                        {
                            appointmentSelect.medicalRecord.images.map(imgSrc => 
                                <img src={imgSrc} style={{margin: '3%'}} width="44%" height="300" alt=""></img>
                            )
                        }
                    </Paper>
                </Grid>

            </Grid>
            <Dialog open={isEditBodyStats} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Nhập hồ sơ bệnh án</DialogTitle>
                <DialogContent>
                    <span style={{display: 'inline-block'}}><h5>Các chỉ số cơ thể</h5></span>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Chiều cao (đơn vị: cm)"
                        onChange={(e) => setPatientHeight(e.target.value)}
                        value={patientHeight}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Cân nặng (đơn vị: kg)"
                        onChange={(e) => setPatientWeight(e.target.value)}
                        value={patientWeight}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Thân nhiệt (đơn vị: độ C)"
                        onChange={(e) => setPatientBodyTemperature(e.target.value)}
                        value={patientBodyTemperature}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Huyết áp (đơn vị: mmHg)"
                        onChange={(e) => setPatientBloodPressure(e.target.value)}
                        value={patientBloodPressure}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Nhịp tim (đơn vị: lần/phút)"
                        onChange={(e) => setPatientHeartbeat(e.target.value)}
                        value={patientHeartbeat}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Nhóm máu"
                        onChange={(e) => setPatientBloodGroup(e.target.value)}
                        value={patientBloodGroup}
                        fullWidth
                    />
                    <span style={{display: 'inline-block', marginTop: "20px"}}><h5>Kết quả</h5></span>
                    <TextField
                        margin="dense"
                        label="Kết quả chẩn đoán"
                        multiline
                        value={diagnosticResult}
                        onChange={(e) => setDiagnosticResult(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Ghi chú của bác sĩ"
                        multiline
                        onChange={(e) => setNote(e.target.value)}
                        value={note}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Chi phí khám"
                        type="number"
                        onChange={(e) => setExpense(e.target.value)}
                        value={expense}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 10000,
                        }}
                    />
                    <span style={{display: 'inline-block', marginTop: "20px"}}><h5>Đính kèm file ảnh (png, jpg) hoặc file pdf)</h5></span>
                        <input
                            type="file"
                            accept='.jpg, .png, .pdf'
                            multiple
                            onChange={handleChangeFiles}
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm} color="primary" variant="outlined">
                        Xác nhận
                    </Button>
                    <Button onClick={handleClose} color="secondary" variant="outlined">
                        Huỷ
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

const ContentCode = {
    LIST: 1,
    DETAIL: 2
}

const ShowContent = (props) => {
    if(props.contentId === ContentCode.LIST){
        return (
            <MedicalRecordList setContentId={props.setContentId} appointmentList={props.appointmentList} setAppointmentSelect={props.setAppointmentSelect}/>
        );
    }
    else if(props.contentId === ContentCode.DETAIL){
        return(
            <MedicalRecordDetail appointmentSelect={props.appointmentSelect} setAppointmentJson={props.setAppointmentJson}/>
        );
    }
}



export default function MedicalRecords(props) {

    const [contentId, setContentId] = useState(ContentCode.LIST);
    const [appointmentJson, setAppointmentJson] = useState([]);
    const [appointmentList, setAppointmentList] = useState({pendingList: [], doneList: []});
    const [appointmentSelect, setAppointmentSelect] = useState();

    useEffect(() => {
        APIService.getDoctorAppointment(token, (success, json) => {
            if (success && json.result) {
                setAppointmentJson(json.result);
            }
        });
    }, []);

    useEffect(() => {
        setAppointmentList(createMedicalRecords(appointmentJson));
    }, [appointmentJson]);

    return (
        <React.Fragment>
            <div>
                <Grid container spacing={2}>
                    <Grid xs={12} md={12}>
                        <ShowContent setContentId={setContentId} contentId={contentId} appointmentList={appointmentList} appointmentSelect={appointmentSelect} setAppointmentSelect={setAppointmentSelect} setAppointmentJson={setAppointmentJson}/>
                    </Grid>
                    {/* <Grid xs={12} md={12}>
                        <Calendar/>
                    </Grid> */}
                    <Grid xs={12} md={12} style={{marginTop: "100px"}}>
                        <Button variant="contained" color="default" hidden={contentId === ContentCode.LIST} onClick={() => setContentId(ContentCode.LIST)}>
                            Quay về
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}