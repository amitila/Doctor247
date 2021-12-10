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
import InputBase from '@material-ui/core/InputBase';

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
    const [imgSrcListStr, setImgSrcListStr] = React.useState([]);
    const [clinicName, setClinicName] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const handleChangeClinicType = (event) => {
        setClinicTypeSelect(event.target.value);
    }
    const handleChangeProvince = (event) => {
        setProvinceSelect(event.target.value);
    };
    const handleChangeDistrict = (event) => {
        setDistrictSelect(event.target.value);
    };
    const handleChangeWard = (event) => {
        setWardSelect(event.target.value);
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
        setImgSrcListStr(fl_s);
    }

    useEffect(() => {
        // Make a request for a user with a given ID
        axios
            .get("https://provinces.open-api.vn/api/?depth=3")
            .then(function (response) {
                setProvinces(response.data);
            })
            .catch(function (error) {
                // handle error
            })
            .then(function () {
                // always executed
            });

        setClinicTypes([
            {
                code: 2,
                name: 'Phòng khám tư nhân'
            }
        ]);
        
        APIService.getDoctorWorkPlaceManager(
            token,
            'ACTIVE',
            {
                take: 2,
            },
            (success, json) => {
            });

    }, []);


    const handleCancelClinic = () => {
        onClose();
    };

    const handleRegistClinic = () => {
        if (clinicTypeSelect === 0 || provinceSelect === 0 || districtSelect === 0 || wardSelect === 0 || clinicName === '' || phone === '' || street === '') {
            alert('vui lòng nhập đủ tất cả các trường');
        }
        else {
            const provinceName = provinces.find(x => x.code === provinceSelect).name;
            const districtName = districts.find(x => x.code === districtSelect).name;
            const wardName = wards.find(x => x.code === wardSelect).name;
            const address = street + ", " + wardName + ", " + districtName + ", " + provinceName;

            APIService.postDoctorWorkPlace(
                token,
                {
                    name: clinicName,
                    wardId: 44,
                    longitude: 123,
                    latitude: 122,
                    address: address,
                    images: imgSrcListStr
                },
                (success, json) => {
                    if (success && json.result) { 
                        enqueueSnackbar('Đã gửi yêu cầu đăng ký!', { variant: 'success' });
                    }
                }
            );

            onClose();
        }
    };

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
                    label="Điện thoại"
                    placeholder=""
                    helperText=""
                    onChange={(e) => { setPhone(e.target.value) }}
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
                <Button onClick={handleRegistClinic} onSubmit={() => { console.log('submitbutoon') }} color="primary" variant="outlined">
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

// get DoctorOperation();
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

function getDateTime(hms) {
    let result = "2021-01-01T" + hms + ":00.000Z";
    return result;
}

function getHMS(datetime) {
    return (parseInt(datetime.replace('T', '').replace(':', '').substring(10, 14)));
}

