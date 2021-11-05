import React, { useState } from 'react';
import ServiceList from './ServiceList';
import ServiceControl from './ServiceControl';
import { Grid } from '@material-ui/core';

export default function Index() {
    // const services = (localStorage && localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];
    const flag = [
        {
            "image": "https://cdn.benhvienthucuc.vn/wp-content/uploads/2021/06/Nen-duy-tri-noi-quen-kham-nam-khoa-2-lan-moi-nam.jpg",
            "name":"Gói khám sức khỏe tổng quát",
            "fee":"250.000 VND"
        },
        {
            "image": "https://www.osiris-inc.com/wp-content/uploads/2017/10/bac-si-nhan-khoa-17102019.jpg",
            "name":"Gói kiểm tra thai nhi",
            "fee":"500.000 VND"
        },
        {
            "image": "https://vinmec-prod.s3.amazonaws.com/images/20190603_085325_802806_kham-phu-khoa-la-la.max-1800x1800.jpg",
            "name":"Gói xét nghiệm máu các loại bệnh",
            "fee":"300.000 VND"
        },
    ];

    const [services, setServices] = useState(flag);
    const [sort, setSort] = useState({ by: 'name', value: 1 });

    const onSearch = (keyword) => {
        let temp = flag.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
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