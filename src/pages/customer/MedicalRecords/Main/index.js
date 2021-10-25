import React, { useState, useEffect } from 'react';
import MRList from './MRList';
import MRControl from './MRControl';
import APIService from '../../../../utils/APIService';
import getToken from '../../../../helpers/getToken';
import { Grid } from '@material-ui/core';
// Lấy lịch đăng ký từ db về 
// const token = document.cookie.slice(6);

export default function Index(props) {
    // const flag = (localStorage && localStorage.getItem('appointments')) ? JSON.parse(localStorage.getItem('appointments')) : [];
    const [isHaveChange, setIsHaveChange] = useState(true);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [sort, setSort] = useState({by: 'name', value: 1});

    var flag = medicalRecords;

    useEffect(() => {
        if (isHaveChange) {
            getMedicalRecord()
        }
    }, [isHaveChange])

    const getMedicalRecord = () => {
        const token = getToken();
        const mrList = [];
        APIService.getAppointment(
            token,
            {
            },
            (success, json) => {
                if (success && json.result) {
                    json.result.map(item => {
                        return mrList.push(item);
                    })
                    setMedicalRecords(mrList?.map(item => {
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

    const findIndex = (id) => {
        let result = -1;
        medicalRecords.forEach((task, index) => {
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
    }

    const onGetAnItem = (id) => {
        const token = getToken();
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
        setMedicalRecords(temp);
    }

    const onSearch = (keyword)=>{
        console.log(flag);
        const temp = flag.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        setMedicalRecords(temp);
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
            setMedicalRecords(typeName);
        }else{
            const typeStatus = flag.sort((a, b) => {
                if(a.status > b.status) return -sortValue;
                else if(a.status < b.status) return sortValue;
                else return 0;
            });
            setMedicalRecords(typeStatus);
        }
    }
   
    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>Hồ sơ bệnh án</h1>
                <br/>
            </div>
            <div className="row">
                <Grid container spacing={2}>
                    <Grid container spacing={2}>
                        {/* Search-Sort */}
                        <MRControl 
                            onSearch={onSearch} 
                            onSort={onSort}
                            sortBy={sort.by}
                            sortValue={sort.value}
                        />
                    </Grid>
                    {/* List*/}
                    <MRList 
                        medicalRecords={medicalRecords} 
                        onDelete={onDelete}
                        onFilter={onFilter}
                    />
                </Grid>
            </div>
        </div>
    );
}