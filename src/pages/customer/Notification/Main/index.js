import React, { useState, useEffect } from 'react';
import NotificationList from './NotificationList';
import APIService from '../../../../utils/APIService';
import getToken from '../../../../helpers/getToken';

export default function Index() {
    // const flag = (localStorage && localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];
    const notificationCards = [
        {
            title: 'Thông báo về việc tiêm phòng Covid 19',
            content: "Hiện nay, Việt Nam đã nhận được 50 triệu liều vacxin Astrazenica...",
            person: 'https://img.lovepik.com/original_origin_pic/19/01/03/f4d5c7c1c9ff025b2b70bfcd15031d2c.png_wh860.png',
        },
        {
            title: 'Thông báo về việc người dân trở lại TP.HCM sau 30/11',
            content: `Thành phố Hồ Chí minh vừa công bố hết dịch và đang ra chính sách để người dân quay lại TP.HCM làm việc sau ngày 30/9...`,
            person: 'https://img.lovepik.com/original_origin_pic/19/01/03/f4d5c7c1c9ff025b2b70bfcd15031d2c.png_wh860.png',
        },
        {
            title: 'Thông báo về việc trở lại học tập',
            content: 'Cả nước đang hướng về ngày toàn quốc trở lại học tập sau bao tháng giãn cách xã hội...',
            person: 'https://img.lovepik.com/original_origin_pic/19/01/03/f4d5c7c1c9ff025b2b70bfcd15031d2c.png_wh860.png',
        },
    ];

    const [appointments, setAppointments] = useState([]);
    var status = 'PENDING';

    useEffect(() => {
        const token = getToken();
        const appointmentList = [];
        APIService.getAppointment(
            token,
            {
            },
            (success, json) => {
                if (success && json.result) {
                    json.result.map(item => {
                        return item.status === status && getDateTime(new Date()) === getDateTime(new Date(item.day)) ? appointmentList.push(item) : '';
                    })
                    setAppointments(appointmentList?.map(item => {
                        return {
                            title: `Lịch khám số ${item.id} - ngày ${getDateTime(new Date(item.day))}`,
                            content: `Hôm nay bạn có lịch khám với bác sĩ ${item.doctor.firstName + ' ' + item.doctor.lastName} vào lúc ${getTime(new Date(item.day))} !`,
                            person: 'https://img.lovepik.com/original_origin_pic/19/01/03/f4d5c7c1c9ff025b2b70bfcd15031d2c.png_wh860.png',
                        }
                    }))
                    return console.log("thành công");
                } else {
                    return alert("Lỗi server!");
                }
            })
    }, [])

    const getDateTime = (dmy) => {
        const dd = dmy.getDate();
        const mm = dmy.getMonth() + 1;
        const yyyy = dmy.getFullYear();
        return (dd + '/' + mm + '/' + yyyy).toString();
    }

    const getTime = (hm) => {
        let hour = hm.getHours();
        let minute = hm.getMinutes();
        if (minute.toString().length === 1) {
            minute = '0' + minute;
        }
        return (hour + ' : ' + minute).toString();
    }

    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>Hôm nay có gì nè ?</h1>
                <br />
            </div>
            <div className="row">
                {
                    appointments.concat(notificationCards).length ? 
                        <div>          
                            <NotificationList notificationCards={appointments.concat(notificationCards)} />   
                        </div> :
                        <div>          
                            <img src="empty.jpg" alt="Chưa có hoạt động" width="500" height="600" style={{marginTop: 10}}></img>  
                        </div>
                }
                
            </div>
        </div>
    );
}