import React, { useState } from 'react';
import MRList from './MRList';
import MRControl from './MRControl';
import APIService from '../../../../utils/APIService';

// Lấy lịch đăng ký từ db về 
const mrList = [];
const token = document.cookie.slice(6);
var flag = [];
APIService.getAppointment(
    token,
    {
    },
    (success, json) => {
        if (success && json.result) {
            json.result.map(item => {
                return mrList.push(item);
            })
            mrList?.map(item => {
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
    // const flag = (localStorage && localStorage.getItem('appointments')) ? JSON.parse(localStorage.getItem('appointments')) : [];
    const [appointments, setAppointments] = useState(flag);
    const [sort, setSort] = useState({by: 'name', value: 1});

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
   
    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>Hồ sơ bệnh án</h1>
                <br/>
            </div>
            <div className="row">
                <div className= "col-xs-12 col-sm-12 col-md-12 col-lg-12" >
                    {/* Search-Sort */}
                    <MRControl 
                        onSearch={onSearch} 
                        onSort={onSort}
                        sortBy={sort.by}
                        sortValue={sort.value}
                    />

                    {/* List*/}
                    <MRList 
                        appointments={appointments} 
                        onDelete={onDelete}
                        onFilter={onFilter}
                    />
                </div>
            </div>
        </div>
    );
}