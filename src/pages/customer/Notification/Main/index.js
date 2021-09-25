import React from 'react';
import NotificationList from './NotificationList';

export default function Index() {
    // const flag = (localStorage && localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];
    const notificationCards = [
        {
            title: 'Thông báo về việc tiêm phòng Covid 19',
            content: "Hiện nay, Việt Nam đã nhận được 50 triệu liều vacxin Astrazenica...",
            person: 'https://img.lovepik.com/original_origin_pic/19/01/03/f4d5c7c1c9ff025b2b70bfcd15031d2c.png_wh860.png',
        },
        {
            title: 'Thông báo về việc người dân trở lại TP.HCM sau 30/9',
            content: `Thành phố Hồ Chí minh vừa công bố hết dịch và đang ra chính sách để người dân quay lại TP.HCM làm việc sau ngày 30/9...`,
            person: 'https://img.lovepik.com/original_origin_pic/19/01/03/f4d5c7c1c9ff025b2b70bfcd15031d2c.png_wh860.png',
        },
        {
            title: 'Thông báo về việc trở lại học tập',
            content: 'Cả nước đang hướng về ngày toàn quốc trở lại học tập sau bao tháng giãn cách xã hội...',
            person: 'https://img.lovepik.com/original_origin_pic/19/01/03/f4d5c7c1c9ff025b2b70bfcd15031d2c.png_wh860.png',
        },
    ];

    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>Thông báo</h1>
                <br />
            </div>
            <div className="row">
                <div>          
                    <NotificationList notificationCards={notificationCards} />   
                </div>
            </div>
        </div>
    );
}