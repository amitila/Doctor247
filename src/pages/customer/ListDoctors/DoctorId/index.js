import React, { useState, useEffect } from 'react';
import DoctorList from './DoctorList';
import { Grid } from '@material-ui/core';
import APIService from '../../../../utils/APIService';
import getToken from '../../../../helpers/getToken';
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function Index({match}) {

    const id = match.params.id;
    const [isHaveChange, setIsHaveChange] = useState(true);
    const [doctorcards, setDoctorcards] = useState('');
    const history = useHistory();

    const getWeekday = (day) => {
        let weekday;
        // eslint-disable-next-line default-case
        switch (day) {
            case 'SUNDAY':
                weekday = 'Chủ nhật';
                break;
            case 'MONDAY':
                weekday = 'Thứ 2';
                break;
            case 'TUESDAY':
                weekday = 'Thứ 3';
                break;
            case 'WEDNESDAY':
                weekday = 'Thứ 4';
                break;
            case 'THURSDAY':
                weekday = 'Thứ 5';
                break;
            case 'FRIDAY':
                weekday = 'Thứ 6';
                break;
            case 'SATURDAY':
                weekday = 'Thứ 7';
                break;
            default: 
                weekday = '';
          }
        return weekday;
    }

    const getDayOfWeek = (day) => {
        let dayOfWeek;
        // eslint-disable-next-line default-case
        switch (day) {
            case 'SUNDAY':
                dayOfWeek = 0;
                break;
            case 'MONDAY':
                dayOfWeek = 1;
                break;
            case 'TUESDAY':
                dayOfWeek = 2;
                break;
            case 'WEDNESDAY':
                dayOfWeek = 3;
                break;
            case 'THURSDAY':
                dayOfWeek = 4;
                break;
            case 'FRIDAY':
                dayOfWeek = 5;
                break;
            case 'SATURDAY':
                dayOfWeek = 6;
                break;
            default: 
                dayOfWeek = -1;
          }
        return dayOfWeek;
    }

	useEffect(() => {
		if(isHaveChange) {
			const token = getToken();
			APIService.getDoctorById(
				token,
				id,
				(success, json) => {
					if (success && json.result) {
						const item = json.result;
						setDoctorcards({
							id: item.doctor.id,
                            avatar: item.doctor.avatarURL,
                            name: item.doctor.firstName +' '+ item.doctor.lastName,
                            specialist: item.doctor.specialized.name,
                            phone:"",
                            year_exp:"",
                            birthday: item.doctor.birthday,
                            gender: item.doctor.gender,
                            province: item.doctor.province,
                            introduce: item.doctor.introduce,
                            medicalExamination: item.doctor.medicalExamination,
                            workHistory: item.doctor.workHistory,
                            workplace: item.doctor.operation.map(x => {return x.workplace.name}),
                            operations: item.doctor.operation.map(x => {return {
                                workplace: x.workplace.name,
                                workplaceContact: x.workplace.contactPhoneNumber,
                                workplaceAddress: x.workplace.address + ' ( ' + x.workplace.ward.name + ', ' + x.workplace.ward.district.name + ', ' + x.workplace.ward.district.province.name + ' )',
                                coordinates: {
                                    latitude: x.workplace.latitude,
                                    longitude: x.workplace.longitude
                                },
                                patientPerHalfHour: x.patientPerHalfHour === null ? 0 : x.patientPerHalfHour,
                                operationHours: x.operationHour.map(y => {return {
                                    day: y.day,
                                    dayOfWeek: getDayOfWeek(y.day),
                                    weekday: getWeekday(y.day),
                                    startTime: y.startTime,
                                    endTime: y.endTime,
                                    startTimeVN: new Date(y.startTime),
                                    endTimeVN: new Date(y.endTime),
                                    startHour: new Date(y.startTime).getHours() +'h'+ new Date(y.startTime).getMinutes(),
                                    endHour: new Date(y.endTime).getHours() +'h'+ new Date(y.endTime).getMinutes(),
                                }})
                            }}),
						})
						setIsHaveChange(false);
						return console.log("thành công");
					} else {
						return console.log("lỗi server");
					}
				}
			)
		}
	},[id, isHaveChange])

    return (
        <div className="container-fluid m-50" style={{alignItems: 'center', margin: 'auto'}}>
            {
                doctorcards ? 
                <>
                    <div className="text-center">
                        <h1>Thông tin bác sĩ {doctorcards.name}</h1>
                        <br />
                    </div>
                    <div className="row" style={{alignItems: 'center', margin: 'auto'}}>
                        <Grid container spacing={0} style={{alignItems: 'center', textAlign: 'center'}}>
                            {/* List*/}
                            <DoctorList
                                doctorcards={doctorcards}
                            />
                        </Grid>
                    </div> 
                </>:
                <div className="text-center">
                    <h1>Bạn vẫn chưa đăng nhập!</h1>
                    <br />
                    <Button
						fullWidth
						variant="contained"
						onClick={()=>history.push("/signin")}
						style={{marginBottom: 15, backgroundColor: '#24bd9c', fontWeight: 'bold'}}
					>
						Đăng nhập / Đăng ký 
					</Button>
                </div>
            }
            
        </div>
    );
}