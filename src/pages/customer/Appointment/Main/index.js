import React, { useState, useEffect } from 'react';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import AppointmentControl from './AppointmentControl';
import { useHistory } from "react-router-dom";
import APIService from '../../../../utils/APIService';
import getToken from '../../../../helpers/getToken';
import { Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

// Lấy lịch đăng ký từ db về 
// const token = document.cookie.slice(6);

export default function Index(props) {
    const history = useHistory();
    // const flag = (localStorage && localStorage.getItem('appointments')) ? JSON.parse(localStorage.getItem('appointments')) : [];
    const [isHaveChange, setIsHaveChange] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [patientList, setPatientList] = useState([]);
    const [isDisplayForm, setIsDisplayForm] = useState(false);
    const [taskEditing, setTaskEditing] = useState(null);
    const [sort, setSort] = useState({by: 'name', value: 1});
    var status = 'PENDING';

    var flag = appointments;

    const onStatus = (text) => {
        status = text;
        getAppointment();
    }

    useEffect(() => {
        if (isHaveChange) {
            getAppointment();
            onGetGuardian();
        }
    }, [status, isHaveChange])

    const getAppointment = () => {
        
        const token = getToken();
        const appointmentList = [];
        APIService.getAppointment(
            token,
            {
            },
            (success, json) => {
                if (success && json.result) {
                    json.result.map(item => {
                        return item.status === status ? appointmentList.push(item) : '';
                    })
                    setAppointments(appointmentList?.map(item => {
                        return {
                            id: item.medicalRecordId,
                            guardian: item.medicalRecord.customer,
                            doctor: item.doctor,
                            dateTime: item.day,
                            description:item.medicalRecord.symptom,
                            images: item.medicalRecord.images,
                            status: item.status,
                            createdAt: item.createdAt,
                        }
                    }))
                    setIsHaveChange(false);
                    return console.log("thành công");
                } else {
                    return alert("Lỗi server!");
                }
            }
        )
    }
   
    const onToggleForm = (event) => {//Add task
        if(isDisplayForm && taskEditing !== null){
            setIsDisplayForm(true);
            setTaskEditing(null);
        }else{
            setIsDisplayForm(!isDisplayForm);
            setTaskEditing(null);
        }
    }

    const onCloseForm = (event) => {
        setIsDisplayForm(false);
        history.push("/appointment");
    }

    const onSubmit = (data) => {
        const token = getToken();
        APIService.postAppointment(
			token,
			{
				guardianId: data.guardianId,
				doctorId: data.doctorId,
				dayTime: data.dayTime,
				description: data.description,
				images: data.imagesSend,
			},
			(success, json) => {
				
				if (success && json.result) {
                    setIsHaveChange(true);
					return alert("Đặt lịch THÀNH CÔNG!");
				} else {
					return alert("THẤT BẠI");
				}
			}
        )
    }

    const findIndex = (id) => {
        let result = -1;
        appointments.forEach((task, index) => {
            if(task.id === id) {
                result = index;
            }
        });
        return result;
    }

    const onDelete = (id) => {
        const token = getToken();
        const index = findIndex(id);
        if(index !== -1) {
            APIService.deleteAppointmentById(
                token,
                id,
                (success, json) => {
                    if (success && json.result) {
                        setIsHaveChange(true);
                        return console.log("Xóa thành công");
                    } else {
                        return alert("THẤT BẠI!");
                    }
                }
    
            )
            
        }
        onCloseForm();
    }

    const onGetAnItem = (id) => {
        const token = getToken();
        APIService.getAppointmentById(
            token,
            id,
            (success, json) => {
                if (success && json.result) {
                    return 0;
                } else {
                    return alert("THẤT BẠI!");
                }
            }
        )
    }

    console.log(onGetAnItem(34) ? "has an item" : "not found");

    const onFilter = (filterName, filterStatus) => {
        
        let temp = flag.filter((task) => {
            return task.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
        });
        
        temp = temp.filter((task) => {
            if(filterStatus === '-1' || filterStatus === -1){
                return task;
            }else{
                return task.status === (parseInt(filterStatus, 10) === 1 ? true : false);
            }
        });
        setAppointments(temp);
    }

    const onSearch = (keyword)=>{
        console.log(flag);
        const temp = flag.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        setAppointments(temp);
    }

    const onSort = (sortBy, sortValue) => {
        setSort({
            by : sortBy,
            value : sortValue
        })
        if(sortBy === 'name'){
            const typeName = flag.sort((a, b) => {
                if(a.name > b.name) return sortValue;
                else if(a.name < b.name) return - sortValue;
                else return 0;
            });
            setAppointments(typeName);
        }else{
            const typeStatus = flag.sort((a, b) => {
                if(a.status > b.status) return -sortValue;
                else if(a.status < b.status) return sortValue;
                else return 0;
            });
            setAppointments(typeStatus);
        }
    }

    const onGetGuardian = () => {
        const token = getToken();
        var profileList = [];
        APIService.getGuardian(
            token,
            (success, json) => {
                if (success && json.result) {
                    json.result.map(item => {
                        return profileList.push(item);
                    })
                    setPatientList(profileList?.map(item => {
                        return {
                            userTwoId: item.userTwoId,
                            firstName: item.userTwo.firstName,
                            lastName: item.userTwo.lastName,
                            avatar: item.userTwo.avatarURL,
                        }
                    }))
                    setIsHaveChange(false);
                    return console.log("lấy patient list thành công");
                } else {
                    return console.log("Lấy danh sách gia đình thất bại");
                }
            }
        )
    }
   
    var elmAppointmentForm = isDisplayForm 
        ?   <AppointmentForm 
                onSubmit={onSubmit} 
                onCloseForm={onCloseForm} 
                patientList={patientList}
                task={taskEditing}
            /> : '';
            
    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>Đăng ký lịch khám</h1>
                <br />
            </div>
            <div className="row">
                <div  >
                    {isDisplayForm ?
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                {elmAppointmentForm}
                            </Grid>
                            <Grid item xs={12} sm={8}>

                                {/* Search-Sort */}
                                <AppointmentControl 
                                    onSearch={onSearch} 
                                    onSort={onSort}
                                    sortBy={sort.by}
                                    sortValue={sort.value}
                                />
                                <br/><br />
                                {/* List*/}
                                <AppointmentList 
                                    appointments={appointments} 
                                    onDelete={onDelete}
                                    onFilter={onFilter}
                                    onStatus={onStatus}
                                />
                            </Grid>
                        </Grid>
                        :
                        <Grid container spacing={2}>
                            {elmAppointmentForm}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={2} >
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={onToggleForm}
                                    >
                                        <AddIcon />
                                        Thêm lịch hẹn
                                    </button>
                                </Grid>
                                <Grid item xs={12} sm={10} >
                                    {/* Search-Sort */}
                                    <AppointmentControl 
                                        onSearch={onSearch} 
                                        onSort={onSort}
                                        sortBy={sort.by}
                                        sortValue={sort.value}
                                    />
                                </Grid>
                            </Grid>
                            {/* List*/}
                            <AppointmentList 
                                appointments={appointments} 
                                onDelete={onDelete}
                                onFilter={onFilter}
                                onStatus={onStatus}
                            />
                        </Grid>
                    }
                </div>
            </div>
        </div>
    );
}