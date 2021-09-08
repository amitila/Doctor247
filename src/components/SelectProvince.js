import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox() {
    return (
        <div>
            <Autocomplete
                id="combo-box-demo"
                options={top63provinces}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => <TextField required {...params} label="Chọn tỉnh/TP" variant="standard" />}
            />
        </div>

    );
}

const top63provinces = [
    { title: 'Hà Nội', year: 1994 },
    { title: 'Hà Giang', year: 1972 },
    { title: 'Cao Bằng', year: 1974 },
    { title: 'Bắc Kạn', year: 2008 },
    { title: 'Tuyên Quang', year: 1957 },
    { title: "Lào Cai", year: 1993 },
    { title: 'Điện Biên', year: 1994 },
    { title: 'Lai Châu', year: 2003 },
    { title: 'Sơn La', year: 1966 },
    { title: 'Yên Bái', year: 1999 },
    { title: 'Hoà Bình', year: 2001 },
    { title: 'Thái Nguyên', year: 1980 },
    { title: 'Lạng Sơn', year: 1994 },
    { title: 'Quảng Ninh', year: 2010 },
    { title: 'Bắc Giang', year: 2002 },
    { title: "Phú Thọ", year: 1975 },
    { title: 'Vĩnh Phúc', year: 1990 },
    { title: 'Bắc Ninh', year: 1999 },
    { title: 'Hải Dương', year: 1954 },
    { title: 'Hải Phòng', year: 1977 },
    { title: 'Hưng Yên', year: 2002 },
    { title: 'Thái Bình', year: 1995 },
    { title: 'Hà Nam', year: 1991 },
    { title: "Nam Định", year: 1946 },
    { title: 'Ninh Bình', year: 1997 },
    { title: 'Thanh Hóa', year: 1995 },
    { title: 'Nghệ An', year: 1994 },
    { title: 'Hà Tĩnh', year: 2001 },
    { title: 'Quảng Bình', year: 1998 },
    { title: 'Quảng Trị', year: 1968 },
    { title: 'Thừa Thiên Huế', year: 1998 },
    { title: 'Đà Nẵng', year: 2014 },
    { title: 'Quảng Nam', year: 1942 },
    { title: 'Quảng Ngãi', year: 1931 },
    { title: 'Bình Định', year: 1960 },
    { title: 'Phú Yên', year: 1999 },
    { title: 'Khánh Hòa', year: 2011 },
    { title: 'Ninh Thuận', year: 1936 },
    { title: 'Bình Thuận', year: 1981 },
    { title: 'Kon Tum', year: 1954 },
    { title: 'Gia Lai', year: 2002 },
    { title: 'Đắk Lắk', year: 2006 },
    { title: 'Đắk Nông', year: 1991 },
    { title: 'Lâm Đồng', year: 1985 },
    { title: 'Bình Phước', year: 2014 },
    { title: 'Tây Ninh', year: 2000 },
    { title: 'Bình Dương', year: 2000 },
    { title: 'Đồng Nai', year: 2006 },
    { title: 'Bà Rịa - Vũng Tàu', year: 1994 },
    { title: 'Hồ Chí Minh', year: 1979 },
    { title: 'Long An', year: 1979 },
    { title: 'Tiền Giang', year: 1950 },
    { title: 'Bến Tre', year: 1964 },
    { title: 'Trà Vinh', year: 1940 },
    { title: 'Vĩnh Long', year: 1988 },
    { title: 'Đồng Tháp', year: 2006 },
    { title: 'An Giang', year: 1988 },
    { title: 'Kiên Giang', year: 1957 },
    { title: 'Cần Thơ', year: 2012 },
    { title: 'Hậu Giang', year: 1980 },
    { title: 'Sóc Trăng', year: 2008 },
    { title: 'Bạc Liêu', year: 1999 },
    { title: 'Cà Mau', year: 2012 },
];
