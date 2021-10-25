import React, { useState } from 'react';
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

function createCHPData(day, time, recordId, patient) {
    return { day, time, recordId, patient };
}

function createWPData(day, morningStartingAt, morningEndingAt, afternoonStartingAt, afternoonEndingAt) {
    return { day, morningStartingAt, morningEndingAt, afternoonStartingAt, afternoonEndingAt };
}

const healtCheckPlanRows = [
    createCHPData('Thứ hai', '9:30', '20121', 'Luke Shaw'),
    createCHPData('Thứ hai', '10:30', '20122', 'Ben Arfa'),
    createCHPData('Thứ ba', '9:00', '20123', 'Nasri'),
    createCHPData('Thứ ba', '11:30', '20124', 'Frank Ribry'),
    createCHPData('Thứ tư', '8:30', '20125', 'Robben'),
    createCHPData('Thứ năm', '8:00', '20126', 'Rik Kaka'),
    createCHPData('Thứ năm', '11:00', '20127', 'Luis Nani'),
    createCHPData('Thứ năm', '14:30', '20128', 'Test'),
    createCHPData('Thứ sáu', '8:30', '20123', 'Ribry'),
    createCHPData('Thứ sáu', '9:00', '20123', 'Ben'),
    createCHPData('Thứ bảy', '8:30', '20123', 'Nani'),
    createCHPData('Thứ bảy', '9:00', '20123', 'Nasri'),
    createCHPData('Thứ bảy', '10:00', '20123', 'Shaw'),
    createCHPData('Thứ bảy', '10:30', '20123', 'Kaka'),
];

const healtWorkPlanRows = [
    createWPData('Chủ nhật', '0', '0', '0', '0'),
    createWPData('Thứ hai', '8:30', '12:00', '13:30', '17:30'),
    createWPData('Thứ ba', '8:30', '12:00', '13:30', '17:30'),
    createWPData('Thứ tư', '8:30', '12:00', '13:30', '17:30'),
    createWPData('Thứ năm', '8:30', '12:00', '13:30', '17:30'),
    createWPData('Thứ sáu', '8:30', '12:00', '13:30', '17:30'),
    createWPData('Thứ bảy', '8:30', '12:00', '13:30', '17:30'),
];

function HealthCheckPlanTable(props) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Ngày</StyledTableCell>
                        <StyledTableCell align="center"> Giờ</StyledTableCell>
                        <StyledTableCell align="center">Mã hồ sơ</StyledTableCell>
                        <StyledTableCell align="center">Tên bệnh nhân</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {healtCheckPlanRows.map((row) => (
                        <StyledTableRow key={row.recordId}>
                            <StyledTableCell align="center">{row.day}</StyledTableCell>
                            <StyledTableCell align="center">{row.time}</StyledTableCell>
                            <StyledTableCell align="center">{row.recordId}</StyledTableCell>
                            <StyledTableCell align="center">{row.patient}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button variant="contained" color="primary" align="center"
                                    onClick={props.handleOpenDialog}
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

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Ngày trong tuần</StyledTableCell>
                        <StyledTableCell align="center">Buổi</StyledTableCell>
                        <StyledTableCell align="center">Giờ bắt đầu</StyledTableCell>
                        <StyledTableCell align="center">Giờ kết thúc</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {healtWorkPlanRows.map((row) => (
                        <React.Fragment>
                            <StyledTableRow key={row.name}>
                                <StyledTableCell rowSpan={2} align="center">{row.day}</StyledTableCell>
                                <StyledTableCell align="center">Sáng</StyledTableCell>
                                <StyledTableCell align="center">{row.morningStartingAt}</StyledTableCell>
                                <StyledTableCell align="center">{row.morningEndingAt}</StyledTableCell>
                                <StyledTableCell rowSpan={2} align="center">
                                    <Button variant="contained" color="primary" align="center"
                                        onClick={() => props.handleOpenDialog(row)}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell align="center">Chiều</StyledTableCell>
                            <StyledTableCell align="center">{row.afternoonStartingAt}</StyledTableCell>
                            <StyledTableCell align="center">{row.afternoonEndingAt}</StyledTableCell>
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

    const [recordId, setRecordId] = useState('21033');
    const [patient, setPatient] = useState('Hoàng Dũng');
    const [dateTime, setDateTime] = useState('Thứ hai 10:00 ngày 25/09/2021');
    const [place, setPlace] = useState('Bệnh viện A, số 150 Hoàng Minh Giám, quận Tân Bình');
    const [reason, setReason] = useState('Buồn nôn, đau bụng');

    const [workPlanData, setWorkPlanData] = useState({
        day: healtWorkPlanRows[0].day,
        morningStartingAt: healtWorkPlanRows[0].morningStartingAt,
        morningEndingAt: healtWorkPlanRows[0].morningEndingAt,
        afternoonStartingAt: healtWorkPlanRows[0].afternoonStartingAt,
        afternoonEndingAt: healtWorkPlanRows[0].afternoonEndingAt
    });

    const handleHCPClickOpen = () => {
        setIsOpenHCP(true);
    };

    const handleHCPClose = () => {
        setIsOpenHCP(false);
    };

    const handleWPClickOpen = (data) => {
        setIsOpenWP(true);
        setWorkPlanData({
            day: data.day,
            morningStartingAt: data.morningStartingAt,
            morningEndingAt: data.morningEndingAt,
            afternoonStartingAt: data.afternoonStartingAt,
            afternoonEndingAt: data.afternoonEndingAt
        });
    };

    const handleWPClose = () => {
        setIsOpenWP(false);
    };

    const handleWPOK = () => {
        setIsOpenWP(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Mã hồ sơ"
                        defaultValue={recordId}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Tên bệnh nhân"
                        defaultValue={patient}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Thời gian"
                        defaultValue={dateTime}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Địa điểm khám"
                        defaultValue={place}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Lý do khám"
                        defaultValue={reason}
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
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Ngày"
                            defaultValue={workPlanData.day}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Sáng từ"
                            defaultValue={workPlanData.morningStartingAt}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="đến"
                            defaultValue={workPlanData.morningEndingAt}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Chiều từ"
                            defaultValue={workPlanData.afternoonStartingAt}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="đến"
                            defaultValue={workPlanData.afternoonEndingAt}
                            fullWidth
                        />
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
