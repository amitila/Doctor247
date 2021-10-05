import React, { useState } from 'react';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import AppointmentControl from './AppointmentControl';
import { useHistory } from "react-router-dom";
import APIService from '../../../../utils/APIService';

// Lấy lịch đăng ký từ db về 
const appointmentList = [];
const token = document.cookie.slice(6);
var flag = [];
APIService.getAppointment(
    token,
    {
    },
    (success, json) => {
        if (success && json.result) {
            json.result.map(item => {
                return appointmentList.push(item);
            })
            appointmentList?.map(item => {
                return flag.push({
                    id: item.medicalRecordId,
                    guardian: item.medicalRecord.customer,
                    doctor: item.doctor,
                    dateTime: item.day,
                    description:item.medicalRecord.symptom,
                    images: item.medicalRecord.images,
                    status: item.status,
                    createdAt: item.createdAt,
                })
            })
            return console.log("thành công");
        } else {
            return alert("Lỗi server!");
        }
    }
    
)

export default function Index() {

    const history = useHistory();
    // const flag = (localStorage && localStorage.getItem('appointments')) ? JSON.parse(localStorage.getItem('appointments')) : [];
    const [appointments, setAppointments] = useState(flag);
    const [isDisplayForm, setIsDisplayForm] = useState(false);
    const [taskEditing, setTaskEditing] = useState(null);
    const [sort, setSort] = useState({by: 'name', value: 1});
   
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
					return alert("Đặt lịch THÀNH CÔNG!");
				} else {
					return alert("THẤT BẠI");
				}
			})
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
        const index = findIndex(id);
        if(index !== -1) {
            APIService.deleteAppointmentById(
                token,
                id,
                (success, json) => {
                    if (success && json.result) {
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
        APIService.getAppointmentById(
            token,
            id,
            (success, json) => {
                if (success && json.result) {
                    return console.log("Lấy thành công");
                } else {
                    return alert("THẤT BẠI!");
                }
            }

        )
    }

    console.log(onGetAnItem(34));

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
   
    var elmAppointmentForm = isDisplayForm 
        ?   <AppointmentForm 
                onSubmit={onSubmit} 
                onCloseForm={onCloseForm} 
                task={taskEditing}
            /> : '';
            
    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>Đăng ký lịch khám</h1>
                <br/>
            </div>
            <div className="row">
                <div className= {isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''} >
                    {/*Form*/}
                    {elmAppointmentForm}
                </div>
                <div className= {isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"} >
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={onToggleForm}
                    >
                        <span className="fa fa-plus mr-5"></span>
                        Thêm lịch hẹn
                    </button>&nbsp;
    
                    {/* Search-Sort */}
                    <AppointmentControl 
                        onSearch={onSearch} 
                        onSort={onSort}
                        sortBy={sort.by}
                        sortValue={sort.value}
                    />

                    {/* List*/}
                    <AppointmentList 
                        appointments={appointments} 
                        onDelete={onDelete}
                        onFilter={onFilter}
                    />
                </div>
            </div>
        </div>
    );
}