function getDisplayHMS(datetime) {
    return datetime.replace('T', '').substring(10, 15);
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

function MyClinicsTable(props) {
    const classes = useStyles();
    
    const { myClinics } = props;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Loại phòng khám</StyledTableCell>
                        <StyledTableCell align="center"> Tên phòng khám</StyledTableCell>
                        <StyledTableCell align="center">Địa chỉ</StyledTableCell>
                        <StyledTableCell align="center">Trạng thái</StyledTableCell>
                        <StyledTableCell align="center">
                            <Button variant="outlined" color="default" align="center" onClick={() => props.handleOpenClinicForm()}>Đăng ký</Button>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {myClinics.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell align="center">{row.type === 'HOSPITAL' ? 'Bệnh viện' : 'Phòng khám tư'}</StyledTableCell>
                            <StyledTableCell align="center">{row.name}</StyledTableCell>
                            <StyledTableCell align="center">{row.address}</StyledTableCell>
                            <StyledTableCell align="center">{row.status}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button variant="outlined" color="primary" align="center" onClick={() => props.handleOpenClinicsDialog(row, false, false)}>
                                    Xem
                                </Button>
                                <Button variant="outlined" color="primary" align="center" onClick={() => props.handleOpenClinicsDialog(row, true, false)}>
                                    Sửa
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function ClinicRequestTable(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const { myManagementClinics } = props;

    const [applicationsList, setApplicationsList] = React.useState([]);
    const [applicationsListTemp, setApplicationsListTemp] = React.useState([]);

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
                        setApplicationsListTemp(list);
                    }
                }
            );
        });
    }

    const handleAcceptApplication = (applicationId) => {
        APIService.putDoctorWorkPlaceApply(
            token,
            applicationId,
            "ACTIVE",
            (success, json) => {
                if (success, json.result) {
                    enqueueSnackbar('Chấp nhận thành công!', { variant: 'success'});
                    setApplicationsList([]);
                    reloadPage();
                }
                else{
                    console.log(json);
                }
            }
        );
    }

    useEffect(() => {
        reloadPage();
    }, []);

    useEffect(() => {
        setApplicationsList(applicationsList.concat(applicationsListTemp));
    }, [applicationsListTemp]);

    return (
        <TableContainer component={Paper}>
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
                            <StyledTableCell align="center">{application.clinicName}</StyledTableCell>
                                <StyledTableCell align="center">{application.doctor.firstName + " " + application.doctor.lastName}</StyledTableCell>
                                <StyledTableCell align="center">{application.doctor.gender === 'MALE' ? 'Nam' : 'Nữ'}</StyledTableCell>
                                <StyledTableCell align="center">{application.doctor.birthday.substring(0, 10)}</StyledTableCell>
                                <StyledTableCell align="center">{application.doctor.contactPhoneNumber}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button variant="outlined" color="primary" align="center" onClick={() => {handleAcceptApplication(application.id)}}>
                                        Chấp nhận
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

    const handleChangeType = (event) => {
      setType(event.target.value);
    };  
    const handleCloseType = () => {
      setOpenType(false);
    };  
    const handleOpenType = () => {
      setOpenType(true);
    };
    const handleChangePlace = (event) => {
      setPlace(event.target.value);
    };  
    const handleClosePlace = () => {
      setOpenPlace(false);
    };  
    const handleOpenPlace = () => {
      setOpenPlace(true);
    };

    const handleClickSearch = () => {
        console.log(type + '-' + place + '-' + keyword);
        const condition = {
            keyword: keyword
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
        APIService.getDoctorWorkPlace(token, {}, (success, json) => {
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
                        onClose={handleCloseType}
                        onOpen={handleOpenType}
                        value={type}
                        onChange={handleChangeType}
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
                        onClose={handleClosePlace}
                        onOpen={handleOpenPlace}
                        value={place}
                        onChange={handleChangePlace}
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
            </div>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Loại phòng khám</StyledTableCell>
                        <StyledTableCell align="center">Tên phòng khám</StyledTableCell>
                        <StyledTableCell align="center">Người quản lý</StyledTableCell>
                        <StyledTableCell align="center">Địa chỉ</StyledTableCell>
                        <StyledTableCell align="center">
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        workPlaceList.map(item =>
                            <StyledTableRow >
                                <StyledTableCell align="center">{item.type}</StyledTableCell>
                                <StyledTableCell align="center">{item.name}</StyledTableCell>
                                <StyledTableCell align="center">{item.managerId}</StyledTableCell>
                                <StyledTableCell align="center">{item.address}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button variant="outlined" color="default" align="center" onClick={() => {props.handleOpenClinicsDialog(item, false, true)}}>
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
    const { userInfo } = React.useContext(AppContext);

    const [value, setValue] = React.useState(TabCode.CLINICS);
    const [isOpenClinic, setIsOpenClinic] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [isApplyMode, setIsApplyMode] = React.useState(false);

    const [provinces, setProvinces] = React.useState([]);
    const [myClinics, setMyClinics] = React.useState([]);
    const [myManagementClinics, setMyManagementClinics] = React.useState([]);

    const [clinic, setClinic] = React.useState({
        id: 0, type: '', name: '', address: '', images: [], status: '', managerId: 0,
    });
    const [openClinicStatus, setOpenClinicStatus] = React.useState(false);
    const [clinicStatus, setClinicStatus] = React.useState(0);
    const [newClinicName, setNewClinicName] = React.useState('');
    const [newClinicStatus, setNewClinicStatus] = React.useState('');
    const [newClinicAddress, setNewClinicAddress] = React.useState('');

    useEffect(() => {
        APIService.getProvinces(
            (success, json) => {
                if (success && json.result) {
                    setProvinces(json.result);
                }
            }
        );
        APIService.getDoctorWorkPlaceMy(token, (success, json) => {
            if (success && json.result) {
                setMyClinics(json.result);
            }
        });
        APIService.getDoctorWorkPlaceManager(token, "", {}, (success, json) => {
            if (success && json.result) {
                setMyManagementClinics(json.result);
            }
        });
    }, []);

    const imgList = [
        'https://cdnmedia.baotintuc.vn/Upload/4l8oGGp94lA5r6lHXppg/files/2021/06/nhidong1.jpg',
        'https://media.vov.vn/sites/default/files/styles/large_watermark/public/2021-07/benh_vien.jpg',
        'https://quantri.nhidong.org.vn/UploadImages/bvnhidong/PHP06/2018_6/20/1012.JPG?w=600',
    ];

    const handleOpenClinicsDialog = (data, isEdit, isApply) => {
        setIsOpenClinic(true);
        setIsEditMode(isEdit);
        setIsApplyMode(isApply);
        setClinic({
            id: data.id,
            type: data.type,
            name: data.name,
            images: imgList,
            address: data.address,
            status: data.status,
            managerId: data.managerId,
        });
        setNewClinicName(data.name);
        setNewClinicAddress(data.address);
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
            if (item.id === clinic.id) {
                enqueueSnackbar('Bạn đã nộp vào đây rồi!', { variant: 'error' });                
                allow = false;
            }
        });
        if (allow){
            APIService.postDoctorWorkPlaceApply(
                token,
                clinic.id,
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
        console.log({
            id: clinic.id,
            clinicStatus,
            newClinicName,
            newClinicAddress,
        });
        APIService.putDoctorWorkPlace(
            token,
            {
                id: clinic.id,
                status: clinicStatus === 0 ? 'INACTIVE' : 'ACTIVE',
                name: newClinicName,
                address: newClinicAddress
            },
            (success, json) => {
                if (success, json.result) {
                    setIsOpenClinic(false);
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
    
    const handleClinicClose = () => {
        setIsOpenClinic(false);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [openClinicForm, setOpenClinicForm] = React.useState(false);
    const handleClickOpenClinicForm = () => {
        setOpenClinicForm(true);
    };
    const handleCloseClinicForm = () => {
        setOpenClinicForm(false);
    };

    return (
        <div className={classes.root}>
            <div className={classes.demo1}>
                <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                    <AntTab label="Tìm kiếm phòng khám" />
                    <AntTab label="Phòng khám của tôi" />
                    <AntTab label="Các yêu cầu mới" />
                </AntTabs>
            </div>
            <TabPanel value={value} index={0}>
                <SearchClinicsTable provinces={provinces} handleOpenClinicsDialog={handleOpenClinicsDialog} myClinics={myClinics}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MyClinicsTable handleOpenClinicsDialog={handleOpenClinicsDialog} handleOpenClinicForm={handleClickOpenClinicForm} myClinics={myClinics} myManagementClinics={myManagementClinics}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ClinicRequestTable myManagementClinics={myManagementClinics}/>
            </TabPanel>
            <ClinicRegistrationDialogRaw
                classes={{
                    paper: classes.paper
                }}
                id="ringtone-menu"
                keepMounted
                open={openClinicForm}
                onClose={handleCloseClinicForm}
            />
            <Dialog open={isOpenClinic} onClose={handleClinicClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Thông tin phòng khám</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Loại"
                        defaultValue={clinic.type}
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
                    <TextField
                        margin="dense"
                        id="name"
                        label="Người quản lý"
                        defaultValue={clinic.managerId}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
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
                            clinic.images.length > 0 ? 'Hình ảnh' : ''
                        }
                    </h6>
                    {
                        clinic.images.map(imgSrc =>
                            <img src={imgSrc} style={{ margin: '3%' }} width="44%" height="200" alt=""></img>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    {
                        isApplyMode ?
                        <Button onClick={handleApplyWorkPlace} color="primary" variant="contained" >
                            Nộp đơn
                        </Button> : null
                    }
                    {
                        isEditMode ?
                        <Button onClick={handleClinicUpdateWorkPlace} color="primary" variant="contained" >
                            Xác nhận
                        </Button> : null
                    }
                    <Button onClick={handleClinicClose} color="default" variant="outlined">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
