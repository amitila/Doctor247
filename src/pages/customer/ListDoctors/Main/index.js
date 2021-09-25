import React, { useState } from 'react';
import DoctorList from './DoctorList';
import DoctorControl from './DoctorControl';
import { Grid } from '@material-ui/core';

export default function Index() {
    // const doctorcards = (localStorage && localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];
    const flag = [
        {
            "avatar": "https://scontent.fdad3-1.fna.fbcdn.net/v/t1.6435-9/124437127_1251322528580325_2129106518303265346_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=174925&_nc_ohc=GClvlOFTaTMAX-KxWwR&_nc_ht=scontent.fdad3-1.fna&oh=a771eec5044f27cb44b8594683892f7a&oe=61688EC2",
            "name":"Phạm Văn Tâm",
            "specialist":"Hộ sinh",
            "phone":"0398296632",
            "year_exp":"5 năm kinh nghiệm",
            "workplace":"Bệnh viện đa khoa tỉnh Phú Yên",
        },
        {
            "avatar": "https://scontent.fdad3-3.fna.fbcdn.net/v/t1.6435-1/p200x200/131681340_1481021602288952_4789182916497722736_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=7206a8&_nc_ohc=g2HQF7aitUkAX8zWNDg&_nc_ht=scontent.fdad3-3.fna&oh=3a805ed14aec1de39bc0282d9d666040&oe=6169179B",
            "name":"Trương Ngọc Sơn",
            "specialist":"Đỡ đẻ",
            "phone":"0398296632",
            "year_exp":"5 năm kinh nghiệm",
            "workplace":"Bệnh viện đa khoa tỉnh Bình Định",
        },
        {
            "avatar": "https://scontent.fdad3-1.fna.fbcdn.net/v/t1.6435-9/83145022_2582872185325534_3147554001050927104_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=zrwXYEUztVQAX_H8sKo&_nc_ht=scontent.fdad3-1.fna&oh=b937a0c46bf99e866922c5cea196b624&oe=61691DA8",
            "name":"Nguyễn Thị Nhật Trang",
            "specialist":"Bắt trẻ",
            "phone":"0398296632",
            "year_exp":"5 năm kinh nghiệm",
            "workplace":"Bệnh viện đa khoa tỉnh Gia Lai",
        },
        {
            "avatar": "https://scontent.fdad3-1.fna.fbcdn.net/v/t1.6435-9/124669208_2809353256006939_673331700560413121_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=MB2HXftCRdEAX8bRdKK&_nc_ht=scontent.fdad3-1.fna&oh=decb596ec9faa7353ceedc16dcd1ed78&oe=616716F2",
            "name":"Hồ Thủy Tiên",
            "specialist":"Bồng trẻ",
            "phone":"0398296632",
            "year_exp":"5 năm kinh nghiệm",
            "workplace":"Bệnh viện đa khoa tỉnh Kon Tum",
        },
        {
            "avatar": "https://scontent.fdad3-2.fna.fbcdn.net/v/t1.6435-9/201103803_1438456426488093_549275820607158497_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=nIyhnoZks2IAX_uWrmW&_nc_ht=scontent.fdad3-2.fna&oh=b300a45d6b0cf7b3f792753705a9cdb0&oe=616A3139",
            "name":"Đào Dương Long",
            "specialist":"Bê trẻ",
            "phone":"0398296632",
            "year_exp":"5 năm kinh nghiệm",
            "workplace":"Bệnh viện đa khoa tỉnh Lâm Đồng",
        },
        {
            "avatar": "https://scontent.fdad3-2.fna.fbcdn.net/v/t1.6435-9/131909241_1812545618901498_5480970132946194661_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=tlPkNxi4YAgAX-TctWx&_nc_ht=scontent.fdad3-2.fna&oh=68fed41cbe62466e84aff03c9685d9c8&oe=61676948",
            "name":"Đào Thị Việt Hà",
            "specialist":"Rinh trẻ",
            "phone":"0398296632",
            "year_exp":"5 năm kinh nghiệm",
            "workplace":"Bệnh viện đa khoa tỉnh Cà Mau",
        },
    ];

    const [doctorcards, setDoctorcards] = useState(flag);
    const [sort, setSort] = useState({ by: 'name', value: 1 });

    const onFilter = (filterName, filterPhone, filterSpecialist, filterWorkplace) => {
        // setFilter({
        //     name : filterName,
        //     status : filterStatus
        // });

        let temp = flag.filter((task) => {
            return task.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
        });

        temp = temp.filter((task) => {
            return task.phone.toLowerCase().indexOf(filterPhone.toLowerCase()) !== -1;
        });

        temp = temp.filter((task) => {
            return task.workplace.toLowerCase().indexOf(filterWorkplace.toLowerCase()) !== -1;
        });

        // temp = temp.filter((task) => {
        //     if(filterStatus === '-1' || filterStatus === -1){
        //         return task;
        //     }else{
        //         return task.status === (parseInt(filterStatus, 10) === 1 ? true : false);
        //     }
        // });
        setDoctorcards(temp);
    }

    const onSearch = (keyword) => {
        //setKeyword(keyword);
        console.log(flag);
        let temp = flag.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 || task.workplace.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        setDoctorcards(temp);
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
            setDoctorcards(typeName);
        } else {
            // const typeStatus = flag.sort((a, b) => {
            //     if(a.status > b.status) return -sortValue;
            //     else if(a.status < b.status) return sortValue;
            //     else return 0;
            // });
            // setDoctorcards(typeStatus);
        }
    }

    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>Danh sách y bác sĩ</h1>
                <br />
            </div>
            <div className="row">
                <Grid container spacing={2}>
                    <Grid container spacing={2}>
                        {/* Search-Sort */}
                        <DoctorControl
                            onSearch={onSearch}
                            onSort={onSort}
                            sortBy={sort.by}
                            sortValue={sort.value}
                        />
                    </Grid>
                    {/* List*/}
                    <DoctorList
                        doctorcards={doctorcards}
                        onFilter={onFilter}
                    />
                </Grid>
            </div>
        </div>
    );
}