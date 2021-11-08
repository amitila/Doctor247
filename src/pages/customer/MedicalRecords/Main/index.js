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
                        console.log("success")
                        return {
                            id: item.id,
                            patient: item.customer.firstName + ' ' + item.customer.lastName,
                            doctor: item.appointment[0].doctor.firstName + ' ' + item.appointment[0].doctor.lastName,
                            doctorId: item.appointment[0].doctorId,
                            dateTime: item.appointment[0].day,
                            symptom: item.symptom,
                            diagnostic: item.diagnostic,
                            medicalExpense: item.medicalExpense,
                            note: item.note,
                            images: item.images,
                            status: item.status,
                            createdAt: item.createdAt,
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

    const onGetAMedicalRecord = (id) => {
        const token = getToken();
        APIService.getMedicalRecordById(
            token,
            id,
            (success, json) => {
                if (success && json.result) {
                    return console.log("Lấy thành công 1 medical record");
                } else {
                    return console.log(json.error);
                }
            } 
        )
    }

    console.log(onGetAMedicalRecord(1));

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
                        onFilter={onFilter}
                        handleChangeVisible={handleChangeVisible}
                    />
                </Grid>
            </div>
        </div>
    );
}