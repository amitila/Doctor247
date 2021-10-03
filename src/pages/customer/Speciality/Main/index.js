import React, { useState } from 'react';
import SpecialityList from './SpecialityList';
import SpecialityControl from './SpecialityControl';
import { Grid } from '@material-ui/core';

export default function Index() {
    // const specialities = (localStorage && localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];
    const flag = [
        {
            "image": "https://cdn.benhvienthucuc.vn/wp-content/uploads/2021/06/Nen-duy-tri-noi-quen-kham-nam-khoa-2-lan-moi-nam.jpg",
            "name":"Nam khoa",
        },
        {
            "image": "https://www.osiris-inc.com/wp-content/uploads/2017/10/bac-si-nhan-khoa-17102019.jpg",
            "name":"Nhãn khoa",
        },
        {
            "image": "https://vinmec-prod.s3.amazonaws.com/images/20190603_085325_802806_kham-phu-khoa-la-la.max-1800x1800.jpg",
            "name":"Phụ khoa",
        },
    ];

    const [specialities, setSpecialities] = useState(flag);
    const [sort, setSort] = useState({ by: 'name', value: 1 });

    const onSearch = (keyword) => {
        let temp = flag.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        setSpecialities(temp);
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
            setSpecialities(typeName);
        }
    }

    return (
        <div className="container-fluid m-50">
            <div className="text-center">
                <h1>Chuyên khoa y tế</h1>
                <br />
            </div>
            <div className="row">
                <Grid container spacing={2}>
                    <Grid container spacing={2}>
                        {/* Search-Sort */}
                        <SpecialityControl
                            onSearch={onSearch}
                            onSort={onSort}
                            sortBy={sort.by}
                            sortValue={sort.value}
                        />
                    </Grid>
                    {/* List*/}
                    <SpecialityList
                        specialities={specialities}
                    />
                </Grid>
            </div>
        </div>
    );
}