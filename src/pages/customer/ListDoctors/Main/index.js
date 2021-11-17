import React, { useState, useEffect } from 'react';
import DoctorList from './DoctorList';
import DoctorControl from './DoctorControl';
import { Grid } from '@material-ui/core';
import APIService from '../../../../utils/APIService';
import { Link } from 'react-router-dom';

export default function Index() {
    // const doctorcards = (localStorage && localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];
    // const flag = [
    //     {
    //         "id": 1,
    //         "avatar": "https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-g%C3%A1i-%C4%91%E1%BA%B9p-t%C3%B3c-d%C3%A0i-ng%E1%BA%A7u.jpg",
    //         "name":"Phạm Văn Tâm",
    //         "specialist":"Hộ sinh",
    //         "phone":"0257296632",
    //         "year_exp":"5 năm kinh nghiệm",
    //         "workplace":"Bệnh viện đa khoa tỉnh Phú Yên",
    //     },
    //     {
    //         "id": 2,
    //         "avatar": "https://scontent.fdad3-3.fna.fbcdn.net/v/t1.6435-1/p200x200/131681340_1481021602288952_4789182916497722736_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=7206a8&_nc_ohc=g2HQF7aitUkAX8zWNDg&_nc_ht=scontent.fdad3-3.fna&oh=3a805ed14aec1de39bc0282d9d666040&oe=6169179B",
    //         "name":"Trương Ngọc Sơn",
    //         "specialist":"Đỡ đẻ",
    //         "phone":"0257296632",
    //         "year_exp":"5 năm kinh nghiệm",
    //         "workplace":"Bệnh viện đa khoa tỉnh Bình Định",
    //     },
    //     {
    //         "id": 3,
    //         "avatar": "https://scontent.fdad3-1.fna.fbcdn.net/v/t1.6435-9/83145022_2582872185325534_3147554001050927104_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=zrwXYEUztVQAX_H8sKo&_nc_ht=scontent.fdad3-1.fna&oh=b937a0c46bf99e866922c5cea196b624&oe=61691DA8",
    //         "name":"Nguyễn Thị Nhật Trang",
    //         "specialist":"Bắt trẻ",
    //         "phone":"0257296632",
    //         "year_exp":"5 năm kinh nghiệm",
    //         "workplace":"Bệnh viện đa khoa tỉnh Gia Lai",
    //     },
    //     {
    //         "id": 4,
    //         "avatar": "https://scontent.fdad3-1.fna.fbcdn.net/v/t1.6435-9/124669208_2809353256006939_673331700560413121_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=MB2HXftCRdEAX8bRdKK&_nc_ht=scontent.fdad3-1.fna&oh=decb596ec9faa7353ceedc16dcd1ed78&oe=616716F2",
    //         "name":"Hồ Thủy Tiên",
    //         "specialist":"Bồng trẻ",
    //         "phone":"0257296632",
    //         "year_exp":"5 năm kinh nghiệm",
    //         "workplace":"Bệnh viện đa khoa tỉnh Kon Tum",
    //     },
    //     {
    //         "id": 5,
    //         "avatar": "https://scontent.fdad3-2.fna.fbcdn.net/v/t1.6435-9/201103803_1438456426488093_549275820607158497_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=nIyhnoZks2IAX_uWrmW&_nc_ht=scontent.fdad3-2.fna&oh=b300a45d6b0cf7b3f792753705a9cdb0&oe=616A3139",
    //         "name":"Đào Dương Long",
    //         "specialist":"Bê trẻ",
    //         "phone":"0257296632",
    //         "year_exp":"5 năm kinh nghiệm",
    //         "workplace":"Bệnh viện đa khoa tỉnh Lâm Đồng",
    //     },
    //     {
    //         "id": 6,
    //         "avatar": "https://scontent.fdad3-2.fna.fbcdn.net/v/t1.6435-9/131909241_1812545618901498_5480970132946194661_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=tlPkNxi4YAgAX-TctWx&_nc_ht=scontent.fdad3-2.fna&oh=68fed41cbe62466e84aff03c9685d9c8&oe=61676948",
    //         "name":"Đào Thị Việt Hà",
    //         "specialist":"Rinh trẻ",
    //         "phone":"0257296632",
    //         "year_exp":"5 năm kinh nghiệm",
    //         "workplace":"Bệnh viện đa khoa tỉnh Cà Mau",
    //     },
    // ];

    const [isHaveChange, setIsHaveChange] = useState(true);
    const [flag, setFlag] = useState([]);
    const [doctorcards, setDoctorcards] = useState([]);
    const [sort, setSort] = useState({ by: 'name', value: 1 });
    const [specialized, setSpecialized] = useState([]);

    useEffect(() => {
        if (isHaveChange) {
            getDoctors()
            getSpecialized()
        }
    }, [isHaveChange])

    const getDoctors = () => {
        const drList = [];
        APIService.getDoctorListPublic(
            {},
            (success, json) => {
                if (success && json.result) {
                    json.result.map(item => {
                        return drList.push(item);
                    })
                    setFlag(drList?.map(item => {
                        return {
                            id: item.doctor.id,
                            avatar: item.doctor.avatarURL,
                            name: item.doctor.firstName +' '+ item.doctor.lastName,
                            specialist: item.doctor.specialized.name,
                            phone:"0257296632",
                            year_exp:"5 năm kinh nghiệm",
                            workplace: 'Chưa tạo phòng khám', //item.doctor.operation[0].workplace.name
                        }
                    }))
                    setDoctorcards(drList?.map(item => {
                        return {
                            id: item.doctor.id,
                            avatar: item.doctor.avatarURL,
                            name: item.doctor.firstName +' '+ item.doctor.lastName,
                            specialist: item.doctor.specialized.name,
                            phone:"0257296632",
                            year_exp:"5 năm kinh nghiệm",
                            workplace: 'Chưa tạo phòng khám', //item.doctor.operation[0].workplace.name
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

    const getSpecialized = () => {
        APIService.getSpecialized(
            {},
            (success, json) => {
                if (success && json.result) { 
                    setSpecialized(json.result.map(item => {
                        return {
                            id: item.id,
                            name: item.name,
                        }
                    }))
                    return console.log("Lấy chuyên khoa thành công");
                } else {
                    return console.log("lỗi server");
                }
            }
        )
    }

    const onFilter = (filterName, filterPhone, filterSpecialist, filterWorkplace) => {

        let temp = flag.filter((task) => {
            return task.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
        });

        temp = temp.filter((task) => {
            return task.phone.toLowerCase().indexOf(filterPhone.toLowerCase()) !== -1;
        });

        temp = temp.filter((task) => {
            return task.workplace.toLowerCase().indexOf(filterWorkplace.toLowerCase()) !== -1;
        });

        temp = temp.filter((task) => {
            return task.specialist.toLowerCase().indexOf(filterSpecialist.toLowerCase()) !== -1;
        });

        setDoctorcards(temp);
    }

    const onSearch = (keyword) => {
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
                {
                    flag.map(item => {
                        return  <p key={item.id}>
                            <Link to={`/doctor/${item.id}`}></Link>
                        </p>
                    })
                }
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
                        specialized={specialized}
                        onFilter={onFilter}
                    />
                </Grid>
            </div>
        </div>
    );
}