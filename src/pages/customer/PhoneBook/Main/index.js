import React, { useState, useEffect } from 'react';
import PhoneBookList from './PhoneBookList';
import PhoneBookControl from './PhoneBookControl';
import Location from './Location';
import { Grid } from '@material-ui/core';
import { getMath } from '../../../../helpers/getDistanceFromCurrent';

export default function Index() {
    // const phoneBookCards = (localStorage && localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];
    const [flag, setFlag] = useState([
        {
            "name": "Phú Yên – Bệnh Viện Đa Khoa Tỉnh Phú Yên",
            "phoneNumber": "0963361414",
            "lat": 13.1092808,
            "lng": 109.2970928,
        },
        {
            "name": "Phú Yên – Bệnh Viện Điều Dưỡng Và Phục Hồi Chức Năng",
            "phoneNumber": "0963351414",
            "lat": 13.171919202996422, 
            "lng": 109.29366292562965,
        },
        {
            "name": "Phú Yên – Bệnh Viện Mắt Phú Yên",
            "phoneNumber": "0963201414",
            "lat": 13.090611546235369, 
            "lng": 109.31840597522388,
        },
        {
            "name": "Phú Yên – Bệnh Viện Sản Nhi Phú Yên",
            "phoneNumber": "0963301414",
            "lat": 13.092414289950959, 
            "lng": 109.30236695261658,
        },
        {
            "name": "Phú Yên – Trung Tâm Da Liễu Phú Yên",
            "phoneNumber": "0963181414",
            "lat": 13.091558740610596, 
            "lng": 109.292201367958,
        },
        {
            "name": "Khánh Hòa – Bệnh Viện Đa Khoa Tỉnh Khánh Hòa",
            "phoneNumber": "0965371515",
            "lat": 12.2486775,
            "lng": 109.1900883,
        },
        {
            "name": "Lâm Đồng – Bệnh Viện Đa Khoa Lâm Đồng",
            "phoneNumber": "0964591515",
            "lat": 11.5481015,
            "lng": 107.8073639,
        },
        {
            "name": "Kon Tum – Bệnh Viện Đa Khoa Tỉnh Kon Tum",
            "phoneNumber": "0964951515",
            "lat": 14.3558789,
            "lng": 107.996474,
            "distance" : 0
        },
        {
            "name": "Cà Mau – Bệnh Viện Đa Khoa Tỉnh Cà Mau",
            "phoneNumber": "0967731818",
            "lat": 9.1713151,
            "lng": 105.1584296,
            "distance" : 0
        },
        {
            "name": "Tp. Hồ Chí Minh – Bệnh Viện Chợ Rẫy",
            "phoneNumber": "0969871010",
            "lat": 10.757836156223908,
            "lng": 106.65952201026082,
            "distance" : 0
        },
        {
            "name": "Tp. Hồ Chí Minh – Bệnh Viện Thống Nhất",
            "phoneNumber": "0969861010",
            "lat": 10.791557174281282, 
            "lng": 106.6534321967672,
            "distance" : 0
        },
        {
            "name": "Tp. Hồ Chí Minh – Bệnh Viện Chấn Thương Chỉnh Hình",
            "phoneNumber": "0967841010",
            "lat": 10.7898283398828,
            "lng": 106.65339502785093,
            "distance" : 0
        },
        {
            "name": "Tp. Hồ Chí Minh – Bệnh Viện Nhi Đồng 1",
            "phoneNumber": "0967681010",
            "lat": 10.773450774007289, 
            "lng": 106.66912892941775,
            "distance" : 0
        },
        {
            "name": "Tp. Hồ Chí Minh – Bệnh Viện Nhi Đồng 2",
            "phoneNumber": "0967671010",
            "lat": 10.78508641002898, 
            "lng": 106.70140126608159,
            "distance" : 0
        },
    ]);

    const [phoneBookCards, setPhoneBookCards] = useState(flag);
    const [sort, setSort] = useState({ by: 'name', value: 1 });
    const [isSearch, setIsSearch] = useState(false);

    const getLocation = (callback) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (callback) {
                    callback(position.coords.latitude, position.coords.longitude);
                }
            },
            (err) => {
                console.log(err);
                if (callback) {
                    callback();
                }
            }
        );
    };

    useEffect(() => {
        setTimeout(() => {
            getLocation((lat, lng) => {
                console.log('getLocation')
                setPhoneBookCards(phoneBookCards.map(item => {
                    return {
                        ...item,
                        distance: getMath(lat, lng, item.lat, item.lng)
                    }
                }))
            })
        }, isSearch ? 70000 : 50000)
    })

    useEffect(() => {
        getLocation((lat, lng) => {
            console.log('getLocation1')
            setPhoneBookCards(phoneBookCards.map(item => {
                return {
                    ...item,
                    distance: getMath(lat, lng, item.lat, item.lng)
                }
            }))
            setFlag(phoneBookCards.map(item => {
                return {
                    ...item,
                    distance: getMath(lat, lng, item.lat, item.lng)
                }
            }))
            console.log('getLocation done')
        })
    }, [])

    const onFilter = (filterName, filterPhoneNumber) => {
        setIsSearch(true);
        let temp = flag.filter((task) => {
            return task.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
        });

        temp = temp.filter((task) => {
            return task.phoneNumber.toLowerCase().indexOf(filterPhoneNumber.toLowerCase()) !== -1;
        });

        setPhoneBookCards(temp);
    }

    const onSearch = (keyword) => {
        setIsSearch(true);
        let temp = flag.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 || task.phoneNumber.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        setPhoneBookCards(temp);
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
            setPhoneBookCards(typeName);
        } else if (sortBy === 'distance') {
            const typeName = flag.sort((a, b) => {
                console.log(a.distance)
                if (parseInt(a.distance) < parseInt(b.distance)) return sortValue;
                else if (parseInt(a.distance) > parseInt(b.distance)) return - sortValue;
                else return 0;
            });
            setPhoneBookCards(typeName);
        }
    }

    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>Danh bạ khẩn cấp</h1>
                <br />
            </div>
            <div className="row">
                <Grid container spacing={2}>
                    <Grid container spacing={2}>
                        <Location onSearch={onSearch} />
                        {/* Search-Sort */}
                        <PhoneBookControl
                            onSearch={onSearch}
                            onSort={onSort}
                            sortBy={sort.by}
                            sortValue={sort.value}
                        />
                    </Grid>
                    {/* List*/}
                    <PhoneBookList
                        phoneBookCards={phoneBookCards}
                        onFilter={onFilter}
                    />
                </Grid>
            </div>
        </div>
    );
}