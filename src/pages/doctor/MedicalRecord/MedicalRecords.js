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

// const token = localStorage.getItem("token_doctor247");
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

function createData(name, id, date, status, note,) {
    return {
        name,
        id,
        date,
        status,
        note,
        history: status==='Chưa khám'?null:[
            { date: '2020-01-05', customerId: 'Barack Obama', result: 'Đau bụng' },
            { date: '2020-01-02', customerId: 'Max Agleri', result: 'Tiêu chảy' },
        ],
    };
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
    let result = [];
    appointments.forEach(element => {
        return result.push(
            {
                aid: element.id,
                id: element.medicalRecord.id,
                date: element.day.substring(0, 16).replace('T',' '),
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
        );
    });
    return result;
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
                            <TableCell width="15%">Mã hồ sơ</TableCell>
                            <TableCell width="15%">Tên bệnh nhân</TableCell>
                            <TableCell width="15%">Ngày khám</TableCell>
                            <TableCell width="15%">Trạng thái</TableCell>
                            <TableCell width="20%">Ghi chú</TableCell>
                            <TableCell width="20%"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.appointmentList.map((data) => (
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
    const { appointmentSelect } = props;
    const classes = useStyles();

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

    const [patientHeight2, setPatientHeight2] = useState(appointmentSelect.height===null? '' : appointmentSelect.height + '');
    const [patientWeight2, setPatientWeight2] = useState(appointmentSelect.weight===null? '' : appointmentSelect.weight + '');
    const [patientBodyTemperature2, setPatientBodyTemperature2] = useState(appointmentSelect.bodyTemperature===null? '' : appointmentSelect.bodyTemperature + '');
    const [patientBloodPressure2, setPatientBloodPressure2] = useState(appointmentSelect.bloodPressure===null ? '' : appointmentSelect.bloodPressure + '');
    const [patientHeartbeat2, setPatientHeartbeat2] = useState(appointmentSelect.heartBeat===null ? '' : appointmentSelect.heartBeat + '');
    const [patientBloodGroup2, setPatientBloodGroup2] = useState(appointmentSelect.bloodGroup===null ? '' : appointmentSelect.bloodGroup + '');
    const [diagnosticResult2, setDiagnosticResult2] = useState(appointmentSelect.medicalRecord.diagnostic.join(', ') + '');
    const [note2, setNote2] = useState(appointmentSelect.medicalRecord.note===null ? '' : appointmentSelect.medicalRecord.note + '');

    const [medicalStatus, setMedicalStatus] = useState(appointmentSelect.status);

    const [imgList, setImgList] = useState([
        'https://www.tapchiyhoccotruyen.com/wp-content/uploads/2021/05/image4-115.jpg',
        'https://www.tapchiyhoccotruyen.com/wp-content/uploads/2021/05/image4-115.jpg',
        'https://www.tapchiyhoccotruyen.com/wp-content/uploads/2021/05/image4-115.jpg',
        'https://www.tapchiyhoccotruyen.com/wp-content/uploads/2021/05/image4-115.jpg',
    ]);
    
    const [isEditBodyStats, setIsEditBodyStats] = useState(false);

    useEffect(() => {
        APIService.getDoctorListPublic({}, (success, json) => {
            if (success && json.result) {
                console.log('getDoctorListPublic');
                console.log(json.result);
                json.result.map(data => {
                    if(data.doctor.id === appointmentSelect.doctorId){
                        setDoctorName("Bác sĩ " + data.doctor.firstName + " " + data.doctor.lastName);
                    }
                })
            }
        });
        console.log('appointmentSelect');
        console.log(appointmentSelect);
    }, []);

    const handleEditBodyStats = () => {
        if(medicalStatus === 'PENDING'){
            setIsEditBodyStats(true);
        }
        else{
            console.log(appointmentSelect);
        }
    }
    
    const handleClose = () => {
        setIsEditBodyStats(false);
    };

    const handleConfirm = () => {
        // APIService.putDoctorMedicalRecordById(
        //     token,
        //     appointmentSelect.medicalRecord.id,
        //     {
        //         height: patientHeight,
        //         weight: patientWeight,
        //         bodyTemperature: patientBodyTemperature,
        //         bloodPressure: patientBloodPressure,
        //         heartBeat: patientHeartbeat,
        //         bloodGroup: patientBloodGroup,
        //         diagnostic: [diagnosticResult],
        //         note: note,
        //         medicalExpense: appointmentSelect.medicalRecord.cost + '',
        //     },
        //     (success, json) => {
        //         if(success && json.result){
        //             setMedicalStatus('DOING');
        //             setPatientHeight2(patientHeight);
        //             setPatientWeight2(patientWeight);
        //             setPatientBodyTemperature2(patientBodyTemperature);
        //             setPatientBloodPressure2(patientBloodPressure);
        //             setPatientHeartbeat2(patientHeartbeat);
        //             setPatientBloodGroup2(patientBloodGroup);
        //             setDiagnosticResult2(diagnosticResult);
        //             setNote2(note);
        //         }
        //     });
        console.log({
            height: patientHeight,
            weight: patientWeight,
            bodyTemperature: patientBodyTemperature,
            bloodPressure: patientBloodPressure,
            heartBeat: patientHeartbeat,
            bloodGroup: patientBloodGroup,
            diagnostic: [diagnosticResult],
            note: note,
            medicalExpense: appointmentSelect.medicalRecord.cost + ''
        });

        setIsEditBodyStats(false);
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
                            imgList.map(imgSrc => 
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
            <MedicalRecordDetail appointmentSelect={props.appointmentSelect}/>
        );
    }
}



export default function MedicalRecords(props) {

    const [contentId, setContentId] = useState(ContentCode.LIST);
    const [appointmentJson, setAppointmentJson] = useState([]);
    const [appointmentList, setAppointmentList] = useState([]);
    const [appointmentSelect, setAppointmentSelect] = useState();

    useEffect(() => {
        APIService.getDoctorAppointment(token, (success, json) => {
            if (success && json.result) {
                setAppointmentJson(json.result);
                console.log('setAppointmentJson');
                console.log(json.result);
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
                        <ShowContent setContentId={setContentId} contentId={contentId} appointmentList={appointmentList} appointmentSelect={appointmentSelect} setAppointmentSelect={setAppointmentSelect} />
                    </Grid>
                    {/* <Grid xs={12} md={12}>
                        <Calendar/>
                    </Grid> */}
                    <Grid xs={12} md={12} style={{marginTop: "100px"}}>
                        <Button variant="contained" color="default" hidden={contentId === ContentCode.LIST} onClick={() => setContentId(ContentCode.LIST)}>
                            Return to List
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}