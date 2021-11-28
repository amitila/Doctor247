import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DialogContentText from "@material-ui/core/DialogContentText";

import APIService from '../../../utils/APIService';
import CustomImage from '../../../components/Image';

import { AppContext } from '../../../store/AppProvider';
import { toInteger, update } from 'lodash';
import getToken from '../../../helpers/getToken';

const axios = require("axios");

// const token = localStorage.getItem("token_doctor247");
const token = getToken();

const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    padding: {
        padding: theme.spacing(3),
    },
    demo1: {
        background: '#e1e1e1',
    },
    demo2: {
        backgroundColor: '#2e1534',
    },
    tabPanel: {
        backgroundColor: '#fff',
    },
    table: {
        minWidth: 700,
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const TabCode = {
    APPOINTMENTS: 0,
    TIMETABLES: 1
};

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#80cbc8',
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

// function createCHPData(id, day, time, workAt, patient, reason) {
//     return { id, day, time, workAt, patient, reason };
// }

function createWEEmpty(weekDay) {
    return {
        id1: 0,
        id2: 0,
        id3: 0,
        day: weekDay,
        workAt1: 0,
        workAt2: 0,
        workAt3: 0,
        startingAt1: '',
        endingAt1: '',
        startingAt2: '',
        endingAt2: '',
        startingAt3: '',
        endingAt3: ''
    }
}

const ErrSessionInDay = {
    NONE: 0,
    START: 1,
    END: 2,
}

const SessionInDay = {
    MORNING: 1,
    AFTERNOON: 2,
    NIGHT: 3
}

const WPMode = {
    ERR: -1,
    SKIP: 0,
    ADD: 1,
    UPDATE: 2,
    DELETE: 3,
}

function getDateTime(hms) {
    let result = "2021-01-01T" + hms + ":00.000Z";
    return result;
}

// get MMss(int) from HH:mm(string)
function getDateTimeFromMS(hm) {
    const date = new Date();
    date.setHours(7+toInteger(hm.substring(0,2)), toInteger(hm.substring(3,5)));
    return date;
}

function getHMS(datetime) {
    return (parseInt(datetime.replace('T', '').replace(':', '').substring(10, 14)));
}

function getDisplayHMS(datetime) {
    return datetime.replace('T', '').substring(10, 15);
}

function getVnDay(day) {
    let result = "";
    switch (day) {
        case "SUNDAY":
            result = "Chủ nhật";
            break;
        case "MONDAY":
            result = "Thứ hai";
            break;
        case "TUESDAY":
            result = "Thứ ba";
            break;
        case "WEDNESDAY":
            result = "Thứ tư";
            break;
        case "THURSDAY":
            result = "Thứ năm";
            break;
        case "FRIDAY":
            result = "Thứ sáu";
            break;
        case "SATURDAY":
            result = "Thứ bảy";
            break;
        default:
            result = "error";
            break;
    }
    return result;
}

function getDay(datetime) {
    const dt = new Date(datetime.substring(0, 10));
    const dayCode = dt.getDay();
    let result = "";
    switch (dayCode) {
        case 0:
            result = "Chủ nhật";
            break;
        case 1:
            result = "Thứ hai";
            break;
        case 2:
            result = "Thứ ba";
            break;
        case 3:
            result = "Thứ tư";
            break;
        case 4:
            result = "Thứ năm";
            break;
        case 5:
            result = "Thứ sáu";
            break;
        case 6:
            result = "Thứ bảy";
            break;
        default:
            result = "error";
            break;
    }
    return result;
}

function checkWP(startingTime, endingTime, workAt1WP, workAtSelect) {
    if(!startingTime && !endingTime && workAt1WP===0){
        if(workAtSelect===0){
            return WPMode.SKIP;
        }
        if(workAtSelect!==0){
            return WPMode.DELETE;
        }
    }
    if(startingTime && endingTime && workAt1WP!==0){
        if(workAtSelect===0){
            return WPMode.ADD;
        }
        if(workAtSelect!==0){
            return WPMode.UPDATE;
        }
    }
    return WPMode.ERR;
}

function checkWPLimit(session, startingTime, endingTime, workAt){
    const intST = toInteger(startingTime.replace(':',''));
    const intET = toInteger(endingTime.replace(':',''));
    if(workAt === 0){
        return ErrSessionInDay.NONE;
    }
    if(session === SessionInDay.MORNING){
        if(intST < 600 || intST > intET - 30){
            return ErrSessionInDay.START;
        }
        if(intET > 1200){
            return ErrSessionInDay.END;
        }
    }
    if(session === SessionInDay.AFTERNOON){
        if(intST < 1200 || intST > intET - 30){
            return ErrSessionInDay.START;
        }
        if(intET > 1800){
            return ErrSessionInDay.END;
        }
    }
    if(session === SessionInDay.NIGHT){
        if(intST < 1800 || intST > intET - 30){
            return ErrSessionInDay.START;
        }
        if(intET > 2200){
            return ErrSessionInDay.END;
        }
    }
    return ErrSessionInDay.NONE;
}

function createWPDataList(doctorOperationHourList, operation) {
    var result = [
        createWEEmpty("SUNDAY"),
        createWEEmpty("MONDAY"),
        createWEEmpty("TUESDAY"),
        createWEEmpty("WEDNESDAY"),
        createWEEmpty("THURSDAY"),
        createWEEmpty("FRIDAY"),
        createWEEmpty("SATURDAY"),
    ];

    function updateWPData(index, element) {
        if (getHMS(element.startTime) < 1200) {
            result[index].id1 = element.id;
            result[index].startingAt1 = getDisplayHMS(element.startTime);
            result[index].endingAt1 = getDisplayHMS(element.endTime);
            result[index].workAt1 = operation.find(e => e.id === element.operationId).id;
        }
        else if (getHMS(element.startTime) > 1200 && getHMS(element.startTime) < 1800) {
            result[index].id2 = element.id;
            result[index].startingAt2 = getDisplayHMS(element.startTime);
            result[index].endingAt2 = getDisplayHMS(element.endTime);
            result[index].workAt2 = operation.find(e => e.id === element.operationId).id;
        }
        else {
            result[index].id3 = element.id;
            result[index].startingAt3 = getDisplayHMS(element.startTime);
            result[index].endingAt3 = getDisplayHMS(element.endTime);
            result[index].workAt3 = operation.find(e => e.id === element.operationId).id;
        }
    }

    doctorOperationHourList.forEach(element => {
        switch (element.day) {
            case 'SUNDAY':
                updateWPData(0, element);
                break;
            case 'MONDAY':
                updateWPData(1, element);
                break;
            case 'TUESDAY':
                updateWPData(2, element);
                break;
            case 'WEDNESDAY':
                updateWPData(3, element);
                break;
            case 'THURSDAY':
                updateWPData(4, element);
                break;
            case 'FRIDAY':
                updateWPData(5, element);
                break;
            case 'SATURDAY':
                updateWPData(6, element);
                break;
            default:
                break;
        }
    });
    return result;
}


function HealthCheckPlanTable(props) {
    const classes = useStyles();

    const [healthCheckList, setHealthCheckList] = useState([]);
    const [workPlaceList, setWorkPlaceList] = useState([]);

    useEffect(() => {        
        APIService.getDoctorAppointment(token, (success, json) => {
            if (success && json.result) {
                console.log("Get getDoctorAppointment");
                console.log(json.result);
                setHealthCheckList(json.result);
            }
        });
        APIService.getDoctorWorkPlaceMy(token, (success, json) => {
            if (success && json.result) {
                setWorkPlaceList(json.result);
            }
        });
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Ngày</StyledTableCell>
                        <StyledTableCell align="center"> Giờ</StyledTableCell>
                        <StyledTableCell align="center">Nơi khám</StyledTableCell>
                        <StyledTableCell align="center">Tên bệnh nhân</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {healthCheckList.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell align="center">{row.day.substring(0, 10) + " - " +getDay(row.day)}</StyledTableCell>
                            <StyledTableCell align="center">{row.day.substring(11, 16)}</StyledTableCell>
                            <StyledTableCell align="center">{row.workplace.name}</StyledTableCell>
                            <StyledTableCell align="center">{row.medicalRecord.customer.firstName + " " + row.medicalRecord.customer.lastName}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button variant="outlined" color="primary" align="center"
                                    onClick={() => props.handleOpenHCPDialog(row)}
                                >
                                    Chi tiết
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function WorkPlanTable(props) {
    const classes = useStyles();

    const [workPlanList, SetWorkPlanList] = useState([]);

    useEffect(() => {
        let doctorOperationHourList = [];
        props.operationJson.forEach(element => {
            element.operationHour.forEach(e => {
                doctorOperationHourList.push(e);
            });
        });
        SetWorkPlanList(createWPDataList(doctorOperationHourList, props.operationList));
    }, [props.operationList]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Ngày trong tuần</StyledTableCell>
                        <StyledTableCell align="center">Buổi</StyledTableCell>
                        <StyledTableCell align="center">Giờ bắt đầu</StyledTableCell>
                        <StyledTableCell align="center">Giờ kết thúc</StyledTableCell>
                        <StyledTableCell align="center">Nơi khám</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {workPlanList.map((row) => (
                        <React.Fragment>
                            <StyledTableRow key={row.id}>
                                <StyledTableCell rowSpan={3} align="center">{getVnDay(row.day)}</StyledTableCell>
                                <StyledTableCell align="center">Sáng</StyledTableCell>
                                <StyledTableCell align="center">{row.startingAt1}</StyledTableCell>
                                <StyledTableCell align="center">{row.endingAt1}</StyledTableCell>
                                <StyledTableCell align="center">{row.workAt1 > 0 ? props.operationList.find(x => x.id === row.workAt1).name : ''}</StyledTableCell>
                                <StyledTableCell rowSpan={3} align="center">
                                    <Button variant="outlined" color="primary" align="center"
                                        onClick={() => props.handleOpenWPDialog(row)}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell align="center">Chiều</StyledTableCell>
                                <StyledTableCell align="center">{row.startingAt2}</StyledTableCell>
                                <StyledTableCell align="center">{row.endingAt2}</StyledTableCell>
                                <StyledTableCell align="center">{row.workAt2 > 0 ? props.operationList.find(x => x.id === row.workAt2).name : ''}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell align="center">Tối</StyledTableCell>
                                <StyledTableCell align="center">{row.startingAt3}</StyledTableCell>
                                <StyledTableCell align="center">{row.endingAt3}</StyledTableCell>
                                <StyledTableCell align="center">{row.workAt3 > 0 ? props.operationList.find(x => x.id === row.workAt3).name : ''}</StyledTableCell>
                            </StyledTableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default function TimeTable() {
    const classes = useStyles();
    const [value, setValue] = React.useState(TabCode.APPOINTMENTS);
    const [isOpenHCP, setIsOpenHCP] = React.useState(false);
    const [isOpenWP, setIsOpenWP] = React.useState(false);
    const [numbersOfUpdate, setNumbersOfUpdate] = React.useState(0);
    const [isReload, setIsReload] = React.useState(true);

    const [healthCheckData, setHealthCheckData] = useState({
        id: 0,
        day: '',
        time: '',
        workAt: '',
        patient: '',
        reason: '',
    });

    const [operationList, setOperationList] = useState([]);
    const [operationJson, setOperationJson]= useState([]);
    
    useEffect(() => {
        if(isReload){
            setIsReload(false);
            APIService.getDoctorOperation(token, (success, json) => {
                if (success && json.result) {
                    setOperationJson(json.result);
                }
            });
        }
    }, [isReload]);

    useEffect(() => {
        let ol = [];
        operationJson.forEach(element => {
            ol.push({
                id: element.id,
                type: element.workplace.type,
                name: element.workplace.name,
                address: element.workplace.address
            });
        });
        setOperationList(ol);
    }, [operationJson]);

    const [workPlanData, setWorkPlanData] = useState(createWEEmpty("SUNDAY"));

    const handleHCPClickOpen = (data) => {
        setIsOpenHCP(true);
        setHealthCheckData({
            id: data.id,
            day: getDay(data.day),
            time: getDisplayHMS(data.day),
            workAt: data.workplace.name,
            patient: data.medicalRecord.customer.firstName + " " + data.medicalRecord.customer.lastName,
            reason: data.medicalRecord.symptom.join(', ')
        });
    };

    const handleHCPClose = () => {
        setIsOpenHCP(false);
    };

    const [dayWP, setDayWP] = useState('');
    const [id1WP, setId1WP] = useState(0);
    const [id2WP, setId2WP] = useState(0);
    const [id3WP, setId3WP] = useState(0);
    const [workAt1WP, setWorkAt1WP] = useState(0);
    const [workAt2WP, setWorkAt2WP] = useState(0);
    const [workAt3WP, setWorkAt3WP] = useState(0);
    const [startingAt1WP, setStartingAt1WP] = useState('');
    const [startingAt2WP, setStartingAt2WP] = useState('');
    const [startingAt3WP, setStartingAt3WP] = useState('');
    const [endingAt1WP, setEndingAt1WP] = useState('');
    const [endingAt2WP, setEndingAt2WP] = useState('');
    const [endingAt3WP, setEndingAt3WP] = useState('');

    const handleWPClickOpen = (data) => {
        setIsOpenWP(true);
        setDayWP(data.day);
        setId1WP(data.id1);
        setId2WP(data.id2);
        setId3WP(data.id3);
        setWorkAt1WP(data.workAt1);
        setWorkAt2WP(data.workAt2);
        setWorkAt3WP(data.workAt3);
        setStartingAt1WP(data.startingAt1);
        setStartingAt2WP(data.startingAt2);
        setStartingAt3WP(data.startingAt3);
        setEndingAt1WP(data.endingAt1);
        setEndingAt2WP(data.endingAt2);
        setEndingAt3WP(data.endingAt3);
        setWorkPlanData({
            day: data.day,
            id1: data.id1,
            id2: data.id2,
            id3: data.id3,
            workAt1: data.workAt1,
            workAt2: data.workAt2,
            workAt3: data.workAt3,
            startingAt1: data.startingAt1,
            endingAt1: data.endingAt1,
            startingAt2: data.startingAt2,
            endingAt2: data.endingAt2,
            startingAt3: data.startingAt3,
            endingAt3: data.endingAt3,
        });
        setWorkAtSelect1(data.workAt1);
        setWorkAtSelect2(data.workAt2);
        setWorkAtSelect3(data.workAt3);
        console.log('selected WP');
        console.log(data);
    };

    const handleDelete1 = () => {
        setWorkAt1WP(0);
        setStartingAt1WP('');
        setEndingAt1WP('');
    }
    const handleDelete2 = () => {
        setWorkAt2WP(0);
        setStartingAt2WP('');
        setEndingAt2WP('');
    }
    const handleDelete3 = () => {
        setWorkAt3WP(0);
        setStartingAt3WP('');
        setEndingAt3WP('');
    }

    const handleWPClose = () => {
        setIsOpenWP(false);
    };

    const handleWPOK = () => {
        const checkWP1 = checkWP(startingAt1WP, endingAt1WP, workAt1WP, workAtSelect1);
        const checkWP2 = checkWP(startingAt2WP, endingAt2WP, workAt2WP, workAtSelect2);
        const checkWP3 = checkWP(startingAt3WP, endingAt3WP, workAt3WP, workAtSelect3);
        if(checkWP1!==WPMode.ERR && checkWP2!==WPMode.ERR && checkWP3!==WPMode.ERR){
            if (checkWPLimit(SessionInDay.MORNING, startingAt1WP, endingAt1WP, workAt1WP) !== ErrSessionInDay.NONE) {
                alert('Thời gian làm việc buổi sáng không hợp lệ.');
                return;
            }
            if (checkWPLimit(SessionInDay.AFTERNOON, startingAt2WP, endingAt2WP, workAt2WP) !== ErrSessionInDay.NONE) {
                alert('Thời gian làm việc buổi chiều không hợp lệ.');
                return;
            }
            if (checkWPLimit(SessionInDay.NIGHT, startingAt3WP, endingAt3WP, workAt3WP) !== ErrSessionInDay.NONE) {
                alert('Thời gian làm việc buổi tối không hợp lệ.');
                return;
            }
            let logdt = [];
            if (checkWP1 === WPMode.ADD) {
                logdt.push({
                    "addList": [
                        {
                            "day": dayWP,
                            "startTime": getDateTimeFromMS(startingAt1WP),
                            "endTime": getDateTimeFromMS(endingAt1WP)
                        }
                    ],
                    "id": workAt1WP
                });
            }
            else if (checkWP1 === WPMode.UPDATE) {
                logdt.push({
                    "updateList": [
                        {
                            "id": id1WP,
                            "day": dayWP,
                            "startTime": getDateTimeFromMS(startingAt1WP),
                            "endTime": getDateTimeFromMS(endingAt1WP)
                        }
                    ],
                    "id": workAt1WP
                });
            }
            else if (checkWP1 === WPMode.DELETE) {
                logdt.push({
                    "deleteList": [id1WP],
                    "id": workAtSelect1
                });
            }

            if (checkWP2 === WPMode.ADD) {
                logdt.push({
                    "addList": [
                        {
                            "day": dayWP,
                            "startTime": getDateTimeFromMS(startingAt2WP),
                            "endTime": getDateTimeFromMS(endingAt2WP)
                        }
                    ],
                    "id": workAt2WP
                });
            }
            else if (checkWP2 === WPMode.UPDATE) {
                logdt.push({
                    "updateList": [
                        {
                            "id": id2WP,
                            "day": dayWP,
                            "startTime": getDateTimeFromMS(startingAt2WP),
                            "endTime": getDateTimeFromMS(endingAt2WP)
                        }
                    ],
                    "id": workAt2WP
                });
            }
            else if (checkWP2 === WPMode.DELETE) {
                logdt.push({
                    "deleteList": [id2WP],
                    "id": workAtSelect2
                });
            }

            if (checkWP3 === WPMode.ADD) {
                logdt.push({
                    "addList": [
                        {
                            "day": dayWP,
                            "startTime": getDateTimeFromMS(startingAt3WP),
                            "endTime": getDateTimeFromMS(endingAt3WP)
                        }
                    ],
                    "id": workAt3WP
                });
            }
            else if (checkWP3 === WPMode.UPDATE) {
                logdt.push({
                    "updateList": [
                        {
                            "id": id3WP,
                            "day": dayWP,
                            "startTime": getDateTimeFromMS(startingAt3WP),
                            "endTime": getDateTimeFromMS(endingAt3WP)
                        }
                    ],
                    "id": workAt3WP
                });
            }
            else if (checkWP3 === WPMode.DELETE) {
                logdt.push({
                    "deleteList": [id3WP],
                    "id": workAtSelect3
                });
            }
            console.log('logdt');
            logdt.forEach(item => {
                APIService.putDoctorOperation(
                    token,
                    item,
                    (success, json) => {
                        console.log(item);
                        if(success, json.result){
                            setIsOpenWP(false);
                            setIsReload(true);
                            console.log('put operation ok.');
                            console.log(json.result);
                        }
                        else{
                            console.log(json);
                            console.log('put operation err.');
                        }
                    }
                );
            });            
        }
        else{
            alert("Bạn chưa nhập đủ thông tin.");
        }
        
        // APIService.putDoctorOperation(token, (success, json) => {
        //     if (success && json.result) {
        //         setOperationJson(json.result);
        //     }
        // });
    };

    const imgList = [
        'https://cdnmedia.baotintuc.vn/Upload/4l8oGGp94lA5r6lHXppg/files/2021/06/nhidong1.jpg',
        'https://media.vov.vn/sites/default/files/styles/large_watermark/public/2021-07/benh_vien.jpg',
        'https://quantri.nhidong.org.vn/UploadImages/bvnhidong/PHP06/2018_6/20/1012.JPG?w=600',
    ];


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [openWorkAtSelect1, setOpenWorkAtSelect1] = React.useState(false);
    const [openWorkAtSelect2, setOpenWorkAtSelect2] = React.useState(false);
    const [openWorkAtSelect3, setOpenWorkAtSelect3] = React.useState(false);
    const [workAtSelect1, setWorkAtSelect1] = React.useState(0);
    const [workAtSelect2, setWorkAtSelect2] = React.useState(0);
    const [workAtSelect3, setWorkAtSelect3] = React.useState(0);

    const handleChangeWorkAtSelect1 = (event) => {
        setWorkAt1WP(event.target.value);
    };
    const handleChangeWorkAtSelect2 = (event) => {
        setWorkAt2WP(event.target.value);
    };
    const handleChangeWorkAtSelect3 = (event) => {
        setWorkAt3WP(event.target.value);
    };

    const handleCloseWorkAtSelect1 = () => {
        setOpenWorkAtSelect1(false);
    };
    const handleCloseWorkAtSelect2 = () => {
        setOpenWorkAtSelect2(false);
    };
    const handleCloseWorkAtSelect3 = () => {
        setOpenWorkAtSelect3(false);
    };

    const handleOpenWorkAtSelect1 = () => {
        setOpenWorkAtSelect1(true);
    };
    const handleOpenWorkAtSelect2 = () => {
        setOpenWorkAtSelect2(true);
    };
    const handleOpenWorkAtSelect3 = () => {
        setOpenWorkAtSelect3(true);
    };

    return (
        <div className={classes.root}>
            <div className={classes.demo1}>
                <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                    <AntTab label="Danh sách cuộc hẹn" />
                    <AntTab label="Lịch làm việc trong tuần" />
                </AntTabs>
                {/* <Typography className={classes.padding} /> */}
            </div>
            <TabPanel className={classes.tabPanel} value={value} index={0}>
                <HealthCheckPlanTable handleOpenHCPDialog={handleHCPClickOpen} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <WorkPlanTable handleOpenWPDialog={handleWPClickOpen} operationList={operationList} operationJson={operationJson}/>
            </TabPanel>
            <Dialog open={isOpenHCP} onClose={handleHCPClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Thông tin lịch khám</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Tên bệnh nhân"
                        defaultValue={healthCheckData.patient}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Thời gian"
                        defaultValue={healthCheckData.time}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Địa điểm khám"
                        defaultValue={healthCheckData.workAt}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Lý do khám"
                        defaultValue={healthCheckData.reason}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleHCPClose} color="primary" variant="outlined">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isOpenWP} onClose={handleWPClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Chỉnh sửa giờ làm việc</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            <TextField
                                margin="dense"
                                id="name"
                                label="Ngày"
                                defaultValue={getVnDay(dayWP)}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid xs={3}>
                            <TextField
                                margin="dense"
                                id="name"
                                type="time"
                                label="Sáng từ"
                                fullWidth
                                value={startingAt1WP}
                                onChange={(e) => { setStartingAt1WP(e.target.value) }}
                                defaultValue={startingAt1WP}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 1800, // 30 min
                                }}
                            />
                        </Grid>
                        <Grid xs={3}>
                            <TextField
                                margin="dense"
                                id="name"
                                type="time"
                                label="đến"
                                fullWidth
                                defaultValue={endingAt1WP}
                                value={endingAt1WP}
                                onChange={(e) => { setEndingAt1WP(e.target.value) }}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 1800, // 30 min
                                }}
                            />
                        </Grid>
                        <Grid xs={4}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="demo-controlled-open-select-label">Nơi khám</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={openWorkAtSelect1}
                                    value={workAt1WP}
                                    onClose={handleCloseWorkAtSelect1}
                                    onOpen={handleOpenWorkAtSelect1}
                                    onChange={handleChangeWorkAtSelect1}
                                >
                                    <MenuItem value={0}>
                                        <em>Chọn nơi khám</em>
                                    </MenuItem>
                                    {
                                        operationList.map(o => <MenuItem value={o.id}>{o.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={2} style={{alignSelf: "center", textAlign: "end"}}>
                            <Button variant="outlined" color="secondary" onClick={handleDelete1}>Xóa</Button>
                        </Grid>

                        <Grid xs={3}>
                            <TextField
                                margin="dense"
                                id="name"
                                type="time"
                                label="Chiều từ"
                                defaultValue={startingAt2WP}
                                value={startingAt2WP}
                                onChange={(e) => { setStartingAt2WP(e.target.value);}}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 1800, // 30 min
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid xs={3}>
                            <TextField
                                margin="dense"
                                id="name"
                                type="time"
                                label="đến"
                                defaultValue={endingAt2WP}
                                value={endingAt2WP}
                                onChange={(e) => { setEndingAt2WP(e.target.value) }}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 1800, // 30 min
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid xs={4}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="demo-controlled-open-select-label2">Nơi khám</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label2"
                                    id="demo-controlled-open-select2"
                                    open={openWorkAtSelect2}
                                    value={workAt2WP}
                                    onClose={handleCloseWorkAtSelect2}
                                    onOpen={handleOpenWorkAtSelect2}
                                    onChange={handleChangeWorkAtSelect2}
                                >
                                    <MenuItem value={0}>
                                        <em>Chọn nơi khám</em>
                                    </MenuItem>
                                    {
                                        operationList.map(o => <MenuItem value={o.id}>{o.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={2} style={{alignSelf: "center", textAlign: "end"}}>
                            <Button variant="outlined" color="secondary" onClick={handleDelete2}>Xóa</Button>
                        </Grid>

                        <Grid xs={3}>
                            <TextField
                                margin="dense"
                                id="name"
                                type="time"
                                label="Tối từ"
                                fullWidth
                                defaultValue={startingAt3WP}
                                value={startingAt3WP}
                                onChange={(e) => { setStartingAt3WP(e.target.value) }}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 1800, // 30 min
                                }}
                            />
                        </Grid>
                        <Grid xs={3}>
                            <TextField
                                margin="dense"
                                id="name"
                                label="đến"
                                type="time"
                                fullWidth
                                defaultValue={endingAt3WP}
                                value={endingAt3WP}
                                onChange={(e) => { setEndingAt3WP(e.target.value) }}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 1800, // 30 min
                                }}
                            />
                        </Grid>
                        <Grid xs={4}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="demo-controlled-open-select-label">Nơi khám</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={openWorkAtSelect3}
                                    value={workAt3WP}
                                    onClose={handleCloseWorkAtSelect3}
                                    onOpen={handleOpenWorkAtSelect3}
                                    onChange={handleChangeWorkAtSelect3}
                                >
                                    <MenuItem value={0}>
                                        <em>Chọn nơi khám</em>
                                    </MenuItem>
                                    {
                                        operationList.map(o => <MenuItem value={o.id}>{o.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={2} style={{alignSelf: "center", textAlign: "end"}}>
                            <Button variant="outlined" color="secondary" onClick={handleDelete3}>Xóa</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleWPOK} variant="outlined" color="primary">
                        OK
                    </Button>
                    <Button onClick={handleWPClose} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
