import React, { useState, useEffect } from 'react';
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

import APIService from '../../../utils/APIService';


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
    APPOINTMENT: 0,
    WORK_PLAN: 1
};

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
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

function createCHPData(id, day, time, workAt, patient, reason) {
    return { id, day, time, workAt, patient, reason };
}

function createWEEmpty(weekDay){
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

// APIService.getDoctorOperation();
const operation = [
    {
        id: 1,
        address: 'PKS101'
    },
    {
        id: 2,
        address: 'PKS102'
    }
];

function getDateTime(hms){
    let result = "2021-01-01T" + hms + ":00.000Z";
    return result;
}

function getHMS(datetime){
    return(parseInt(datetime.replace('T','').replace(':','').substring(10, 14)));
}

function getDisplayHMS(datetime){
    return datetime.replace('T','').substring(10, 15);
}

function getDay(datetime){
    const dt = new Date(datetime.substring(0, 10));
    const dayCode = dt.getDay();
    let result = "";
    switch(dayCode){
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

function createWPDataList(doctorOperationHourList) {
    var result = [createWEEmpty("Chủ nhật"), createWEEmpty("Thứ hai"), createWEEmpty("Thứ ba"), createWEEmpty("Thứ tư"), createWEEmpty("Thứ năm"), createWEEmpty("Thứ sáu"), createWEEmpty("Thứ bảy"),];
    
    // APIService.getDoctorOperation();
    // const operation = [
    //     {
    //         id: 1,
    //         address: 'PKS101'
    //     },
    //     {
    //         id: 2,
    //         address: 'PKS102'
    //     }
    // ];
    
    function updateWPData (index, element) {
        console.log(element.id);
        console.log(getHMS(element.startTime));
        
        if(getHMS(element.startTime) < 1200) {
            result[index].id1 = element.id;
            result[index].startingAt1 = getDisplayHMS(element.startTime);
            result[index].endingAt1 = getDisplayHMS(element.endTime);
            result[index].workAt1 = operation.find(e => e.id === element.operationId).id;
        }
        else if(getHMS(element.startTime) > 1200 && getHMS(element.startTime) < 1800) {
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
        switch(element.day){
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

const healtCheckPlanRows = [
    createCHPData(1, 'Thứ hai', '9:30', 'PKS101', 'Luke Shaw', 'Buồn nôn, đau bụng'),
    createCHPData(1, 'Thứ hai', '10:30', 'PKS101', 'Ben Arfa', 'Buồn nôn, đau bụng'),
    createCHPData(1, 'Thứ ba', '9:00', 'PKS101', 'Nasri', 'Buồn nôn, đau bụng'),
    createCHPData(1, 'Thứ ba', '11:30', 'PKS101', 'Frank Ribry', 'Buồn nôn, đau bụng'),
    createCHPData(1, 'Thứ tư', '8:30', 'PKS101', 'Robben', 'Buồn nôn, đau bụng'),
];

function HealthCheckPlanTable(props) {
    const classes = useStyles();

    const [healthCheckList, setHealthCheckList] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token_doctor247");
        const id = 3;
        APIService.getDoctorMedicalRecord(token, id, {skip: 0, take: 10}, (success, json) => {
            if(success && json.result){
                console.log("Get");
                console.log(json.result);
            }
        });
        APIService.getDoctorAppointment(token, (success, json) => {
            if(success && json.result){
                console.log("Get");
                console.log(json.result);
                setHealthCheckList(json.result);
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
                    {healtCheckPlanRows.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell align="center">{row.day}</StyledTableCell>
                            <StyledTableCell align="center">{row.time}</StyledTableCell>
                            <StyledTableCell align="center">{row.workAt}</StyledTableCell>
                            <StyledTableCell align="center">{row.patient}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button variant="contained" color="primary" align="center"
                                    onClick={() => props.handleOpenDialog(row)}
                                >
                                    Chi tiết
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    {healthCheckList.map((row) => (
                        <StyledTableRow key={row.id}>
                        <StyledTableCell align="center">{getDay(row.day)}</StyledTableCell>
                        <StyledTableCell align="center">{row.day.substring(11,16)}</StyledTableCell>
                        <StyledTableCell align="center">place</StyledTableCell>
                        <StyledTableCell align="center">patient</StyledTableCell>
                        <StyledTableCell align="center">
                            <Button variant="contained" color="primary" align="center"
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
        const token = localStorage.getItem("token_doctor247");
        APIService.getDoctorOperation(token, (success, json) => {
            if(success && json.result){
                console.log("getDoctorOperation");
                console.log(json.result);
                SetWorkPlanList(createWPDataList(json.result));
            }
        });
    }, []);

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
                                <StyledTableCell rowSpan={3} align="center">{row.day}</StyledTableCell>
                                <StyledTableCell align="center">Sáng</StyledTableCell>
                                <StyledTableCell align="center">{row.startingAt1}</StyledTableCell>
                                <StyledTableCell align="center">{row.endingAt1}</StyledTableCell>
                                <StyledTableCell align="center">{row.workAt1}</StyledTableCell>
                                <StyledTableCell rowSpan={3} align="center">
                                    <Button variant="contained" color="primary" align="center"
                                        onClick={() => props.handleOpenDialog(row)}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell align="center">Chiều</StyledTableCell>
                            <StyledTableCell align="center">{row.startingAt2}</StyledTableCell>
                            <StyledTableCell align="center">{row.endingAt2}</StyledTableCell>
                            <StyledTableCell align="center">{row.workAt2}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell align="center">Tối</StyledTableCell>
                            <StyledTableCell align="center">{row.startingAt3}</StyledTableCell>
                            <StyledTableCell align="center">{row.endingAt3}</StyledTableCell>
                            <StyledTableCell align="center">{row.workAt3}</StyledTableCell>
                        </StyledTableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default function WorkPlan() {
    const classes = useStyles();
    const [value, setValue] = React.useState(TabCode.APPOINTMENT);
    const [isOpenHCP, setIsOpenHCP] = React.useState(false);

    const [isOpenWP, setIsOpenWP] = React.useState(false);

    const [healthCheckData, setHealthCheckData] = useState({
        id: healtCheckPlanRows[0].id,
        day: healtCheckPlanRows[0].day,
        time: healtCheckPlanRows[0].time,
        workAt: healtCheckPlanRows[0].workAt,
        patient: healtCheckPlanRows[0].patient,
        reason: healtCheckPlanRows[0].reason
    });

    const [workPlanData, setWorkPlanData] = useState(createWEEmpty("SUNDAY"));

    const handleHCPClickOpen = (data) => {
        setIsOpenHCP(true);
        setHealthCheckData({
            id: data.id,
            day: data.day,
            time: data.time,
            workAt: data.workAt,
            patient: data.patient,
            reason: data.reason
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
        console.log(data);
    };

    const handleWPClose = () => {
        setIsOpenWP(false);
    };

    const handleWPOK = () => {
        //setIsOpenWP(false);
        const logdata = {
            day: dayWP,
            id1: id1WP,
            id2: id2WP,
            id3: id3WP,
            workAt1: workAt1WP,
            workAt2: workAt2WP,
            workAt3: workAt3WP,
            startingAt1: startingAt1WP,
            endingAt1: endingAt1WP,
            startingAt2: startingAt2WP,
            endingAt2: endingAt2WP,
            startingAt3: startingAt3WP,
            endingAt3: endingAt3WP,
        };
        const logdt = [{
            id: id1WP,
            day: dayWP,
            startTime: getDateTime(startingAt1WP),
            endTime: getDateTime(startingAt1WP),
            operationId: workAt1WP
        }, {
            id: id2WP,
            day: dayWP,
            startTime: getDateTime(startingAt2WP),
            endTime: getDateTime(startingAt2WP),
            operationId: workAt2WP
        }, {
            id: id3WP,
            day: dayWP,
            startTime: getDateTime(startingAt3WP),
            endTime: getDateTime(startingAt3WP),
            operationId: workAt3WP
        }];
        console.log(logdt);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const [openWorkAtSelect1, setOpenWorkAtSelect1] = React.useState(false);
    const [openWorkAtSelect2, setOpenWorkAtSelect2] = React.useState(false);
    const [openWorkAtSelect3, setOpenWorkAtSelect3] = React.useState(false);
    const [workAtSelect1, setWorkAtSelect1] = React.useState('');
    const [workAtSelect2, setWorkAtSelect2] = React.useState('');
    const [workAtSelect3, setWorkAtSelect3] = React.useState('');

    const handleChangeWorkAtSelect1 = (event) => {
        setWorkAtSelect1(event.target.value);
        setWorkAt1WP(event.target.value);
    };
    const handleChangeWorkAtSelect2 = (event) => {
        setWorkAtSelect2(event.target.value);
        setWorkAt2WP(event.target.value);
    };
    const handleChangeWorkAtSelect3 = (event) => {
        setWorkAtSelect3(event.target.value);
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
                    <AntTab label="Lịch khám bệnh" />
                    <AntTab label="Lịch làm việc" />
                </AntTabs>
                {/* <Typography className={classes.padding} /> */}
            </div>
            <TabPanel className={classes.tabPanel} value={value} index={0}>
                <HealthCheckPlanTable handleOpenDialog={handleHCPClickOpen}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <WorkPlanTable handleOpenDialog={handleWPClickOpen}/>
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
                    <Button onClick={handleHCPClose} color="primary">
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
                            defaultValue={dayWP}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            margin="dense"
                            id="name"
                            type="time"
                            label="Sáng từ"
                            fullWidth
                            onChange={(e) => {setStartingAt1WP(e.target.value)}}
                            defaultValue={startingAt1WP}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            margin="dense"
                            id="name"
                            type="time"
                            label="đến"
                            fullWidth
                            defaultValue={endingAt1WP}
                            onChange={(e) => {setEndingAt1WP(e.target.value)}}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
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
                                value={workAtSelect1}
                                onClose={handleCloseWorkAtSelect1}
                                onOpen={handleOpenWorkAtSelect1}
                                onChange={handleChangeWorkAtSelect1}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    operation.map(o => <MenuItem value={o.id}>{o.address}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            margin="dense"
                            id="name"
                            type="time"
                            label="Chiều từ"
                            defaultValue={startingAt2WP}
                            onChange={(e) => {setStartingAt2WP(e.target.value);console.log(e.target.value)}}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            margin="dense"
                            id="name"
                            type="time"
                            label="đến"
                            defaultValue={endingAt2WP}
                            onChange={(e) => {setEndingAt2WP(e.target.value)}}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
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
                                value={workAtSelect2}
                                onClose={handleCloseWorkAtSelect2}
                                onOpen={handleOpenWorkAtSelect2}
                                onChange={handleChangeWorkAtSelect2}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    operation.map(o => <MenuItem value={o.id}>{o.address}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            margin="dense"
                            id="name"
                            type="time"
                            label="Tối từ"
                            fullWidth
                            defaultValue={startingAt3WP}
                            onChange={(e) => {setStartingAt3WP(e.target.value)}}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            margin="dense"
                            id="name"
                            label="đến"
                            type="time"
                            fullWidth
                            defaultValue={endingAt3WP}
                            onChange={(e) => {setEndingAt3WP(e.target.value)}}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
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
                                value={workAtSelect3}
                                onClose={handleCloseWorkAtSelect3}
                                onOpen={handleOpenWorkAtSelect3}
                                onChange={handleChangeWorkAtSelect3}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    operation.map(o => <MenuItem value={o.id}>{o.address}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                        {/* <TextField
                            margin="dense"
                            id="name"
                            label="Nơi khám"
                            defaultValue={workPlanData.workAt3}
                            fullWidth
                            /> */}
                    </Grid>
                </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleWPOK} variant="contained" color="primary">
                        OK
                    </Button>
                    <Button onClick={handleWPClose} variant="contained" color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
