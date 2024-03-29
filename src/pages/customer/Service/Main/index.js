import React, { useState } from 'react';
import ServiceList from './ServiceList';
import ServiceControl from './ServiceControl';
import { Grid } from '@material-ui/core';

export default function Index() {
    // const services = (localStorage && localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];
    const flag = [
        {
            "image": "https://cdn.bookingcare.vn/fr/w800/2018/09/11/213035bigstock-medicine-doctor-hand-working-w-44541469.jpg",
            "name":"Gói khám sức khỏe tổng quát",
            "fee":"1.250.000 VND",
            "feeNumber":1250000,
            "introduce": `Đang cập nhật`,
            "content": `Đang cập nhật`,
            "service": `Đang cập nhật`
        },
        {
            "image": "https://cdn.bookingcare.vn/fr/w800/2019/03/27/165832sieu-am-thai.jpg",
            "name":"Gói kiểm tra thai nhi",
            "fee":"500.000 VND",
            "feeNumber":500000,
            "introduce": `Đang cập nhật`,
            "content": `Đang cập nhật`,
            "service": `Đang cập nhật`
        },
        {
            "image": "https://login.medlatec.vn//ckfinder/userfiles/images/xet-nghiem-mau-bao-nhieu-tien-03.jpg",
            "name":"Gói xét nghiệm máu các loại bệnh",
            "fee":"600.000 VND",
            "feeNumber":600000,
            "introduce": `Đang cập nhật`,
            "content": `Đang cập nhật`,
            "service": `Đang cập nhật`
        },
        {
            "image": "https://benhvienthienduc.vn/media/data/kham-sk-xin-viec.jpg",
            "name":"Gói khám sức khoẻ hậu Covid-19",
            "fee":"450.000 VND",
            "feeNumber":450000,
            "introduce": `Đang cập nhật`,
            "content": `Đang cập nhật`,
            "service": `Đang cập nhật`
        },
        {
            "image": "https://yhoccongdong.com/wp-content/uploads/2013/08/tri-lieu-va-tu-van-tam-ly-1280x720.jpg",
            "name":"Gói trị liệu và tư vấn tâm lý",
            "fee":"700.000 VND",
            "feeNumber":700000,
            "introduce": `Đang cập nhật`,
            "content": `Đang cập nhật`,
            "service": `Đang cập nhật`
        },
        {
            "image": "http://baosonhospital.com/Uploads/images/kham-suc-khoe-tien-hon-nhan.jpg",
            "name":"Gói tư vấn tâm tư, tình cảm trong hôn nhân",
            "fee":"300.000 VND",
            "feeNumber":300000,
            "introduce": `Đang cập nhật`,
            "content": `Đang cập nhật`,
            "service": `Đang cập nhật`
        },
    ];

    const [services, setServices] = useState(flag);
    const [sort, setSort] = useState({ by: 'name', value: 1 });

    const onSearch = (keyword) => {
        let temp = flag.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
                    task.content.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        setServices(temp);
    }

    const onSort = (sortBy, sortValue) => {
        setSort({
            by: sortBy,
            value: sortValue
        });

        if (sortBy === 'name') {
            const typeName = flag.sort((a, b) => {
                if (a.name < b.name) return sortValue;
                else if (a.name > b.name) return - sortValue;
                else return 0;
            });
            setServices(typeName);
        } else if (sortBy === 'fee') {
            const typeName = flag.sort((a, b) => {
                if (a.feeNumber < b.feeNumber) return sortValue;
                else if (a.feeNumber > b.feeNumber) return - sortValue;
                else return 0;
            });
            setServices(typeName);
        }
    }

    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>Gói khám dịch vụ</h1>
                <br />
            </div>
            <div className="row">
                <Grid container spacing={2}>
                    <Grid container spacing={2}>
                        {/* Search-Sort */}
                        <ServiceControl
                            onSearch={onSearch}
                            onSort={onSort}
                            sortBy={sort.by}
                            sortValue={sort.value}
                        />
                    </Grid>
                    {/* List*/}
                    <ServiceList
                        services={services}
                    />
                </Grid>
            </div>
        </div>
    );
}