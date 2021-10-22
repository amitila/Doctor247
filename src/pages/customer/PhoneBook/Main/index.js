import React, { useState, useEffect } from 'react';
import PhoneBookList from './PhoneBookList';
import PhoneBookControl from './PhoneBookControl';
import Location from './Location';
import { Grid } from '@material-ui/core';
import { getMath } from '../../../../helpers/getDistanceFromCurrent';

export default function Index() {
    // const phoneBookCards = (localStorage && localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];
    const flag = [
        {
            "name": "Bệnh viện Đa Khoa tỉnh Phú Yên",
            "phoneNumber": "0398296630",
            "lat": 13.1092808,
            "lng": 109.2970928,
        },
        {
            "name": "Bệnh viện Đa Khoa tỉnh Khánh Hòa",
            "phoneNumber": "0398296631",
            "lat": 12.2486775,
            "lng": 109.1900883,
        },
        {
            "name": "Bệnh viện Đa Khoa tỉnh Lâm Đồng",
            "phoneNumber": "0398296632",
            "lat": 11.5481015,
            "lng": 107.8073639,
        },
        {
            "name": "Bệnh viện Đa Khoa tỉnh Kon Tum",
            "phoneNumber": "0398296633",
            "lat": 14.3558789,
            "lng": 107.996474,
        },
        {
            "name": "Bệnh viện Đa Khoa tỉnh Cà Mau",
            "phoneNumber": "0398296634",
            "lat": 9.1713151,
            "lng": 105.1584296,
        },
    ];

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
        }, isSearch ? 25000 : 20000)
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