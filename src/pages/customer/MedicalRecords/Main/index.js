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
    const [flag, setFlag] = useState([]);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [sort, setSort] = useState({by: 'name', value: 1});

    useEffect(() => {
        if (isHaveChange) {
            getMedicalRecord()
        }
    }, [isHaveChange])

    const getMedicalRecord = () => {
        const token = getToken();
        const mrList = [];
        APIService.getMedicalRecords(
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
                            id: item.id,
                            patient: item.customer.firstName + ' ' + item.customer.lastName,
                            doctor: item.appointment[0].doctor.firstName + ' ' + item.appointment[0].doctor.lastName,
                            doctorId: item.appointment[0].doctorId,
                            dateTime: item.appointment[0].day,
                            symptom: item.symptom,
                            dose: item.dose,
                            diagnostic: item.diagnostic,
                            medicalExpense: item.medicalExpense,
                            note: item.note,
                            images: item.images,
                            status: item.status,
                            createdAt: item.createdAt,
                            files: item.files,
                        }
                    }))
                    setFlag(mrList?.map(item => {
                        return {
                            id: item.id,
                            patient: item.customer.firstName + ' ' + item.customer.lastName,
                            doctor: item.appointment[0].doctor.firstName + ' ' + item.appointment[0].doctor.lastName,
                            doctorId: item.appointment[0].doctorId,
                            dateTime: item.appointment[0].day,
                            symptom: item.symptom,
                            dose: item.dose,
                            diagnostic: item.diagnostic,
                            medicalExpense: item.medicalExpense,
                            note: item.note,
                            images: item.images,
                            status: item.status,
                            createdAt: item.createdAt,
                            files: item.files,
                        }
                    }))
                    setIsHaveChange(false);
                    return console.log("thành công");
                } else {
                    return console.log("lỗi server");
                }
            }
        )
    }

    const handleChangeVisible = (id, visible) => {
        const token = getToken();
        const status = visible;
        APIService.putStatusOfMedicalRecord(
            token,
            id,
            status,
            (success, json) => {
                if (success && json.result) {
                    return console.log("Đổi quyền xem thành công");
                } else {
                    return console.log(json.error);
                }
            } 
        )
    }

    // const onGetAMedicalRecord = (id) => {
    //     const token = getToken();
    //     APIService.getMedicalRecordById(
    //         token,
    //         id,
    //         (success, json) => {
    //             if (success && json.result) {
    //                 return console.log("Lấy thành công 1 medical record");
    //             } else {
    //                 return console.log(json.error);
    //             }
    //         } 
    //     )
    // }

    // console.log(onGetAMedicalRecord(1));

    const onFilter = (filterId, filterPatient, filterDoctor, filterDateTime, filterCreatedAt) => {
       
        let temp = flag.filter((task) => {
            const id = '#' + task.id;
            return id.toLowerCase().indexOf(filterId.toLowerCase()) !== -1;
        });

        temp = temp.filter((task) => {
            return task.patient.toLowerCase().indexOf(filterPatient.toLowerCase()) !== -1;
        });

        temp = temp.filter((task) => {
            return task.doctor.toLowerCase().indexOf(filterDoctor.toLowerCase()) !== -1;
        });

        temp = temp.filter((task) => {
            return task.dateTime.toLowerCase().indexOf(filterDateTime.toLowerCase()) !== -1;
        });

        temp = temp.filter((task) => {
            return task.createdAt.toLowerCase().indexOf(filterCreatedAt.toLowerCase()) !== -1;
        });

        setMedicalRecords(temp);
    }

    const onSearch = (keyword)=>{
        const temp = flag.filter((task) => {
            const id = '#' + task.id;
            const guardianName = task.patient;
            const doctorName = task.doctor;
            return  id.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
                    guardianName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
                    doctorName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ;
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
                if(a.patient > b.patient) return sortValue;
                else if(a.patient < b.patient) return - sortValue;
                else return 0;
            });
            setMedicalRecords(typeName);
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
                        onFilter={onFilter}
                        handleChangeVisible={handleChangeVisible}
                    />
                </Grid>
            </div>
            {
                medicalRecords.length ? null : 
                <div className="text-center">          
                    <img src="empty.jpg" alt="Chưa có hoạt động" width="400" height="450"></img>  
                </div>
            }
        </div>
    );
}