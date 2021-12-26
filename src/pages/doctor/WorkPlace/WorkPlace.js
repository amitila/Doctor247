import React, { useEffect, useContext } from 'react';
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

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';

import APIService from '../../../utils/APIService';
import CustomImage from '../../../components/Image';
import getToken from '../../../helpers/getToken';
import { useSnackbar } from 'notistack';
import { AppContext } from '../../../store/AppProvider';

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

function ClinicRegistrationDialogRaw(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

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

    const [openClinicTypes, setOpenClinicTypes] = React.useState(false);
    const [openProvinces, setOpenProvinces] = React.useState(false);
    const [openDistricts, setOpenDistricts] = React.useState(false);
    const [openWards, setOpenWards] = React.useState(false);
    const [clinicTypeSelect, setClinicTypeSelect] = React.useState(2);
    const [provinceSelect, setProvinceSelect] = React.useState(0);
    const [districtSelect, setDistrictSelect] = React.useState(0);
    const [wardSelect, setWardSelect] = React.useState(0);
    const [clinicTypes, setClinicTypes] = React.useState([]);
    const [provinces, setProvinces] = React.useState([]);
    const [districts, setDistricts] = React.useState([]);
    const [wards, setWards] = React.useState([]);
    const [imgSrcList, setImgSrcList] = React.useState([]);
    const [clinicName, setClinicName] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [latitude, setLatitude] = React.useState(0.0);
    const [longitude, setLongitude] = React.useState(0.0);


    const handleChangeImage = (e) => {
        const files = e.target.files;
        let fl = [];
        let fl_s = [];

        for (let i of Object.keys(files)) {
            fl.push(files[i]);
            
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            fl_s.push(reader.result);
        }
        setImgSrcList(fl);
    }

    useEffect(() => {
        APIService.getProvinces((success, json) => {
            if (success && json.result){
                setProvinces(json.result);
            }
        });

        setClinicTypes([
            {
                code: 2,
                name: 'Phòng khám tư nhân'
            }
        ]);

    }, []);

    const handleRegistClinic = () => {
        if (wardSelect === 0 || clinicName === '' || latitude === '' || longitude === '' || street === '' || imgSrcList.length === 0) {
            alert('vui lòng nhập đủ tất cả các trường');
        }
        else {
            const provinceName = provinces.find(x => x.id === provinceSelect)?.name;
            const districtName = districts.find(x => x.id === districtSelect)?.name;
            const wardName = wards.find(x => x.id === wardSelect)?.name;
            const address = street + ", " + wardName + ", " + districtName + ", " + provinceName;
            const data = {
                name: clinicName,
                wardId: wardSelect,
                latitude: parseInt(latitude),
                longitude: parseInt(longitude),
                address: address,
                images: imgSrcList
            }
            APIService.postDoctorWorkPlace(
                token,
                data,
                (success, json) => {
                    if (success && json.result) { 
                        enqueueSnackbar('Đã gửi yêu cầu đăng ký!', { variant: 'success' });
                        setClinicName('');
                        setProvinceSelect(0);
                        setStreet('');
                        setLatitude('');
                        setLatitude('');
                        console.log('regist clinic info');
                        console.log(data);
                    }
                }
            );

            onClose();
        }
    };

    useEffect(() => {
        if (provinceSelect > 0) {
            APIService.getDistricts(provinceSelect, (success, json) => {
                if (success && json.result){
                    setDistricts(json.result);
                }
            });
            //setDistricts(provinces.find(element => element.code === provinceSelect).districts);
        }
        else {
            setDistricts([]);
            setWards([]);
        }
    }, [provinceSelect]);

    useEffect(() => {
        if (districtSelect > 0) {
            APIService.getWards(districtSelect, (success, json) => {
                if (success && json.result){
                    setWards(json.result);
                }
            });
            //setWards(districts.find(element => element.code === districtSelect).wards);
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
            <DialogTitle id="confirmation-dialog-title" style={{backgroundColor: 'cadetblue'}}>Đăng ký phòng khám</DialogTitle>
            <DialogContent dividers style={{ overflowX: 'hidden' }}>
                <FormControl className={classes.formControl} fullWidth style={{ marginLeft: 0 }}>
                    <InputLabel id="demo-controlled-open-select-label">
                        Loại
                    </InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        required
                        open={openClinicTypes}
                        value={clinicTypeSelect}
                        onClose={() => {setOpenClinicTypes(false)}}
                        onOpen={() => {setOpenClinicTypes(true)}}
                        onChange={(e) => {setClinicTypeSelect(e.target.value)}}
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
                    label={clinicTypeSelect === 1 ? "Tên bệnh viện" : "Tên phòng khám"}
                    required
                    placeholder=""
                    helperText=""
                    fullWidth
                    onChange={(e) => { setClinicName(e.target.value) }}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true
                    }}
                    variant="standard"
                />

                <FormControl className={classes.formControl} fullWidth style={{ marginLeft: 0 }}>
                    <InputLabel id="demo-controlled-open-select-label">
                        Tỉnh / Thành Phố
                    </InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        required
                        id="demo-controlled-open-select"
                        open={openProvinces}
                        value={provinceSelect}
                        onClose={() => {setOpenProvinces(false)}}
                        onOpen={() => {setOpenProvinces(true)}}
                        onChange={(e) => {setProvinceSelect(e.target.value)}}
                    >
                        <MenuItem value={0}>
                            <em>Chọn tỉnh / thành phố</em>
                        </MenuItem>
                        {provinces.map((province) => (
                            <MenuItem value={province.id}>{province.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />

                <FormControl className={classes.formControl} fullWidth style={{ marginLeft: 0 }}>
                    <InputLabel id="demo-controlled-open-select-label">
                        Quận / Huyện
                    </InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        required
                        open={openDistricts}
                        value={districtSelect}
                        onClose={() => setOpenDistricts(false)}
                        onOpen={() => {setOpenDistricts(true)}}
                        onChange={(e) => {setDistrictSelect(e.target.value)}}
                    >
                        <MenuItem value={0}>
                            <em>Chọn quận / huyện</em>
                        </MenuItem>
                        {districts.map((district) => (
                            <MenuItem value={district.id}>{district.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />

                <FormControl className={classes.formControl} fullWidth style={{ marginLeft: 0 }}>
                    <InputLabel id="demo-controlled-open-select-label">
                        Phường / Xã / Thị Trấn
                    </InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        required
                        open={openWards}
                        value={wardSelect}
                        onClose={() => {setOpenWards(false)}}
                        onOpen={() => {setOpenWards(true)}}
                        onChange={(e) => {setWardSelect(e.target.value)}}
                    >
                        <MenuItem value={0}>
                            <em>Chọn phường / xã / thị trấn</em>
                        </MenuItem>
                        {wards.map((ward) => (
                            <MenuItem value={ward.id}>{ward.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />

                <TextField
                    id="filled-full-width"
                    required
                    label="Số nhà, đường"
                    placeholder="số nhà, đường"
                    helperText=""
                    onChange={(e) => { setStreet(e.target.value) }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true
                    }}
                    variant="standard"
                />
                <TextField
                    id="filled-full-width"
                    required
                    label="Vĩ độ"
                    placeholder=""
                    helperText="Click chuột phải vào vị trí trên Google map, số đầu tiên chính là Vĩ độ"
                    onChange={(e) => { setLatitude(e.target.value) }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true
                    }}
                    variant="standard"
                />
                <TextField
                    id="filled-full-width"
                    required
                    label="Kinh độ"
                    placeholder=""
                    helperText="Click chuột phải vào vị trí trên Google map, số thứ hai chính là Kinh độ"
                    onChange={(e) => { setLongitude(e.target.value) }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true
                    }}
                    variant="standard"
                />
                {
                    imgSrcList.map(imgSrc => {
                        //return <img src={imgSrc} style={{ margin: '3%' }} width="44%" height="200" alt=""></img>
                        return <CustomImage image={imgSrc} style={{ margin: '3%' }} width="44%" height="200" alt=""/>
                    }
                    )
                }
                <br />
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                >
                    Thêm hình ảnh
                    <input
                        type="file"
                        accept='.jpg, .png'
                        multiple
                        onChange={handleChangeImage}
                        hidden
                    />
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleRegistClinic} color="primary" variant="outlined">
                    Đăng ký
                </Button>
                <Button
                    autoFocus
                    onClick={() => {onClose()}}
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
    CLINICS: 0,
    SEARCH: 1,
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

function getDate(datetime) {
    const dt = new Date(datetime);
    return dt.getDate().toString().padStart(2, '0') + "/" + (dt.getMonth() + 1).toString().padStart(2, '0') + "/" + dt.getFullYear();
}

function getDayOfWeek(datetime) {
    const dt = new Date(datetime);
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

function MyClinicsTable(props) {
    const classes = useStyles();
    
    const { myClinics } = props;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" width="15%">Loại phòng khám</StyledTableCell>
                        <StyledTableCell align="center" width="20%">Tên phòng khám</StyledTableCell>
                        <StyledTableCell align="center" width="40%">Địa chỉ</StyledTableCell>
                        <StyledTableCell align="center" width="10%">Trạng thái</StyledTableCell>
                        <StyledTableCell align="center" width="15%">
                            {/* <Button variant="outlined" color="default" align="center" onClick={() => props.handleOpenClinicRegistrationForm()}>Đăng ký</Button> */}
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {myClinics.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell align="left">{row.type === 'HOSPITAL' ? 'Bệnh viện' : 'Phòng khám tư'}</StyledTableCell>
                            <StyledTableCell align="left">{row.name}</StyledTableCell>
                            <StyledTableCell align="left">{row.address}</StyledTableCell>
                            <StyledTableCell align="center">{row.status==='ACTIVE' ? 'Đang hoạt động' : 'Tạm dừng'}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button variant="outlined" color="primary" align="center" onClick={() => props.handleOpenClinicsDialog(row, false, true)}>
                                    Xem
                                </Button>
                                {
                                    row.managerId===props.userInfo.id?
                                    <Button variant="outlined" color="primary" align="center" onClick={() => props.handleOpenClinicsDialog(row, true, true)}>
                                        Sửa
                                    </Button>:null
                                }
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function DoctorManagementTable(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const { myManagementClinics, handleOpenDoctorDialog, setSelectedWorkPlaceId, isReload, setIsReload } = props;

    const [doctorList, setDoctorList] = React.useState([]);
    const [bannedDoctorList, setBannedDoctorList] = React.useState([]);
    const [clinicsList, setClinicsList] = React.useState([]);
    const [applicationsList, setApplicationsList] = React.useState([]);
    const [applicationsListTemp, setApplicationsListTemp] = React.useState([]);
    const [selectedClinicId, setSelectedClinicId] = React.useState(0);
    const [openSelectClinic, setOpenSelectClinic] = React.useState(false);

    const reloadPage = () => {
        myManagementClinics.forEach(clinic => {
            APIService.getDoctorWorkPlaceApplied(
                token,
                clinic.id,
                "PENDING",
                (success, json) => {
                    if (success, json.result) {
                        let list = [];
                        json.result.forEach(item => {
                            list.push({
                                ...item,
                                clinicName: clinic.name,
                                clinicId: clinic.id
                            });
                        });
                        console.log('application list');
                        console.log(list);
                        setApplicationsListTemp(list);
                    }
                }
            );
        });
        if (selectedClinicId !== 0) {
            APIService.getDoctorWorkPlaceDoctorManagement(
                token,
                selectedClinicId,
                (success, json) => {
                    if (success && json.result) {
                        console.log('getDoctorWorkPlaceDoctorManagement');
                        console.log(json.result);
                        let bannedList = [];
                        let list = [];
                        json.result.forEach(item => {
                            if (item.doctorStatus === 'BANNED') {
                                bannedList.push(item);
                            }
                            else {
                                list.push(item);
                            }
                        });
                        setDoctorList(list);
                        setBannedDoctorList(bannedList);
                    }
                }
            );
        }
    }
    const [selectedDoctorStatus, setSelectedDoctorStatus] = React.useState('active');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Chọn điều kiện');

    const handleRadioDoctorStatusChange = (event) => {
        setSelectedDoctorStatus(event.target.value);
        setHelperText(' ');
        setError(false);
    };

    const handleSubmitDoctorStatus = (event) => {
        event.preventDefault();

        if (selectedDoctorStatus === 'active') {
            setHelperText('Chỉ hiển thị các bác sĩ đang làm việc.');
            setError(false);
        } else if (selectedDoctorStatus === 'banned') {
            setHelperText('Chỉ hiển thị các bác sĩ đã bị xóa.');
            setError(true);
        } else {
            setHelperText('Chọn trạng thái làm việc muốn hiển thị');
            setError(true);
        }
    };

    useEffect(() => {
        reloadPage();
        console.log('list myManagementClinics');
        console.log(myManagementClinics);
        let list = [];
        myManagementClinics.forEach(item => {
            if (item.status === 'ACTIVE') {
                list.push(item);
            }

        });
        setClinicsList(list);
    }, []);

    useEffect(() => {
        setApplicationsList(applicationsList.concat(applicationsListTemp));
    }, [applicationsListTemp]);

    useEffect(() => {
        setSelectedWorkPlaceId(selectedClinicId);
        APIService.getDoctorWorkPlaceDoctorManagement(
            token,
            selectedClinicId,
            (success, json) => {
                if (success && json.result) {
                    console.log('getDoctorWorkPlaceDoctorManagement');
                    console.log(json.result);
                    let bannedList = [];
                    let list = [];
                    json.result.forEach(item => {
                        if (item.doctorStatus === 'BANNED') {
                            bannedList.push(item);
                        }
                        else {
                            list.push(item);
                        }
                    });
                    setDoctorList(list);
                    setBannedDoctorList(bannedList);
                }
            }
        );
    }, [selectedClinicId]);

    useEffect(() => {
        if (isReload) {
            setIsReload(false);
            setApplicationsListTemp([]);
            setApplicationsList([]);
            setDoctorList([]);
            setBannedDoctorList([]);
            reloadPage();
        }
    }, [isReload])

    return (
        <div>
            <TableContainer component={Paper}>
                <div style={{ marginBottom: '10px' }}>
                    <InputBase
                        defaultValue="Chọn phòng khám/bệnh viện: "
                        disabled
                        inputProps={{ 'aria-label': 'naked' }}
                        style={{ marginTop: '25px', marginLeft: '10px', width: '300px', fontSize: '20px', fontWeight: 'bold' }}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label"></InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            style={{marginTop: '14px'}}
                            open={openSelectClinic}
                            onClose={() => { setOpenSelectClinic(false) }}
                            onOpen={() => { setOpenSelectClinic(true) }}
                            value={selectedClinicId}
                            onChange={(e) => { setSelectedClinicId(e.target.value) }}
                        >
                            <MenuItem value={0}>Chọn phòng khám</MenuItem>
                            {
                                clinicsList.map(clinic =>
                                    <MenuItem value={clinic.id}>{clinic.name}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <InputBase
                        defaultValue="Điều kiện"
                        disabled
                        inputProps={{ 'aria-label': 'naked' }}
                        style={{ marginTop: '5px', marginLeft: '10px', width: '300px', fontSize: '20px', fontWeight: 'bold' }}
                    />
                    <form onSubmit={handleSubmitDoctorStatus}>
                        <FormControl component="fieldset" error={error} className={classes.formControl}>
                            <RadioGroup aria-label="quiz" name="quiz" value={selectedDoctorStatus} onChange={handleRadioDoctorStatusChange}>
                                <FormControlLabel value="active" control={<Radio />} label="Chỉ hiển thị bác sĩ đang làm việc" />
                                <FormControlLabel value="banned" control={<Radio />} label="Chỉ hiển thị bác sĩ bị xóa" />
                            </RadioGroup>
                            <FormHelperText>{helperText}</FormHelperText>
                            {/* <Button type="submit" variant="outlined" color="primary" className={classes.button}>
                                Tìm kiếm
                            </Button> */}
                        </FormControl>
                    </form>
                </div>
                <h3>Danh sách bác sĩ</h3>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Họ Tên</StyledTableCell>
                            <StyledTableCell align="center">Giới tính</StyledTableCell>
                            <StyledTableCell align="center">Ngày sinh</StyledTableCell>
                            <StyledTableCell align="center">Số điện thoại</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button variant="outlined" color="default" align="center" ></Button>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            selectedDoctorStatus==='active'?
                            doctorList.map(doctor =>
                                <StyledTableRow >
                                    <StyledTableCell align="left">{doctor.firstName + " " + doctor.lastName}</StyledTableCell>
                                    <StyledTableCell align="left">{doctor.gender === 'MALE' ? 'Nam' : 'Nữ'}</StyledTableCell>
                                    <StyledTableCell align="left">{getDate(doctor.birthday)}</StyledTableCell>
                                    <StyledTableCell align="left">{doctor.contactPhoneNumber}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button variant="outlined" color="primary" align="center" onClick={() => { handleOpenDoctorDialog(doctor, false, selectedDoctorStatus, null) }}>
                                            Chi tiết
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                            :
                            bannedDoctorList.map(doctor =>
                                <StyledTableRow >
                                    <StyledTableCell align="left">{doctor.firstName + " " + doctor.lastName}</StyledTableCell>
                                    <StyledTableCell align="left">{doctor.gender === 'MALE' ? 'Nam' : 'Nữ'}</StyledTableCell>
                                    <StyledTableCell align="left">{getDate(doctor.birthday)}</StyledTableCell>
                                    <StyledTableCell align="left">{doctor.contactPhoneNumber}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button variant="outlined" color="primary" align="center" onClick={() => { handleOpenDoctorDialog(doctor, false, selectedDoctorStatus, null) }}>
                                            Chi tiết
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <h1 style={{alignContent: 'center'}}>-----------------</h1>
            <TableContainer component={Paper}>
                <h3>Danh sách yêu cầu mới</h3>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Phòng khám</StyledTableCell>
                            <StyledTableCell align="center">Họ Tên</StyledTableCell>
                            <StyledTableCell align="center">Giới tính</StyledTableCell>
                            <StyledTableCell align="center">Ngày sinh</StyledTableCell>
                            <StyledTableCell align="center">Số điện thoại</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button variant="outlined" color="default" align="center" ></Button>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            applicationsList.map(application =>
                                <StyledTableRow >
                                    <StyledTableCell align="left">{application.clinicName}</StyledTableCell>
                                    <StyledTableCell align="left">{application.doctor.firstName + " " + application.doctor.lastName}</StyledTableCell>
                                    <StyledTableCell align="left">{application.doctor.gender === 'MALE' ? 'Nam' : 'Nữ'}</StyledTableCell>
                                    <StyledTableCell align="left">{getDate(application.doctor.birthday)}</StyledTableCell>
                                    <StyledTableCell align="left">{application.doctor.contactPhoneNumber}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button variant="outlined" color="primary" align="center" onClick={() => { handleOpenDoctorDialog(application.doctor, true, '', application) }}>
                                            Chi tiết
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

function SearchClinicsTable(props) {
    const classes = useStyles();
    const { provinces } = props;

    const [workPlaceList, setWorkPlaceList] = React.useState([]);
    const [districtsList, setDistrictsList] = React.useState([]);
    const [wardsList, setWardsList] = React.useState([]);
    const [wardsListTemp, setWardsListTemp] = React.useState([]);
    
    const [type, setType] = React.useState(0);
    const [openType, setOpenType] = React.useState(false);
    const [place, setPlace] = React.useState(0);
    const [openPlace, setOpenPlace] = React.useState(false);
    const [keyword, setKeyword] = React.useState('');

    const handleClickSearch = () => {
        const condition = {
            keyword: keyword,
            status: 'ACTIVE',
        }
        APIService.getDoctorWorkPlace(token, condition, (success, json) => {
            if (success, json.result) {
                if (place === 0 && type === 0) {
                    setWorkPlaceList(json.result);
                    return;
                }
                let list = [];
                json.result.forEach(element => {
                    if (wardsList.length === 0 || (wardsList.find(ward => ward.id === element.wardId) !== undefined)) {
                        if (type === 0 || (type === 1 && element.type === 'HOSPITAL') || (type === 2 && element.type === 'CLINIC')) {
                            list.push(element);
                        }
                    }
                });
                setWorkPlaceList(list);
            }
        });
    }

    useEffect(() => {
        setWardsList([]);
        if (place !== 0) {
            APIService.getDistricts(place, (success, json) => {
                if (success, json.result) {
                    setDistrictsList(json.result);
                }
            });
        }
        else {
            setDistrictsList([]);
        }
    }, [place]);

    useEffect(() => {
        if (districtsList.length !== 0) {
            districtsList.forEach(district => {
                APIService.getWards(district.id, (success, json) => {
                    if (success, json.result) {
                        setWardsListTemp(json.result);
                    }
                });
            });
        }
    }, [districtsList]);

    useEffect(() => {
        setWardsList(wardsList.concat(wardsListTemp));
    }, [wardsListTemp]);

    useEffect(() => {
        const condition = {
            status: 'ACTIVE',
        }
        APIService.getDoctorWorkPlace(token, condition, (success, json) => {
            if (success, json.result) {
                setWorkPlaceList(json.result);
            }
        });
    }, []);

    return (
        <TableContainer component={Paper} style={{verticalAlign: 'middle'}}>
            <div style={{marginBottom: '10px'}}>
                <InputBase
                    defaultValue="Điều kiện tìm kiếm: "
                    disabled
                    inputProps={{ 'aria-label': 'naked' }}
                    style={{marginTop: '25px', marginLeft: '10px', width: '150px'}}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Loại</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openType}
                        onClose={() => {setOpenType(false)}}
                        onOpen={() => {setOpenType(true)}}
                        value={type}
                        onChange={(e) => {setType(e.target.value)}}
                    >
                        <MenuItem value={0}>Chọn loại</MenuItem>
                        <MenuItem value={1}>Bệnh viện</MenuItem>
                        <MenuItem value={2}>Phòng khám</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Tỉnh</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openPlace}
                        onClose={() => {setOpenPlace(false)}}
                        onOpen={() => {setOpenPlace(true)}}
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                    >
                        <MenuItem value={0}>Chọn tỉnh</MenuItem>
                        {
                            provinces.map(province => 
                                <MenuItem value={province.id}>{province.name}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
                <TextField
                    label="Tên"
                    id="margin-normal"
                    defaultValue=""
                    value={keyword}
                    onChange={(e) => {setKeyword(e.target.value)}}
                    className={classes.textField}
                    helperText=""
                    style={{marginTop:'8px'}}
                />
                <Button variant="contained" style={{marginLeft: '10px'}} onClick={handleClickSearch}>Tìm kiếm</Button>
                <Button variant="contained" style={{marginLeft: '10px'}} onClick={() => props.handleOpenClinicRegistrationForm()}>Đăng ký phòng khám</Button>
            </div>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" width="15%">Loại phòng khám</StyledTableCell>
                        <StyledTableCell align="center" width="20%">Tên phòng khám</StyledTableCell>
                        <StyledTableCell align="center" width="15%">Người quản lý</StyledTableCell>
                        <StyledTableCell align="center" width="40%">Địa chỉ</StyledTableCell>
                        <StyledTableCell align="center" width="10%">
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        workPlaceList.map(item =>
                            <StyledTableRow >
                                <StyledTableCell align="left">{item.type === 'HOSPITAL'? 'Bệnh viện' : 'Phòng khám tư'}</StyledTableCell>
                                <StyledTableCell align="left">{item.name}</StyledTableCell>
                                <StyledTableCell align="left">
                                    {
                                        item.manager.doctor?.firstName!==undefined?item.manager.doctor?.firstName + ' ' + item.manager.doctor?.lastName
                                        :'Quản trị viên'
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="left">{item.address}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant="outlined" color="primary" align="center" onClick={() => {props.handleOpenClinicsDialog(item, false, false)}}>
                                        Chi tiết
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default function WorkPlace() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { userInfo } = useContext(AppContext);

    const [value, setValue] = React.useState(TabCode.CLINICS);
    const [isOpenClinicDialog, setIsOpenClinicDialog] = React.useState(false);
    const [isOpenDoctorDialog, setIsOpenDoctorDialog] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [isMine, setIsMine] = React.useState(false);
    const [isApply, setIsApply] = React.useState(false);
    const [selectedDoctorStatus, setSelectedDoctorStatus] = React.useState('');
    const [openClinicRegistrationForm, setOpenClinicRegistrationForm] = React.useState(false);
    const [isReload, setIsReload] = React.useState(false);

    const [specializedList, setSpecializedList] = React.useState([]);
    const [provinces, setProvinces] = React.useState([]);
    const [myClinics, setMyClinics] = React.useState([]);
    const [myManagementClinics, setMyManagementClinics] = React.useState([]);
    const [myOperations, setMyOperations] = React.useState([]);

    const [selectedWorkPlaceId, setSelectedWorkPlaceId] = React.useState(0);
    const [selectedApplicationId, setSelectedApplicationId] = React.useState(0);
    const [selectedApplication, setSelectedApplication] = React.useState({});
    const [selectedDoctor, setSelectedDoctor] = React.useState({
        id: 0, gender: '', name: '', address: '', avatarURL: '', clinic: '', dob: '', introduce: [], medicalExamination: [], contactPhoneNumber: '', specializedId: 0
    });
    const [selectedClinic, setSelectedClinic] = React.useState({
        id: 0, type: '', name: '', address: '', images: [], status: '', managerId: 0,
    });
    const [openClinicStatus, setOpenClinicStatus] = React.useState(false);
    const [clinicStatus, setClinicStatus] = React.useState(0);
    const [newClinicName, setNewClinicName] = React.useState('');
    const [newClinicAddress, setNewClinicAddress] = React.useState('');
    const [operationIdSelect, setOperationIdSelect] = React.useState(0);
    const [newPatientNumber, setNewPatientNumber] = React.useState(0);
    const [newMedicalExpense, setNewMedicalExpense] = React.useState(0);

    const loadData = () => {
        APIService.getDoctorWorkPlaceMy(token, (success, json) => {
            if (success && json.result) {
                setMyClinics(json.result);
            }
        });
        APIService.getDoctorWorkPlaceManagement(token, "", {}, (success, json) => {
            if (success && json.result) {
                setMyManagementClinics(json.result);
            }
        });
        APIService.getDoctorOperation(token, (success, json) => {
            if (success && json.result) {
                setMyOperations(json.result);
            }
        });
    }

    const imgList = [
        'https://cdnmedia.baotintuc.vn/Upload/4l8oGGp94lA5r6lHXppg/files/2021/06/nhidong1.jpg',
        'https://media.vov.vn/sites/default/files/styles/large_watermark/public/2021-07/benh_vien.jpg',
        'https://quantri.nhidong.org.vn/UploadImages/bvnhidong/PHP06/2018_6/20/1012.JPG?w=600',
    ];

    const handleOpenDoctorDialog = (data, isApply, status, application) => {
        setSelectedApplication(application);
        setIsApply(isApply);
        setSelectedDoctorStatus(status);
        setIsOpenDoctorDialog(true);
        setSelectedApplicationId(data.applicationId);
        console.log('doctor data');
        console.log(data);
        setSelectedDoctor({
            id: data.id,
            gender: data.gender === 'MALE' ? 'Nam' : 'Nữ',
            name: data.firstName + " " + data.lastName,
            address: '123 HHT',
            avatarURL: data.avatarURL,
            clinic: '',
            dob: data.birthday,
            contactPhoneNumber: data.contactPhoneNumber,
            introduce: data.introduce,
            medicalExamination: data.medicalExamination,
            specializedId: data.specializedId,
        });
    }

    const handleOpenClinicsDialog = (data, isEdit, isMine) => {
        console.log('clinic data');
        console.log(data);
        setIsOpenClinicDialog(true);
        setIsEditMode(isEdit);
        setIsMine(isMine);
        setSelectedClinic({
            id: data.id,
            type: data.type,
            name: data.name,
            images: data.images,
            address: data.address,
            status: data.status,
            managerId: data.managerId,
            //managerName: data.manager.doctor !== undefined ? data.manager.doctor?.firstName + ' ' + data.manager.doctor?.lastName:'Quản trị viên'
        });
        setNewClinicName(data.name);
        setNewClinicAddress(data.address);
        let operation = myOperations.find(x => x.workplace.id === data.id);
        setOperationIdSelect(operation.id);
        setNewPatientNumber(operation.patientPerHalfHour===null?0:operation.patientPerHalfHour);
        setNewMedicalExpense(operation.medicalExpense===null?0:operation.medicalExpense);
        if (data.status === 'ACTIVE'){
            setClinicStatus(1);
        }
        else {
            setClinicStatus(0);
        }
    }

    const handleApplyWorkPlace = () => {
        let allow = true;
        myClinics.forEach(item => {
            if (item.id === selectedClinic.id) {
                enqueueSnackbar('Bạn đã nộp vào đây rồi!', { variant: 'error' });                
                allow = false;
            }
        });
        if (allow){
            APIService.postDoctorWorkPlaceApply(
                token,
                selectedClinic.id,
                1,
                (success, json) => {
                    if (success, json.result) {
                        enqueueSnackbar('Nộp đơn thành công!', { variant: 'success' });
                    }
                    else{
                        enqueueSnackbar('Bạn đã nộp vào đây rồi!', { variant: 'error' });
                    }
                }
            );
        }
    }

    const handleClinicUpdateWorkPlace = () => {
        if (newClinicName.length === 0 || newPatientNumber < 0 || newMedicalExpense < 0) {
            enqueueSnackbar('Nhập sai!', { variant: 'error' });
            return;
        }
        APIService.putDoctorOperationPatientPerHalfHour(
            token,
            {
                id: operationIdSelect,
                patients: newPatientNumber
            },
            (success, json) => {
                if (success, json.result) {
                    enqueueSnackbar('Cập nhật số người khám thành công!', { variant: 'success' });
                }
            });
        APIService.putDoctorOperationMedicalExpense(
            token,
            {
                id: operationIdSelect,
                medicalExpense: newMedicalExpense
            },
            (success, json) => {
                if (success, json.result) {
                    enqueueSnackbar('Cập nhật chi phí khám thành công!', { variant: 'success' });
                    loadData();
                }
            });
        APIService.putDoctorWorkPlace(
            token,
            {
                id: selectedClinic.id,
                status: clinicStatus === 0 ? 'INACTIVE' : 'ACTIVE',
                name: newClinicName,
                address: newClinicAddress
            },
            (success, json) => {
                if (success, json.result) {
                    setIsOpenClinicDialog(false);
                    enqueueSnackbar('Cập nhật phòng khám thành công!', { variant: 'success' });
                    APIService.getDoctorWorkPlaceMy(token, (success, json) => {
                        if (success && json.result) {
                            setMyClinics(json.result);
                        }
                    });
                }
            }
        );
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getSpecializedName = (id) => {
        const res = specializedList.find(x => x.id === id);
        if (res === undefined){
            return '';
        }
        else {
            return res.name;
        }
    }
    
    const handleAcceptApplication = (status) => {
        setIsOpenDoctorDialog(false);
        if (selectedApplicationId === 0){
            return;
        }
        APIService.putDoctorStatus(
            token,
            {
                doctorId: selectedApplication.doctorId,
                workplaceId: selectedApplication.workplaceId,
                status: status
            },
            (success, json) => {
                if (success, json.result) {
                    enqueueSnackbar('Cài đặt thành công!', { variant: 'success'});
                    setIsReload(true);
                }
                else{
                    console.log(json);
                }
            }
        );
    }

    const handleBannedDoctor = () => {
        if (window.confirm("Bạn có chắc muốn khóa tài khoản này?")) {
            setIsOpenDoctorDialog(false);
            APIService.putDoctorStatus(
                token,
                {
                    doctorId: selectedDoctor.id,
                    workplaceId: selectedWorkPlaceId,
                    status: 'BANNED'
                },
                (success, json) => {
                    if (success, json.result) {
                        enqueueSnackbar('Đã xóa!', { variant: 'success'});
                        setIsReload(true);
                    }
                    else{
                        console.log(json);
                    }
                }
            );
        }
    }

    const handleActiveDoctor = () => {
        if (window.confirm("Bạn có chắc muốn kích hoạt lại tài khoản này?")) {
            setIsOpenDoctorDialog(false);
            APIService.putDoctorStatus(
                token,
                {
                    doctorId: selectedDoctor.id,
                    workplaceId: selectedWorkPlaceId,
                    status: 'ACTIVE'
                },
                (success, json) => {
                    if (success, json.result) {
                        enqueueSnackbar('Đã kích hoạt!', { variant: 'success'});
                        setIsReload(true);
                    }
                    else{
                        console.log(json);
                    }
                }
            );
        }
    }

    useEffect(() => {
        APIService.getProvinces(
            (success, json) => {
                if (success && json.result) {
                    setProvinces(json.result);
                }
            }
        );
        APIService.getSpecialized(
            (success, json) => {
                if (success && json.result) {
                    setSpecializedList(json.result);
                    console.log('getSpecialized');
                    console.log(json.result);
                }
            }
        );
        loadData();
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.demo1}>
                <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                    <AntTab label="Tìm kiếm phòng khám" />
                    <AntTab label="Phòng khám của tôi" />
                    <AntTab label="Quản lý bác sĩ" />
                </AntTabs>
            </div>
            <TabPanel value={value} index={0}>
                <SearchClinicsTable provinces={provinces} handleOpenClinicsDialog={handleOpenClinicsDialog} handleOpenClinicRegistrationForm={() => {setOpenClinicRegistrationForm(true)}} myClinics={myClinics}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MyClinicsTable handleOpenClinicsDialog={handleOpenClinicsDialog} handleOpenClinicRegistrationForm={() => {setOpenClinicRegistrationForm(true)}} myClinics={myClinics} myManagementClinics={myManagementClinics} userInfo={userInfo}  isReload={isReload} setIsReload={setIsReload}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <DoctorManagementTable myManagementClinics={myManagementClinics} handleOpenDoctorDialog={handleOpenDoctorDialog} setSelectedWorkPlaceId={setSelectedWorkPlaceId} isReload={isReload} setIsReload={setIsReload}/>
                {/* <h3>----- ----- ----- ----- -----</h3>
                <ClinicRequestTable myManagementClinics={myManagementClinics}/> */}
            </TabPanel>
            <ClinicRegistrationDialogRaw
                classes={{
                    paper: classes.paper
                }}
                id="ringtone-menu"
                keepMounted
                open={openClinicRegistrationForm}
                onClose={() => {setOpenClinicRegistrationForm(false)}}
            />
            <Dialog open={isOpenClinicDialog} onClose={() => {setIsOpenClinicDialog(false)}} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{backgroundColor: 'cadetblue'}}>Thông tin phòng khám</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Loại"
                        defaultValue={selectedClinic.type}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Tên phòng khám"
                        value={newClinicName}
                        onChange={(e) => {setNewClinicName(e.target.value)}}
                        fullWidth
                        InputProps={{
                            readOnly: !isEditMode,
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Địa chỉ"
                        value={newClinicAddress}
                        onChange={(e) => {setNewClinicAddress(e.target.value)}}
                        fullWidth
                        InputProps={{
                            readOnly: !isEditMode,
                        }}
                    />
                    {/* <TextField
                        margin="dense"
                        id="name"
                        label="Người quản lý"
                        defaultValue={selectedClinic.managerId}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    /> */}
                    {
                        (isEditMode) ?
                        <TextField
                            margin="dense"
                            id="name"
                            type="number"
                            label="Số bệnh nhân khám trong nửa giờ"
                            value={newPatientNumber}
                            onChange={(e) => {setNewPatientNumber(e.target.value)}}
                            fullWidth
                            InputProps={{
                                readOnly: !isEditMode,
                            }}
                        />: null
                    }
                    {
                        (isEditMode) ?
                        <TextField
                            margin="dense"
                            id="name"
                            type="number"
                            label="Số tiền khám"
                            value={newMedicalExpense}
                            onChange={(e) => {setNewMedicalExpense(e.target.value)}}
                            fullWidth
                            InputProps={{
                                readOnly: !isEditMode,
                                step: 10000,
                            }}
                        />:null
                    }
                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel id="demo-controlled-open-select-label">Trạng thái hoạt động</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={openClinicStatus}
                            onClose={() => {setOpenClinicStatus(false)}}
                            onOpen={() => {setOpenClinicStatus(true)}}
                            value={clinicStatus}
                            onChange={(e) => {setClinicStatus(e.target.value)}}
                            inputProps={{
                                readOnly: !isEditMode,
                            }}
                        >
                            <MenuItem value={0}>Ngừng hoạt động</MenuItem>
                            <MenuItem value={1}>Đang hoạt động</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <h6>
                        {
                            selectedClinic.images.length > 0 ? 'Hình ảnh' : ''
                        }
                    </h6>
                    {
                        selectedClinic.images.map(imgSrc =>
                            <img src={imgSrc} style={{ margin: '3%' }} width="44%" height="200" alt=""></img>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    {
                        !isEditMode ?
                        <Button onClick={handleApplyWorkPlace} color="primary" variant="contained" >
                            {isMine ? 'Đăng ký làm việc':'Nộp đơn vào đây'}
                        </Button> : null
                    }
                    {
                        isEditMode ?
                        <Button onClick={handleClinicUpdateWorkPlace} color="primary" variant="contained" >
                            Xác nhận
                        </Button> : null
                    }
                    <Button onClick={() => {setIsOpenClinicDialog(false)}} color="default" variant="outlined">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isOpenDoctorDialog} onClose={() => {setIsOpenDoctorDialog(false)}} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{backgroundColor: 'cadetblue'}}>Thông tin bác sĩ</DialogTitle>
                <DialogContent>
                    <img src={selectedDoctor.avatarURL} style={{ margin: '3%' }} width="44%" height="160px" alt=""></img>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Họ tên"
                        defaultValue={selectedDoctor.name}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Giới tính"
                        defaultValue={selectedDoctor.gender}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Ngày sinh"
                        defaultValue={getDate(selectedDoctor.dob)}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Chuyên ngành"
                        defaultValue={getSpecializedName(selectedDoctor.specializedId)}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Số điện thoại"
                        defaultValue={selectedDoctor.contactPhoneNumber}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <br />
                    <h5 style={{marginTop: '15px', marginBottom: '5px'}}>Thông tin giới thiệu</h5>
                    {
                        selectedDoctor.introduce.length===0?
                        <h6>(Đang cập nhật)</h6>:null
                    }
                    {
                        selectedDoctor.introduce.map(item =>
                            <TextField
                                margin="dense"
                                label=""
                                defaultValue={" - " + item}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            )
                    }
                    <br/>
                    <h5 style={{marginTop: '15px', marginBottom: '5px'}}>Thông tin chuyên khám</h5>
                    {
                        selectedDoctor.medicalExamination.length===0?
                        <h6>(Đang cập nhật)</h6>:null
                    }
                    {
                        selectedDoctor.medicalExamination.map(item =>
                            <TextField
                                margin="dense"
                                label=""
                                defaultValue={" - " + item}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            )
                    }
                </DialogContent>
                <DialogActions>
                    {
                        isApply?
                        <Button onClick={() => {handleAcceptApplication("ACTIVE")}} color="primary" variant="outlined">
                            Chấp nhận
                        </Button>:null
                    }
                    {
                        isApply?
                        <Button onClick={() => {handleAcceptApplication("INACTIVE")}} color="secondary" variant="outlined">
                            Từ chối
                        </Button>:
                        selectedDoctorStatus==='active'?
                        <Button onClick={() => {handleBannedDoctor()}} color="secondary" variant="outlined">
                            Khóa
                        </Button>:
                        <Button onClick={() => {handleActiveDoctor()}} color="secondary" variant="outlined">
                            Mở khóa
                        </Button>
                    }
                    <Button onClick={() => {setIsOpenDoctorDialog(false)}} color="default" variant="outlined">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
