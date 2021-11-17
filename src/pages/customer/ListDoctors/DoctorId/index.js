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
							phone:"0257296632",
							year_exp:"5 năm kinh nghiệm",
							workplace: item.doctor.operation.map(x => {return x.workplace.name}),
							operations: item.doctor.operation.map(x => {return {
								workplace: x.workplace.name + ', ' + x.workplace.address,
								patientPerHalfHour: x.patientPerHalfHour === null ? 0 : x.patientPerHalfHour,
								operationHours: x.operationHour.map(y => {return {
									day: y.day,
									dayOfWeek: getDayOfWeek(y.day),
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